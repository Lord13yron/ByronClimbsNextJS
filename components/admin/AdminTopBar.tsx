"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import MonoChip from "@/components/ui/MonoChip";

// Readable labels for the path segments under /admin. Anything not listed falls
// back to its de-hyphenated segment; numeric ids are dropped from the trail.
const SEGMENT_LABELS: Record<string, string> = {
  climbs: "Climbs",
  blog: "Blog",
  "add-climb": "Add route",
  "add-post": "Add post",
  "edit-climb": "Edit route",
  edit: "Edit post",
  settings: "Settings",
};

function labelFor(seg: string): string {
  return SEGMENT_LABELS[seg] ?? seg.replace(/-/g, " ");
}

/**
 * Slim sticky bar on admin sub-pages: a back-link to the dashboard plus a
 * breadcrumb of the current section. Renders nothing on the dashboard itself.
 */
export default function AdminTopBar() {
  const pathname = usePathname();
  if (pathname === "/admin") return null;

  const crumbs = pathname
    .split("/")
    .filter(Boolean)
    .slice(1) // drop the leading "admin"
    .filter((s) => !/^\d+$/.test(s)) // skip dynamic numeric ids
    .map(labelFor);

  return (
    <div className="sticky top-0 z-30 border-b border-chalk-3 bg-chalk">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-14">
        <Link
          href="/admin"
          className="group inline-flex items-center gap-1.5 text-granite-100 transition-colors hover:text-ember"
        >
          <ChevronLeft
            size={15}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          <MonoChip className="text-inherit">Dashboard</MonoChip>
        </Link>
        {crumbs.length > 0 && (
          <MonoChip className="text-slate-400">{crumbs.join(" / ")}</MonoChip>
        )}
      </div>
    </div>
  );
}
