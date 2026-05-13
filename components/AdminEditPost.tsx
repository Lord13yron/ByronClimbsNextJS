"use client";

import { ContentImage, ContentVideo, Post } from "@/app/types/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MonoChip from "./ui/MonoChip";
import TopoLine from "./ui/TopoLine";
import { editBlogPost } from "@/lib/actions";
import { toast } from "sonner";
import EditPostImages from "./EditPostImages";
import EditPostVideo from "./EditPostVideo";

type AdminEditPostProps = {
  post: Post;
  images: ContentImage[];
  videos: ContentVideo[];
};

export default function AdminEditPost({
  post,
  images,
  videos,
}: AdminEditPostProps) {
  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    editBlogPost(formData)
      .then(() => {
        toast.success("Post edited successfully!");
      })
      .catch((error) => {
        console.error("Error editing post:", error);
        toast.error("Failed to edit post");
      });
  }

  return (
    <div className="bg-chalk min-h-screen p-6 md:p-10">
      <div className="max-w-5xl mx-auto">

        <div className="mb-6">
          <MonoChip className="text-ember mb-3 block">— EDIT POST</MonoChip>
          <h1
            className="font-display uppercase font-extrabold leading-[0.92] tracking-[0.01em] text-granite-100"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            {post.title}.
          </h1>
          <p className="mt-3 text-[15px] leading-[1.6] text-slate-700 font-body">
            Edit post details, photos, and video.
          </p>
        </div>

        <div className="text-chalk-3 opacity-60">
          <TopoLine height={36} seed={12} />
        </div>

        <form onSubmit={handleFormSubmit}>
          <Input type="hidden" name="post_id" value={post.id} />

          <div className="mt-8 bg-chalk-2 border border-chalk-3 rounded-sm p-8">
            <MonoChip className="text-ember block mb-3">— POST DETAILS</MonoChip>
            <h2 className="font-display uppercase font-bold text-[28px] leading-none text-granite-100 mb-6">
              Post information.
            </h2>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono uppercase text-[11px] tracking-widest text-slate-500">
                  Title
                </label>
                <Input
                  required
                  defaultValue={post.title}
                  type="text"
                  name="title"
                  placeholder="Title"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono uppercase text-[11px] tracking-widest text-slate-500">
                  Content
                </label>
                <Textarea
                  required
                  defaultValue={post.content}
                  name="content"
                  placeholder="Content"
                  className="h-64"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>

        <div className="mt-4 bg-chalk-2 border border-chalk-3 rounded-sm p-8">
          <MonoChip className="text-ember block mb-3">— MEDIA</MonoChip>
          <h2 className="font-display uppercase font-bold text-[28px] leading-none text-granite-100 mb-6">
            Photos &amp; video.
          </h2>
          <div className="flex flex-col gap-4">
            <EditPostImages images={images || []} post={post} />
            <EditPostVideo videos={videos || []} post={post} />
          </div>
        </div>

      </div>
    </div>
  );
}
