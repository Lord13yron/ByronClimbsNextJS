"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useRef, useTransition } from "react";
import { LayoutList, LayoutGrid, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import MonoChip from "@/components/ui/MonoChip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

type GradeOption = { grade: string; label: string; count: number };

type StatusChipProps = {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
};

function StatusChip({ label, count, active, onClick }: StatusChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-sm border px-3.5 py-2 font-display text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors duration-150",
        active
          ? "border-granite-100 bg-granite-100 text-chalk"
          : "border-chalk-3 bg-chalk text-granite-100 hover:border-granite-50",
      )}
    >
      {label}
      {count !== undefined && (
        <span className={active ? "text-chalk/70" : "text-slate-400"}>
          {count}
        </span>
      )}
    </button>
  );
}

export default function DatabasePageControls({
  totalCount,
  filteredCount,
  sendsCount,
  favoritesCount,
  isLoggedIn,
  boulderGrades,
  sportGrades,
  typeCounts,
}: {
  totalCount: number;
  filteredCount: number;
  sendsCount: number;
  favoritesCount: number;
  isLoggedIn: boolean;
  boulderGrades: GradeOption[];
  sportGrades: GradeOption[];
  typeCounts: { all: number; boulder: number; sport: number; trad: number };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const filter = searchParams.get("filter") ?? "all";
  const typeFilter = searchParams.get("type") ?? "all";
  const view = searchParams.get("view") ?? "list";
  const activeGrade = searchParams.get("grade");
  const activeCrag = searchParams.get("crag");
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // type=all defaults grade chips to boulder; trad hides them.
  const system = typeFilter === "sport" ? "sport" : "boulder";
  const showGrades = typeFilter !== "trad";
  const gradeOptions = system === "sport" ? sportGrades : boulderGrades;
  const selectedGradeLabel = activeGrade
    ? (gradeOptions.find((g) => g.grade === activeGrade)?.label ?? activeGrade)
    : null;

  const replace = useCallback(
    (params: URLSearchParams) => {
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [router, pathname],
  );

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      replace(params);
    },
    [searchParams, replace],
  );

  // Switching discipline resets the grade — the V-scale and 5.x scale don't
  // share values, so a carried-over grade would silently filter to nothing.
  const setType = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all") params.delete("type");
      else params.set("type", value);
      params.delete("grade");
      replace(params);
    },
    [searchParams, replace],
  );

  const clearAll = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    ["filter", "type", "grade", "crag", "q"].forEach((k) => params.delete(k));
    replace(params);
  }, [searchParams, replace]);

  function handleSearch(value: string) {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value) params.delete("q");
      else params.set("q", value);
      replace(params);
    }, 300);
  }

  const statusFilters = [
    { key: "all", label: "All", count: totalCount },
    ...(isLoggedIn
      ? [
          { key: "sends", label: "Sends", count: sendsCount },
          { key: "favorites", label: "Favorites", count: favoritesCount },
        ]
      : []),
  ];

  const typeFilters = [
    { key: "all", label: "All", count: typeCounts.all },
    { key: "boulder", label: "Boulder", count: typeCounts.boulder },
    { key: "sport", label: "Sport", count: typeCounts.sport },
    { key: "trad", label: "Trad", count: typeCounts.trad },
  ];

  const hasPills = Boolean(activeCrag);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 md:px-14">
      {/* Logbook header */}
      <div className="flex flex-wrap items-end justify-between gap-3 pt-12 pb-4 md:pt-16">
        <div>
          <MonoChip className="mb-2 block text-ember">— THE LOGBOOK</MonoChip>
          <h2
            className="font-display font-bold uppercase text-granite-100"
            style={{ fontSize: "clamp(28px,3.6vw,42px)", lineHeight: 1 }}
          >
            Every route, on file
          </h2>
        </div>
        <MonoChip className="text-slate-400">
          {filteredCount === totalCount
            ? `${totalCount} ROUTES`
            : `SHOWING ${filteredCount} OF ${totalCount} ROUTES`}
        </MonoChip>
      </div>

      {/* Controls block */}
      <div className="border-y border-chalk-3 py-3.5">
        {/* Row 1 — status + type */}
        <div className="flex flex-wrap items-center gap-2">
          {statusFilters.map((f) => (
            <StatusChip
              key={f.key}
              label={f.label}
              count={f.count}
              active={filter === f.key}
              onClick={() => setParam("filter", f.key)}
            />
          ))}
          <span className="mx-1 hidden h-5 w-px bg-chalk-3 sm:block" />
          <div className="flex flex-wrap items-center gap-2">
            {typeFilters.map((f) => (
              <StatusChip
                key={f.key}
                label={f.label}
                count={f.count}
                active={typeFilter === f.key}
                onClick={() => setType(f.key)}
              />
            ))}
          </div>
        </div>

        {/* Row 3 — three zones on large (grade left · search centered · toggle
            right); below lg the toggle drops and search is pushed right. */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {/* Grade — left zone (kept as a spacer when hidden so search stays centered) */}
          <div className="lg:flex-1">
            {showGrades && gradeOptions.length > 0 && (
              <Select
                value={activeGrade ?? "all"}
                onValueChange={(v) => setParam("grade", v)}
              >
                <SelectTrigger
                  className={cn(
                    "h-auto min-w-30 gap-1.5 rounded-sm border px-3.5 py-2 font-display text-[12px] font-semibold uppercase tracking-[0.08em] shadow-none transition-colors duration-150",
                    activeGrade
                      ? "border-granite-100 bg-granite-100 text-granite-100 [&_svg]:text-chalk [&_svg]:opacity-100"
                      : "border-chalk-3 bg-chalk text-granite-100 hover:border-granite-50",
                  )}
                >
                  {selectedGradeLabel
                    ? `Grade — ${selectedGradeLabel}`
                    : "Grades — All"}
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={6} align="start">
                  <SelectItem
                    value="all"
                    className="text-granite-100 focus:bg-chalk-2 focus:text-granite-100 data-highlighted:bg-chalk-2 data-highlighted:text-granite-100"
                  >
                    All grades
                  </SelectItem>
                  {gradeOptions.map((g) => (
                    <SelectItem
                      key={g.grade}
                      value={g.grade}
                      className="justify-between text-granite-100 focus:bg-chalk-2 focus:text-granite-100 data-highlighted:bg-chalk-2 data-highlighted:text-granite-100"
                    >
                      <span>{g.label}</span>
                      <span className="ml-6 font-mono text-[10px] text-slate-400">
                        {g.count}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Search — right on small, centered on large */}
          <div className="ml-auto flex flex-1 justify-end lg:ml-0 lg:justify-center">
            <div className="flex min-w-40 items-center gap-2 rounded-sm border border-chalk-3 bg-chalk px-3 py-2 sm:w-65 md:w-65">
              <Search className="h-3 w-3 shrink-0 text-slate-500" />
              <input
                defaultValue={searchParams.get("q") ?? ""}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search routes, crags…"
                className="w-full bg-transparent font-mono text-[10px] uppercase tracking-widest text-granite-100 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Toggle — right zone, large only */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <div className="flex overflow-hidden rounded-sm border border-chalk-3">
              <button
                onClick={() => setParam("view", "list")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors duration-150",
                  view === "list"
                    ? "bg-granite-100 text-chalk"
                    : "bg-chalk text-granite-100 hover:bg-chalk-2",
                )}
              >
                <LayoutList className="h-3 w-3" />
                List
              </button>
              <button
                onClick={() => setParam("view", "cards")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors duration-150",
                  view === "cards"
                    ? "bg-granite-100 text-chalk"
                    : "bg-chalk text-granite-100 hover:bg-chalk-2",
                )}
              >
                <LayoutGrid className="h-3 w-3" />
                Cards
              </button>
            </div>
          </div>
        </div>

        {/* Row 4 — active pills */}
        {hasPills && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <MonoChip className="text-slate-500">Filtered:</MonoChip>
            {activeCrag && (
              <Pill
                label={`Crag ${activeCrag}`}
                onClick={() => setParam("crag", null)}
              />
            )}
            <button
              onClick={clearAll}
              className="font-mono text-[10px] uppercase tracking-widest text-ember hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Pill({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-sm bg-granite-100 px-2.5 py-1 font-mono text-[10px]  tracking-widest capitalize text-chalk transition-opacity hover:opacity-80"
    >
      {label}
      <X className="h-2.5 w-2.5" />
    </button>
  );
}
