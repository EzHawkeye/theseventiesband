/**
 * Per-event achtergrond op de foto’s-pagina.
 * Terug naar één uniforme stijl: zie BACKGROUND_REVERT.md in deze map.
 */
export const albumSectionClass: Record<string, string> = {
  "zomerpark-2025":
    "rounded-3xl border-2 border-mustard/35 bg-mustard/15 px-5 py-8 shadow-sm md:px-8 md:py-10",
  "retro-night-2025":
    "rounded-3xl border-2 border-plum/35 bg-plum/12 px-5 py-8 shadow-sm md:px-8 md:py-10",
  "dorpsfeest-2025":
    "rounded-3xl border-2 border-olive/40 bg-olive/12 px-5 py-8 shadow-sm md:px-8 md:py-10",
};

export const albumSectionFallbackClass =
  "rounded-3xl border-2 border-cream-dark bg-cream-dark/50 px-5 py-8 shadow-sm md:px-8 md:py-10";
