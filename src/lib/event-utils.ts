import type { EventItem } from "@/types/content";

/** Optreden is afgelopen (datum vóór vandaag, op kalenderdag). */
export function isEventPast(event: Pick<EventItem, "date">): boolean {
  const eventDay = new Date(event.date);
  eventDay.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDay < today;
}
