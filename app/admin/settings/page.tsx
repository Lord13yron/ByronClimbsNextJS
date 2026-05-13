import MonoChip from "@/components/ui/MonoChip";
import TopoLine from "@/components/ui/TopoLine";

export default function AdminSettingsPage() {
  return (
    <div className="bg-chalk min-h-screen p-6 md:p-10">
      <div className="max-w-5xl mx-auto">

        <div className="mb-6">
          <MonoChip className="text-ember mb-3 block">— CONFIGURATION</MonoChip>
          <h1
            className="font-display uppercase font-extrabold leading-[0.92] tracking-[0.01em] text-granite-100"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Settings.
          </h1>
          <p className="mt-3 text-[15px] leading-[1.6] text-slate-700 font-body">
            Site settings and preferences.
          </p>
        </div>

        <div className="text-chalk-3 opacity-60">
          <TopoLine height={36} seed={6} />
        </div>

        <div className="mt-8 bg-chalk-2 border border-chalk-3 rounded-sm p-8">
          <MonoChip className="text-ember block mb-3">— GENERAL</MonoChip>
          <h2 className="font-display uppercase font-bold text-[28px] leading-none text-granite-100 mb-4">
            General settings.
          </h2>
          <p className="text-[15px] leading-[1.6] text-slate-400 font-body">
            Theme settings coming soon.
          </p>
        </div>

      </div>
    </div>
  );
}
