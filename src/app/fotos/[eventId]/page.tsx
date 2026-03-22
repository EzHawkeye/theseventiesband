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
    description: `Na het optreden: sfeerbeelden van “${album.eventTitle}”, ter plekke genomen — geen stockfoto’s.`,
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
          <p className="text-lg font-semibold uppercase tracking-wide text-terracotta md:text-xl">
            Na het optreden online
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold text-ink md:text-5xl">
            {album.eventTitle}
          </h1>
          <p className="mt-4 text-xl leading-relaxed text-ink-muted md:text-2xl">
            Dit album is bedoeld om <strong className="font-semibold text-ink">ná</strong>{" "}
            de avond beelden te tonen die we ter plekke gemaakt hebben — geen
            stockfoto’s en geen uitnodiging: puur wat er op het podium en in de
            zaal gebeurde.
          </p>
          {event ? (
            <div className="mt-6 space-y-3 rounded-2xl border-2 border-cream-dark bg-card/80 p-5 text-lg text-ink md:text-xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                Waar &amp; wanneer (dit optreden)
              </p>
              <p className="font-semibold text-olive">
                {dateFmt.format(new Date(event.date))} · {event.time}
              </p>
              <p className="text-ink-muted">{event.location}</p>
              <p className="border-t border-cream-dark pt-3 text-base text-ink-muted md:text-lg">
                De aankondigingstekst en tickets staan alleen bij{" "}
                <Link
                  href="/events"
                  className="font-semibold text-terracotta underline-offset-2 hover:underline"
                >
                  Optredens
                </Link>{" "}
                — hier houden we het bij de foto’s van deze avond.
              </p>
            </div>
          ) : (
            <p className="mt-6 text-xl text-ink-muted md:text-2xl">
              Foto’s genomen tijdens dit optreden.
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
