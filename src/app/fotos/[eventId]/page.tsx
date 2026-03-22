import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import {
  getAlbumByEventId,
  getEventById,
  getPhotoAlbums,
} from "@/lib/content";
import {
  albumSectionClass,
  albumSectionFallbackClass,
} from "../album-section-styles";

type Props = { params: Promise<{ eventId: string }> };

const dateFmt = new Intl.DateTimeFormat("nl-BE", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export async function generateStaticParams() {
  return getPhotoAlbums().map((a) => ({ eventId: a.eventId }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { eventId } = await params;
  const album = getAlbumByEventId(eventId);
  if (!album) return { title: "Album niet gevonden" };
  return {
    title: `Foto’s — ${album.eventTitle}`,
    description: `Fotogalerij: ${album.eventTitle}.`,
  };
}

export default async function AlbumPhotosPage({ params }: Props) {
  const { eventId } = await params;
  const album = getAlbumByEventId(eventId);
  if (!album) notFound();

  const event = getEventById(eventId);
  const sectionClass = [
    albumSectionClass[album.eventId] ?? albumSectionFallbackClass,
  ].join(" ");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <Link
        href="/fotos"
        className="inline-flex min-h-[3rem] items-center text-lg font-semibold text-terracotta transition hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard"
      >
        ← Alle foto-albums
      </Link>

      <article className={`mt-8 ${sectionClass}`}>
        <header className="max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">
            {album.eventTitle}
          </h1>
          {event ? (
            <div className="mt-4 space-y-2 text-xl text-ink-muted md:text-2xl">
              <p className="font-semibold text-olive">
                {dateFmt.format(new Date(event.date))} · {event.time}
              </p>
              <p>{event.location}</p>
              <p className="leading-relaxed">{event.shortDescription}</p>
              <p>
                <Link
                  href={`/events/${event.slug}`}
                  className="font-semibold text-terracotta underline-offset-2 hover:underline"
                >
                  Meer over dit optreden
                </Link>
              </p>
            </div>
          ) : (
            <p className="mt-4 text-xl text-ink-muted md:text-2xl">
              Foto’s van dit optreden.
            </p>
          )}
        </header>

        <div className="mt-10">
          <Gallery photos={album.photos} albumTitle={album.eventTitle} />
        </div>
      </article>
    </div>
  );
}
