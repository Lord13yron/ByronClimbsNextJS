import {
  getClimbById,
  getImagesForClimb,
  getVideosForClimb,
} from "@/lib/data-service";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import GradeChip from "./ui/GradeChip";
import TypeGlyph from "./ui/TypeGlyph";
import MonoChip from "./ui/MonoChip";
import Link from "next/link";

type ClimbProps = {
  databaseId: string;
};

export default async function ClimbSignedOut({ databaseId }: ClimbProps) {
  const climb = await getClimbById(databaseId);
  const images = await getImagesForClimb(climb.id);
  const videos = await getVideosForClimb(climb.id);

  const grade = climb.type === "boulder" ? `V${climb.grade}` : climb.grade;

  return (
    <div className="bg-background">
      {/* Title block */}
      <section className="px-4 md:px-14 py-6 md:py-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-end gap-6">
          <div>
            <div className="flex items-center gap-3.5 mb-3.5">
              <GradeChip grade={grade} variant="outline" />
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

          <Link
            href="/login"
            className="flex items-center gap-2 font-display uppercase text-[13px] font-semibold tracking-[0.06em] px-4 py-2.5 border border-chalk-3 rounded-sm hover:border-ember transition-colors"
          >
            Sign in to log sends
          </Link>
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

      <div className="pb-16 md:pb-24" />
    </div>
  );
}
