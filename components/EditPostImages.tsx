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
import { addImagesToPost, linkExistingImageToPost } from "@/lib/actions";
import { useRouter } from "next/navigation";
import ImageLibraryPicker from "./ImageLibraryPicker";
import { uploadFilesToBucket } from "@/lib/upload/clientUpload";
import { useState } from "react";

type EditPostImagesProps = {
  images?: ContentImage[];
  post: Post;
};

export default function EditPostImages({ images, post }: EditPostImagesProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = form.elements.namedItem("new_images") as HTMLInputElement;
    const files = Array.from(fileInput.files ?? []);
    if (files.length === 0) {
      toast.error("Please select at least one image to upload.");
      return;
    }

    setIsUploading(true);
    try {
      const urls = await uploadFilesToBucket(files);
      const formData = new FormData();
      formData.append("post_id", String(post.id));
      urls.forEach((url) => formData.append("new_image_urls", url));
      await addImagesToPost(formData);
      toast.success("Post edited successfully!");
      form.reset();
      router.refresh();
    } catch (error) {
      console.error("Error editing post:", error);
      const message =
        error instanceof Error ? error.message : "Failed to edit post";
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  }

  async function handleLinkExisting(urls: string[]) {
    try {
      await Promise.all(
        urls.map((url) => linkExistingImageToPost(url, post.id.toString()))
      );
      toast.success(
        `${urls.length} image${urls.length !== 1 ? "s" : ""} added from library`
      );
      router.refresh();
    } catch (error) {
      console.error("Error linking images:", error);
      toast.error("Failed to add images from library");
    }
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
          <Label htmlFor="new_images" className="text-sm font-medium">
            Upload new images (you can select multiple):
          </Label>
          <Input
            type="file"
            name="new_images"
            accept="image/*"
            multiple
            className="w-full"
            disabled={isUploading}
          />
          <div className="flex gap-2 mt-2">
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Uploading…" : "Upload Images"}
            </Button>
            <ImageLibraryPicker onSelect={handleLinkExisting} />
          </div>
        </form>
      </CollapsibleContent>
    </Collapsible>
  );
}
