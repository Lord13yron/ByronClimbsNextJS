"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon, XIcon } from "lucide-react";
import { Input } from "./ui/input";
import ImageLibraryPicker from "./ImageLibraryPicker";

type AddClimbImagesProps = {
  type?: "climb" | "blog";
};

export default function AddClimbImages({ type = "climb" }: AddClimbImagesProps) {
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);

  function handlePickerSelect(urls: string[]) {
    setSelectedUrls((prev) => [...new Set([...prev, ...urls])]);
  }

  function removeSelectedUrl(url: string) {
    setSelectedUrls((prev) => prev.filter((u) => u !== url));
  }

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
      <CollapsibleContent className="flex flex-col items-start gap-3 p-2.5 pt-0 text-sm">
        <div className="flex items-center gap-2 flex-wrap">
          <Input type="file" name="images" className="bg-background" multiple />
          <ImageLibraryPicker onSelect={handlePickerSelect} />
        </div>

        {selectedUrls.length > 0 && (
          <div className="w-full">
            <p className="text-xs text-muted-foreground mb-2">
              Selected from library:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {selectedUrls.map((url) => (
                <div key={url} className="relative rounded-md overflow-hidden border">
                  <div className="relative h-24 w-full bg-muted">
                    <Image src={url} alt="" fill className="object-cover" sizes="200px" />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSelectedUrl(url)}
                    className="absolute top-1 right-1 bg-background/80 rounded-full p-0.5 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                  <input type="hidden" name="existing_image_urls" value={url} />
                </div>
              ))}
            </div>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
