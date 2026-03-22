"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Optredens" },
  { href: "/fotos", label: "Foto’s" },
  { href: "/band", label: "Band" },
  { href: "/contact", label: "Contact" },
];

function linkClass(active: boolean) {
  return [
    "rounded-xl px-4 py-3 text-lg font-semibold transition-colors duration-200 md:text-xl",
    "min-h-[3rem] inline-flex items-center justify-center",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard focus-visible:ring-offset-2",
    active
      ? "bg-terracotta text-white shadow-md"
      : "text-ink hover:bg-cream-dark hover:text-terracotta",
  ].join(" ");
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cream-dark/80 bg-cream/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-ink transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard focus-visible:ring-offset-2 md:text-2xl"
          onClick={() => setOpen(false)}
        >
          The Seventies Band
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Hoofdmenu"
        >
          {links.map(({ href, label }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);
            return (
              <Link key={href} href={href} className={linkClass(active)}>
                {label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex min-h-[3rem] min-w-[3rem] items-center justify-center rounded-xl border-2 border-ink/20 bg-card text-ink transition hover:border-terracotta hover:text-terracotta focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-cream-dark bg-cream px-4 pb-4 md:hidden"
          aria-label="Mobiel menu"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-2 pt-2">
            {links.map(({ href, label }) => {
              const active =
                href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={linkClass(active)}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
