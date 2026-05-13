import PostsGrid from "@/components/PostsGrid";
import PostsGridSkeleton from "@/components/PostsGridSkeleton";
import MonoChip from "@/components/ui/MonoChip";
import TopoLine from "@/components/ui/TopoLine";
import { Suspense } from "react";

export const metadata = {
  title: "Admin — Blog",
  description: "Manage blog posts in the admin dashboard.",
};

export default async function AdminBlogPage() {
  return (
    <div className="bg-chalk min-h-screen p-6 md:p-10">
      <div className="max-w-5xl mx-auto">

        <div className="mb-6">
          <MonoChip className="text-ember mb-3 block">— THE FIELD JOURNAL</MonoChip>
          <h1
            className="font-display uppercase font-extrabold leading-[0.92] tracking-[0.01em] text-granite-100"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Blog posts.
          </h1>
          <p className="mt-3 text-[15px] leading-[1.6] text-slate-700 font-body">
            Edit, delete, or create new entries.
          </p>
        </div>

        <div className="text-chalk-3 opacity-60">
          <TopoLine height={36} seed={11} />
        </div>

        <div className="mt-8">
          <Suspense fallback={<PostsGridSkeleton />}>
            <PostsGrid type="admin" />
          </Suspense>
        </div>

      </div>
    </div>
  );
}
