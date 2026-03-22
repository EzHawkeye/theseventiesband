import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildContactEmailHtml } from "@/lib/email/contact-html";

const SUBJECT = "Nieuwe boeking via website";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Resend geeft Engelse messages; we maken er bruikbare NL-hints van. */
function resendErrorHint(message: string | undefined): string {
  const m = (message ?? "").toLowerCase();
  if (
    m.includes("only send") ||
    m.includes("testing emails") ||
    m.includes("your own email")
  ) {
    return "Resend (testmodus): met onboarding@resend.dev mag je meestal alleen mailen naar het e-mailadres van je eigen Resend-account. Zet CONTACT_TO_EMAIL in .env.local op dat adres, of verifieer een eigen domein bij Resend en gebruik RESEND_FROM_EMAIL daarvan.";
  }
  if (
    m.includes("api key") ||
    m.includes("unauthorized") ||
    m.includes("invalid key")
  ) {
    return "Resend weigert de aanvraag: controleer of RESEND_API_KEY in .env.local klopt en opnieuw is gestart na wijziging (geen spaties voor/na de key).";
  }
  if (m.includes("from") && (m.includes("invalid") || m.includes("verify"))) {
    return "Het afzenderadres wordt geweigerd. Gebruik tijdelijk RESEND_FROM_EMAIL=The Seventies Band <onboarding@resend.dev> of verifieer je domein in Resend.";
  }
  if (m.includes("domain") && m.includes("verify")) {
    return "Verifieer je domein in het Resend-dashboard of gebruik het test-afzenderadres onboarding@resend.dev.";
  }
  return `Verzenden mislukt (${message || "onbekende fout"}). Kijk in de terminal/serverlogs voor details, of controleer Resend-dashboard en .env.local.`;
}

export async function POST(request: Request) {
  const RESEND_API_KEY = (process.env.RESEND_API_KEY ?? "").trim();
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
    console.error("Resend error:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      {
        ok: false,
        error: resendErrorHint(
          typeof error === "object" && error !== null && "message" in error
            ? String((error as { message: unknown }).message)
            : undefined,
        ),
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: data?.id ?? null });
}
