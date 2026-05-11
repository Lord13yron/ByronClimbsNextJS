import Image from "next/image";
import Link from "next/link";
import MonoChip from "@/components/ui/MonoChip";
import TopoLine from "@/components/ui/TopoLine";

export const metadata = {
  title: "About Byron",
  description:
    "Discover the climbing journey of Byron, a passionate climber who started at 38. Learn about his experiences, favorite crags in Kelowna, and his transition from bouldering to sport climbing.",
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

export default function AboutPage() {
  return (
    <div className="bg-chalk min-h-screen">
      {/* Masthead */}
      <section className="max-w-7xl mx-auto px-4 md:px-14 pt-10 md:pt-16 pb-8">
        <MonoChip className="text-ember mb-3 block">— ABOUT BYRON</MonoChip>
        <h1
          className="font-display uppercase font-extrabold leading-[0.92] tracking-[0.01em] text-granite-100 text-balance"
          style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
        >
          Started late.
          <br />
          Stayed forever.
        </h1>
        <p
          className="mt-4 text-[15px] md:text-[16px] leading-[1.6] text-slate-700 max-w-2xl font-body"
          style={{ textWrap: "pretty" }}
        >
          I&apos;m Byron — a Kelowna-based climber who picked up the sport at 38
          and has been hooked for the past seven years. This is where I log the
          sends, share the beta, and document the journey.
        </p>
      </section>

      {/* Topo divider */}
      <div className="max-w-7xl mx-auto px-4 md:px-14 text-chalk-3 opacity-60">
        <TopoLine height={36} seed={5} />
      </div>

      {/* Hero image */}
      <section className="max-w-7xl mx-auto px-4 md:px-14 pt-6 pb-10">
        <div className="relative w-full h-80 md:h-125 overflow-hidden rounded-sm">
          <Image
            src={`${SUPABASE_URL}/storage/v1/object/public/ui-images/Background-2.JPEG`}
            alt="Byron climbing"
            fill
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover object-[center_30%]"
            priority
          />
        </div>
      </section>

      {/* Content sections */}
      <section className="max-w-7xl mx-auto px-4 md:px-14 pb-10">
        <div className="flex flex-col gap-12 md:gap-16">
          {/* The Journey */}
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-14 items-start">
            <MonoChip className="text-ember pt-1 block">— THE JOURNEY</MonoChip>
            <div>
              <h2 className="font-display uppercase font-bold text-[28px] md:text-[34px] leading-none text-granite-100 mb-4">
                My climbing journey
              </h2>
              <p
                className="text-[15px] leading-[1.6] text-slate-700 font-body mb-4"
                style={{ textWrap: "pretty" }}
              >
                I started climbing at 38, which some might consider a late start
                in a sport often dominated by younger athletes. But that
                &quot;late start&quot; has given me a unique perspective — one
                that values patience, celebrates incremental progress, and
                proves that age is just a number when it comes to pursuing your
                passions.
              </p>
              <p
                className="text-[15px] leading-[1.6] text-slate-700 font-body"
                style={{ textWrap: "pretty" }}
              >
                For the past 7 years, climbing has been my obsession. What began
                as curiosity has evolved into a lifestyle that shapes how I
                spend my weekends, who I connect with, and how I challenge
                myself both physically and mentally.
              </p>
            </div>
          </div>

          <div className="border-t border-dashed border-chalk-3" />

          {/* The Crags */}
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-14 items-start">
            <MonoChip className="text-ember pt-1 block">— THE CRAGS</MonoChip>
            <div>
              <h2 className="font-display uppercase font-bold text-[28px] md:text-[34px] leading-none text-granite-100 mb-4">
                My home crags
              </h2>
              <p
                className="text-[15px] leading-[1.6] text-slate-700 font-body"
                style={{ textWrap: "pretty" }}
              >
                I&apos;m based in Kelowna, BC, and I couldn&apos;t ask for a
                better climbing playground. The Okanagan has become my outdoor
                classroom, with the Boulderfields and Cougar Canyon serving as
                my primary training grounds. These areas have taught me
                everything from basic technique to reading rock and pushing my
                limits on challenging problems.
              </p>
            </div>
          </div>

          {/* Crag image */}
          <div className="relative w-full h-65 md:h-100 overflow-hidden rounded-sm">
            <Image
              src={`${SUPABASE_URL}/storage/v1/object/public/ui-images/Background-1.JPG`}
              alt="Climbing in Kelowna"
              fill
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover object-center"
            />
          </div>

          <div className="border-t border-dashed border-chalk-3" />

          {/* The Discipline */}
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-14 items-start">
            <MonoChip className="text-ember pt-1 block">
              — THE DISCIPLINE
            </MonoChip>
            <div>
              <h2 className="font-display uppercase font-bold text-[28px] md:text-[34px] leading-none text-granite-100 mb-4">
                From bouldering to sport
              </h2>
              <p
                className="text-[15px] leading-[1.6] text-slate-700 font-body mb-4"
                style={{ textWrap: "pretty" }}
              >
                Bouldering has been my primary focus since I started.
                There&apos;s something pure about it — just you, the rock, and a
                crash pad. No ropes, no partners needed, just problem-solving in
                its rawest form.
              </p>
              <p
                className="text-[15px] leading-[1.6] text-slate-700 font-body"
                style={{ textWrap: "pretty" }}
              >
                But lately, I&apos;ve felt the pull toward sport climbing. The
                endurance component, the exposure, and the technical rope work
                represent a new frontier I&apos;m eager to explore — and the
                kind of journey I want to share through this blog.
              </p>
            </div>
          </div>

          <div className="border-t border-dashed border-chalk-3" />

          {/* The Mission */}
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-14 items-start">
            <MonoChip className="text-ember pt-1 block">— THE MISSION</MonoChip>
            <div>
              <h2 className="font-display uppercase font-bold text-[28px] md:text-[34px] leading-none text-granite-100 mb-4">
                Why this blog?
              </h2>
              <p
                className="text-[15px] leading-[1.6] text-slate-700 font-body mb-4"
                style={{ textWrap: "pretty" }}
              >
                I created this blog because I wish I&apos;d had a resource like
                this when I started — someone who could speak to the experience
                of coming to climbing later in life, navigating the learning
                curve without the fearlessness of youth, and building strength
                and technique from scratch as an adult.
              </p>
              <p
                className="text-[15px] leading-[1.6] text-slate-700 font-body"
                style={{ textWrap: "pretty" }}
              >
                Whether you&apos;re thinking about trying climbing for the first
                time at 30, 40, 50, or beyond — or you&apos;re an experienced
                climber curious about the Okanagan scene — I hope you&apos;ll
                find something valuable here. Honest insights, practical tips,
                local beta, and maybe a little inspiration to start your own
                journey, regardless of age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Topo divider */}
      <div className="max-w-7xl mx-auto px-4 md:px-14 text-chalk-3 opacity-60 mt-6">
        <TopoLine height={36} seed={9} />
      </div>

      {/* Connect CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-14 pt-10 pb-16 md:pb-24">
        <MonoChip className="text-ember mb-3 block">
          — LET&apos;S CONNECT
        </MonoChip>
        <h2 className="font-display uppercase font-bold text-[28px] md:text-[40px] leading-none text-granite-100 mb-4 text-balance">
          Find me at the
          <br />
          Boulderfields.
        </h2>
        <p
          className="text-[15px] leading-[1.6] text-slate-700 font-body max-w-xl mb-6"
          style={{ textWrap: "pretty" }}
        >
          Climbing is as much about community as it is about personal
          achievement. If you&apos;re in the Kelowna area and want to share
          beta, meet up for a session, or just talk climbing over coffee —
          I&apos;d love to hear from you.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center font-display uppercase font-semibold text-[13px] tracking-[0.06em] px-5 py-2.5 bg-ember text-chalk border border-ember hover:bg-ember-deep hover:border-ember-deep transition-colors duration-150 rounded-sm"
        >
          Get in touch →
        </Link>
      </section>
    </div>
  );
}
