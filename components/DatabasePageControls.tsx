"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useRef, useTransition } from "react";
import { LayoutList, LayoutGrid, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterChipProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "font-display uppercase text-[12px] font-semibold tracking-[0.08em] px-3.5 py-2 border rounded-sm transition-colors duration-150",
        active
          ? "bg-granite-200 text-chalk border-granite-200"
          : "bg-background text-granite-100 border-chalk-3 hover:border-granite-50",
      )}
    >
      {label}
    </button>
  );
}

export default function DatabasePageControls({
  totalCount,
  sendsCount,
  favoritesCount,
  isLoggedIn,
}: {
  totalCount: number;
  sendsCount: number;
  favoritesCount: number;
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const filter = searchParams.get("filter") ?? "all";
  const typeFilter = searchParams.get("type") ?? "all";
  const view = searchParams.get("view") ?? "list";
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleSearch(value: string) {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value) {
        params.delete("q");
      } else {
        params.set("q", value);
      }
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    }, 300);
  }

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    },
    [router, pathname, searchParams],
  );

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
    { key: "all", label: "All Types" },
    { key: "boulder", label: "Boulder" },
    { key: "sport", label: "Sport" },
    { key: "trad", label: "Trad" },
  ];

  return (
    <div className="px-4 md:px-14 max-w-7xl mx-auto w-full pb-4 ">
      <div className="flex flex-wrap justify-between items-center gap-3 pb-1">
        {/* Filter chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {statusFilters.map((f) => (
              <FilterChip
                key={f.key}
                label={f.label}
                active={
                  filter === f.key || (f.key === "all" && filter === "all")
                }
                onClick={() => setParam("filter", f.key)}
              />
            ))}
          </div>

          {/* Vertical divider */}
          <span className="w-px h-5 bg-chalk-3 mx-1 hidden sm:block" />

          <div className="flex items-center gap-2 flex-wrap">
            {typeFilters.slice(1).map((f) => (
              <FilterChip
                key={f.key}
                label={f.label}
                active={typeFilter === f.key}
                onClick={() => setParam("type", f.key)}
              />
            ))}
          </div>
        </div>

        {/* Search + view toggle */}
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-2 px-3 py-2 border border-chalk-3 rounded-sm bg-chalk min-w-48 w-48 sm:w-72">
            <Search className="h-3 w-3 text-slate-500 shrink-0" />
            <input
              defaultValue={searchParams.get("q") ?? ""}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search routes, crags..."
              className="font-mono text-[10px] uppercase tracking-widest bg-transparent outline-none w-full text-granite-100 placeholder:text-slate-500"
            />
          </div>

          <div className="flex border border-chalk-3 rounded-sm overflow-hidden">
            <button
              onClick={() => setParam("view", "list")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 font-display uppercase text-[11px] font-semibold tracking-[0.08em] transition-colors duration-150",
                view === "list" || view === null
                  ? "bg-granite-200 text-chalk"
                  : "bg-background text-granite-100 hover:bg-chalk-2",
              )}
            >
              <LayoutList className="w-3 h-3" />
              List
            </button>
            <button
              onClick={() => setParam("view", "cards")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 font-display uppercase text-[11px] font-semibold tracking-[0.08em] transition-colors duration-150",
                view === "cards"
                  ? "bg-granite-200 text-chalk"
                  : "bg-background text-granite-100 hover:bg-chalk-2",
              )}
            >
              <LayoutGrid className="w-3 h-3" />
              Cards
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
