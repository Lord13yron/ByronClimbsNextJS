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
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Notes from "./Notes";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import DeleteClimb from "./DeleteClimb";
import GradeChip from "./ui/GradeChip";
import TypeGlyph from "./ui/TypeGlyph";
import MonoChip from "./ui/MonoChip";

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
  const images = await getImagesForClimb(climb.id);
  const videos = await getVideosForClimb(climb.id);
  const sends = await getSendsForUser();
  const notes = await getNotesForClimb(climb.id);
  const favorites = await getFavoritesForUser();
  const allClimbs = await getClimbs();

  const isSent = sends.some((s) => s.climb_id === climb.id);
  const sendDate = sends.find((s) => s.climb_id === climb.id)?.created_at;

  const siblingClimbs = allClimbs
    .filter((c) => c.area === climb.area && c.id !== climb.id)
    .slice(0, 3);

  const grade = climb.type === "boulder" ? `V${climb.grade}` : climb.grade;

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      {/* <div className="px-4 md:px-14 pt-5 md:pt-6 max-w-[1280px] mx-auto">
        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/database">
            <MonoChip className="text-slate-500 hover:text-granite-100 transition-colors">
              DATABASE
            </MonoChip>
          </Link>
          <MonoChip className="text-chalk-3">›</MonoChip>
          <MonoChip className="text-slate-500 uppercase">{climb.city}</MonoChip>
          <MonoChip className="text-chalk-3">›</MonoChip>
          <MonoChip className="text-slate-500 uppercase">{climb.area}</MonoChip>
          {climb.subArea && (
            <>
              <MonoChip className="text-chalk-3">›</MonoChip>
              <MonoChip className="text-slate-500 uppercase">{climb.subArea}</MonoChip>
            </>
          )}
          <MonoChip className="text-chalk-3">›</MonoChip>
          <MonoChip className="text-ember uppercase">{climb.name}</MonoChip>
        </div>
      </div> */}

      {/* Title block */}
      <section className="px-4 md:px-14 py-6 md:py-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-end gap-6">
          <div>
            <div className="flex items-center gap-3.5 mb-3.5">
              <GradeChip grade={grade} variant={isSent ? "ember" : "outline"} />
              <div className="flex items-center gap-2 text-slate-700">
                <TypeGlyph type={climb.type} size={14} />
                <MonoChip className="text-slate-700 uppercase">
                  {climb.type}
                </MonoChip>
              </div>
            </div>
            <h1
              className="font-display uppercase font-bold text-granite-100 leading-[0.92] tracking-[0.01em]"
              style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
            >
              {climb.name}
            </h1>
            {/* Coord strip */}
            <div className="flex flex-wrap gap-4 mt-4">
              {[
                { label: "CITY", value: climb.city.toUpperCase() },
                { label: "AREA", value: climb.area.toUpperCase() },
                ...(climb.subArea
                  ? [{ label: "SECTOR", value: climb.subArea.toUpperCase() }]
                  : []),
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <MonoChip className="text-[9px] text-slate-400">
                    {item.label}
                  </MonoChip>
                  <span className="font-mono uppercase text-[11px] tracking-widest font-medium text-granite-100">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {!isAdmin && (
              <>
                <div className="flex items-center gap-2 font-display uppercase text-[13px] font-semibold tracking-[0.06em] px-4 py-2.5 border rounded-sm transition-colors">
                  <TickBox climbId={climb.id} sends={sends} />
                  <span>{isSent ? "Sent" : "Log Send"}</span>
                </div>
                <div className="flex items-center gap-2 font-display uppercase text-[13px] font-semibold tracking-[0.06em] px-4 py-2.5 border border-chalk-3 rounded-sm hover:border-ember transition-colors">
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
          </div>
        </div>
      </section>

      {/* Hero image + session stats */}
      <section className="px-4 md:px-14 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6">
          {/* Image */}
          <div
            className="relative rounded-sm overflow-hidden"
            style={{ height: 460 }}
          >
            {images.length > 0 ? (
              <Carousel className="w-full h-full">
                <CarouselContent className="h-full">
                  {images.map((img, i) => (
                    <CarouselItem key={i} className="h-full">
                      <div
                        className="relative w-full h-full"
                        style={{ height: 460 }}
                      >
                        <Image
                          src={img.url}
                          alt={`${climb.name} — photo ${i + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 65vw"
                          className="object-cover object-[center_40%]"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {images.length > 1 && <CarouselPrevious className="left-3" />}
                {images.length > 1 && <CarouselNext className="right-3" />}
              </Carousel>
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, var(--chalk-2), var(--chalk-2) 10px, var(--chalk) 10px, var(--chalk) 20px)",
                }}
              >
                <MonoChip className="text-slate-400">NO PHOTO</MonoChip>
              </div>
            )}
          </div>

          {/* Session stats card */}
          <div className="bg-granite-200 text-chalk p-6 rounded-sm">
            <MonoChip className="text-ember-soft mb-3.5 block">
              — SESSION LOG
            </MonoChip>
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[rgba(244,241,236,0.15)]">
              {[
                {
                  label: "GRADE",
                  value: grade,
                  ember: false,
                },
                {
                  label: "SENT",
                  value: isSent && sendDate ? formatDate(sendDate) : "—",
                  ember: isSent,
                },
                {
                  label: "AREA",
                  value: climb.area.toUpperCase(),
                  ember: false,
                },
                {
                  label: "TYPE",
                  value: climb.type.toUpperCase(),
                  ember: false,
                },
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

            {/* Beta tags from notes */}
            {notes.length > 0 && (
              <div className="pt-4">
                <MonoChip className="text-[rgba(244,241,236,0.55)] mb-2.5 block">
                  NOTES
                </MonoChip>
                <p className="text-[13px] leading-[1.55] text-[rgba(244,241,236,0.7)] font-body line-clamp-4">
                  {notes[0].note}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Video section */}
      {videos.length > 0 && (
        <section className="px-4 md:px-14 max-w-7xl mx-auto mt-6">
          <MonoChip className="text-slate-500 mb-3 block">
            — BETA VIDEO
          </MonoChip>
          <Carousel className="w-full max-w-3xl">
            <CarouselContent>
              {videos.map((video, i) => (
                <CarouselItem key={i}>
                  <iframe
                    width="100%"
                    height="400"
                    src={`https://www.youtube.com/embed/${video.url}`}
                    title={`Video ${i + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-sm"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {videos.length > 1 && <CarouselPrevious />}
            {videos.length > 1 && <CarouselNext />}
          </Carousel>
        </section>
      )}

      {/* Notes + Related climbs */}
      <section className="px-4 md:px-14 max-w-7xl mx-auto mt-12 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 md:gap-12">
          {/* Notes / journal entry */}
          <div>
            {!isAdmin && <Notes notes={notes} climb={climb} />}
            {isAdmin && notes.length > 0 && (
              <div>
                <MonoChip className="text-ember mb-3 block">— NOTES</MonoChip>
                {notes.map((note) => (
                  <p
                    key={note.id}
                    className="text-[16px] leading-[1.7] text-granite-100 mb-4 font-body"
                  >
                    {note.note}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Related climbs */}
          {siblingClimbs.length > 0 && (
            <aside>
              <MonoChip className="text-slate-500 mb-3.5 block">
                — ALSO IN {climb.area.toUpperCase()}
              </MonoChip>
              <div>
                {siblingClimbs.map((other, i) => {
                  const otherGrade =
                    other.type === "boulder" ? `V${other.grade}` : other.grade;
                  const otherSent = sends.some((s) => s.climb_id === other.id);
                  return (
                    <Link
                      key={other.id}
                      href={`/database/${other.id}-${other.slug}`}
                      className={`flex items-center gap-3 py-3.5 hover:bg-chalk-2 -mx-2 px-2 rounded-sm transition-colors ${
                        i < siblingClimbs.length - 1
                          ? "border-b border-chalk-2"
                          : ""
                      }`}
                    >
                      <GradeChip
                        grade={otherGrade}
                        variant={otherSent ? "ember" : "outline"}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-display uppercase text-[15px] text-granite-100 truncate">
                          {other.name}
                        </div>
                        <MonoChip className="text-slate-500 mt-0.5 block">
                          {other.city}
                        </MonoChip>
                      </div>
                      {otherSent && (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
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
              </div>
            </aside>
          )}
        </div>
      </section>
    </div>
  );
}
