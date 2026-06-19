import { Fragment } from "react";
import {
  getClimbById,
  getClimbs,
  getFavoritesForUser,
  getImagesForClimb,
  getNotesForClimb,
  getSendsForUser,
  getVideosForClimb,
} from "@/lib/data-service";
import TickBox from "./TickBox";
import FavoriteIcon from "./FavoriteIcon";
import { SquarePen } from "lucide-react";
import Notes from "./Notes";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import DeleteClimb from "./DeleteClimb";
import GradeChip from "./ui/GradeChip";
import TypeGlyph from "./ui/TypeGlyph";
import MonoChip from "./ui/MonoChip";
import TopoLine from "./ui/TopoLine";
import ClimbCarousel from "./ClimbCarousel";
import BetaVideo from "./BetaVideo";
import Reveal from "./anim/Reveal";
import DrawOn from "./anim/DrawOn";

type ClimbProps = {
  databaseId: string;
  isAdmin?: boolean;
};

function formatDate(dateString: string) {
  const d = new Date(dateString);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default async function Climb({ databaseId, isAdmin }: ClimbProps) {
  const climb = await getClimbById(databaseId);
  // Independent of each other — fetch in parallel so the render waits on the
  // single slowest call (~10s) instead of the sum of all of them (~18s).
  const [images, videos, sends, notes, favorites, allClimbs] =
    await Promise.all([
      getImagesForClimb(climb.id),
      getVideosForClimb(climb.id),
      getSendsForUser(),
      getNotesForClimb(climb.id),
      getFavoritesForUser(),
      getClimbs(),
    ]);

  const isSent = sends.some((s) => s.climb_id === climb.id);
  const isFavorited = favorites.some((f) => f.climb_id === climb.id);
  const sendDate = sends.find((s) => s.climb_id === climb.id)?.created_at;

  const siblingClimbs = allClimbs
    .filter((c) => c.area === climb.area && c.id !== climb.id)
    .slice(0, 3);

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
                <GradeChip
                  grade={grade}
                  variant={isSent ? "ember" : "outline"}
                  size="lg"
                />
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

            {/* Coord strip */}
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

          <Reveal
            className="flex items-center gap-2 flex-wrap"
            y={12}
            stagger={0.08}
            duration={0.55}
          >
            {!isAdmin && (
              <>
                <div
                  className={`flex items-center gap-2 font-display uppercase text-[13px] font-semibold tracking-[0.06em] px-4 py-2.5 border rounded-sm transition-colors hover:border-ember ${
                    isSent
                      ? "bg-ember text-chalk border-ember"
                      : "bg-transparent text-granite-100 border-chalk-3"
                  }`}
                >
                  <TickBox climbId={climb.id} sends={sends} size={4} />
                  <span>{isSent ? "Sent" : "Log Send"}</span>
                </div>
                <div
                  className={`flex items-center gap-2 font-display uppercase text-[13px] font-semibold tracking-[0.06em] px-4 py-2.5 border rounded-sm transition-colors hover:border-ember ${
                    isFavorited
                      ? "bg-granite-100 text-chalk border-granite-100"
                      : "bg-transparent text-granite-100 border-chalk-3"
                  }`}
                >
                  <FavoriteIcon climbId={climb.id} favorites={favorites} />
                  <span>Save</span>
                </div>
              </>
            )}
            {isAdmin && (
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/admin/edit-climb/${climb.id}-${climb.slug}`}
                      className="flex items-center gap-2 font-display uppercase text-[13px] font-semibold tracking-[0.06em] px-4 py-2.5 border border-chalk-3 rounded-sm hover:border-ember transition-colors"
                    >
                      <SquarePen className="w-4 h-4" />
                      Edit
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Edit {climb.name}</TooltipContent>
                </Tooltip>
                <DeleteClimb climb={climb} size={4} />
              </div>
            )}
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

          {/* Session stats card */}
          <div className="bg-granite-200 text-chalk p-6 rounded-sm">
            <MonoChip className="text-ember-soft mb-3.5 block">
              — SESSION LOG
            </MonoChip>
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[rgba(244,241,236,0.15)]">
              {[
                { label: "GRADE", value: grade, ember: false },
                {
                  label: "SENT",
                  value: isSent && sendDate ? formatDate(sendDate) : "—",
                  ember: isSent,
                },
                { label: "AREA", value: climb.area.toUpperCase(), ember: false },
                { label: "TYPE", value: climb.type.toUpperCase(), ember: false },
              ].map((stat) => (
                <div key={stat.label}>
                  <MonoChip className="text-[rgba(244,241,236,0.55)]">
                    {stat.label}
                  </MonoChip>
                  <div
                    className={`font-display text-[22px] mt-1 leading-none ${stat.ember ? "text-ember-soft" : "text-chalk"}`}
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {notes.length > 0 && (
              <div className="pt-4">
                <MonoChip className="text-[rgba(244,241,236,0.55)] mb-2.5 block">
                  NOTES
                </MonoChip>
                <p className="text-[13px] leading-[1.55] text-[rgba(244,241,236,0.78)] font-body line-clamp-4">
                  {notes[0].note}
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      {/* Topo divider */}
      <div className="px-4 md:px-14 max-w-7xl mx-auto my-8 text-[#CFC7B8]">
        <DrawOn duration={1.4} stagger={0.1}>
          <TopoLine seed={3} height={34} />
        </DrawOn>
      </div>

      {/* Video section */}
      {videos.length > 0 && (
        <section className="px-4 md:px-14 max-w-7xl mx-auto">
          <MonoChip className="text-ember mb-3 block">— BETA VIDEO</MonoChip>
          <Reveal y={30} duration={0.8}>
            <BetaVideo videos={videos} posterSrc={images[0]?.url} />
          </Reveal>
        </section>
      )}

      {/* Topo divider */}
      <div className="px-4 md:px-14 max-w-7xl mx-auto my-8 text-[#CFC7B8]">
        <DrawOn duration={1.4} stagger={0.1}>
          <TopoLine seed={7} height={34} />
        </DrawOn>
      </div>

      {/* Notes + Related climbs */}
      <section className="px-4 md:px-14 max-w-7xl mx-auto pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 md:gap-12">
          {/* Notes / journal entry */}
          <div>
            <Notes notes={notes} climb={climb} readOnly={isAdmin} />
          </div>

          {/* Related climbs */}
          {siblingClimbs.length > 0 && (
            <aside>
              <MonoChip className="text-slate-400 mb-3.5 block">
                — ALSO IN {climb.area.toUpperCase()}
              </MonoChip>
              <Reveal
                className="border-t border-chalk-3"
                x={18}
                stagger={0.08}
                duration={0.6}
              >
                {siblingClimbs.map((other, i) => {
                  const otherGrade =
                    other.type === "boulder" ? `V${other.grade}` : other.grade;
                  const otherSent = sends.some((s) => s.climb_id === other.id);
                  return (
                    <Link
                      key={other.id}
                      href={`/database/${other.id}-${other.slug}`}
                      className={`group flex items-center gap-3 py-3.5 hover:bg-chalk-2 -mx-2 px-2 rounded-sm transition-colors ${
                        i < siblingClimbs.length - 1
                          ? "border-b border-chalk-2"
                          : ""
                      }`}
                    >
                      <GradeChip
                        grade={otherGrade}
                        variant={otherSent ? "ember" : "solid"}
                        size="md"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-display uppercase text-[16px] text-granite-100 truncate transition-colors group-hover:text-ember">
                          {other.name}
                        </div>
                        <MonoChip className="text-slate-500 mt-0.5 block">
                          {other.area} · {otherGrade}
                        </MonoChip>
                      </div>
                      {otherSent && (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <rect
                            x="0.5"
                            y="0.5"
                            width="13"
                            height="13"
                            rx="2"
                            fill="var(--ember)"
                          />
                          <path
                            d="M3 7 L6 10 L11 4"
                            stroke="var(--chalk)"
                            strokeWidth="1.8"
                            strokeLinecap="square"
                          />
                        </svg>
                      )}
                    </Link>
                  );
                })}
              </Reveal>
            </aside>
          )}
        </div>
      </section>
    </div>
  );
}
