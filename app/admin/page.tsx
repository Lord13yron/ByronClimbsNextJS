import Link from "next/link";
import {
  Check,
  FileText,
  ListOrdered,
  MountainSnow,
  Newspaper,
  PencilLine,
  Plus,
  Settings,
  User2,
  type LucideIcon,
} from "lucide-react";
import MonoChip from "@/components/ui/MonoChip";
import Counter from "@/components/anim/Counter";
import Reveal from "@/components/anim/Reveal";
import AdminHero from "@/components/admin/AdminHero";
import SendVelocity from "@/components/admin/SendVelocity";
import ScrollProgressBar from "@/components/database/ScrollProgressBar";
import {
  getAdminStats,
  getRecentActivity,
  getAdminAnalytics,
  type ActivityItem,
} from "@/lib/data-service";

function timeAgo(isoString: string): string {
  const seconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (seconds < 60) return `${seconds} SECONDS AGO`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} MINUTE${minutes === 1 ? "" : "S"} AGO`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} HOUR${hours === 1 ? "" : "S"} AGO`;
  const days = Math.floor(hours / 24);
  return `${days} DAY${days === 1 ? "" : "S"} AGO`;
}

// Quick-action cards: a climbs row, a blog row, then a full-width Settings card.
const ACTIONS: {
  title: string;
  sub: string;
  href: string;
  icon: LucideIcon;
  wide?: boolean;
}[] = [
  { title: "Add new route", sub: "CREATE A CLIMB ENTRY", href: "/admin/add-climb", icon: Plus },
  { title: "Manage climbs", sub: "EDIT THE DATABASE", href: "/admin/climbs", icon: ListOrdered },
  { title: "Add blog post", sub: "WRITE A FIELD NOTE", href: "/admin/blog/add-post", icon: PencilLine },
  { title: "Manage blog posts", sub: "EDIT FIELD NOTES", href: "/admin/blog", icon: Newspaper },
  { title: "Settings", sub: "SITE CONFIGURATION", href: "/admin/settings", icon: Settings, wide: true },
];

// Maps an activity row's `type` to its glyph, colour and tag label.
const TYPE_META: Record<
  string,
  { tag: string; icon: LucideIcon; color: string; tint: string }
> = {
  send_logged: { tag: "SEND", icon: Check, color: "#5FB87A", tint: "rgba(95,184,122,0.16)" },
  climb_added: { tag: "DATABASE", icon: MountainSnow, color: "#E37A3F", tint: "rgba(227,122,63,0.16)" },
  user_registered: { tag: "ACCOUNT", icon: User2, color: "#7FB6C4", tint: "rgba(127,182,196,0.16)" },
  post_added: { tag: "JOURNAL", icon: FileText, color: "#E0883A", tint: "rgba(224,136,58,0.16)" },
};
const FALLBACK_META = TYPE_META.climb_added;

