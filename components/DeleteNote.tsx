"use client";
import { Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Note } from "@/app/types/types";
import { deleteNote } from "@/lib/actions";
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

type DeleteNoteProps = {
  note: Note;
};

export default function DeleteNote({ note }: DeleteNoteProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger>
            <Trash2 />
          </TooltipTrigger>
          <TooltipContent>
            <p>delete note</p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            <div className="border-l-4 border-slate-400 pl-4 py-2 bg-slate-100 rounded">
              <div className="text-gray-800 mb-1 mr-1 flex justify-between">
                <p>{note.note}</p>
              </div>
              <div className="text-xs text-gray-500 flex justify-between mr-1">
                {note.created_at && (
                  <span>
                    • {new Date(note.created_at).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            This action cannot be undone. This will permanently delete this note
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={() => deleteNote(note.id)}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
