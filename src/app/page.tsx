import Image from "next/image";
import Link from "next/link";
import { EventCard } from "@/components/EventCard";
import { getPhotoAlbums, getUpcomingEvents } from "@/lib/content";

export default function HomePage() {
  const upcoming = getUpcomingEvents().slice(0, 3);
  const albums = getPhotoAlbums().slice(0, 3);

  return (
    <div>
      <section className="bg-retro-grid border-b border-cream-dark">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:gap-12 md:px-6 md:py-24">
          <div className="flex-1 space-y-6">
            <p className="inline-block rounded-full bg-mustard/90 px-4 py-2 text-lg font-semibold text-ink shadow-sm">
              Live · jaren 70
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight text-ink md:text-5xl lg:text-6xl">
              The Seventies Band
            </h1>
            <p className="text-2xl font-semibold text-terracotta md:text-3xl">
              Jouw feest klinkt als een mixtape vol herinneringen
            </p>
            <p className="max-w-xl text-xl leading-relaxed text-ink-muted md:text-2xl">
              Wij brengen de grootste hits uit de jaren 70 naar het podium —
              warm, herkenbaar en dansbaar. Ideaal voor parken, zalen,
              dorpsfeesten en bedrijfsfeesten.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href="/events"
                className="inline-flex min-h-[3.5rem] items-center justify-center rounded-xl bg-terracotta px-8 text-xl font-semibold text-white shadow-lg transition hover:bg-terracotta-hover hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard focus-visible:ring-offset-2"
              >
                Bekijk optredens
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-[3.5rem] items-center justify-center rounded-xl border-2 border-terracotta bg-card px-8 text-xl font-semibold text-terracotta transition hover:bg-cream-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard focus-visible:ring-offset-2"
              >
                Boek ons
              </Link>
            </div>
          </div>
          <div className="relative aspect-[16/9] w-full flex-1 overflow-hidden rounded-3xl border-4 border-white bg-cream-dark/80 shadow-2xl md:aspect-[2/1]">
            <Image
              src="/images/logo.png"
              alt="The New Seventies Band — logo met discoballen"
              fill
              className="object-contain object-center p-2 md:p-3"
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
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
            className="inline-flex min-h-[3rem] items-center justify-center rounded-xl bg-olive px-6 text-lg font-semibold text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard"
          >
            Alle optredens bekijken
          </Link>
        </div>
      </section>

      <section className="border-y border-cream-dark bg-cream-dark/40 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
            Foto’s van het podium
          </h2>
          <p className="mt-3 max-w-2xl text-xl text-ink-muted">
            Sfeerbeelden per optreden. Klik op een foto om het volledige album
            te bekijken.
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <li key={album.eventId}>
                <Link
                  href="/fotos"
                  className="group block overflow-hidden rounded-2xl border-2 border-transparent bg-card shadow-md transition hover:border-terracotta hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={album.coverImage}
                      alt={album.eventTitle}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-display text-xl font-bold text-ink group-hover:text-terracotta md:text-2xl">
                      {album.eventTitle}
                    </p>
                    <p className="mt-1 text-lg text-terracotta">
                      Bekijk album →
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