export default async function AdminPage() {
  const [stats, activity, analytics] = await Promise.all([
    getAdminStats(),
    getRecentActivity(),
    getAdminAnalytics(),
  ]);

  return (
    <>
      <ScrollProgressBar />

      {/* 1 — Control-deck hero */}
      <AdminHero stats={stats} />

      {/* 2 — Quick actions + Recent activity */}
      <section className="bg-chalk">
        <div
          className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-[22px] min-[920px]:grid-cols-[1.15fr_1fr]"
          style={{ padding: "clamp(34px,5vw,64px) clamp(20px,5vw,56px)" }}
        >
          {/* Left — Quick actions */}
          <div>
            <MonoChip className="mb-2 block text-ember">— QUICK ACTIONS</MonoChip>
            <h2 className="mb-6 font-display text-[clamp(26px,3.2vw,38px)] font-bold uppercase leading-[0.94] text-granite-100">
              Run the site
            </h2>
            <Reveal
              className="grid grid-cols-1 gap-[14px] min-[620px]:grid-cols-2"
              y={16}
              stagger={0.06}
            >
              {ACTIONS.map((a) => {
                const Icon = a.icon;
                return (
                  <Link
                    key={a.href}
                    href={a.href}
                    className={`group flex min-h-[148px] flex-col justify-between rounded-sm border border-chalk-3 bg-chalk-2 p-[18px] transition-all duration-150 hover:-translate-y-[3px] hover:border-ember hover:bg-chalk ${
                      a.wide ? "min-[620px]:col-span-2" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-granite-100 text-chalk">
                        <Icon size={18} strokeWidth={1.75} />
                      </span>
                      <span className="font-display text-[18px] text-slate-400 transition-all duration-150 group-hover:translate-x-1 group-hover:text-ember">
                        →
                      </span>
                    </div>
                    <div>
                      <div className="font-display text-[19px] font-bold uppercase leading-none text-granite-100">
                        {a.title}
                      </div>
                      <MonoChip className="mt-1.5 block text-slate-400">{a.sub}</MonoChip>
                    </div>
                  </Link>
                );
              })}
            </Reveal>
          </div>

          {/* Right — Recent activity (live feed) */}
          <div
            className="relative overflow-hidden rounded-sm border border-chalk-3 bg-granite-100"
            style={{ padding: "clamp(18px,2.4vw,26px)" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(200,84,30,0.2), transparent 70%)",
              }}
            />
            <div className="relative mb-4 flex items-start justify-between">
              <div>
                <MonoChip className="mb-2 block text-ember-soft">— LIVE FEED</MonoChip>
                <h2 className="font-display text-[clamp(24px,3vw,34px)] font-bold uppercase leading-none text-chalk">
                  Recent activity
                </h2>
              </div>
              <span className="flex items-center gap-1.5">
                <span
                  className="ember-pulse inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: "#5FB87A" }}
                />
                <MonoChip className="text-[rgba(244,241,236,0.5)]">LIVE</MonoChip>
              </span>
            </div>

            {activity.length === 0 ? (
              <MonoChip className="text-[rgba(244,241,236,0.42)]">NO RECENT ACTIVITY</MonoChip>
            ) : (
              <Reveal selector="li" x={16} stagger={0.06}>
                <ul className="relative flex flex-col gap-0.5">
                  {activity.map((item: ActivityItem, i) => {
                    const meta = TYPE_META[item.type] ?? FALLBACK_META;
                    const Icon = meta.icon;
                    return (
                      <li
                        key={i}
                        className="flex items-start gap-3 border-t border-[rgba(244,241,236,0.09)] px-1 py-[13px]"
                      >
                        <span
                          className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-sm"
                          style={{ background: meta.tint, color: meta.color }}
                        >
                          <Icon size={14} strokeWidth={2} />
                        </span>
                        <div>
                          <p className="font-body text-[14px] leading-[1.4] text-chalk">
                            {item.label}
                          </p>
                          <MonoChip className="mt-1 block text-[rgba(244,241,236,0.42)]">
                            {meta.tag} · {timeAgo(item.created_at)}
                          </MonoChip>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* 3 — Site pulse (analytics) */}
      <section className="bg-chalk-2">
        <div
          className="mx-auto w-full max-w-7xl"
          style={{ padding: "clamp(30px,4.5vw,56px) clamp(20px,5vw,56px) clamp(48px,6vw,72px)" }}
        >
          <MonoChip className="mb-2 block text-ember">— BY THE NUMBERS</MonoChip>
          <h2 className="mb-6 font-display text-[clamp(28px,3.6vw,42px)] font-bold uppercase leading-none text-granite-100">
            Site pulse
          </h2>

          {/* Top row — velocity + KPI deltas */}
          <div className="grid grid-cols-1 items-stretch gap-[22px] min-[920px]:grid-cols-[1.6fr_1fr]">
            <SendVelocity velocity={analytics.velocity} />

            <div className="flex flex-col gap-[14px]">
              {analytics.kpis.map((kpi) => {
                const isFlat = kpi.direction === "flat";
                const isUp = kpi.direction === "up";
                const pillStyle = isFlat
                  ? { color: "#6E6E74", background: "rgba(140,140,146,0.12)" }
                  : isUp
                  ? { color: "#3F8F5C", background: "rgba(95,184,122,0.14)" }
                  : { color: "#B0492A", background: "rgba(200,84,30,0.12)" };
                return (
                  <div
                    key={kpi.label}
                    className="flex items-center justify-between rounded-sm border border-chalk-3 bg-chalk px-5 py-[18px]"
                  >
                    <div>
                      <MonoChip className="mb-1.5 block text-ember">{kpi.label}</MonoChip>
                      <div className="font-display text-[clamp(34px,4vw,46px)] font-bold leading-none text-granite-100">
                        <Counter value={kpi.value} />
                      </div>
                    </div>
                    <span
                      className="inline-flex items-center gap-1 rounded-sm px-[11px] py-[7px]"
                      style={pillStyle}
                    >
                      <span className="text-[11px] leading-none">
                        {isFlat ? "—" : isUp ? "▲" : "▼"}
                      </span>
                      <span className="font-mono text-[10px] uppercase leading-none tracking-widest">
                        {isFlat ? "FLAT" : `${kpi.deltaPct}%`}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Database-health tiles */}
          <div className="mt-[22px] grid grid-cols-1 gap-3 min-[620px]:grid-cols-2">
            {analytics.health.map((tile) => (
              <div
                key={tile.label}
                className="rounded-sm border border-chalk-3 bg-chalk px-5 py-[18px]"
              >
                <MonoChip className="block text-slate-400">{tile.label}</MonoChip>
                <div className="mt-1.5 font-display text-[30px] font-bold leading-none text-granite-100">
                  {tile.value}
                </div>
                <MonoChip className="mt-1.5 block text-ember">{tile.sub}</MonoChip>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
