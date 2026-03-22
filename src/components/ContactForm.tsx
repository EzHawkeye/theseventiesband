"use client";

import { type FormEvent, useState } from "react";

type Feedback =
  | { kind: "idle" }
  | { kind: "validation"; message: string }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>({ kind: "idle" });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setFeedback({
        kind: "validation",
        message: "Vul alle velden in om te verzenden.",
      });
      return;
    }

    setFeedback({ kind: "idle" });
    setPending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const payload = (await res.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!res.ok || !payload.ok) {
        setFeedback({
          kind: "error",
          message:
            payload.error ??
            "Verzenden mislukt. Controleer je internetverbinding en probeer opnieuw.",
        });
        return;
      }

      setFeedback({
        kind: "success",
        message:
          "Bedankt! Je bericht is verstuurd. We nemen zo snel mogelijk contact met je op.",
      });
      form.reset();
    } catch {
      setFeedback({
        kind: "error",
        message:
          "Er ging iets mis bij het verzenden. Probeer het later nog eens.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border-2 border-ink/10 bg-card p-6 shadow-md md:p-8"
      noValidate
    >
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-lg font-semibold text-ink"
        >
          Naam
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          disabled={pending}
          className="w-full rounded-xl border-2 border-ink/15 bg-cream px-4 py-3 text-lg text-ink transition focus:border-terracotta focus:outline-none focus:ring-4 focus:ring-mustard/50 disabled:cursor-not-allowed disabled:opacity-60"
          placeholder="Jouw naam"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-lg font-semibold text-ink"
        >
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={pending}
          className="w-full rounded-xl border-2 border-ink/15 bg-cream px-4 py-3 text-lg text-ink transition focus:border-terracotta focus:outline-none focus:ring-4 focus:ring-mustard/50 disabled:cursor-not-allowed disabled:opacity-60"
          placeholder="naam@voorbeeld.be"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-lg font-semibold text-ink"
        >
          Bericht
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          disabled={pending}
          className="w-full resize-y rounded-xl border-2 border-ink/15 bg-cream px-4 py-3 text-lg text-ink transition focus:border-terracotta focus:outline-none focus:ring-4 focus:ring-mustard/50 disabled:cursor-not-allowed disabled:opacity-60"
          placeholder="Vertel kort over je feest of event, datum en locatie…"
        />
      </div>

      {feedback.kind === "validation" ? (
        <p className="rounded-xl bg-terracotta/10 px-4 py-3 text-lg text-terracotta">
          {feedback.message}
        </p>
      ) : null}

      {feedback.kind === "error" ? (
        <p className="rounded-xl bg-terracotta/10 px-4 py-3 text-lg text-terracotta">
          {feedback.message}
        </p>
      ) : null}

      {feedback.kind === "success" ? (
        <p className="rounded-xl bg-olive/15 px-4 py-3 text-lg text-olive">
          {feedback.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-[3.5rem] w-full items-center justify-center rounded-xl bg-terracotta px-6 text-xl font-semibold text-white shadow transition hover:bg-terracotta-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {pending ? "Bezig met verzenden…" : "Verstuur bericht"}
      </button>
    </form>
  );
}
