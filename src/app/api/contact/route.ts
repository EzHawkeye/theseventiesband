import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildContactEmailHtml } from "@/lib/email/contact-html";

const SUBJECT = "Nieuwe boeking via website";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.error("Missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return NextResponse.json(
      {
        ok: false,
        error:
          "E-mail is niet geconfigureerd. Controleer de omgevingsvariabelen op de server.",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ongeldige aanvraag." },
      { status: 400 },
    );
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("name" in body) ||
    !("email" in body) ||
    !("message" in body)
  ) {
    return NextResponse.json(
      { ok: false, error: "Ontbrekende velden." },
      { status: 400 },
    );
  }

  const name = String((body as { name: unknown }).name ?? "").trim();
  const email = String((body as { email: unknown }).email ?? "").trim();
  const message = String((body as { message: unknown }).message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Vul naam, e-mail en bericht in." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Ongeldig e-mailadres." },
      { status: 400 },
    );
  }

  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "The New Seventies Band <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: SUBJECT,
    html: buildContactEmailHtml({ name, email, message }),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { ok: false, error: "Verzenden mislukt. Probeer later opnieuw." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: data?.id ?? null });
}
