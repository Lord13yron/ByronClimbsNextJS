"use client";
import { useEffect, useState } from "react";
import { addClimbToSends, removeClimbFromSends } from "@/lib/actions";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Send } from "@/app/types/types";
import { Square, SquareCheckBig } from "lucide-react";

type TickBoxProps = {
  size?: number;
  climbId: number;
  sends?: Send[];
};

export default function TickBox({ size, climbId, sends }: TickBoxProps) {
  const initialIsSent =
    sends?.some((send) => send.climb_id === climbId) || false;
  const [isSent, setIsSent] = useState(initialIsSent);

  useEffect(() => {
    setIsSent(initialIsSent);
  }, [initialIsSent]);

  async function handleChange() {
    const nextState = !isSent;
    setIsSent(nextState);

    // Call actions AFTER state update
    if (nextState) {
      await addClimbToSends(climbId);
    } else {
      await removeClimbFromSends(climbId);
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        {/* <Checkbox
          checked={isSent}
          onCheckedChange={handleChange}
          className={`h-${size} w-${size} hover:cursor-pointer `}
        /> */}
        {isSent ? (
          <SquareCheckBig
            onClick={handleChange}
            className={`h-${size} w-${size} cursor-pointer `}
          />
        ) : (
          <Square
            onClick={handleChange}
            className={`h-${size} w-${size} cursor-pointer`}
          />
        )}
      </TooltipTrigger>
      <TooltipContent>
        <p>{isSent ? "Mark as not sent" : "Mark as sent"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
