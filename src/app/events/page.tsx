import type { Metadata } from "next";
import Link from "next/link";
import { EventCard } from "@/components/EventCard";
import { getUpcomingEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Optredens",
  description:
    "Komende optredens van The Seventies Band: data, locaties en meer info per event.",
};

export default function EventsPage() {
  const upcoming = getUpcomingEvents();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <header className="max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">
          Optredens
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-ink-muted md:text-2xl">
          Hier vind je onze komende data. Nieuwe shows voeg je eenvoudig toe in{" "}
          <code className="rounded bg-cream-dark px-2 py-0.5 text-lg text-ink">
            src/data/events.json
          </code>
          — na opslaan verschijnen ze automatisch op de site.
        </p>
      </header>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {upcoming.length === 0 ? (
          <p className="text-xl text-ink-muted md:col-span-2">
            Er zijn momenteel geen komende optredens gelist. Check later opnieuw
            of{" "}
            <Link
              href="/contact"
              className="font-semibold text-terracotta underline-offset-2 hover:underline"
            >
              vraag een offerte
            </Link>{" "}
            voor je eigen event.
          </p>
        ) : (
          upcoming.map((event) => <EventCard key={event.id} event={event} />)
        )}
      </div>
    </div>
  );
}
