// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import {
//   getImagesForPost,
//   getPostById,
//   getVideosForPost,
// } from "@/lib/data-service";
// import Image from "next/image";

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ blogId: string }>;
// }) {
//   const { blogId } = await params;
//   const { title } = await getPostById(Number(blogId));
//   return {
//     title: `Blog: ${title}`,
//     description: `Explore the details of Blog ${title}, including pictures and description.`,
//   };
// }

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ blogId: string }>;
// }) {
//   const { blogId } = await params;
//   const post = await getPostById(Number(blogId));
//   const images = await getImagesForPost(post.id);
//   const videos = await getVideosForPost(post.id);
//   console.log("Videos:", videos);

//   return (
//     <div className="w-full flex flex-col justify-center items-center">
//       <h1 className="text-3xl font-bold mt-8">{post.title}</h1>
//       <p className="text-gray-500 text-sm text-center mb-2">
//         {new Date(post.created_at).toLocaleDateString("en-US", {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         })}
//       </p>
//       <Carousel className="w-[80%] max-w-6xl ">
//         <CarouselContent>
//           {images.map((image, index) => (
//             <CarouselItem key={index}>
//               <div className="w-full relative p-1 h-100">
//                 {/* <Card>
//                   <CardContent className="flex relative aspect-square border"> */}
//                 <Image
//                   src={image.url}
//                   alt={
//                     image.url ||
//                     `https://qrlzxwxpceqrycynoyzh.supabase.co/storage/v1/object/public/postImages/default-climb.png`
//                   }
//                   fill
//                   className="object-contain "
//                 />
//                 {/* </CardContent>
//                 </Card> */}
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         {images.length > 1 && <CarouselPrevious />}
//         {images.length > 1 && <CarouselNext />}
//       </Carousel>

//       <p className="m-8 max-w-6xl">{post.content}</p>
//       {videos.length > 0 ? (
//         <Carousel className="w-[80%] max-w-6xl ">
//           <CarouselContent>
//             {videos.map((video, index) => (
//               <CarouselItem key={index}>
//                 <iframe
//                   width="100%"
//                   height="400"
//                   src={`https://www.youtube.com/embed/${video.url}`}
//                   title={video.alt || `Video ${index + 1}`}
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                   className="rounded-lg"
//                 />
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           {videos.length > 1 && <CarouselPrevious />}
//           {videos.length > 1 && <CarouselNext />}
//         </Carousel>
//       ) : null}
//     </div>
//   );
// }

import BlogPost from "@/components/BlogPost";
import BlogPostSkeleton from "@/components/BlogPostSkeleton";

import { getPostById } from "@/lib/data-service";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  const { title } = await getPostById(Number(blogId));
  return {
    title: `Blog: ${title}`,
    description: `Explore the details of Blog ${title}, including pictures and description.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <BlogPost blogId={blogId} />
    </Suspense>
  );
}
