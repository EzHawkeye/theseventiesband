import Image from "next/image";
import type { BandMember } from "@/types/content";

type Props = {
  member: BandMember;
};

export function MemberCard({ member }: Props) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border-2 border-ink/10 bg-card shadow-md transition hover:-rotate-1 hover:border-mustard/60 hover:shadow-xl md:hover:rotate-1">
      <div className="relative aspect-square w-full bg-cream-dark">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5 md:p-6">
        <h3 className="font-display text-2xl font-bold text-ink md:text-3xl">
          {member.name}
        </h3>
        <p className="text-lg font-semibold text-terracotta md:text-xl">
          {member.instrument}
        </p>
        <p className="text-lg leading-relaxed text-ink-muted md:text-xl">
          {member.bio}
        </p>
      </div>
    </article>
  );
}
