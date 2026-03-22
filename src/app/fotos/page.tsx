import type { Metadata } from "next";
import { AlbumLinkCard } from "@/components/AlbumLinkCard";
import { getPhotoAlbums } from "@/lib/content";

export const metadata: Metadata = {
  title: "Foto’s",
  description:
    "Albums om ná elk optreden sfeerbeelden te tonen — ter plekke genomen, geen stock. Per avond een apart album.",
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
          Elk album is bedoeld om <strong className="font-semibold text-ink">ná</strong>{" "}
          het optreden sfeerbeelden te tonen — niet als uitnodiging, maar als
          impressie van wat er gebeurde. Kies een avond om het album te openen.
          Nieuwe albums voeg je toe in{" "}
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
