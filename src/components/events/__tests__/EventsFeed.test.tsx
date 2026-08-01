import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { EventsFeed } from "../EventsFeed";
import type { Event } from "@/types/events";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, opts?: { defaultValue?: string }) =>
      opts?.defaultValue ?? key,
    i18n: { language: "en" },
  }),
}));

function makeEvent(overrides: Partial<Event> & { id: string }): Event {
  return {
    startAt: new Date().toISOString(),
    title: { en: "Test Event", es: "", fr: "", pt: "" },
    description: { en: "Test description", es: "", fr: "", pt: "" },
    eventUrl: "https://example.com",
    sourceUrl: "https://example.com",
    sourceName: "Example",
    isFeatured: false,
    ...overrides,
  };
}

describe("EventsFeed — empty vs. recently-ended states", () => {
  it("shows the empty state when there are no current events and nothing recently ended", () => {
    const farExpired = new Date();
    farExpired.setDate(farExpired.getDate() - 30); // well past the 7-day grace

    render(
      <EventsFeed
        events={[
          makeEvent({
            id: "long-gone",
            startAt: farExpired.toISOString(),
            endAt: farExpired.toISOString(),
          }),
        ]}
        range="month"
      />,
    );

    expect(screen.getByText("events.noEvents")).toBeInTheDocument();
    expect(screen.queryByText(/Recently Ended/i)).not.toBeInTheDocument();
  });

  it("renders 'Recently Ended' — not the empty state — when there are zero current events but one within the 7-day grace", () => {
    const endedThreeDaysAgo = new Date();
    endedThreeDaysAgo.setDate(endedThreeDaysAgo.getDate() - 3);

    render(
      <EventsFeed
        events={[
          makeEvent({
            id: "ended-recently",
            title: { en: "Recently Finished Expo", es: "", fr: "", pt: "" },
            startAt: endedThreeDaysAgo.toISOString(),
            endAt: endedThreeDaysAgo.toISOString(),
          }),
        ]}
        range="month"
      />,
    );

    expect(screen.queryByText("events.noEvents")).not.toBeInTheDocument();
    expect(screen.getByText(/Recently Ended/i)).toBeInTheDocument();
    expect(screen.getByText("Recently Finished Expo")).toBeInTheDocument();
  });

  it("does not surface 'Recently Ended' on the 'week' instance, to avoid duplicating it with 'month'", () => {
    const endedThreeDaysAgo = new Date();
    endedThreeDaysAgo.setDate(endedThreeDaysAgo.getDate() - 3);

    render(
      <EventsFeed
        events={[
          makeEvent({
            id: "ended-recently",
            startAt: endedThreeDaysAgo.toISOString(),
            endAt: endedThreeDaysAgo.toISOString(),
          }),
        ]}
        range="week"
      />,
    );

    // Week has neither current nor "recently ended" content of its own —
    // it must fall back to the empty state rather than silently rendering
    // nothing.
    expect(screen.getByText("events.noEvents")).toBeInTheDocument();
  });
});
