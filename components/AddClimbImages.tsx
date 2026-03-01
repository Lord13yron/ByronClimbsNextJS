import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import { Input } from "./ui/input";

type AddClimbImagesProps = {
  type?: "climb" | "blog";
};

export default function AddClimbImages({
  type = "climb",
}: AddClimbImagesProps) {
  return (
    <Collapsible className="data-[state=open]:bg-muted rounded-md">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="group w-full">
          {type === "climb"
            ? "Upload images for your climb here."
            : "Upload images for your blog post here."}
          <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
        <div>
          <Input type="file" name="images" className="bg-background" multiple />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
