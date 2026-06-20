import { cn } from "@/lib/utils";

type GradeChipProps = {
  grade: string;
  variant?: "solid" | "outline" | "ember";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function GradeChip({
  grade,
  variant = "solid",
  size = "sm",
  className,
}: GradeChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-display uppercase font-bold tracking-widest rounded-sm transition-colors duration-150",
        size === "sm" && "text-xs px-2 py-0.5 min-w-[46px]",
        size === "md" && "text-sm px-2.5 py-0.5",
        size === "lg" && "text-[20px] px-3 py-1",
        variant === "solid" &&
          "bg-granite-200 text-chalk border border-granite-200",
        variant === "outline" &&
          "bg-transparent text-granite-100 border border-chalk-3",
        variant === "ember" &&
          "bg-ember text-chalk border border-ember",
        className,
      )}
    >
      {grade}
    </span>
  );
}
