"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { remoteImageProps } from "@/lib/remote-image";
import type { GalleryPhoto } from "@/types/content";

type Props = {
  photos: GalleryPhoto[];
  albumTitle: string;
};

export function Gallery({ photos, albumTitle }: Props) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);

  const showPrev = useCallback(() => {
    setIndex((i) => {
      if (i === null || photos.length === 0) return i;
      return (i - 1 + photos.length) % photos.length;
    });
  }, [photos.length]);

  const showNext = useCallback(() => {
    setIndex((i) => {
      if (i === null || photos.length === 0) return i;
      return (i + 1) % photos.length;
    });
  }, [photos.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, showPrev, showNext]);

  if (photos.length === 0) {
    return (
      <p className="text-lg text-ink-muted">
        Nog geen foto’s voor dit optreden.
      </p>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, i) => (
          <li key={`${photo.src}-${i}`}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 border-transparent bg-cream-dark text-left shadow transition hover:border-terracotta hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                {...remoteImageProps(photo.src)}
              />
              <span className="sr-only">
                Vergroot foto {i + 1} van {albumTitle}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {index !== null ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Foto uit ${albumTitle}`}
          onClick={close}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              className="absolute -right-1 -top-12 min-h-[3rem] rounded-xl bg-card px-4 text-lg font-semibold text-ink shadow transition hover:bg-terracotta hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard md:right-0 md:top-0 md:min-h-[2.75rem]"
            >
              Sluiten
            </button>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black shadow-2xl md:aspect-video">
              <Image
                src={photos[index].src}
                alt={photos[index].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                {...remoteImageProps(photos[index].src)}
              />
            </div>
            <p className="mt-3 text-center text-lg text-cream">
              {photos[index].alt}
            </p>
            {photos.length > 1 ? (
              <div className="mt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={showPrev}
                  className="min-h-[3rem] min-w-[3rem] rounded-xl bg-card px-4 text-lg font-semibold text-ink transition hover:bg-mustard focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard"
                >
                  ← Vorige
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="min-h-[3rem] min-w-[3rem] rounded-xl bg-card px-4 text-lg font-semibold text-ink transition hover:bg-mustard focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard"
                >
                  Volgende →
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
