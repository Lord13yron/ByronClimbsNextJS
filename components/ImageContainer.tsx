// import Image from "next/image";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "./ui/carousel";
// import { ContentImage } from "@/app/types/types";

// type ImageContainerProps = {
//   images: ContentImage[];
// };

// export default function ImageContainer({ images }: ImageContainerProps) {
//   return (
//     <Carousel className="w-[80%] max-w-6xl mb-8">
//       <CarouselContent>
//         {images.map((image, index) => (
//           <CarouselItem key={index}>
//             <div className="w-full relative p-1 h-100">
//               <Image
//                 src={image.url}
//                 alt="https://qrlzxwxpceqrycynoyzh.supabase.co/storage/v1/object/public/postImages/default-climb.png"
//                 fill
//                 className="object-contain "
//               />
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       {images.length > 1 && <CarouselPrevious />}
//       {images.length > 1 && <CarouselNext />}
//     </Carousel>
//   );
// }

"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { ContentImage } from "@/app/types/types";

type ImageContainerProps = {
  images: ContentImage[];
};

export default function ImageContainer({ images }: ImageContainerProps) {
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);

  return (
    <>
      <Carousel className="w-[80%] max-w-6xl mb-8">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div
                className="w-full relative p-1 h-48 sm:h-54 md:h-75 lg:h-105 xl:h-135 cursor-zoom-in"
                onClick={() => setZoomedIndex(index)}
              >
                <Image
                  src={image.url}
                  alt="https://qrlzxwxpceqrycynoyzh.supabase.co/storage/v1/object/public/postImages/default-climb.png"
                  fill
                  className="object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && <CarouselPrevious />}
        {images.length > 1 && <CarouselNext />}
      </Carousel>

      {zoomedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background bg-opacity-90 cursor-zoom-out p-4 pt-8"
          onClick={() => setZoomedIndex(null)}
        >
          <button
            className="absolute top-0 right-4  text-3xl font-bold z-60 hover:cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setZoomedIndex(null);
            }}
            aria-label="Close"
          >
            &times;
          </button>
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={images[zoomedIndex].url}
              alt="Zoomed image"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
