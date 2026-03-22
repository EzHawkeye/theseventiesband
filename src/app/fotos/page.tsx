import type { Metadata } from "next";
import { AlbumLinkCard } from "@/components/AlbumLinkCard";
import { getPhotoAlbums } from "@/lib/content";

export const metadata: Metadata = {
  title: "Foto’s",
  description:
    "Fotogalerij van The Seventies Band, per optreden. Open een album om alle foto’s te zien.",
};

export default function PhotosIndexPage() {
  const albums = getPhotoAlbums();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <header className="max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">
          Foto’s
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-ink-muted md:text-2xl">
          Kies een optreden om alleen die foto’s te bekijken. Nieuwe albums voeg
          je toe in{" "}
          <code className="rounded bg-cream-dark px-2 py-0.5 text-lg text-ink">
            src/data/fotos.json
          </code>
          ; gebruik dezelfde{" "}
          <code className="rounded bg-cream-dark px-2 py-0.5 text-lg text-ink">
            eventId
          </code>{" "}
          als in{" "}
          <code className="rounded bg-cream-dark px-2 py-0.5 text-lg text-ink">
            events.json
          </code>
          .
        </p>
      </header>

      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((album) => (
          <li key={album.eventId}>
            <AlbumLinkCard album={album} />
          </li>
        ))}
      </ul>
    </div>
  );
}
