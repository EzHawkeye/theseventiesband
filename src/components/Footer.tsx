import Link from "next/link";

const social = [
  { label: "Facebook", href: "https://www.facebook.com", icon: "f" },
  { label: "Instagram", href: "https://www.instagram.com", icon: "◎" },
  { label: "YouTube", href: "https://www.youtube.com", icon: "▶" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-cream-dark bg-olive/15">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:items-start md:justify-between md:px-6">
        <div className="max-w-md">
          <p className="font-display text-2xl font-bold text-ink">
            The Seventies Band
          </p>
          <p className="mt-2 text-ink-muted">
            Live covers uit de jaren 70. Voor feesten, parken, zalen
            en bedrijfsfeesten in Vlaanderen en daarbuiten.
          </p>
        </div>

        <div>
          <p className="text-lg font-semibold text-ink">Snel naar</p>
          <ul className="mt-3 flex flex-col gap-2 text-lg">
            <li>
              <Link
                href="/events"
                className="text-terracotta underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard"
              >
                Optredens
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-terracotta underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard"
              >
                Boek ons
              </Link>
            </li>
            <li>
              <Link
                href="/fotos"
                className="text-terracotta underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard"
              >
                Foto’s
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-lg font-semibold text-ink">Volg ons</p>
          <ul className="mt-3 flex flex-wrap gap-3">
            {social.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[3rem] min-w-[3rem] items-center justify-center rounded-xl border-2 border-ink/15 bg-card px-5 text-xl font-bold text-ink transition hover:border-terracotta hover:bg-cream-dark hover:text-terracotta focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard"
                >
                  <span className="sr-only">{s.label}</span>
                  <span aria-hidden>{s.icon}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-dark/80 bg-cream-dark/40 py-4 text-center text-base text-ink-muted">
        © {new Date().getFullYear()} The Seventies Band. Alle rechten
        voorbehouden.
      </div>
    </footer>
  );
}
