import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function SidebarTooltip({
  label,
  children,
  state,
}: {
  label: string;
  children: React.ReactNode;
  state: string;
}) {
  if (state !== "collapsed") {
    return <>{children}</>;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}
