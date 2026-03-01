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
import { ContentImage } from "@/app/types/types";
import { deleteClimbImage, deletePostImage } from "@/lib/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type DeleteImageProps = {
  image: ContentImage;
  type?: "climb" | "post";
};

export default function DeleteImage({
  image,
  type = "climb",
}: DeleteImageProps) {
  const router = useRouter();
  const path = image.url.split("/").pop();
  function handleDelete() {
    try {
      if (type === "climb") {
        deleteClimbImage(image.id, image.url);
      } else if (type === "post") {
        deletePostImage(image.id, image.url);
      }
      toast.success(`Image - "${path}" deleted successfully!`);
      router.refresh();
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error(`Failed to delete image - "${path}". Please try again.`);
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
            Are you sure you want to delete this image - {path}? This action
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
