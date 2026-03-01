"use client";
import AddClimbImages from "@/components/AddClimbImages";
import AddClimbVideo from "@/components/AddClimbVideo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
        console.log("Blog post added successfully");
        form.reset();
        toast.success("Blog post added successfully!");
      })
      .catch((error) => {
        console.error("Error adding blog post:", error);
        toast.error(error.message || "Failed to add blog post");
      });
  }

  return (
    <div className="flex flex-col min-h-screen max-w-6xl w-full mx-auto px-4 ">
      <h1 className="text-4xl font-bold text-center mt-8 mb-4">
        Add New Blog Post
      </h1>
      <p className="text-center mb-8">
        Use the form below to create a new blog post for your climbing blog.
        Fill in the title, content, and upload images to share your climbing
        stories and tips with your audience.
      </p>
      <div className="flex flex-col min-h-screen max-w-2xl w-full p-4 items-center mx-auto">
        <h1 className=" mb-4">Add a new Climb</h1>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-4 w-full"
        >
          <Input required type="text" name="title" placeholder="Title" />

          <Textarea
            required
            name="content"
            className="h-48"
            placeholder="Content"
          />
          <AddClimbImages type="blog" />
          <AddClimbVideo type="blog" />
          <Button type="submit">Create Post</Button>
        </form>
      </div>
    </div>
  );
}
