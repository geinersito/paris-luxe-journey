/**
 * Events temporal classification — SSOT
 *
 * Single source of truth for "has this event ended", "is it this week",
 * "is it this month". Consumed identically by the events page UI
 * (This Week / This Month / Recently Ended), the Home page teaser,
 * and the Events page JSON-LD builder, so all three surfaces agree
 * on the same set of eligible events at the same instant.
 *
 * All calendar-boundary math (week/month) is computed against the
 * Europe/Paris wall-clock date, not the server/browser's local timezone.
 */
import { PARIS_TZ } from "@/lib/datetime/paris";

export interface EventLike {
  id: string;
  startAt: string;
  endAt?: string;
}

export const EVENT_GRACE_PERIOD_MS = 7 * 24 * 60 * 60 * 1000;

function eventEndInstant(event: EventLike): number {
  return new Date(event.endAt ?? event.startAt).getTime();
}

/**
 * Europe/Paris calendar date (Y-M-D) for the given instant, returned as a
 * UTC-midnight Date so day/week/month arithmetic stays timezone-agnostic
 * after this point.
 */
export function getParisCalendarDate(now: Date = new Date()): Date {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: PARIS_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value);
  return new Date(Date.UTC(get("year"), get("month") - 1, get("day")));
}

/** Monday-to-Sunday range containing the Europe/Paris "today". */
export function getParisWeekRange(now: Date = new Date()): {
  start: Date;
  end: Date;
} {
  const today = getParisCalendarDate(now);
  const dow = today.getUTCDay(); // 0 = Sunday .. 6 = Saturday
  const diffToMonday = dow === 0 ? -6 : 1 - dow;
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() + diffToMonday);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 6);
  return { start, end };
}

/** Calendar-month range containing the Europe/Paris "today". */
export function getParisMonthRange(now: Date = new Date()): {
  start: Date;
  end: Date;
} {
  const today = getParisCalendarDate(now);
  const start = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1),
  );
  const end = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + 1, 0),
  );
  return { start, end };
}

/** True the instant an event's end (or start, if open-ended) is in the past. */
export function hasEventEnded(
  event: EventLike,
  now: Date = new Date(),
): boolean {
  return eventEndInstant(event) < now.getTime();
}

/** True only while an ended event is still inside the 7-day grace window. */
export function isRecentlyEnded(
  event: EventLike,
  now: Date = new Date(),
): boolean {
  const end = eventEndInstant(event);
  const nowMs = now.getTime();
  return end < nowMs && end >= nowMs - EVENT_GRACE_PERIOD_MS;
}

/**
 * Eligible = not ended yet (ongoing or future). This backs Home's "featured"
 * teaser. See `getVisibleEvents` for the narrower set that must back the
 * /events UI and its JSON-LD `EventScheduled` entries.
 */
export function isEventEligible(
  event: EventLike,
  now: Date = new Date(),
): boolean {
  return !hasEventEnded(event, now);
}

/**
 * Range/overlap boundaries must be compared as Europe/Paris calendar days,
 * not raw UTC instants — a range built from `getParisWeekRange`/
 * `getParisMonthRange` uses UTC-midnight *labels* for Paris calendar dates,
 * which are not the real UTC instant of Paris midnight (that instant shifts
 * by the CET/CEST offset). Converting the event's own start/end into the
 * same Paris-calendar-date label before comparing keeps both sides in the
 * same "calendar day" domain, so the DST offset cancels out on both ends
 * instead of corrupting the comparison.
 */
function overlapsRange(
  event: EventLike,
  range: { start: Date; end: Date },
): boolean {
  const startDay = getParisCalendarDate(new Date(event.startAt)).getTime();
  const endDay = getParisCalendarDate(
    new Date(event.endAt ?? event.startAt),
  ).getTime();
  return startDay <= range.end.getTime() && endDay >= range.start.getTime();
}

/** Eligible AND overlapping the current Europe/Paris calendar week. */
export function isInThisWeek(
  event: EventLike,
  now: Date = new Date(),
): boolean {
  return (
    isEventEligible(event, now) && overlapsRange(event, getParisWeekRange(now))
  );
}

/** Eligible AND overlapping the current Europe/Paris calendar month. */
export function isInThisMonth(
  event: EventLike,
  now: Date = new Date(),
): boolean {
  return (
    isEventEligible(event, now) && overlapsRange(event, getParisMonthRange(now))
  );
}

/** Stable de-duplication by id, keeping the first occurrence. */
export function dedupeEventsById<T extends EventLike>(events: T[]): T[] {
  const seen = new Set<string>();
  return events.filter((event) => {
    if (seen.has(event.id)) return false;
    seen.add(event.id);
    return true;
  });
}

function sortByStartAt<T extends EventLike>(events: T[]): T[] {
  return [...events].sort(
    (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
  );
}

/**
 * De-duplicated, not-yet-ended events, sorted by start date.
 * This backs Home's "featured" teaser. Use `getVisibleEvents` for the
 * /events UI listing and its JSON-LD ItemList.
 */
export function getEligibleEvents<T extends EventLike>(
  events: T[],
  now: Date = new Date(),
): T[] {
  return sortByStartAt(
    dedupeEventsById(events).filter((e) => isEventEligible(e, now)),
  );
}

/** De-duplicated events still inside the 7-day "Recently Ended" grace window. */
export function getRecentlyEndedEvents<T extends EventLike>(
  events: T[],
  now: Date = new Date(),
): T[] {
  return sortByStartAt(
    dedupeEventsById(events).filter((e) => isRecentlyEnded(e, now)),
  ).reverse();
}

/** De-duplicated, eligible events overlapping the current calendar week. */
export function getThisWeekEvents<T extends EventLike>(
  events: T[],
  now: Date = new Date(),
): T[] {
  return sortByStartAt(
    dedupeEventsById(events).filter((e) => isInThisWeek(e, now)),
  );
}

/** De-duplicated, eligible events overlapping the current calendar month. */
export function getThisMonthEvents<T extends EventLike>(
  events: T[],
  now: Date = new Date(),
): T[] {
  return sortByStartAt(
    dedupeEventsById(events).filter((e) => isInThisMonth(e, now)),
  );
}

/**
 * De-duplicated union of "this week" and "this month" — the exact set of
 * events actually rendered on the page. JSON-LD must be built from this
 * function (not from `getEligibleEvents`), so structured data never claims
 * an event that isn't visible anywhere in the current UI. Home is allowed
 * to use the wider `getEligibleEvents` set instead, since its "featured"
 * teaser is not required to mirror the /events listing 1:1.
 */
export function getVisibleEvents<T extends EventLike>(
  events: T[],
  now: Date = new Date(),
): T[] {
  return dedupeEventsById([
    ...getThisWeekEvents(events, now),
    ...getThisMonthEvents(events, now),
  ]);
}
