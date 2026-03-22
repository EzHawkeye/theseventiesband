"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Track } from "@/types/content";

type Props = {
  tracks: Track[];
};

export function MusicPlayer({ tracks }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);

  const track = tracks[current];

  const togglePlay = useCallback(async () => {
    const el = audioRef.current;
    if (!el || !track) return;
    if (playing) {
      el.pause();
      setPlaying(false);
      return;
    }
    try {
      await el.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, [playing, track]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.pause();
    el.load();
    if (playing) {
      void el.play().catch(() => setPlaying(false));
    }
  }, [current]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onEnded = () => {
      setCurrent((i) => (i + 1) % tracks.length);
    };
    el.addEventListener("ended", onEnded);
    return () => el.removeEventListener("ended", onEnded);
  }, [tracks.length]);

  if (!track || tracks.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-ink/10 bg-card/95 shadow-[0_-8px_30px_rgba(44,36,28,0.12)] backdrop-blur-md">
      <audio ref={audioRef} src={track.src} preload="metadata" />

      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:gap-4 md:px-6">
        <div className="flex flex-1 items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            className="inline-flex min-h-[3rem] min-w-[3rem] shrink-0 items-center justify-center rounded-xl bg-terracotta text-xl font-bold text-white transition hover:bg-terracotta-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard"
            aria-pressed={playing}
            aria-label={playing ? "Pauzeren" : "Afspelen"}
          >
            {playing ? "❚❚" : "▶"}
          </button>
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-bold text-ink md:text-xl">
              {track.title}
            </p>
            <p className="truncate text-base text-ink-muted md:text-lg">
              {track.artist}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="min-h-[3rem] rounded-xl border-2 border-ink/15 px-4 text-base font-semibold text-ink transition hover:border-terracotta hover:text-terracotta focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard md:text-lg"
            aria-expanded={open}
          >
            {open ? "Verberg nummers" : "Kies nummer"}
          </button>
          <span className="text-sm text-ink-muted md:text-base">
            Demomuziek — vervang later door jullie eigen opnames
          </span>
        </div>
      </div>

      {open ? (
        <div className="border-t border-cream-dark bg-cream-dark/50 px-4 py-3 md:px-6">
          <ul className="mx-auto flex max-w-6xl flex-col gap-2">
            {tracks.map((t, i) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => {
                    setCurrent(i);
                    setPlaying(true);
                  }}
                  className={[
                    "w-full rounded-xl px-4 py-3 text-left text-lg transition",
                    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard",
                    i === current
                      ? "bg-terracotta font-semibold text-white"
                      : "bg-card text-ink hover:bg-cream",
                  ].join(" ")}
                >
                  {t.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
