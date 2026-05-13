import { Metadata } from "next";
import Link from "next/link";
import MonoChip from "@/components/ui/MonoChip";
import TopoLine from "@/components/ui/TopoLine";

export const metadata: Metadata = {
  title: "Contact | Byron Climbs",
  description:
    "Get in touch with Byron — whether you want to share beta, meet up for a session, or just talk climbing.",
};

export default function ContactPage() {
  return (
    <div className="bg-chalk min-h-screen">
      {/* Masthead */}
      <section className="max-w-7xl mx-auto px-4 md:px-14 pt-10 md:pt-16 pb-8">
        <MonoChip className="text-ember mb-3 block">— CONTACT</MonoChip>
        <h1
          className="font-display uppercase font-extrabold leading-[0.92] tracking-[0.01em] text-granite-100 text-balance"
          style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
        >
          Find me on
          <br />
          the wall.
        </h1>
        <p
          className="mt-4 text-[15px] md:text-[16px] leading-[1.6] text-slate-700 max-w-xl font-body"
          style={{ textWrap: "pretty" }}
        >
          If you&apos;re in the Kelowna area and want to share beta or meet up
          for a session, I&apos;d love to hear from you.
        </p>
      </section>

      {/* Topo divider */}
      <div className="max-w-7xl mx-auto px-4 md:px-14 text-chalk-3 opacity-60">
        <TopoLine height={36} seed={2} />
      </div>

      {/* Contact content */}
      <section className="max-w-7xl mx-auto px-4 md:px-14 pt-10 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-10 md:gap-20 items-start">
          {/* Left — contact methods */}
          <div className="flex flex-col gap-8">
            <div>
              <MonoChip className="text-slate-500 mb-3 block">— EMAIL</MonoChip>
              <Link
                href="mailto:byron.climbs.rocks@gmail.com"
                className="font-display uppercase font-semibold text-[20px] md:text-[24px] leading-none text-granite-100 hover:text-ember transition-colors"
              >
                byron.climbs.rocks
                <br />
                @gmail.com
              </Link>
            </div>

            <div className="border-t border-dashed border-chalk-3" />

            <div>
              <MonoChip className="text-slate-500 mb-3 block">
                — INSTAGRAM
              </MonoChip>
              <a
                href="https://www.instagram.com/byron.hayes.77"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display uppercase font-semibold text-[20px] md:text-[24px] leading-none text-granite-100 hover:text-ember transition-colors"
              >
                @byron.hayes.77
              </a>
            </div>
          </div>

          {/* Right — personal note */}
          <div className="pt-1">
            <h2 className="font-display uppercase font-bold text-[26px] md:text-[32px] leading-none text-granite-100 mb-5">
              Always down for a session.
            </h2>
            <p
              className="text-[15px] leading-[1.6] text-slate-700 font-body mb-4"
              style={{ textWrap: "pretty" }}
            >
              You&apos;ll usually find me at the Boulderfields or Cougar Canyon
              on weekends. If you want to connect before that, email is the best
              way to reach me — I check it regularly and I&apos;m always happy
              to talk climbing, share local beta, or point someone toward a good
              project.
            </p>
            <p
              className="text-[15px] leading-[1.6] text-slate-700 font-body"
              style={{ textWrap: "pretty" }}
            >
              For more casual updates — sends, conditions, trip photos — follow
              along on Instagram.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
