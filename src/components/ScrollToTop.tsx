"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-4 z-50 flex min-h-[3.5rem] min-w-[3.5rem] items-center justify-center rounded-full border-2 border-ink/15 bg-mustard text-2xl font-bold text-ink shadow-lg transition hover:scale-105 hover:border-terracotta focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard md:bottom-8 md:right-6"
      aria-label="Terug naar boven"
    >
      ↑
    </button>
  );
}
