import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">
        Pagina niet gevonden
      </h1>
      <p className="mt-4 text-xl text-ink-muted">
        Deze link bestaat niet (meer). Ga terug naar de homepage of kies een
        onderdeel in het menu.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex min-h-[3.5rem] items-center justify-center rounded-xl bg-terracotta px-8 text-xl font-semibold text-white transition hover:bg-terracotta-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard"
      >
        Naar home
      </Link>
    </div>
  );
}
