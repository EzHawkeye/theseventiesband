import Image from "next/image";
import Link from "next/link";
import { AlbumLinkCard } from "@/components/AlbumLinkCard";
import { EventCard } from "@/components/EventCard";
import { getPhotoAlbums, getUpcomingEvents } from "@/lib/content";

export default function HomePage() {
  const upcoming = getUpcomingEvents().slice(0, 3);
  const albums = getPhotoAlbums().slice(0, 3);

  return (
    <div>
      <section className="relative border-b border-cream-dark bg-retro-grid">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 md:flex-row md:items-center md:gap-12 md:px-6 md:py-24">
          <div className="flex-1 space-y-6">
            {/* Mobiel: logo direct naast titel, meteen zichtbaar */}
            <div className="flex animate-fade-up items-start gap-4 md:hidden">
              <div className="animate-float-soft relative h-28 w-32 shrink-0 overflow-hidden rounded-2xl border-2 border-white bg-card shadow-lg">
                <Image
                  src="/images/logo.png"
                  alt="The New Seventies Band — logo"
                  fill
                  className="object-contain object-center p-1.5"
                  sizes="128px"
                  priority
                />
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="inline-block rounded-full bg-mustard/90 px-3 py-1.5 text-base font-semibold text-ink shadow-sm">
                  Live · jaren 70
                </p>
                <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                  The Seventies Band
                </h1>
              </div>
            </div>

            {/* Desktop: badge + grote titel */}
            <div className="hidden animate-fade-up space-y-6 md:block">
              <p className="inline-block rounded-full bg-mustard/90 px-4 py-2 text-lg font-semibold text-ink shadow-sm">
                Live · jaren 70
              </p>
              <h1 className="font-display text-4xl font-bold leading-tight text-ink md:text-5xl lg:text-6xl">
                The Seventies Band
              </h1>
            </div>

            <p className="animate-fade-up-delay text-2xl font-semibold text-terracotta md:text-3xl">
              Jouw feest klinkt als een mixtape vol herinneringen
            </p>
            <p className="animate-fade-up-delay max-w-xl text-xl leading-relaxed text-ink-muted md:text-2xl">
              Wij brengen de grootste hits uit de jaren 70 naar het podium —
              warm, herkenbaar en dansbaar. Ideaal voor parken, zalen,
              dorpsfeesten en bedrijfsfeesten.
            </p>
            <div className="animate-fade-up-delay-2 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href="/events"
                className="inline-flex min-h-[3.5rem] items-center justify-center rounded-xl bg-terracotta px-8 text-xl font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:bg-terracotta-hover hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard focus-visible:ring-offset-2"
              >
                Bekijk optredens
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-[3.5rem] items-center justify-center rounded-xl border-2 border-terracotta bg-card px-8 text-xl font-semibold text-terracotta transition duration-300 hover:scale-[1.02] hover:bg-cream-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard focus-visible:ring-offset-2"
              >
                Boek ons
              </Link>
            </div>
          </div>

          <div className="animate-fade-up-delay relative hidden aspect-[2/1] w-full flex-1 overflow-hidden rounded-3xl border-4 border-white bg-cream-dark/80 shadow-2xl md:block">
            <Image
              src="/images/logo.png"
              alt="The New Seventies Band — logo met discoballen"
              fill
              className="object-contain object-center p-2 md:p-3"
              sizes="(max-width: 1024px) 400px, 45vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-section-warm mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
          Komende optredens
        </h2>
        <p className="mt-3 max-w-2xl text-xl text-ink-muted">
          Een selectie van onze eerstvolgende data. Het volledige overzicht
          staat op de optredens-pagina.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.length === 0 ? (
            <p className="text-xl text-ink-muted">
              Er staan nog geen komende optredens in de agenda. Neem contact op
              voor een privé-boeking.
            </p>
          ) : (
            upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </div>
        <div className="mt-10">
          <Link
            href="/events"
            className="inline-flex min-h-[3rem] items-center justify-center rounded-xl bg-olive px-6 text-lg font-semibold text-white transition duration-300 hover:scale-[1.02] hover:opacity-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard"
          >
            Alle optredens bekijken
          </Link>
        </div>
      </section>

      <section className="border-y border-cream-dark bg-section-groove py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
            Foto’s van het podium
          </h2>
          <p className="mt-3 max-w-2xl text-xl text-ink-muted">
            Na elke avond plaatsen we hier echte sfeerbeelden van het optreden —
            geen stock. Open een album om te zien hoe het was (voor data waar
            je bij kunt zijn, zie Optredens).
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <li key={album.eventId}>
                <AlbumLinkCard album={album} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
