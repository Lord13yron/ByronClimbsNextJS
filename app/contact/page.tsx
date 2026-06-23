import { Metadata } from "next";
import MonoChip from "@/components/ui/MonoChip";
import ScrollRefresh from "@/components/anim/ScrollRefresh";
import ContactHero from "@/components/contact/ContactHero";
import BelayRope from "@/components/contact/BelayRope";
import SideNoteCard from "@/components/contact/SideNoteCard";
import ContactCTA from "@/components/contact/ContactCTA";

export const metadata: Metadata = {
  title: "Contact | Byron Climbs",
  description:
    "Get in touch with Byron — whether you want to share beta, meet up for a session, or just talk climbing.",
};

export default function ContactPage() {
  return (
    <div className="bg-chalk">
      <ScrollRefresh />

      <ContactHero />

      {/* Body — three ways to clip in + personal note */}
      <section
        className="mx-auto max-w-295"
        style={{
          padding:
            "clamp(56px,8vw,96px) clamp(20px,5vw,56px) clamp(48px,7vw,80px)",
        }}
      >
        <div className="mb-[clamp(36px,5vw,56px)] max-w-170">
          <MonoChip className="mb-3 block text-ember">
            — THREE WAYS TO CLIP IN
          </MonoChip>
          <h2
            className="font-display font-bold uppercase leading-[0.96] tracking-[0.01em] text-granite-100"
            style={{ fontSize: "clamp(30px,5vw,52px)" }}
          >
            Reach me from anywhere on the route.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-11 min-[881px]:grid-cols-[1.05fr_0.95fr] min-[881px]:items-start min-[881px]:gap-[clamp(36px,5vw,72px)]">
          <BelayRope />
          <div className="min-[881px]:sticky min-[881px]:top-24">
            <SideNoteCard />
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}
