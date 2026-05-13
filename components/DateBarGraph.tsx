"use client";

import { Climb } from "@/app/types/types";
import { useMemo, useState } from "react";
import MonoChip from "./ui/MonoChip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const MONTH_LABELS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

type DateBarGraphProps = {
  sends: Climb[];
};

export default function DateBarGraph({ sends }: DateBarGraphProps) {
  const [selectedYear, setSelectedYear] = useState<string>("2026");

  const { chartData, dateRange } = useMemo(() => {
    const counts: number[] = Array(12).fill(0);

    sends.forEach((climb) => {
      const d = new Date(climb.created_at);
      if (d.getFullYear().toString() === selectedYear) {
        counts[d.getMonth()] += 1;
      }
    });

    const data = MONTH_LABELS.map((m, i) => ({ m, n: counts[i] }));

    // Build a date range label from the first and last non-zero months
    const nonZeroIndices = counts
      .map((n, i) => (n > 0 ? i : -1))
      .filter((i) => i >= 0);

    let rangeLabel = selectedYear;
    if (nonZeroIndices.length >= 2) {
      rangeLabel = `${MONTH_LABELS[nonZeroIndices[0]]} → ${MONTH_LABELS[nonZeroIndices[nonZeroIndices.length - 1]]} ${selectedYear}`;
    } else if (nonZeroIndices.length === 1) {
      rangeLabel = `${MONTH_LABELS[nonZeroIndices[0]]} ${selectedYear}`;
    }

    return { chartData: data, dateRange: rangeLabel };
  }, [sends, selectedYear]);

  const max = Math.max(...chartData.map((d) => d.n), 1);

  return (
    <div className="bg-chalk border border-chalk-3 rounded-md p-5.5">
      {/* Header */}
      <div className="flex justify-between items-end mb-5 flex-wrap gap-3">
        <div>
          <MonoChip className="text-ember mb-1.5 block">— TIMELINE</MonoChip>
          <h3 className="font-display uppercase text-[22px] m-0 leading-none text-granite-100">
            Sends Over Time
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <MonoChip className="text-slate-500">{dateRange}</MonoChip>
          <Select
            onValueChange={(value) => setSelectedYear(value)}
            defaultValue={selectedYear}
          >
            <SelectTrigger size="sm" className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Year</SelectLabel>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bar chart */}
      <div
        className="flex items-end gap-1.5 md:gap-3 border-b border-chalk-3"
        style={{ height: 180, paddingBottom: 28, position: "relative" }}
      >
        {chartData.map((d, i) => {
          const heightPct = (d.n / max) * 100;
          const isMax = d.n === max && d.n > 0;
          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center h-full relative"
            >
              <div className="flex-1 w-full flex items-end">
                <div
                  className="w-full relative"
                  style={{
                    height: `${heightPct}%`,
                    background: isMax
                      ? "var(--ember)"
                      : "var(--granite-200)",
                  }}
                >
                  {d.n > 0 && (
                    <MonoChip className="absolute -top-4.5 left-1/2 -translate-x-1/2 text-[10px] text-granite-100 whitespace-nowrap">
                      {d.n}
                    </MonoChip>
                  )}
                </div>
              </div>
              <MonoChip className="absolute -bottom-5.5 text-[9px] text-slate-500">
                {d.m}
              </MonoChip>
            </div>
          );
        })}
      </div>
    </div>
  );
}
