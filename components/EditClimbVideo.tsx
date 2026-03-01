import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Climb, ContentVideo } from "@/app/types/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import DeleteVideo from "./DeleteVideo";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { addVideoToClimb } from "@/lib/actions";

type EditClimbVideoProps = {
  videos?: ContentVideo[];
  climb: Climb;
};

export default function EditClimbVideo({ videos, climb }: EditClimbVideoProps) {
  const router = useRouter();
  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    addVideoToClimb(formData)
      .then(() => {
        console.log("Climb edited successfully");
        toast.success("Climb edited successfully!");
        form.reset();
        router.refresh();
      })
      .catch((error) => {
        console.error("Error editing climb:", error);
        toast.error(error.message || "Failed to edit climb");
      });
  }
  return (
    <Collapsible className="data-[state=open]:bg-muted rounded-md">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="group w-full">
          Edit Videos for your climb here.
          <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
          {videos && videos.length > 0 ? (
            videos.map((video) => (
              <div key={video.id} className="border w-full rounded-md">
                <div className="flex justify-end p-2">
                  <Tooltip>
                    <TooltipTrigger>
                      <DeleteVideo video={video} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete {video.url}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <iframe
                  src={`https://www.youtube.com/embed/${video.url}`}
                  title={`Video ${video.id}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg p-2 w-full h-70 "
                />
              </div>
            ))
          ) : (
            <p className="italic">No videos uploaded for this climb.</p>
          )}
        </div>
        <form onSubmit={handleFormSubmit}>
          <Input type="hidden" name="climb_id" value={climb.id} />
          <Label htmlFor="new_video" className="text-sm font-medium">
            Add a new video by entering the YouTube URL below.
          </Label>

          <Input
            type="text"
            name="new_video"
            placeholder="Enter YouTube URL"
            className="bg-background w-full"
          />
          <Button type="submit" className="mt-2">
            Add Video
          </Button>
        </form>
      </CollapsibleContent>
    </Collapsible>
  );
}
