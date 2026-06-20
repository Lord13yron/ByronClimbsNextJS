import HeroBanner from "@/components/HeroBanner";
import MainPageBlog from "@/components/MainPageBlog";
import MainPageDatabase from "@/components/MainPageDatabase";
import SupabaseAuthListener from "@/components/SupabaseAuthListener";
import TopoLine from "@/components/ui/TopoLine";
import DrawOn from "@/components/anim/DrawOn";

export const metadata = {
  title: "Byron Climbs",
  description:
    "A personal climbing journal — routes logged, sends marked, beta left behind.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SupabaseAuthListener />
      <HeroBanner />
      <MainPageBlog />
      {/* Topo divider */}
      <DrawOn className="px-4 md:px-14 text-chalk-3">
        <TopoLine height={48} seed={3} />
      </DrawOn>
      <MainPageDatabase />
    </div>
  );
}
