import Link from "next/link";
import MonoChip from "@/components/ui/MonoChip";
import GradeChip from "@/components/ui/GradeChip";
import Reveal from "@/components/anim/Reveal";
import type { ResolvedMilestone } from "@/lib/milestones";

type MilestonesStripProps = {
  milestones: ResolvedMilestone[];
};

export default function MilestonesStrip({ milestones }: MilestonesStripProps) {
  if (milestones.length === 0) return null;

  return (
    <section className="bg-chalk-2">
      <div className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-14 md:pb-24">
        <MonoChip className="mb-5 block text-ember">
          — FIRSTS & FAVOURITES
        </MonoChip>
        <Reveal
          y={28}
          stagger={0.08}
          duration={0.6}
          className="grid grid-cols-2 gap-3.5 md:grid-cols-3 lg:grid-cols-5"
        >
          {milestones.map((m) => (
            <Link
              key={`${m.tag}-${m.id}`}
              href={`/database/${m.id}-${m.slug}`}
              className="group flex min-h-30 flex-col rounded-sm border border-chalk-3 bg-chalk p-4 transition-colors hover:border-ember"
            >
              <div className="flex items-start justify-between gap-2">
                <MonoChip className="text-slate-500">{m.tag}</MonoChip>
                <GradeChip
                  grade={m.gradeLabel}
                  variant={m.sent ? "solid" : "outline"}
                />
              </div>
              <h3 className="mt-3 font-display text-[18px] font-bold uppercase leading-[1.05] text-granite-100 transition-colors group-hover:text-ember">
                {m.name}
              </h3>
              <MonoChip className="mt-auto block pt-3 capitalize text-slate-500">
                {m.area} · {m.city}
              </MonoChip>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
