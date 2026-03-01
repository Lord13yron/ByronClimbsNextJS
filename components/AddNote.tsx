import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { FilePlusCorner } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { createNote } from "@/lib/actions";
import { Climb } from "@/app/types/types";
import { Input } from "./ui/input";

type AddNoteProps = {
  climb: Climb;
};

export default function AddNote({ climb }: AddNoteProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <FilePlusCorner />
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <form action={createNote}>
          <DialogHeader>
            <DialogTitle>Add a New Note</DialogTitle>
            <DialogDescription>
              Add a new note for this climb. Click save when you&#39;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mb-4">
            <div className="grid gap-3">
              <Input type="hidden" name="climb_id" value={climb.id} />
              <Input type="hidden" name="climb_slug" value={climb.slug} />
              <Label htmlFor="note">Note</Label>
              <Textarea
                id="note"
                name="note"
                placeholder="Type your note here."
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Save Note</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
