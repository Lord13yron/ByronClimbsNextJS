import { Post } from "@/app/types/types";
import { getImagesForPost } from "@/lib/data-service";
import { ChevronsRight, SquarePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import DeletePost from "./DeletePost";

type MainPageBlogPostProps = {
  post: Post;
  type?: "admin" | "main";
};

export default async function MainPageBlogPost({
  post,
  type = "main",
}: MainPageBlogPostProps) {
  const images = await getImagesForPost(post.id);

  return (
    <div key={post.id} className="mb-4">
      {images && images.length > 0 && (
        <Link href={`/blog/${post.id}`}>
          <div className="h-60 relative w-full    ">
            <Image
              src={images[0].url}
              alt={post.title}
              fill
              sizes="sm:50vw 100vw"
              className="object-contain"
            />
          </div>
        </Link>
      )}
      {type === "admin" && (
        <div className="flex items-center justify-center mt-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/admin/blog/edit/${post.id}`}
                className="hover:text-green-700"
              >
                <SquarePen className="my-auto h-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>Edit Post - {post.title}</TooltipContent>
          </Tooltip>
          <DeletePost post={post} />
        </div>
      )}
      <div className="flex gap-2 items-center justify-center mt-2">
        <Link href={`/blog/${post.id}`}>
          <h3 className="text-xl font-semibold  ">{post.title}</h3>
        </Link>
      </div>

      <Link href={`/blog/${post.id}`}>
        <p className="text-gray-500 text-sm text-center mb-2">
          {new Date(post.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="line-clamp-4 overflow-hidden text-ellipsis">
          {post.content}
        </p>
        {post.content.length > 200 && (
          <div className="text-blue-600 hover:underline flex justify-center items-center">
            <p>Read more</p> <ChevronsRight className="h-4" />
          </div>
        )}
      </Link>
    </div>
  );
}
