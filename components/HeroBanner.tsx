import Image from "next/image";
import Link from "next/link";
import { getUser } from "@/lib/auth-actions";
import { createClient } from "@/lib/supabase/supabaseServer";
import GradeChip from "./ui/GradeChip";
import MonoChip from "./ui/MonoChip";

async function getLatestSendWithClimb() {
  try {
    const user = await getUser();
    if (!user) return null;

    const supabase = await createClient();
    const { data } = await supabase
      .from("sends")
      .select("*, climbs(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    return data ?? null;
  } catch {
    return null;
  }
}

function formatDate(dateString: string) {
  const d = new Date(dateString);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default async function HeroBanner() {
  const latestSend = await getLatestSendWithClimb();
  const climb = latestSend?.climbs ?? null;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(520px, 44vw, 640px)" }}
    >
      {/* Background photo */}
      <Image
        src="/hero-boulder-bw.jpg"
        alt="Boulder problem"
        fill
        className="object-cover object-[center_35%]"
        priority
        sizes="100vw"
      />

      {/* Overlays */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 75% 20%, rgba(200,84,30,0.20), transparent 55%),
            linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.65) 100%)
          `,
        }}
      />

      {/* Wordmark — bottom left */}
      <div className="absolute bottom-50 md:bottom-30.5 left-4 md:left-14 max-w-[90%] md:max-w-180 text-chalk">
        <h1
          className="font-display uppercase font-extrabold leading-[0.92] tracking-[0.01em] text-chalk"
          style={{ fontSize: "clamp(56px, 8vw, 108px)", textWrap: "balance" }}
        >
          Notes from
          <br />
          the gneiss.
        </h1>
        <p
          className="mt-4 max-w-130 text-[13px] md:text-[16px] leading-[1.55] text-chalk font-body [text-shadow:0_1px_6px_rgba(0,0,0,0.55)]"
          style={{ textWrap: "pretty" }}
        >
          Hey there! I&apos;m Byron, a Kelowna-based climber who started
          climbing at 38 years old and has been hooked for the last 7 years. I
          share insights on bouldering, my transition into sport climbing, and
          local beta from the Okanagan&apos;s best climbing spots.
        </p>
        <div className="flex gap-2.5 mt-5 flex-wrap">
          <Link
            href="/blog"
            className="inline-flex items-center font-display uppercase font-semibold text-[13px] tracking-[0.06em] px-5 py-2.5 bg-ember text-chalk border border-ember hover:bg-ember-deep hover:border-ember-deep transition-colors duration-150 rounded-sm"
          >
            Read latest entry →
          </Link>
          <Link
            href="/database"
            className="inline-flex items-center font-display uppercase font-semibold text-[13px] tracking-[0.06em] px-5 py-2.5 bg-transparent text-chalk border border-[rgba(244,241,236,0.5)] hover:bg-[rgba(244,241,236,0.1)] transition-colors duration-150 rounded-sm"
          >
            Browse the database
          </Link>
        </div>
      </div>

      {/* Recent send card — bottom right */}
      {climb && (
        <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 w-[calc(100%-32px)] md:w-[320px] bg-chalk border border-chalk-3 p-4.5 rounded-sm opacity-85">
          <div className="flex justify-between items-center mb-3">
            <MonoChip className="text-ember">● LATEST SEND</MonoChip>
            <MonoChip>{formatDate(latestSend!.created_at)}</MonoChip>
          </div>
          <div className="flex items-start gap-3.5">
            <GradeChip grade={climb.grade} variant="ember" />
            <div className="flex-1 min-w-0">
              <h3 className="font-display uppercase font-semibold text-[22px] leading-[1.05] text-granite-100 truncate">
                {climb.name}
              </h3>
              <MonoChip className="mt-1 text-slate-500 block truncate">
                {climb.city} · {climb.area}
              </MonoChip>
            </div>
          </div>
          <div className="mt-3.5 pt-3 border-t border-dashed border-chalk-3 flex justify-between">
            <div>
              <MonoChip className="text-[9px] text-slate-500">AREA</MonoChip>
              <div className="font-display text-[15px] leading-none mt-1 text-granite-100 uppercase">
                {climb.subArea || climb.area}
              </div>
            </div>
            <div>
              <MonoChip className="text-[9px] text-slate-500">TYPE</MonoChip>
              <div className="font-display uppercase text-[13px] leading-none mt-1.5 text-granite-100">
                {climb.type}
              </div>
            </div>
            <div>
              <MonoChip className="text-[9px] text-slate-500">GRADE</MonoChip>
              <div className="font-display text-[15px] leading-none mt-1 text-granite-100">
                {climb.type === "boulder" ? `V${climb.grade}` : climb.grade}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
