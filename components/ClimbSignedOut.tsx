import { Fragment } from "react";
import {
  getClimbById,
  getImagesForClimb,
  getVideosForClimb,
} from "@/lib/data-service";
import GradeChip from "./ui/GradeChip";
import TypeGlyph from "./ui/TypeGlyph";
import MonoChip from "./ui/MonoChip";
import TopoLine from "./ui/TopoLine";
import ClimbCarousel from "./ClimbCarousel";
import BetaVideo from "./BetaVideo";
import Reveal from "./anim/Reveal";
import DrawOn from "./anim/DrawOn";
import Link from "next/link";

type ClimbProps = {
  databaseId: string;
};

export default async function ClimbSignedOut({ databaseId }: ClimbProps) {
  const climb = await getClimbById(databaseId);
  const [images, videos] = await Promise.all([
    getImagesForClimb(climb.id),
    getVideosForClimb(climb.id),
  ]);

  const grade = climb.type === "boulder" ? `V${climb.grade}` : climb.grade;

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="px-4 md:px-14 pt-5 md:pt-6 max-w-7xl mx-auto">
        <Reveal x={-20} duration={0.6}>
          <div className="flex items-center gap-2 flex-wrap">
            <Link href="/database" className="inline-flex">
              <MonoChip className="text-slate-400 hover:text-ember transition-colors">
                DATABASE
              </MonoChip>
            </Link>
            <MonoChip className="text-chalk-3">/</MonoChip>
            <MonoChip className="text-slate-400">{climb.city}</MonoChip>
            <MonoChip className="text-chalk-3">/</MonoChip>
            <MonoChip className="text-slate-400">{climb.area}</MonoChip>
            {climb.subArea && (
              <>
                <MonoChip className="text-chalk-3">/</MonoChip>
                <MonoChip className="text-slate-400">{climb.subArea}</MonoChip>
              </>
            )}
            <MonoChip className="text-chalk-3">/</MonoChip>
            <MonoChip className="text-ember">{climb.name}</MonoChip>
          </div>
        </Reveal>
      </div>

      {/* Title block */}
      <section className="px-4 md:px-14 py-6 md:py-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-end gap-6">
          <div>
            <Reveal y={16} stagger={0.08} duration={0.55} className="mb-3.5">
              <div className="flex items-center gap-3.5">
                <GradeChip grade={grade} variant="outline" size="lg" />
                <div className="flex items-center gap-2 text-slate-700">
                  <TypeGlyph type={climb.type} size={14} />
                  <MonoChip className="text-slate-700 uppercase">
                    {climb.type}
                  </MonoChip>
                </div>
              </div>
            </Reveal>

            <Reveal className="overflow-hidden" y={100} duration={0.95}>
              <h1
                className="font-display uppercase font-bold text-granite-100 leading-[0.88] tracking-[0.005em] text-balance"
                style={{ fontSize: "clamp(44px, 7vw, 96px)" }}
              >
                {climb.name}
              </h1>
            </Reveal>

            <Reveal
              className="flex flex-wrap items-stretch gap-4 mt-4"
              y={12}
              stagger={0.06}
            >
              {[
                { label: "CITY", value: climb.city.toUpperCase() },
                { label: "AREA", value: climb.area.toUpperCase() },
                ...(climb.subArea
                  ? [{ label: "SECTOR", value: climb.subArea.toUpperCase() }]
                  : []),
              ].map((item, idx) => (
                <Fragment key={item.label}>
                  {idx > 0 && (
                    <div className="w-px self-stretch bg-chalk-3" aria-hidden />
                  )}
                  <div className="flex flex-col gap-1.5">
                    <MonoChip className="text-slate-400">{item.label}</MonoChip>
                    <span className="font-display uppercase font-semibold tracking-[0.03em] text-[clamp(16px,1.8vw,20px)] text-granite-100">
                      {item.value}
                    </span>
                  </div>
                </Fragment>
              ))}
            </Reveal>
          </div>

          <Reveal y={12} duration={0.55}>
            <Link
              href="/login"
              className="flex items-center gap-2 font-display uppercase text-[13px] font-semibold tracking-[0.06em] px-4 py-2.5 border border-chalk-3 rounded-sm hover:border-ember transition-colors"
            >
              Sign in to log sends
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Hero image + session stats */}
      <section className="px-4 md:px-14 max-w-7xl mx-auto">
        <Reveal
          className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6"
          y={30}
          duration={0.8}
        >
          {/* Image */}
          <div className="relative rounded-sm overflow-hidden bg-granite-200">
            <ClimbCarousel images={images} climbName={climb.name} />
          </div>

          {/* Stats card */}
          <div className="bg-granite-200 text-chalk p-6 rounded-sm">
            <MonoChip className="text-ember-soft mb-3.5 block">
              — SESSION LOG
            </MonoChip>
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[rgba(244,241,236,0.15)]">
              {[
                { label: "GRADE", value: grade },
                { label: "TYPE", value: climb.type.toUpperCase() },
                { label: "AREA", value: climb.area.toUpperCase() },
                ...(climb.subArea
                  ? [{ label: "SECTOR", value: climb.subArea.toUpperCase() }]
                  : []),
              ].map((stat) => (
                <div key={stat.label}>
                  <MonoChip className="text-[rgba(244,241,236,0.55)]">
                    {stat.label}
                  </MonoChip>
                  <div className="font-display text-[22px] mt-1 leading-none text-chalk">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <p className="text-[13px] leading-[1.55] text-[rgba(244,241,236,0.5)] font-body">
                Sign in to log your sends, save favorites, and add notes.
              </p>
              <Link
                href="/login"
                className="inline-block mt-3 font-display uppercase text-[12px] tracking-[0.06em] text-ember-soft hover:text-ember transition-colors"
              >
                Sign in →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Video section */}
      {videos.length > 0 && (
        <>
          <div className="px-4 md:px-14 max-w-7xl mx-auto my-8 text-[#CFC7B8]">
            <DrawOn duration={1.4} stagger={0.1}>
              <TopoLine seed={3} height={34} />
            </DrawOn>
          </div>
          <section className="px-4 md:px-14 max-w-7xl mx-auto">
            <MonoChip className="text-ember mb-3 block">— BETA VIDEO</MonoChip>
            <Reveal y={30} duration={0.8}>
              <BetaVideo videos={videos} posterSrc={images[0]?.url} />
            </Reveal>
          </section>
        </>
      )}

      <div className="pb-16 md:pb-24" />
    </div>
  );
}
