"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getImageLibrary } from "@/lib/actions";
import { ImageIcon } from "lucide-react";

type ImageLibraryPickerProps = {
  onSelect: (urls: string[]) => void;
};

export default function ImageLibraryPicker({ onSelect }: ImageLibraryPickerProps) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  async function handleOpen(isOpen: boolean) {
    setOpen(isOpen);
    if (isOpen && images.length === 0) {
      setLoading(true);
      try {
        const urls = await getImageLibrary();
        setImages(urls);
      } finally {
        setLoading(false);
      }
    }
    if (!isOpen) setSelected(new Set());
  }

  function toggleUrl(url: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url);
      else next.add(url);
      return next;
    });
  }

  function handleConfirm() {
    onSelect([...selected]);
    setOpen(false);
    setSelected(new Set());
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          <ImageIcon className="mr-2 h-4 w-4" />
          Use existing image
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Image Library</DialogTitle>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto">
          {loading && (
            <p className="text-sm text-muted-foreground py-8 text-center">
              Loading images…
            </p>
          )}
          {!loading && images.length === 0 && (
            <p className="text-sm text-muted-foreground py-8 text-center italic">
              No images in the library yet.
            </p>
          )}
          {!loading && images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-1">
              {images.filter((url) => !failed.has(url)).map((url) => {
                const isSelected = selected.has(url);
                return (
                  <button
                    key={url}
                    type="button"
                    onClick={() => toggleUrl(url)}
                    className={`relative rounded-md overflow-hidden border-2 transition-colors focus:outline-none ${
                      isSelected
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/40"
                    }`}
                  >
                    <div className="relative h-32 w-full bg-muted">
                      <Image
                        src={url}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 33vw"
                        unoptimized
                        onError={() =>
                          setFailed((prev) => new Set([...prev, url]))
                        }
                      />
                    </div>
                    {isSelected && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          ✓
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={selected.size === 0}
          >
            Add {selected.size > 0 ? `${selected.size} ` : ""}image
            {selected.size !== 1 ? "s" : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
