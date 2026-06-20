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
      <span className="inline-flex items-baseline gap-3 text-chalk">
        <span>{username}.</span>
        <button
          onClick={() => setEditing(true)}
          aria-label="Edit username"
          className="shrink-0 cursor-pointer text-ember-soft opacity-[0.34] transition-opacity hover:opacity-100"
        >
          <Pencil className="h-7 w-7 md:h-10 md:w-10" />
        </button>
      </span>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2.5">
        <Input
          name="username"
          defaultValue={username}
          maxLength={20}
          autoFocus
          disabled={isPending}
          className="h-12 w-64 rounded-none border-0 border-b-[3px] border-ember bg-[rgba(244,241,236,0.08)] px-3 font-mono text-base text-chalk shadow-none focus-visible:ring-0"
        />
        <Button
          type="submit"
          size="sm"
          disabled={isPending}
          className="bg-ember text-chalk hover:bg-ember/90"
        >
          {isPending ? "Saving…" : "Save"}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setEditing(false)}
          disabled={isPending}
          className="border-chalk/40 bg-transparent text-chalk hover:bg-chalk/10 hover:text-chalk"
        >
          Cancel
        </Button>
      </div>
      {state && "error" in state && (
        <MonoChip className="text-[10px] text-red-400">{state.error}</MonoChip>
      )}
    </form>
  );
}
