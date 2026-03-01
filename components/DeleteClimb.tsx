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
import { Climb } from "@/app/types/types";
import { deleteClimb } from "@/lib/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type DeleteClimbProps = {
  climb: Climb;
};

export default function DeleteClimb({ climb }: DeleteClimbProps) {
  const router = useRouter();
  function handleDelete() {
    try {
      deleteClimb(climb.id);
      toast.success(`Climb - "${climb.name}" deleted successfully!`);
      router.refresh();
    } catch (error) {
      console.error("Error deleting climb:", error);
      toast.error(
        `Failed to delete climb - "${climb.name}". Please try again.`,
      );
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
            Are you sure you want to delete this climb - {climb.name}? This
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
