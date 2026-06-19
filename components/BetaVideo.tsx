"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import MonoChip from "./ui/MonoChip";

type Video = { url: string };

type BetaVideoProps = {
  videos: Video[];
  posterSrc?: string;
};

/**
 * Beta-video frame: shows a poster + play card, and mounts the autoplaying
 * YouTube iframe only after the user clicks play. Multiple videos use the
 * existing carousel; each frame tracks its own play state.
 */
function VideoFrame({ video, posterSrc }: { video: Video; posterSrc?: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative w-full aspect-[16/9] rounded-sm overflow-hidden border border-chalk-3 bg-granite-200">
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${video.url}?autoplay=1`}
          title="Beta video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          aria-label="Play beta video"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 w-full h-full cursor-pointer"
        >
          {posterSrc && (
            <Image
              src={posterSrc}
              alt=""
              fill
              aria-hidden="true"
              sizes="(max-width: 860px) 100vw, 860px"
              className="object-cover object-[center_40%] opacity-50"
            />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(22,22,24,0.2), rgba(22,22,24,0.6))",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="flex items-center gap-3 px-4 py-2.5 rounded-sm"
              style={{ background: "rgba(22,22,24,0.78)" }}
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-ember">
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M0 0 L14 8 L0 16 Z" fill="var(--chalk)" />
                </svg>
              </span>
              <span className="text-left">
                <span className="block font-display uppercase text-[13px] font-semibold tracking-[0.06em] text-chalk">
                  Watch the send
                </span>
                <MonoChip className="text-[rgba(244,241,236,0.55)] mt-0.5 block">
                  YouTube
                </MonoChip>
              </span>
            </div>
          </div>
        </button>
      )}
    </div>
  );
}

export default function BetaVideo({ videos, posterSrc }: BetaVideoProps) {
  if (videos.length === 0) return null;

  if (videos.length === 1) {
    return (
      <div className="max-w-[860px]">
        <VideoFrame video={videos[0]} posterSrc={posterSrc} />
      </div>
    );
  }

  return (
    <Carousel className="w-full max-w-[860px]">
      <CarouselContent>
        {videos.map((video, i) => (
          <CarouselItem key={i}>
            <VideoFrame video={video} posterSrc={posterSrc} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
