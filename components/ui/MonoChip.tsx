import { cn } from "@/lib/utils";
import React from "react";

type MonoChipProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
};

export default function MonoChip({
  children,
  className,
  as: Tag = "span",
}: MonoChipProps) {
  return (
    <Tag
      className={cn(
        "font-mono uppercase tracking-widest text-[10px] leading-none text-slate-500",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
