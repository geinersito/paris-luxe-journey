import { describe, expect, it } from "vitest";
import {
  EVENT_GRACE_PERIOD_MS,
  dedupeEventsById,
  getEligibleEvents,
  getParisMonthRange,
  getParisWeekRange,
  getRecentlyEndedEvents,
  getThisMonthEvents,
  getThisWeekEvents,
  getVisibleEvents,
  hasEventEnded,
  isEventEligible,
  isInThisMonth,
  isInThisWeek,
  isRecentlyEnded,
  type EventLike,
} from "../classify";

// Fixed clock: 2026-08-01T12:00:00+02:00 (Europe/Paris, CEST) == 10:00:00Z.
// Paris calendar date is Saturday 2026-08-01.
// Current week (Mon–Sun): 2026-07-27 .. 2026-08-02.
// Current month: 2026-08-01 .. 2026-08-31.
const NOW = new Date("2026-08-01T10:00:00Z");

function event(id: string, startAt: string, endAt?: string): EventLike {
  return { id, startAt, endAt };
}

describe("getParisWeekRange / getParisMonthRange", () => {
  it("resolves the Monday–Sunday week containing the fixed clock", () => {
    const { start, end } = getParisWeekRange(NOW);
    expect(start.toISOString().slice(0, 10)).toBe("2026-07-27");
    expect(end.toISOString().slice(0, 10)).toBe("2026-08-02");
  });

  it("resolves the calendar month containing the fixed clock", () => {
    const { start, end } = getParisMonthRange(NOW);
    expect(start.toISOString().slice(0, 10)).toBe("2026-08-01");
    expect(end.toISOString().slice(0, 10)).toBe("2026-08-31");
  });
});

describe("hasEventEnded / isEventEligible", () => {
  it("an ongoing event (started before now, ends well after) is not ended and is eligible", () => {
    const e = event("ongoing", "2026-07-01T00:00:00Z", "2026-08-15T00:00:00Z");
    expect(hasEventEnded(e, NOW)).toBe(false);
    expect(isEventEligible(e, NOW)).toBe(true);
  });

  it("an event that ended earlier today (before the fixed instant) has ended immediately", () => {
    const e = event(
      "ended-today",
      "2026-08-01T06:00:00Z",
      "2026-08-01T08:00:00Z",
    );
    expect(hasEventEnded(e, NOW)).toBe(true);
    expect(isEventEligible(e, NOW)).toBe(false);
  });

  it("a future September event has not ended and is eligible", () => {
    const e = event("future-sep", "2026-09-15T12:00:00Z");
    expect(hasEventEnded(e, NOW)).toBe(false);
    expect(isEventEligible(e, NOW)).toBe(true);
  });
});

describe("isRecentlyEnded (7-day grace window)", () => {
  it("an event that ended today is within grace", () => {
    const e = event(
      "ended-today",
      "2026-08-01T06:00:00Z",
      "2026-08-01T08:00:00Z",
    );
    expect(isRecentlyEnded(e, NOW)).toBe(true);
  });

  it("an event that ended exactly 6 days ago is within grace", () => {
    const sixDaysAgo = new Date(NOW.getTime() - 6 * 24 * 60 * 60 * 1000);
    const e = event(
      "ended-6d",
      "2026-07-20T10:00:00Z",
      sixDaysAgo.toISOString(),
    );
    expect(isRecentlyEnded(e, NOW)).toBe(true);
    expect(hasEventEnded(e, NOW)).toBe(true);
  });

  it("an event that ended exactly 8 days ago is past grace", () => {
    const eightDaysAgo = new Date(NOW.getTime() - 8 * 24 * 60 * 60 * 1000);
    const e = event(
      "ended-8d",
      "2026-07-20T10:00:00Z",
      eightDaysAgo.toISOString(),
    );
    expect(isRecentlyEnded(e, NOW)).toBe(false);
    expect(hasEventEnded(e, NOW)).toBe(true);
  });

  it("the grace boundary is exactly EVENT_GRACE_PERIOD_MS", () => {
    expect(EVENT_GRACE_PERIOD_MS).toBe(7 * 24 * 60 * 60 * 1000);
  });
});

