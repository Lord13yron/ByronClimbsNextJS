import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import { Climb, ContentImage } from "@/app/types/types";
import Image from "next/image";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import DeleteImage from "./DeleteImage";
import { toast } from "sonner";
import { addImagesToClimb } from "@/lib/actions";
import { useRouter } from "next/navigation";

type EditClimbImagesProps = {
  images?: ContentImage[];
  climb: Climb;
};

export default function EditClimbImages({
  images,
  climb,
}: EditClimbImagesProps) {
  const router = useRouter();
  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    addImagesToClimb(formData)
      .then(() => {
        console.log("Climb edited successfully");
        toast.success("Climb edited successfully!");
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
          Edit images for your climb here.
          <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
          {images && images.length > 0 ? (
            images.map((image) => (
              <div key={image.id} className="border w-full rounded-md">
                <div className="flex justify-end p-2">
                  <Tooltip>
                    <TooltipTrigger>
                      {/* <Trash2 className="h-4 hover:text-red-500 cursor-pointer" /> */}
                      <DeleteImage image={image} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete {image.url.split("/").pop()}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="w-full relative h-48 sm:h-50 md:h-50 lg:h-60 my-4 ">
                  <Image
                    src={image.url}
                    alt={`Climb Image ${image.id}`}
                    fill
                    className="object-contain "
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="italic">No images uploaded for this climb.</p>
          )}
        </div>
        <form onSubmit={handleFormSubmit}>
          <input type="hidden" name="climb_id" value={climb.id} />
          <Label htmlFor="new_images" className="text-sm font-medium">
            Upload new images (you can select multiple):
          </Label>
          <Input
            type="file"
            name="new_images"
            accept="image/*"
            multiple
            className="w-full"
          />
          <Button type="submit" className="mt-2">
            Upload Images
          </Button>
        </form>
      </CollapsibleContent>
    </Collapsible>
  );
}
