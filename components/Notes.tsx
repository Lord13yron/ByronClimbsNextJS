import { Climb, Note } from "@/app/types/types";
import { NotebookPen } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import AddNote from "./AddNote";
import DeleteNote from "./DeleteNote";
import EditNote from "./editNote";

type NotesProps = {
  notes: Note[];
  climb: Climb;
};

export default function Notes({ notes, climb }: NotesProps) {
  return (
    <section className="w-full max-w-3xl mt-10 mb-8 bg-secondary/80 rounded-lg shadow-lg border p-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <NotebookPen /> Notes
        </h2>
        <Tooltip>
          <TooltipTrigger>
            <AddNote climb={climb} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Add new note</p>
          </TooltipContent>
        </Tooltip>
      </div>
      {notes && notes.length > 0 ? (
        <ul className="space-y-4">
          {notes.map((note, idx: number) => (
            <li
              key={note.id || idx}
              className="border-l-4 border-slate-400 pl-4 py-2 bg-slate-200 rounded"
            >
              <div className="text-gray-800 mb-1 mr-1 flex justify-between">
                <p>{note.note}</p>
                <EditNote note={note} climb={climb} />
              </div>
              <div className="text-xs text-gray-500 flex justify-between mr-1">
                {note.created_at && (
                  <span>
                    • {new Date(note.created_at).toLocaleDateString()}
                  </span>
                )}
                <DeleteNote note={note} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-500 italic">No notes yet for this climb.</div>
      )}
    </section>
  );
}
