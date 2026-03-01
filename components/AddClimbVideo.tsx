import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type AddClimbVideoProps = {
  type?: "climb" | "blog";
};

export default function AddClimbVideo({ type = "climb" }: AddClimbVideoProps) {
  return (
    <Collapsible className="data-[state=open]:bg-muted rounded-md">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="group w-full">
          {type === "climb"
            ? "Upload a Video for your climb here."
            : "Upload a Video for your blog post here."}
          <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm ">
        <Label htmlFor="video" className="text-sm font-medium">
          We currently only support YouTube links.
        </Label>

        <Input
          type="text"
          name="video"
          placeholder="Enter YouTube URL"
          className="bg-background w-full"
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
