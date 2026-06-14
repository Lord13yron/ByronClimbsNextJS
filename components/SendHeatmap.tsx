import { Send } from "@/app/types/types";
import Reveal from "./anim/Reveal";

type SendHeatmapProps = {
  sends: Send[];
};

function getHeatmapData(sends: Send[]): number[][] {
  const now = new Date();
  const weeks = 26;
  const days = 7;

  // Count sends per day for heatmap intensity
  const sendCounts: Record<string, number> = {};
  for (const s of sends) {
    const key = new Date(s.created_at).toDateString();
    sendCounts[key] = (sendCounts[key] ?? 0) + 1;
  }

  // Build 7 rows × 26 cols (row = day of week, col = week)
  // Most recent week is last column
  const grid: number[][] = Array.from({ length: days }, () =>
    Array(weeks).fill(0),
  );

  for (let col = 0; col < weeks; col++) {
    for (let row = 0; row < days; row++) {
      const weeksAgo = weeks - 1 - col;
      const daysAgo = weeksAgo * 7 + (6 - row);
      const d = new Date(now);
      d.setDate(d.getDate() - daysAgo);
      const count = sendCounts[d.toDateString()] ?? 0;
      if (count === 0) grid[row][col] = 0;
      else if (count === 1) grid[row][col] = 1;
      else if (count === 2) grid[row][col] = 2;
      else if (count <= 4) grid[row][col] = 3;
      else grid[row][col] = 4;
    }
  }

  return grid;
}

const heatColors: Record<number, string> = {
  0: "rgba(244, 241, 236, 0.06)",
  1: "var(--heat-1)",
  2: "var(--heat-2)",
  3: "var(--heat-3)",
  4: "var(--heat-4)",
};

const WEEKS = 26;
const DAYS = 7;

export default function SendHeatmap({ sends }: SendHeatmapProps) {
  const grid = getHeatmapData(sends);

  // Column-major order so grid-auto-flow:column fills week-by-week.
  const cells: number[] = [];
  for (let col = 0; col < WEEKS; col++) {
    for (let row = 0; row < DAYS; row++) {
      cells.push(grid[row][col]);
    }
  }

  return (
    <div className="max-w-130">
      <Reveal
        className="grid gap-0.75 grid-flow-col grid-rows-7 auto-cols-fr"
        scale={0.3}
        stagger={0.004}
        duration={0.5}
      >
        {cells.map((v, i) => (
          <div
            key={i}
            className="aspect-square rounded-[2px]"
            style={{ background: heatColors[v] }}
          />
        ))}
      </Reveal>
      <div className="flex items-center gap-1.5 mt-2.5">
        <span className="font-mono uppercase tracking-widest text-[9px] text-[rgba(244,241,236,0.45)]">
          LESS
        </span>
        {[0, 1, 2, 3, 4].map((v) => (
          <div
            key={v}
            className="w-2.75 h-2.75 rounded-[2px] shrink-0"
            style={{ background: heatColors[v] }}
          />
        ))}
        <span className="font-mono uppercase tracking-widest text-[9px] text-[rgba(244,241,236,0.45)]">
          MORE
        </span>
      </div>
    </div>
  );
}
