import type { Metadata } from "next";
import { MemberCard } from "@/components/MemberCard";
import { getMembers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Bandleden",
  description:
    "Maak kennis met The Seventies Band: zang, gitaar, toetsen, bas en drums.",
};

export default function BandPage() {
  const members = getMembers();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <header className="max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">
          De band
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-ink-muted md:text-2xl">
          Vijf muzikanten, één missie: jou laten meezingen en dansen. Pas
          foto’s en teksten aan in{" "}
          <code className="rounded bg-cream-dark px-2 py-0.5 text-lg text-ink">
            src/data/bandleden.json
          </code>
          .
        </p>
      </header>

      <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <li key={member.id}>
            <MemberCard member={member} />
          </li>
        ))}
      </ul>
    </div>
  );
}
