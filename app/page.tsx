import HeroBanner from "@/components/HeroBanner";
import MainPageBlog from "@/components/MainPageBlog";
import MainPageDatabase from "@/components/MainPageDatabase";
import SupabaseAuthListener from "@/components/SupabaseAuthListener";
import Image from "next/image";

export const metadata = {
  title: "Byron Climbs - Your Ultimate Climbing Companion",
  description:
    "Discover climbing routes, track your progress, and connect with fellow climbers using Byron Climbs.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen mx-auto">
      <SupabaseAuthListener />
      <HeroBanner />
      <div className="flex flex-col min-h-screen max-w-6xl mx-0 sm:mx-auto px-4 w-full">
        <MainPageBlog />
        <MainPageDatabase />
        <div className=" border-t-2 border-gray-400 pt-8 mt-4">
          <Image
            src="/Background-3.jpg"
            alt="Logo"
            width={900}
            height={600}
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
