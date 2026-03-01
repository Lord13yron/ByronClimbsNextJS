import {
  getClimbById,
  getImagesForClimb,
  getVideosForClimb,
} from "@/lib/data-service";

import { ArrowRight } from "lucide-react";
import ImageContainer from "./ImageContainer";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

type ClimbProps = {
  databaseId: string;
};

export default async function Climb({ databaseId }: ClimbProps) {
  const climb = await getClimbById(databaseId);
  const images = await getImagesForClimb(climb.id);
  const videos = await getVideosForClimb(climb.id);

  return (
    <div className="w-full flex flex-col justify-center items-center p-4">
      <div className="flex mt-8  gap-2">
        <h1 className="text-xl sm:text-3xl font-bold uppercase items-center text-center">
          {climb?.name}{" "}
        </h1>
      </div>
      <p className="text-xl border-2 px-1 rounded mb-2">V{climb?.grade}</p>
      <p className="text-xs sm:text-sm flex items-center mb-8">
        Location: {climb?.city}
        <ArrowRight className="h-4" /> {climb.area}{" "}
        <ArrowRight className="h-4" /> {climb.subArea}
      </p>

      {images.length > 0 ? (
        <ImageContainer images={images} />
      ) : (
        <div className="w-full relative p-1 h-100 mb-8">
          <Image
            src="https://qrlzxwxpceqrycynoyzh.supabase.co/storage/v1/object/public/postImages/default-climb.png"
            alt="Default climb image"
            fill
            className="object-contain"
          />
        </div>
      )}
      {videos.length > 0 ? (
        <Carousel className="w-[80%] max-w-6xl ">
          <CarouselContent>
            {videos.map((video, index) => (
              <CarouselItem key={index}>
                <iframe
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${video.url}`}
                  title={`Video ${index + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {videos.length > 1 && <CarouselPrevious />}
          {videos.length > 1 && <CarouselNext />}
        </Carousel>
      ) : (
        <div className="w-full relative p-1 h-100 ">
          <Image
            src="https://qrlzxwxpceqrycynoyzh.supabase.co/storage/v1/object/public/postImages/default-video.png"
            alt="Default climb video"
            fill
            className="object-contain"
          />
        </div>
      )}
    </div>
  );
}
