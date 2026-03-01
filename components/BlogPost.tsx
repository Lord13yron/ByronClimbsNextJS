import {
  getImagesForPost,
  getPostById,
  getVideosForPost,
} from "@/lib/data-service";
import ImageContainer from "./ImageContainer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

type BlogPostProps = {
  //   params: Promise<{ blogId: string }>;
  blogId: string;
};

export default async function BlogPost({ blogId }: BlogPostProps) {
  const post = await getPostById(Number(blogId));
  const images = await getImagesForPost(post.id);
  const videos = await getVideosForPost(post.id);
  return (
    <div className="w-full flex flex-col justify-center items-center ">
      <h1 className="text-3xl font-bold mt-8">{post.title}</h1>
      <p className="text-gray-500 text-sm text-center mb-2">
        {new Date(post.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <ImageContainer images={images} />

      <p className="mx-4 max-w-6xl">{post.content}</p>
      {videos.length > 0 ? (
        <Carousel className="w-[80%] max-w-6xl ">
          <CarouselContent>
            {videos.map((video, index) => (
              <CarouselItem key={index}>
                <iframe
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${video.url}`}
                  title={video.alt || `Video ${index + 1}`}
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
      ) : null}
    </div>
  );
}
