"use client";
import { Trash2 } from "lucide-react";
import { Post } from "@/app/types/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deletePost } from "@/lib/actions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type DeletePostProps = {
  post: Post;
};

export default function DeletePost({ post }: DeletePostProps) {
  const router = useRouter();
  function handleDelete() {
    try {
      deletePost(post.id);
      toast.success(`Post - "${post.title}" deleted successfully!`);
      router.refresh();
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error(`Failed to delete post - "${post.title}". Please try again.`);
    }
  }
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Trash2 className="h-5 hover:cursor-pointer hover:text-red-600" />
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Delete Post - {post.title}</TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post - {post.title}? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleDelete} type="button">
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
