"use client";

import { useEffect, useState } from "react";
import MonoChip from "@/components/ui/MonoChip";

/** Live HH:MM in Kelowna (America/Vancouver), refreshed every ~15s. */
function kelownaTime(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Vancouver",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

export default function KelownaClock() {
  // Render nothing on the server / first paint so the markup matches until the
  // client mounts (avoids a hydration mismatch on the time string).
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(kelownaTime());
    // Defer the first tick out of the effect body so we don't setState
    // synchronously on mount (still paints the time on the next frame).
    const raf = requestAnimationFrame(tick);
    const id = window.setInterval(tick, 15_000);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(id);
    };
  }, []);

  return (
    <span
      className="inline-flex items-center rounded-sm px-2.5 py-1.5"
      style={{ background: "rgba(244,241,236,0.06)" }}
    >
      <MonoChip className="text-[rgba(244,241,236,0.6)]">
        {time ?? "--:--"} · KELOWNA, BC
      </MonoChip>
    </span>
  );
}