describe("isInThisWeek (Monday 2026-07-27 .. Sunday 2026-08-02)", () => {
  it("includes an event that starts exactly at week start (Monday) and is still eligible today", () => {
    // A single instant on Monday would already be over by Saturday — use a
    // realistic multi-day window (Mon–Sun) that is still ongoing at NOW.
    const e = event(
      "week-start",
      "2026-07-27T10:00:00Z",
      "2026-08-02T20:00:00Z",
    );
    expect(isInThisWeek(e, NOW)).toBe(true);
  });

  it("a Monday-only instant event is already over by Saturday and is excluded", () => {
    const e = event("monday-instant", "2026-07-27T12:00:00Z");
    expect(hasEventEnded(e, NOW)).toBe(true);
    expect(isInThisWeek(e, NOW)).toBe(false);
  });

  it("includes an event exactly at week end (Sunday)", () => {
    const e = event("week-end", "2026-08-02T12:00:00Z");
    expect(isInThisWeek(e, NOW)).toBe(true);
  });

  it("excludes an event from the previous week (already ended)", () => {
    const e = event("prev-week", "2026-07-26T12:00:00Z");
    expect(isInThisWeek(e, NOW)).toBe(false);
  });

  it("excludes an event that starts the following Monday (not this week, but still eligible)", () => {
    const e = event("next-week", "2026-08-03T12:00:00Z");
    expect(isInThisWeek(e, NOW)).toBe(false);
    expect(isEventEligible(e, NOW)).toBe(true);
  });

  it("includes a long-running event that overlaps the current week", () => {
    const e = event("long-run", "2026-07-01T00:00:00Z", "2026-08-15T00:00:00Z");
    expect(isInThisWeek(e, NOW)).toBe(true);
  });
});

describe("isInThisMonth (August 2026) — month-boundary integrity", () => {
  it("excludes an event that ended the last day of the previous month", () => {
    const e = event("july-31", "2026-07-31T12:00:00Z");
    expect(isInThisMonth(e, NOW)).toBe(false);
  });

  it("includes an event starting the first day of the current month", () => {
    const e = event("aug-1", "2026-08-01T12:00:00Z");
    expect(isInThisMonth(e, NOW)).toBe(true);
  });

  it("includes an event spanning the month boundary (starts in July, ends in August)", () => {
    const e = event(
      "crosses-boundary",
      "2026-07-25T12:00:00Z",
      "2026-08-05T12:00:00Z",
    );
    expect(isInThisMonth(e, NOW)).toBe(true);
    expect(isInThisWeek(e, NOW)).toBe(true);
  });

  it("excludes a future September event from the current month", () => {
    const e = event("future-sep", "2026-09-15T12:00:00Z");
    expect(isInThisMonth(e, NOW)).toBe(false);
    expect(isInThisWeek(e, NOW)).toBe(false);
  });
});

describe("dedupeEventsById", () => {
  it("keeps only the first occurrence of a repeated id", () => {
    const pool = [
      event("dup-1", "2026-08-01T12:00:00Z"),
      event("dup-1", "2026-08-05T12:00:00Z"),
      event("unique-1", "2026-08-02T12:00:00Z"),
    ];
    const result = dedupeEventsById(pool);
    expect(result).toHaveLength(2);
    expect(result.map((e) => e.id)).toEqual(["dup-1", "unique-1"]);
    expect(result[0].startAt).toBe("2026-08-01T12:00:00Z");
  });
});

