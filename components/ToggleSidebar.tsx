"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeft } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function ToggleSidebar() {
  const { toggleSidebar } = useSidebar();

  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          onClick={toggleSidebar}
          className="absolute m-1 hover:text-gray-400 cursor-pointer md:hidden"
        >
          <PanelLeft />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Toggle Dashboard </p>
        <p>Ctr + b or Cmd + b</p>
      </TooltipContent>
    </Tooltip>
  );
}
