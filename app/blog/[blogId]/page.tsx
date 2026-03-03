import BlogPost from "@/components/BlogPost";
import BlogPostSkeleton from "@/components/BlogPostSkeleton";

import { getPostById } from "@/lib/data-service";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  const { title } = await getPostById(Number(blogId));
  return {
    title: `Blog: ${title}`,
    description: `Explore the details of Blog ${title}, including pictures and description.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <BlogPost blogId={blogId} />
    </Suspense>
  );
}
