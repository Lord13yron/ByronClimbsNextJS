import Link from "next/link";
import { getClimbs } from "@/lib/data-service";
import { getUser } from "@/lib/auth-actions";
import { Climb, Send } from "@/app/types/types";
import { createClient } from "@/lib/supabase/supabaseServer";
import GradeChip from "./ui/GradeChip";
import TypeGlyph from "./ui/TypeGlyph";
import MonoChip from "./ui/MonoChip";
import SendHeatmap from "./SendHeatmap";
import { TopoTile } from "./ui/TopoTile";
import Counter from "./anim/Counter";
import Reveal from "./anim/Reveal";
import DrawOn from "./anim/DrawOn";

type SendWithClimb = Send & { climbs: Climb };

async function getLogbookData() {
  try {
    const [climbs, user] = await Promise.all([getClimbs(), getUser()]);

    if (!user) {
      return { climbs, sends: [], sendsWithClimbs: [], totalCrags: 0 };
    }

    const supabase = await createClient();
    const { data: sendsWithClimbs } = await supabase
      .from("sends")
      .select("*, climbs(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    const sends = (sendsWithClimbs ?? []).map((s: SendWithClimb) => ({
      id: s.id,
      created_at: s.created_at,
      climb_id: s.climb_id,
      user_id: s.user_id,
    }));

    const totalCrags = new Set(climbs.map((c) => c.area)).size;

    return {
      climbs,
      sends,
      sendsWithClimbs: sendsWithClimbs ?? [],
      totalCrags,
    };
  } catch {
    const climbs = await getClimbs().catch(() => []);
    return { climbs, sends: [], sendsWithClimbs: [], totalCrags: 0 };
  }
}

