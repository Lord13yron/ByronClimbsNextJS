"use client";
import AddClimbImages from "@/components/AddClimbImages";
import AddClimbVideo from "@/components/AddClimbVideo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MonoChip from "@/components/ui/MonoChip";
import TopoLine from "@/components/ui/TopoLine";
import { Textarea } from "@/components/ui/textarea";
import { createBlogPost } from "@/lib/actions";
import { toast } from "sonner";

export default function AddBlogPage() {
  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    createBlogPost(formData)
      .then(() => {
        form.reset();
        toast.success("Blog post added successfully!");
      })
      .catch((error) => {
        console.error("Error adding blog post:", error);
        toast.error(error.message || "Failed to add blog post");
      });
  }

  return (
    <div className="bg-chalk min-h-screen p-6 md:p-10">
      <div className="max-w-5xl mx-auto">

        <div className="mb-6">
          <MonoChip className="text-ember mb-3 block">— ADD A POST</MonoChip>
          <h1
            className="font-display uppercase font-extrabold leading-[0.92] tracking-[0.01em] text-granite-100"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Write something.
          </h1>
          <p className="mt-3 text-[15px] leading-[1.6] text-slate-700 font-body">
            Add a new post to the blog.
          </p>
        </div>

        <div className="text-chalk-3 opacity-60">
          <TopoLine height={36} seed={11} />
        </div>

        <form onSubmit={handleFormSubmit}>
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
                <Input required type="text" name="title" placeholder="e.g. My First Ascent of..." />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono uppercase text-[11px] tracking-widest text-slate-500">
                  Content
                </label>
                <Textarea required name="content" className="h-64" placeholder="Write your post..." />
              </div>
            </div>
          </div>

          <div className="mt-4 bg-chalk-2 border border-chalk-3 rounded-sm p-8">
            <MonoChip className="text-ember block mb-3">— MEDIA</MonoChip>
            <h2 className="font-display uppercase font-bold text-[28px] leading-none text-granite-100 mb-6">
              Photos &amp; video.
            </h2>
            <div className="flex flex-col gap-4">
              <AddClimbImages type="blog" />
              <AddClimbVideo type="blog" />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button type="submit">Create Post</Button>
          </div>
        </form>

      </div>
    </div>
  );
}
