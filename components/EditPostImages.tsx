import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import { ContentImage, Post } from "@/app/types/types";
import Image from "next/image";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import DeleteImage from "./DeleteImage";
import { toast } from "sonner";
import { addImagesToPost } from "@/lib/actions";
import { useRouter } from "next/navigation";

type EditPostImagesProps = {
  images?: ContentImage[];
  post: Post;
};

export default function EditPostImages({ images, post }: EditPostImagesProps) {
  const router = useRouter();
  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    addImagesToPost(formData)
      .then(() => {
        console.log("Post edited successfully");
        toast.success("Post edited successfully!");
        router.refresh();
      })
      .catch((error) => {
        console.error("Error editing post:", error);
        toast.error(error.message || "Failed to edit post");
      });
  }
  return (
    <Collapsible className="data-[state=open]:bg-muted rounded-md">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="group w-full">
          Edit images for your post here.
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
                      <DeleteImage image={image} type="post" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete {image.url.split("/").pop()}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="w-full relative h-48 sm:h-50 md:h-50 lg:h-60 my-4 ">
                  <Image
                    src={image.url}
                    alt={`Post Image ${image.id}`}
                    fill
                    className="object-contain "
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="italic">No images uploaded for this Post.</p>
          )}
        </div>
        <form onSubmit={handleFormSubmit}>
          <input type="hidden" name="post_id" value={post.id} />
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
