import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildContactEmailHtml } from "@/lib/email/contact-html";

const SUBJECT = "Nieuwe boeking via website";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
  const CONTACT_TO_EMAIL =
    process.env.CONTACT_TO_EMAIL || "kennethcars@live.be";
  const RESEND_FROM_EMAIL =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "The Seventies Band <onboarding@resend.dev>";

  if (!RESEND_API_KEY) {
    return NextResponse.json(
      { ok: false, error: "Missing API key" },
      { status: 500 },
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

  const resend = new Resend(RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to: [CONTACT_TO_EMAIL],
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
