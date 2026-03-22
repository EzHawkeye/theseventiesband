import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { getPhotoAlbums } from "@/lib/content";

export const metadata: Metadata = {
  title: "Foto’s",
  description:
    "Fotogalerij van The Seventies Band, per optreden. Klik op een foto voor de lightbox.",
};

export default function PhotosPage() {
  const albums = getPhotoAlbums();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <header className="max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">
          Foto’s
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-ink-muted md:text-2xl">
          Foto’s zijn gegroepeerd per optreden. Voeg nieuwe albums toe in{" "}
          <code className="rounded bg-cream-dark px-2 py-0.5 text-lg text-ink">
            src/data/fotos.json
          </code>
          . Gebruik dezelfde{" "}
          <code className="rounded bg-cream-dark px-2 py-0.5 text-lg text-ink">
            eventId
          </code>{" "}
          als in{" "}
          <code className="rounded bg-cream-dark px-2 py-0.5 text-lg text-ink">
            events.json
          </code>{" "}
          om alles aan elkaar te koppelen.
        </p>
      </header>

      <div className="mt-14 space-y-16">
        {albums.map((album) => (
          <section
            key={album.eventId}
            id={album.eventId}
            className="scroll-mt-28"
            aria-labelledby={`album-${album.eventId}`}
          >
            <h2
              id={`album-${album.eventId}`}
              className="font-display text-3xl font-bold text-ink md:text-4xl"
            >
              {album.eventTitle}
            </h2>
            <div className="mt-8">
              <Gallery photos={album.photos} albumTitle={album.eventTitle} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