function formatDate(dateString: string) {
  const d = new Date(dateString);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default async function MainPageDatabase() {
  const { climbs, sends, sendsWithClimbs, totalCrags } = await getLogbookData();
  const recentSends = sendsWithClimbs.slice(0, 4);

  return (
    <section className="bg-granite-200 text-chalk relative overflow-hidden">
      {/* Topo tile background */}
      <div className="absolute inset-0 text-chalk opacity-[0.06] pointer-events-none">
        <DrawOn duration={2.4} stagger={0.12}>
          <TopoTile height={700} />
        </DrawOn>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-14 py-12 md:py-18">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-10 lg:gap-12 items-start">
          {/* Left column */}
          <Reveal y={36} stagger={0.1} duration={0.9}>
            <MonoChip className="text-ember-soft mb-3.5 block">
              — THE LOGBOOK
            </MonoChip>
            <h2
              className="font-display uppercase font-bold text-chalk leading-[0.95] tracking-[0.01em]"
              style={{
                fontSize: "clamp(40px, 5vw, 64px)",
                textWrap: "balance",
              }}
            >
              Every climb,
              <br />
              logged honestly.
            </h2>
            <p
              className="mt-4 text-[15px] leading-[1.6] text-[rgba(244,241,236,0.7)] max-w-140 font-body"
              style={{ textWrap: "pretty" }}
            >
              A working database of climbs across the World that I have
              personally visited. Tick what you&apos;ve sent, star the projects,
              leave beta. Sign up to keep track of your climbing history and see
              your stats evolve over time.
            </p>

            <div className="mt-8">
              <Link
                href="/account/signup"
                className="inline-flex items-center font-display uppercase font-semibold text-[13px] tracking-[0.06em] px-5 py-2.5 bg-ember text-chalk border border-ember hover:bg-ember-deep hover:border-ember-deep transition-colors duration-150 rounded-sm"
              >
                Sign up →
              </Link>
            </div>

            {/* Stat strip */}
            <div className="mt-7 grid grid-cols-3 gap-4 pt-6 border-t border-[rgba(244,241,236,0.15)]">
              {[
                { v: climbs.length, l: "ROUTES LOGGED" },
                { v: sends.length, l: "PERSONAL SENDS" },
                { v: totalCrags, l: "CRAGS COVERED" },
              ].map((s, i) => (
                <div key={i}>
                  <div
                    className="font-display leading-none text-chalk"
                    style={{ fontSize: "clamp(34px, 4vw, 40px)" }}
                  >
                    <Counter value={s.v} />
                  </div>
                  <MonoChip className="text-[rgba(244,241,236,0.55)] mt-1.5 text-[9px] block">
                    {s.l}
                  </MonoChip>
                </div>
              ))}
            </div>

            {/* Heatmap */}
            {sends.length > 0 && (
              <div className="mt-8">
                <MonoChip className="text-[rgba(244,241,236,0.55)] mb-2.5 block">
                  SEND HEATMAP · LAST 26 WEEKS
                </MonoChip>
                <SendHeatmap sends={sends} />
              </div>
            )}

            <div className="mt-8">
              <Link
                href="/database"
                className="inline-flex items-center font-display uppercase font-semibold text-[13px] tracking-[0.06em] px-5 py-2.5 bg-ember text-chalk border border-ember hover:bg-ember-deep hover:border-ember-deep transition-colors duration-150 rounded-sm"
              >
                Open database →
              </Link>
            </div>
          </Reveal>

          {/* Right column — recent sends */}
          <div>
            <div className="flex justify-between items-center mb-3.5">
              <MonoChip className="text-[rgba(244,241,236,0.55)]">
                RECENT SENDS
              </MonoChip>
              {sends.length > 0 && (
                <MonoChip className="text-[rgba(244,241,236,0.55)]">
                  {String(recentSends.length).padStart(2, "0")} OF {sends.length}
                </MonoChip>
              )}
            </div>

            {recentSends.length > 0 ? (
              <Reveal
                className="bg-[rgba(244,241,236,0.04)] border border-[rgba(244,241,236,0.10)] rounded-sm overflow-hidden"
                x={26}
                stagger={0.1}
                duration={0.7}
              >
                {recentSends.map((send: SendWithClimb, i: number) => {
                  const c = send.climbs;
                  if (!c) return null;
                  return (
                    <Link
                      key={send.id}
                      href={`/database/${c.id}-${c.slug}`}
                      className={`grid grid-cols-[64px_1fr_75px] sm:grid-cols-[64px_1fr_90px_90px_50px] gap-3.5 px-4 py-4 items-center hover:bg-[rgba(244,241,236,0.05)] transition-colors ${
                        i < recentSends.length - 1
                          ? "border-b border-[rgba(244,241,236,0.08)]"
                          : ""
                      }`}
                    >
                      <GradeChip
                        grade={c.type === "boulder" ? "V" + c.grade : c.grade}
                        variant="ember"
                      />
                      <div className="min-w-0">
                        <div className="font-display uppercase sm:text-[18px] text-[14px] tracking-[0.02em] text-chalk truncate">
                          {c.name}
                        </div>
                        <MonoChip className="text-[rgba(244,241,236,0.55)] mt-0.5 block truncate">
                          {c.city} · {c.area}
                        </MonoChip>
                      </div>
                      <MonoChip className="text-[rgba(244,241,236,0.55)]">
                        {formatDate(send.created_at)}
                      </MonoChip>
                      <div className="flex items-center gap-1.5 text-[rgba(244,241,236,0.55)]">
                        <TypeGlyph
                          type={c.type}
                          size={12}
                          className="hidden sm:block"
                        />
                        <MonoChip className="text-[rgba(244,241,236,0.55)] hidden sm:block">
                          {c.type.toUpperCase()}
                        </MonoChip>
                      </div>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="shrink-0 hidden sm:block"
                      >
                        <rect
                          x="1"
                          y="1"
                          width="14"
                          height="14"
                          rx="2"
                          fill="var(--ember)"
                        />
                        <path
                          d="M4 8 L7 11 L12 5"
                          stroke="var(--chalk)"
                          strokeWidth="1.8"
                          strokeLinecap="square"
                        />
                      </svg>
                    </Link>
                  );
                })}
              </Reveal>
            ) : (
              <div className="bg-[rgba(244,241,236,0.04)] border border-[rgba(244,241,236,0.10)] rounded-sm p-8 text-center">
                <MonoChip className="text-[rgba(244,241,236,0.45)] block">
                  <Link href="/account/signin">LOG IN TO SEE YOUR SENDS</Link>
                </MonoChip>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
