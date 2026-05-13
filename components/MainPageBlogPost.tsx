import { Post } from "@/app/types/types";
import { getImagesForPost } from "@/lib/data-service";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import DeletePost from "./DeletePost";
import MonoChip from "./ui/MonoChip";

type MainPageBlogPostProps = {
  post: Post;
  type?: "admin" | "main";
};

export default async function MainPageBlogPost({
  post,
  type = "main",
}: MainPageBlogPostProps) {
  const images = await getImagesForPost(post.id);
  const formattedDate = new Date(post.created_at)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();

  return (
    <div className="bg-chalk-2 border border-chalk-3 rounded-sm overflow-hidden">
      {images && images.length > 0 ? (
        <Link href={`/blog/${post.id}`}>
          <div className="h-48 relative w-full">
            <Image
              src={images[0].url}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        </Link>
      ) : (
        <div className="h-48 bg-chalk-3" />
      )}

      <div className="p-4">
        {type === "admin" && (
          <div className="flex items-center gap-3 mb-3 pb-3 border-b border-chalk-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/admin/blog/edit/${post.id}`}
                  className="text-slate-400 hover:text-ember transition-colors"
                >
                  <SquarePen className="h-4 w-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Edit — {post.title}</TooltipContent>
            </Tooltip>
            <DeletePost post={post} />
          </div>
        )}

        <Link href={`/blog/${post.id}`}>
          <h3 className="font-display uppercase font-bold text-[16px] leading-tight text-granite-100">
            {post.title}
          </h3>
        </Link>

        <MonoChip className="text-slate-400 block mt-1">{formattedDate}</MonoChip>

        <Link href={`/blog/${post.id}`}>
          <p className="text-[13px] font-body text-slate-700 line-clamp-3 mt-2 leading-[1.6]">
            {post.content}
          </p>
          {post.content.length > 200 && (
            <span className="text-ember font-mono text-[11px] tracking-[0.08em] uppercase mt-2 block">
              Read more →
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}
