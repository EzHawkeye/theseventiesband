import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact & boekingen",
  description:
    "Neem contact op met The Seventies Band voor boekingen, vragen en offertes.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <header>
          <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">
            Contact & boekingen
          </h1>
          <p className="mt-4 text-xl leading-relaxed text-ink-muted md:text-2xl">
            Wil je ons boeken voor een feest, bruiloft, bedrijfsevent of festival?
            Laat een bericht achter — we antwoorden zo snel mogelijk.
          </p>
          <Link
            href="/events"
            className="mt-8 inline-flex min-h-[3.5rem] items-center justify-center rounded-xl bg-terracotta px-8 text-xl font-semibold text-white shadow transition hover:bg-terracotta-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard"
          >
            Eerst onze agenda bekijken
          </Link>
        </header>

        <ContactForm />
      </div>
    </div>
  );
}
