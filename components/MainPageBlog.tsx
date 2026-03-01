// import { Suspense } from "react";
// import PostsGrid from "./PostsGrid";
// import PostsGridSkeleton from "./PostsGridSkeleton";
// import Link from "next/link";
// import { Button } from "./ui/button";

// export default function MainPageBlog() {
//   return (
//     <div className="py-4">
//       <h2 className="text-2xl text-center font-bold mb-4">
//         Welcome to Byron&#39;s Climbing Blog
//       </h2>
//       <p className="mb-2">
//         Discover the latest news, tips, and stories from the climbing world.
//       </p>
//       <p className="mb-2">
//         Whether you&#39;re a beginner or an experienced climber, our blog has
//         something for everyone.
//       </p>
//       <p>
//         Stay tuned for updates on climbing techniques, gear reviews, and
//         inspiring climbing adventures.
//       </p>
//       <h2 className="text-3xl font-bold text-center border-t-2 border-gray-500 mt-8 pt-4">
//         Latest Posts
//       </h2>
//       <Suspense fallback={<PostsGridSkeleton />}>
//         <PostsGrid limit={6} />
//       </Suspense>

//       <Link href="/blog" className="flex w-full justify-center ">
//         <Button className="cursor-pointer hover:underline">
//           View All Posts
//         </Button>
//       </Link>
//     </div>
//   );
// }

import { Suspense } from "react";
import PostsGrid from "./PostsGrid";
import PostsGridSkeleton from "./PostsGridSkeleton";
import Link from "next/link";
import { Button } from "./ui/button";

export default function MainPageBlog() {
  return (
    <div className="py-4">
      <h2 className="text-2xl text-center font-bold mb-4">
        Welcome to Byron&#39;s Climbing Blog
      </h2>
      <p className="mb-2">
        Hey there! I&#39;m Byron, a Kelowna-based climber who started climbing
        at 38 years old and has been hooked for the last 7 years. I share
        insights on bouldering, my transition into sport climbing, and local
        beta from the Okanagan&#39;s best climbing spots.{" "}
        <Link href="/about" className="text-blue-600 hover:underline">
          Learn more about my story
        </Link>
        .
      </p>
      <h2 className="text-3xl font-bold text-center border-t-2 border-gray-500 mt-8 pt-4">
        Latest Posts
      </h2>
      <Suspense fallback={<PostsGridSkeleton />}>
        <PostsGrid limit={6} />
      </Suspense>

      <Link href="/blog" className="flex w-full justify-center ">
        <Button className="cursor-pointer hover:underline">
          View All Posts
        </Button>
      </Link>
    </div>
  );
}
