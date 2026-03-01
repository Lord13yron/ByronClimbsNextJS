import { getRecentPosts } from "@/lib/data-service";
import MainPageBlogPost from "./MainPageBlogPost";

type PostsGridProps = {
  type?: "admin" | "main";
  limit?: number;
};

export default async function PostsGrid({
  type = "main",
  limit,
}: PostsGridProps) {
  const posts = limit ? await getRecentPosts(limit) : await getRecentPosts();
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3  ">
      {posts.map((post) => (
        <MainPageBlogPost key={post.id} post={post} type={type} />
      ))}
    </div>
  );
}
