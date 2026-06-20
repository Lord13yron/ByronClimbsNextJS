import { Climb, Note } from "@/app/types/types";
import AddNote from "./AddNote";
import DeleteNote from "./DeleteNote";
import EditNote from "./editNote";
import MonoChip from "./ui/MonoChip";
import Reveal from "./anim/Reveal";

type NotesProps = {
  notes: Note[];
  climb: Climb;
  /** Admin view: render the same editorial styling without owner controls. */
  readOnly?: boolean;
};

export default function Notes({ notes, climb, readOnly = false }: NotesProps) {
  return (
    <div>
      <MonoChip className="text-ember mb-5 block">— NOTES</MonoChip>

      {notes && notes.length > 0 ? (
        <Reveal
          className="flex flex-col gap-[18px]"
          y={24}
          stagger={0.1}
          duration={0.7}
        >
          {notes.map((note, idx) => (
            <div key={note.id || idx} className="group">
              <p
                className="font-body text-[#2A2A2C] leading-[1.72] max-w-[64ch] [text-wrap:pretty]"
                style={{ fontSize: "clamp(15px, 1.5vw, 17px)" }}
              >
                {note.note}
              </p>
              {!readOnly && (
                <div className="flex items-center gap-3 mt-2 text-slate-400 opacity-40 transition-opacity group-hover:opacity-100 focus-within:opacity-100 [&_svg]:w-4 [&_svg]:h-4 [&_button]:cursor-pointer">
                  {note.created_at && (
                    <MonoChip className="text-slate-400">
                      {new Date(note.created_at).toLocaleDateString()}
                    </MonoChip>
                  )}
                  <span className="hover:text-ember transition-colors">
                    <EditNote note={note} climb={climb} />
                  </span>
                  <span className="hover:text-ember transition-colors">
                    <DeleteNote note={note} />
                  </span>
                </div>
              )}
            </div>
          ))}
        </Reveal>
      ) : (
        !readOnly && (
          <p className="font-body text-slate-400 italic">
            No notes yet for this climb.
          </p>
        )
      )}

      {!readOnly && (
        <div className="mt-6 inline-flex items-center text-slate-500 transition-colors hover:text-ember [&_button]:cursor-pointer">
          <AddNote climb={climb} />
        </div>
      )}
    </div>
  );
}