describe("getEligibleEvents — the collection backing Home", () => {
  it("excludes ended events and de-duplicates, for the exact same pool used everywhere", () => {
    const pool = [
      event("ongoing", "2026-07-01T00:00:00Z", "2026-08-15T00:00:00Z"),
      event(
        "ended-8d",
        "2026-07-20T10:00:00Z",
        new Date(NOW.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      ),
      event("ongoing", "2026-07-01T00:00:00Z", "2026-08-15T00:00:00Z"), // duplicate id
      event("future-sep", "2026-09-15T12:00:00Z"),
    ];
    const eligible = getEligibleEvents(pool, NOW);
    const ids = eligible.map((e) => e.id);
    expect(ids).toEqual(["ongoing", "future-sep"]);
    expect(ids).not.toContain("ended-8d");
  });
});

describe("getRecentlyEndedEvents", () => {
  it("only returns events within the 7-day grace window, de-duplicated", () => {
    const pool = [
      event(
        "ended-6d",
        "2026-07-20T10:00:00Z",
        new Date(NOW.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      ),
      event(
        "ended-8d",
        "2026-07-20T10:00:00Z",
        new Date(NOW.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      ),
      event("ongoing", "2026-07-01T00:00:00Z", "2026-08-15T00:00:00Z"),
    ];
    const recentlyEnded = getRecentlyEndedEvents(pool, NOW);
    expect(recentlyEnded.map((e) => e.id)).toEqual(["ended-6d"]);
  });
});

describe("getThisWeekEvents / getThisMonthEvents — full pipeline", () => {
  const pool: EventLike[] = [
    event("ongoing-long", "2026-07-01T00:00:00Z", "2026-08-15T00:00:00Z"),
    event(
      "ended-8d",
      "2026-07-20T10:00:00Z",
      new Date(NOW.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    ),
    event("future-sep", "2026-09-15T12:00:00Z"),
    event("dup-week", "2026-07-27T10:00:00Z", "2026-08-02T20:00:00Z"),
    event("dup-week", "2026-07-27T10:00:00Z", "2026-08-02T20:00:00Z"),
  ];

  it("This Week excludes ended-beyond-grace and future-month events, and de-duplicates", () => {
    const week = getThisWeekEvents(pool, NOW);
    const ids = week.map((e) => e.id);
    expect(ids).toContain("ongoing-long");
    expect(ids).toContain("dup-week");
    expect(ids).not.toContain("ended-8d");
    expect(ids).not.toContain("future-sep");
    expect(ids.filter((id) => id === "dup-week")).toHaveLength(1);
  });

  it("This Month excludes ended-beyond-grace and future events past month end", () => {
    const month = getThisMonthEvents(pool, NOW);
    const ids = month.map((e) => e.id);
    expect(ids).toContain("ongoing-long");
    expect(ids).not.toContain("ended-8d");
    expect(ids).not.toContain("future-sep");
  });
});

describe("timezone boundary integrity — Paris calendar day, not raw UTC instant", () => {
  it("2026-08-01 00:30 Europe/Paris (= 2026-07-31T22:30Z) counts as August, not July", () => {
    // NOW is itself exactly Paris midnight on Aug 1 (2026-07-31T22:00Z),
    // so the event 30min later is still eligible (hasn't ended yet) while
    // its start instant needs Paris-calendar conversion to land in August.
    const parisMidnight = new Date("2026-07-31T22:00:00Z");
    const e = event(
      "bug-repro",
      "2026-07-31T22:30:00Z",
      "2026-07-31T22:30:00Z",
    );
    expect(
      getParisMonthRange(parisMidnight).start.toISOString().slice(0, 10),
    ).toBe("2026-08-01");
    expect(isEventEligible(e, parisMidnight)).toBe(true);
    expect(isInThisMonth(e, parisMidnight)).toBe(true);
  });

  it("the same instant would wrongly land in July under naive UTC-midnight comparison", () => {
    // Regression guard: if NOW were still in July, a same-instant event
    // must NOT be considered "in July" just because its raw UTC instant
    // (Jul 31, 22:30Z) precedes July's naive UTC-midnight range end label.
    const stillJuly = new Date("2026-07-31T10:00:00Z"); // Paris: Jul 31, 12:00
    const e = event(
      "bug-repro-2",
      "2026-07-31T22:30:00Z",
      "2026-07-31T22:30:00Z",
    );
    expect(isInThisMonth(e, stillJuly)).toBe(false);
  });

  it("last nocturnal stretch of Aug 31 (23:30 Paris) still counts as August", () => {
    const e = event("aug31-late", "2026-08-31T21:30:00Z"); // Paris: Aug 31, 23:30
    expect(isInThisMonth(e, NOW)).toBe(true);
  });

  it("just past midnight into Sep 1 Paris time (from Aug 31 UTC) is excluded from August", () => {
    const e = event("sep1-early", "2026-08-31T22:30:00Z"); // Paris: Sep 1, 00:30
    expect(isInThisMonth(e, NOW)).toBe(false);
  });

  it("CET/CEST transition (2026-10-25): correctly resolves the Paris date right after fallback", () => {
    const afterFallback = new Date("2026-10-25T12:00:00Z"); // Paris: Oct 25, 13:00 (CET, +1h)
    const { start, end } = getParisMonthRange(afterFallback);
    expect(start.toISOString().slice(0, 10)).toBe("2026-10-01");
    expect(end.toISOString().slice(0, 10)).toBe("2026-10-31");

    // Event at 22:30 UTC on Oct 31 is 23:30 Paris (CET) — still October.
    const stillOct = event("oct31-cet", "2026-10-31T22:30:00Z");
    expect(isInThisMonth(stillOct, afterFallback)).toBe(true);

    // Event at 23:30 UTC on Oct 31 is 00:30 Paris on Nov 1 — excluded.
    const rollsToNov = event("nov1-cet", "2026-10-31T23:30:00Z");
    expect(isInThisMonth(rollsToNov, afterFallback)).toBe(false);
  });

  it("a week spanning the CET/CEST transition day correctly excludes the following Monday", () => {
    const beforeTransitionWeek = new Date("2026-10-22T10:00:00Z"); // Thu, still CEST
    const { start, end } = getParisWeekRange(beforeTransitionWeek);
    expect(start.toISOString().slice(0, 10)).toBe("2026-10-19");
    expect(end.toISOString().slice(0, 10)).toBe("2026-10-25"); // transition Sunday

    // 22:30 Paris on transition Sunday (already CET) — still this week.
    const sameWeek = event("sun-cet", "2026-10-25T21:30:00Z");
    expect(isInThisWeek(sameWeek, beforeTransitionWeek)).toBe(true);

    // 00:30 Paris the next day (Monday, CET) — the following week instead.
    const nextWeek = event("mon-cet", "2026-10-25T23:30:00Z");
    expect(isInThisWeek(nextWeek, beforeTransitionWeek)).toBe(false);
  });

  it("a week crossing a month boundary can include an event outside the active month", () => {
    // NOW = Monday 2026-08-31 (Paris, CEST): the active month is August,
    // but this week (Mon Aug31 – Sun Sep6) extends into September.
    const monthBoundaryWeek = new Date("2026-08-31T10:00:00Z");
    const { start, end } = getParisWeekRange(monthBoundaryWeek);
    expect(start.toISOString().slice(0, 10)).toBe("2026-08-31");
    expect(end.toISOString().slice(0, 10)).toBe("2026-09-06");

    const sepEvent = event("sep3", "2026-09-03T10:00:00Z"); // Paris: Sep 3, 12:00
    expect(isInThisWeek(sepEvent, monthBoundaryWeek)).toBe(true);
    expect(isInThisMonth(sepEvent, monthBoundaryWeek)).toBe(false); // not in August
  });
});

describe("getVisibleEvents — the exact set the JSON-LD ItemList must mirror", () => {
  it("equals the de-duplicated union of This Week and This Month, excluding events eligible-but-not-visible", () => {
    const pool: EventLike[] = [
      event("in-both", "2026-07-01T00:00:00Z", "2026-08-15T00:00:00Z"), // ongoing, overlaps week+month
      event("month-only", "2026-08-20T12:00:00Z"), // in August, not in this week
      event("far-future", "2026-11-12T10:00:00Z"), // eligible, but neither this week nor month
      event(
        "ended-8d",
        "2026-07-20T10:00:00Z",
        new Date(NOW.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      ),
    ];

    const visible = getVisibleEvents(pool, NOW);
    const eligible = getEligibleEvents(pool, NOW);
    const week = getThisWeekEvents(pool, NOW);
    const month = getThisMonthEvents(pool, NOW);
    const expectedVisibleIds = dedupeEventsById([...week, ...month]).map(
      (e) => e.id,
    );

    expect(visible.map((e) => e.id).sort()).toEqual(
      [...expectedVisibleIds].sort(),
    );
    expect(visible.map((e) => e.id)).toContain("in-both");
    expect(visible.map((e) => e.id)).toContain("month-only");
    // "far-future" is eligible (would appear on Home) but not visible on /events.
    expect(eligible.map((e) => e.id)).toContain("far-future");
    expect(visible.map((e) => e.id)).not.toContain("far-future");
    expect(visible.map((e) => e.id)).not.toContain("ended-8d");
  });

  it("against the real feed shape, the visible count for the schema is 4 at the fixed clock", () => {
    const pool: EventLike[] = [
      event("hilma", "2026-05-06T08:00:00Z", "2026-08-30T18:00:00Z"),
      event("leandro", "2026-06-02T10:00:00Z", "2026-09-06T20:00:00Z"),
      event("grandes-eaux", "2026-06-06T21:00:00Z", "2026-09-19T23:59:00Z"),
      event("paris-plages", "2026-07-04T11:00:00Z", "2026-08-30T22:00:00Z"),
      event("womenswear", "2026-09-28T09:00:00Z", "2026-10-06T21:00:00Z"),
      event("art-basel", "2026-10-20T09:00:00Z", "2026-10-25T19:00:00Z"),
      event("paris-photo", "2026-11-12T10:00:00Z", "2026-11-15T19:00:00Z"),
    ];
    expect(getVisibleEvents(pool, NOW)).toHaveLength(4);
    expect(getEligibleEvents(pool, NOW)).toHaveLength(7);
  });
});
