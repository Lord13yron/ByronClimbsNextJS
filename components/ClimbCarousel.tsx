"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./ui/carousel";
import MonoChip from "./ui/MonoChip";

type ClimbImage = { url: string };

/** Responsive photo frame height (README: clamp(300px, 46vw, 480px)). */
const FRAME_H = "clamp(300px, 46vw, 480px)";

type ClimbCarouselProps = {
  images: ClimbImage[];
  climbName: string;
};

/**
 * Photo carousel for the climb detail hero: dots + "n / total" counter, a
 * bottom vignette, restyled round prev/next buttons, and a slow ken-burns on
 * the active slide. Falls back to the 45° hatch placeholder when there are no
 * images. Ken-burns is disabled under prefers-reduced-motion via CSS.
 */
export default function ClimbCarousel({
  images,
  climbName,
}: ClimbCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    setSelected(api.selectedScrollSnap());
    const onSelect = () => setSelected(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (images.length === 0) {
    return (
      <div
        className="w-full flex items-center justify-center"
        style={{
          height: FRAME_H,
          background:
            "repeating-linear-gradient(45deg, var(--chalk-2), var(--chalk-2) 10px, var(--chalk) 10px, var(--chalk) 20px)",
        }}
      >
        <MonoChip className="text-slate-400">NO PHOTO</MonoChip>
      </div>
    );
  }

  const count = images.length;
  const multiple = count > 1;

  return (
    <Carousel setApi={setApi} className="relative w-full" opts={{ loop: true }}>
      <CarouselContent>
        {images.map((img, i) => (
          <CarouselItem key={i}>
            <div
              className="relative w-full overflow-hidden"
              style={{ height: FRAME_H }}
            >
              <Image
                src={img.url}
                alt={`${climbName} — photo ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 65vw"
                className="object-contain [filter:saturate(0.88)_contrast(1.03)]"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Bottom vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 55%, rgba(22,22,24,0.5))",
        }}
      />

      {multiple && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => api?.scrollPrev()}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-[38px] h-[38px] rounded-full text-chalk transition-colors hover:bg-[rgba(22,22,24,0.75)]"
            style={{ background: "rgba(22,22,24,0.55)" }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => api?.scrollNext()}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-[38px] h-[38px] rounded-full text-chalk transition-colors hover:bg-[rgba(22,22,24,0.75)]"
            style={{ background: "rgba(22,22,24,0.55)" }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to photo ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === selected ? "w-5 bg-chalk" : "w-1.5 bg-[rgba(244,241,236,0.45)]"
                }`}
              />
            ))}
          </div>

          {/* Counter */}
          <div
            className="absolute bottom-4 right-4 px-2 py-1 rounded-sm"
            style={{ background: "rgba(22,22,24,0.5)" }}
          >
            <MonoChip className="text-chalk">
              {selected + 1} / {count}
            </MonoChip>
          </div>
        </>
      )}
    </Carousel>
  );
}
