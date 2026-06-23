"use client";

import { useEffect, useState } from "react";

export type KelownaStatus = {
  /** e.g. "8:29 PM" in Kelowna local time. */
  timeStr: string;
  /** Human-readable "what Byron is probably doing right now". */
  status: string;
  /** Live-dot color matched to the status (page-local, not a global token). */
  dotColor: string;
};

const TZ = "America/Vancouver";
const GREEN = "#3FB873";

/** Resolve current Kelowna time → display string, 24h hour, and weekend flag. */
function readKelownaTime(): { timeStr: string; h: number; weekend: boolean } {
  try {
    const now = new Date();
    const timeStr = new Intl.DateTimeFormat("en-US", {
      timeZone: TZ,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(now);

    const h = parseInt(
      new Intl.DateTimeFormat("en-US", {
        timeZone: TZ,
        hour: "2-digit",
        hour12: false,
      }).format(now),
      10,
    );

    const wd = new Intl.DateTimeFormat("en-US", {
      timeZone: TZ,
      weekday: "short",
    }).format(now);
    const weekend = wd === "Sat" || wd === "Sun";

    return { timeStr, h: h === 24 ? 0 : h, weekend };
  } catch {
    // Fallback to the visitor's local clock if Intl/timeZone is unavailable.
    const now = new Date();
    const day = now.getDay();
    return {
      timeStr: now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
      h: now.getHours(),
      weekend: day === 0 || day === 6,
    };
  }
}

function computeStatus(): KelownaStatus {
  const { timeStr, h, weekend } = readKelownaTime();

  // First match wins (per the handoff rules table).
  if (h < 6 || h >= 22) {
    return {
      timeStr,
      status: "Asleep — rehearsing beta in my head",
      dotColor: "#8C8C92",
    };
  }
  if (weekend && h >= 8 && h < 18) {
    return {
      timeStr,
      status: "Probably at the Boulderfields",
      dotColor: GREEN,
    };
  }
  if (!weekend && h >= 9 && h < 17) {
    return {
      timeStr,
      status: "At work — email's your best bet",
      dotColor: "#E8884F",
    };
  }
  return { timeStr, status: "Home, logging today's sends", dotColor: GREEN };
}

// Neutral placeholder so SSR and the first client render agree (no hydration
// mismatch); the real value lands in the mount effect a frame later.
const PLACEHOLDER: KelownaStatus = {
  timeStr: "—",
  status: "Checking the clock…",
  dotColor: "#8C8C92",
};

/**
 * Live "right now in Kelowna" status, recomputed every 5s on the client. Runs
 * regardless of reduced-motion (only the dot's CSS pulse is disabled there).
 */
export function useKelownaStatus(): KelownaStatus {
  const [state, setState] = useState<KelownaStatus>(PLACEHOLDER);

  useEffect(() => {
    setState(computeStatus());
    const id = window.setInterval(() => setState(computeStatus()), 5000);
    return () => window.clearInterval(id);
  }, []);

  return state;
}
