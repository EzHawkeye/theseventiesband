import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAlbumByEventId,
  getEventBySlug,
  getEvents,
} from "@/lib/content";
import { isEventPast } from "@/lib/event-utils";
import { remoteImageProps } from "@/lib/remote-image";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getEvents().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Niet gevonden" };
  return {
    title: event.title,
    description: event.shortDescription,
  };
}

const dateFmt = new Intl.DateTimeFormat("nl-BE", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const formatted = dateFmt.format(new Date(event.date));
  const headerImageSrc =
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=675&fit=crop";
  const past = isEventPast(event);
  const photoAlbum = getAlbumByEventId(event.id);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <Link
        href="/events"
        className="inline-flex min-h-[3rem] items-center text-lg font-semibold text-terracotta transition hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard"
      >
        ← Terug naar alle optredens
      </Link>

      {past ? (
        <div className="mt-6 rounded-2xl border-2 border-olive/45 bg-olive/12 p-5 text-lg text-ink md:text-xl">
          <p className="font-display text-xl font-bold text-ink md:text-2xl">
            Dit optreden vond al plaats
          </p>
          <p className="mt-2 leading-relaxed text-ink-muted">
            Onderstaande tekst is de oorspronkelijke aankondiging (archief). Dit
            is geen uitnodiging om nog te komen — voor een volgende keer zie je
            onze{" "}
            <Link
              href="/events"
              className="font-semibold text-terracotta underline-offset-2 hover:underline"
            >
              komende optredens
            </Link>
            .
          </p>
        </div>
      ) : null}

      <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl border-2 border-ink/10 shadow-lg">
        <Image
          src={headerImageSrc}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 48rem"
          priority
          {...remoteImageProps(headerImageSrc)}
        />
      </div>

      <h1 className="mt-8 font-display text-4xl font-bold text-ink md:text-5xl">
        {event.title}
      </h1>
      <p className="mt-4 text-xl font-semibold text-olive md:text-2xl">
        {formatted} om {event.time}
      </p>
      <p className="mt-2 text-xl text-ink-muted md:text-2xl">
        {event.location}
      </p>

      {!past && photoAlbum ? (
        <p className="mt-6 rounded-xl border border-mustard/45 bg-mustard/15 px-4 py-4 text-lg leading-relaxed text-ink md:text-xl">
          <strong className="font-semibold text-ink">Foto’s horen bij ná de avond.</strong>{" "}
          De aankondiging hieronder is voor wie wil komen. Beelden van het
          optreden zelf verschijnen na afloop in het album onder{" "}
          <Link
            href={`/fotos/${event.id}`}
            className="font-semibold text-terracotta underline-offset-2 hover:underline"
          >
            Foto’s → {event.title}
          </Link>
          .
        </p>
      ) : null}

      {past ? (
        <div className="mt-8 rounded-2xl border-2 border-dashed border-ink/15 bg-cream-dark/40 p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
            Oorspronkelijke aankondiging (archief)
          </h2>
          <p className="mt-2 text-lg text-ink-muted md:text-xl">
            Dit was de tekst vóór het concert — niet meer geldig als uitnodiging.
          </p>
          <div className="mt-6 space-y-6 text-xl leading-relaxed text-ink md:text-2xl">
            {event.fullDescription.split("\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-6 text-xl leading-relaxed text-ink md:text-2xl">
          {event.fullDescription.split("\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        {past ? (
          <>
            {photoAlbum ? (
              <Link
                href={`/fotos/${event.id}`}
                className="inline-flex min-h-[3.5rem] items-center justify-center rounded-xl bg-terracotta px-8 text-xl font-semibold text-white shadow transition hover:bg-terracotta-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard"
              >
                Sfeerbeelden van deze avond
              </Link>
            ) : null}
            <Link
              href="/events"
              className="inline-flex min-h-[3.5rem] items-center justify-center rounded-xl border-2 border-terracotta bg-card px-8 text-xl font-semibold text-terracotta transition hover:bg-cream-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard"
            >
              Komende optredens
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-[3.5rem] items-center justify-center rounded-xl border-2 border-ink/15 bg-card px-8 text-xl font-semibold text-ink transition hover:bg-cream-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard"
            >
              Nieuwe boeking of vraag?
            </Link>
          </>
        ) : (
          <>
            {event.ticketUrl ? (
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3.5rem] items-center justify-center rounded-xl bg-terracotta px-8 text-xl font-semibold text-white shadow transition hover:bg-terracotta-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard"
              >
                Tickets of info
              </a>
            ) : null}
            <Link
              href="/contact"
              className="inline-flex min-h-[3.5rem] items-center justify-center rounded-xl border-2 border-terracotta bg-card px-8 text-xl font-semibold text-terracotta transition hover:bg-cream-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard"
            >
              Vragen over dit optreden?
            </Link>
          </>
        )}
      </div>
    </article>
  );
}
