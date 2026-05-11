import { cn } from "@/lib/utils";

type GradeChipProps = {
  grade: string;
  variant?: "solid" | "outline" | "ember";
  className?: string;
};

export default function GradeChip({
  grade,
  variant = "solid",
  className,
}: GradeChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-display uppercase font-bold text-xs tracking-widest px-2 py-0.5 rounded-sm min-w-[46px] transition-colors duration-150",
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
