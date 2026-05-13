import MonoChip from "@/components/ui/MonoChip";
import TopoLine from "@/components/ui/TopoLine";
import { getAdminStats, getRecentActivity } from "@/lib/data-service";
import Link from "next/link";

function timeAgo(isoString: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(isoString).getTime()) / 1000
  );
  if (seconds < 60) return `${seconds} SECONDS AGO`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} MINUTE${minutes === 1 ? "" : "S"} AGO`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} HOUR${hours === 1 ? "" : "S"} AGO`;
  const days = Math.floor(hours / 24);
  return `${days} DAY${days === 1 ? "" : "S"} AGO`;
}

export default async function AdminPage() {
  const [stats, activity] = await Promise.all([
    getAdminStats(),
    getRecentActivity(),
  ]);

  return (
    <div className="bg-chalk min-h-screen p-6 md:p-10">
      <div className="max-w-5xl mx-auto">

        {/* Masthead */}
        <div className="mb-6">
          <MonoChip className="text-ember mb-3 block">— ADMIN DASHBOARD</MonoChip>
          <h1
            className="font-display uppercase font-extrabold leading-[0.92] tracking-[0.01em] text-granite-100"
            style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
          >
            Dashboard.
          </h1>
          <p className="mt-3 text-[15px] leading-[1.6] text-slate-700 font-body">
            Site overview and quick actions.
          </p>
        </div>

        <div className="text-chalk-3 opacity-60">
          <TopoLine height={36} seed={3} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-chalk-2 border border-chalk-3 rounded-sm p-6">
            <MonoChip className="text-ember block mb-3">— TOTAL CLIMBS</MonoChip>
            <div className="font-display text-[56px] leading-none text-granite-100">
              {stats.totalClimbs}
            </div>
            <MonoChip className="text-slate-400 block mt-2">ROUTES IN DATABASE</MonoChip>
          </div>

          <div className="bg-chalk-2 border border-chalk-3 rounded-sm p-6">
            <MonoChip className="text-ember block mb-3">— SENDS LOGGED</MonoChip>
            <div className="font-display text-[56px] leading-none text-granite-100">
              {stats.totalSends}
            </div>
            <MonoChip className="text-slate-400 block mt-2">ALL-TIME SENDS</MonoChip>
          </div>

          <div className="bg-chalk-2 border border-chalk-3 rounded-sm p-6">
            <MonoChip className="text-ember block mb-3">— TOTAL USERS</MonoChip>
            <div className="font-display text-[56px] leading-none text-granite-100">
              {stats.totalUsers}
            </div>
            <MonoChip className="text-slate-400 block mt-2">REGISTERED ACCOUNTS</MonoChip>
          </div>

          <div className="bg-chalk-2 border border-chalk-3 rounded-sm p-6">
            <MonoChip className="text-ember block mb-3">— BLOG POSTS</MonoChip>
            <div className="font-display text-[56px] leading-none text-granite-100">
              {stats.totalPosts}
            </div>
            <MonoChip className="text-slate-400 block mt-2">PUBLISHED ENTRIES</MonoChip>
          </div>
        </div>

        <div className="text-chalk-3 opacity-60 mt-8">
          <TopoLine height={36} seed={7} />
        </div>

        {/* Quick Actions + Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

          {/* Quick Actions */}
          <div className="bg-chalk-2 border border-chalk-3 rounded-sm overflow-hidden">
            <div className="px-6 pt-6 pb-4">
              <MonoChip className="text-ember block mb-2">— QUICK ACTIONS</MonoChip>
              <h2 className="font-display uppercase font-bold text-[28px] leading-none text-granite-100">
                Actions.
              </h2>
            </div>
            <div>
              <Link
                href="/admin/add-climb"
                className="flex justify-between items-center border-t border-chalk-3 py-4 px-6 hover:bg-chalk-3/40 transition-colors duration-150"
              >
                <div>
                  <div className="font-display uppercase font-semibold text-[13px] tracking-[0.06em] text-granite-100">
                    Add New Route
                  </div>
                  <MonoChip className="text-slate-400 block mt-0.5">
                    CREATE A CLIMBING ROUTE
                  </MonoChip>
                </div>
                <span className="font-display text-ember text-[18px]">→</span>
              </Link>
              <Link
                href="/admin/blog/add-post"
                className="flex justify-between items-center border-t border-chalk-3 py-4 px-6 hover:bg-chalk-3/40 transition-colors duration-150"
              >
                <div>
                  <div className="font-display uppercase font-semibold text-[13px] tracking-[0.06em] text-granite-100">
                    Add Blog Post
                  </div>
                  <MonoChip className="text-slate-400 block mt-0.5">
                    WRITE A NEW ENTRY
                  </MonoChip>
                </div>
                <span className="font-display text-ember text-[18px]">→</span>
              </Link>
              <Link
                href="/admin/settings"
                className="flex justify-between items-center border-t border-chalk-3 py-4 px-6 hover:bg-chalk-3/40 transition-colors duration-150"
              >
                <div>
                  <div className="font-display uppercase font-semibold text-[13px] tracking-[0.06em] text-granite-100">
                    Settings
                  </div>
                  <MonoChip className="text-slate-400 block mt-0.5">
                    SITE CONFIGURATION
                  </MonoChip>
                </div>
                <span className="font-display text-ember text-[18px]">→</span>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-chalk-2 border border-chalk-3 rounded-sm overflow-hidden">
            <div className="px-6 pt-6 pb-4">
              <MonoChip className="text-ember block mb-2">— RECENT ACTIVITY</MonoChip>
              <h2 className="font-display uppercase font-bold text-[28px] leading-none text-granite-100">
                Activity.
              </h2>
            </div>
            <div className="px-6 pb-6 flex flex-col gap-5 border-t border-chalk-3 pt-5">
              {activity.length === 0 ? (
                <MonoChip className="text-slate-400">NO RECENT ACTIVITY</MonoChip>
              ) : (
                activity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-ember rounded-full mt-1.25 shrink-0" />
                    <div>
                      <p className="text-[14px] font-body text-granite-100 leading-snug">
                        {item.label}
                      </p>
                      <MonoChip className="text-slate-400 block mt-1">
                        {timeAgo(item.created_at)}
                      </MonoChip>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
