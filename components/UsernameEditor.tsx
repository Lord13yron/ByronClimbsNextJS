"use client";

import { useActionState, useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { updateUsername } from "@/lib/actions";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import MonoChip from "./ui/MonoChip";

type Props = { username: string };

export default function UsernameEditor({ username }: Props) {
  const [editing, setEditing] = useState(false);
  const [state, formAction, isPending] = useActionState(updateUsername, null);

  useEffect(() => {
    if (state && "success" in state) setEditing(false);
  }, [state]);

  if (!editing) {
    return (
      <div className="font-display uppercase text-[56px] md:text-[108px] text-granite-100 leading-[0.92] tracking-[0.01em] flex items-baseline gap-3">
        <span>{username}.</span>
        <button
          onClick={() => setEditing(true)}
          aria-label="Edit username"
          className="opacity-30 hover:opacity-100 hover:text-ember transition-all cursor-pointer shrink-0"
        >
          <Pencil className="w-5 h-5 md:w-7 md:h-7" />
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-2 mt-1">
      <div className="flex items-center gap-2 flex-wrap">
        <Input
          name="username"
          defaultValue={username}
          maxLength={20}
          autoFocus
          className="w-44 h-8 text-sm font-mono"
          disabled={isPending}
        />
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? "Saving…" : "Save"}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => setEditing(false)}
          disabled={isPending}
        >
          Cancel
        </Button>
      </div>
      {state && "error" in state && (
        <MonoChip className="text-red-500 text-[10px]">{state.error}</MonoChip>
      )}
    </form>
  );
}
