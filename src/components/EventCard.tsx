import Image from "next/image";
import Link from "next/link";
import type { EventItem } from "@/types/content";

const dateFmt = new Intl.DateTimeFormat("nl-BE", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

type Props = {
  event: EventItem;
  imageSrc?: string;
  imageAlt?: string;
};

export function EventCard({
  event,
  imageSrc = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop",
  imageAlt = "Sfeerbeeld optreden",
}: Props) {
  const formatted = dateFmt.format(new Date(event.date));

  return (
    <article className="overflow-hidden rounded-2xl border-2 border-ink/10 bg-card shadow-md transition hover:-translate-y-0.5 hover:border-terracotta/40 hover:shadow-lg">
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
        <p className="absolute bottom-3 left-4 right-4 font-display text-2xl font-bold text-white drop-shadow md:text-3xl">
          {event.title}
        </p>
      </div>
      <div className="space-y-3 p-5 md:p-6">
        <p className="text-lg font-semibold text-olive md:text-xl">
          {formatted} · {event.time}
        </p>
        <p className="text-lg text-ink-muted md:text-xl">{event.location}</p>
        <p className="text-lg leading-relaxed text-ink md:text-xl">
          {event.shortDescription}
        </p>
        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex min-h-[3rem] items-center justify-center rounded-xl bg-terracotta px-6 text-lg font-semibold text-white shadow transition hover:bg-terracotta-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard focus-visible:ring-offset-2"
          >
            Meer info
          </Link>
          {event.ticketUrl ? (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[3rem] items-center justify-center rounded-xl border-2 border-terracotta bg-transparent px-6 text-lg font-semibold text-terracotta transition hover:bg-cream-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard focus-visible:ring-offset-2"
            >
              Tickets
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
