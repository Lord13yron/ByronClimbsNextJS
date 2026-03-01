"use client";
import { Trash2 } from "lucide-react";
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
import { ContentVideo } from "@/app/types/types";
import { deleteClimbVideo, deletePostVideo } from "@/lib/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type DeleteVideoProps = {
  video: ContentVideo;
  type?: "climb" | "post";
};

export default function DeleteVideo({
  video,
  type = "climb",
}: DeleteVideoProps) {
  const router = useRouter();
  const path = video.url.split("/").pop();
  function handleDelete() {
    try {
      if (type === "climb") {
        deleteClimbVideo(video.id);
      } else if (type === "post") {
        deletePostVideo(video.id);
      }
      toast.success(`Video - "${path}" deleted successfully!`);
      router.refresh();
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error(`Failed to delete video - "${path}". Please try again.`);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash2 className="h-4 w-4 hover:text-red-600 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this video - {path}? This action
            cannot be undone.
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
