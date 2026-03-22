import type { Metadata } from "next";
import { Fraunces, Lexend } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const body = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Seventies Band | Live covers uit de jaren 70",
    template: "%s | The Seventies Band",
  },
  description:
    "Coverband met live muziek uit de jaren 70. Optredens, echte sfeerfoto’s van de avonden zelf (geen stock), band en boekingen — overzichtelijk en warm in retrostijl.",
  keywords: [
    "coverband",
    "jaren 70",
    "live muziek",
    "Vlaanderen",
    "feest",
    "optreden",
  ],
  openGraph: {
    title: "The Seventies Band",
    description:
      "Live covers uit de jaren 70. Boek ons voor jouw feest of event.",
    type: "website",
    locale: "nl_BE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${display.variable} ${body.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <Navbar />
        <main className="relative flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
