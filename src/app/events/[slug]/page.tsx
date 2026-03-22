import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventBySlug, getEvents } from "@/lib/content";
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

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <Link
        href="/events"
        className="inline-flex min-h-[3rem] items-center text-lg font-semibold text-terracotta transition hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard"
      >
        ← Terug naar alle optredens
      </Link>

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

      <div className="mt-8 space-y-6 text-xl leading-relaxed text-ink md:text-2xl">
        {event.fullDescription.split("\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
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
      </div>
    </article>
  );
}
