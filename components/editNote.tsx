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
import { SquarePen } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { editNote } from "@/lib/actions";
import { Climb, Note } from "@/app/types/types";
import { Input } from "./ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type EditNoteProps = {
  note: Note;
  climb: Climb;
};

export default function EditNote({ note, climb }: EditNoteProps) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Dialog>
          <DialogTrigger asChild>
            <SquarePen className="h-5" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-106.25">
            <form action={editNote}>
              <DialogHeader>
                <DialogTitle>Add a New Note</DialogTitle>
                <DialogDescription>
                  Add a new note for this climb. Click save when you&#39;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 mb-4">
                <div className="grid gap-3">
                  <Input type="hidden" name="note_id" value={note.id} />
                  <Input type="hidden" name="climb_slug" value={climb.slug} />
                  <Label htmlFor="note">Note</Label>
                  <Textarea
                    id="note"
                    name="note"
                    defaultValue={note.note}
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
      </TooltipTrigger>

      <TooltipContent>
        <p>edit note</p>
      </TooltipContent>
    </Tooltip>
  );
}
