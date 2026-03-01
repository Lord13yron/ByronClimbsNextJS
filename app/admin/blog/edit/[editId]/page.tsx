import AdminBlog from "@/components/AdminBlog";
import AdminPostSkeleton from "@/components/AdminPostSkeleton";
import { Suspense } from "react";

export default async function AdminEditBlogPage({
  params,
}: {
  params: Promise<{ editId: string }>;
}) {
  const { editId } = await params;
  console.log("Editing blog post with ID:", editId);
  return (
    <Suspense fallback={<AdminPostSkeleton />}>
      <AdminBlog editId={editId} />
    </Suspense>
  );
}
