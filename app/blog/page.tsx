import PostsGrid from "@/components/PostsGrid";
import PostsGridSkeleton from "@/components/PostsGridSkeleton";
import { Suspense } from "react";

export const metadata = {
  title: "Climbing Blog",
  description: "Explore articles, tips, and stories from the climbing world.",
};

export default async function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen max-w-6xl w-full mx-auto px-4 ">
      <h1 className="text-4xl font-bold text-center mt-8 mb-4">
        Climbing Blog
      </h1>
      <p className="text-center mb-8">
        Explore articles, tips, and stories from the climbing world.
      </p>
      <Suspense fallback={<PostsGridSkeleton />}>
        <PostsGrid />
      </Suspense>
    </div>
  );
}
