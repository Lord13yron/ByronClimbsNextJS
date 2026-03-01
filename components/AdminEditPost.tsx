"use client";

import { ContentImage, ContentVideo, Post } from "@/app/types/types";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
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
        console.log("Post edited successfully");
        toast.success("Post edited successfully!");
      })
      .catch((error) => {
        console.error("Error editing post:", error);
        toast.error("Failed to edit post");
      });
  }

  return (
    <div className="flex flex-col min-h-screen max-w-6xl w-full p-4 items-center mx-auto">
      <h1 className="mb-4 font-bold">Edit Post {post.title}</h1>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-4 w-full pr-4"
      >
        <Input type="hidden" name="post_id" value={post.id} />
        <Label htmlFor="title">Post Title</Label>
        <Input
          required
          defaultValue={post.title}
          type="text"
          name="title"
          placeholder="Title"
        />

        <Label htmlFor="content">Content</Label>
        <Textarea
          required
          defaultValue={post.content}
          name="content"
          placeholder="Content"
          className="h-48"
        />

        <Button type="submit">Edit Post</Button>
      </form>
      <div className="w-full flex flex-col mt-4 gap-2">
        <EditPostImages images={images || []} post={post} />
        <EditPostVideo videos={videos || []} post={post} />
      </div>
    </div>
  );
}
