import { Suspense } from "react";
import Link from "next/link";
import { getRecentPosts } from "@/lib/data-service";
import { getImagesForPost } from "@/lib/data-service";
import Image from "next/image";
import { Post } from "@/app/types/types";
import MonoChip from "./ui/MonoChip";

function estimateReadTime(content: string) {
  return Math.max(1, Math.round(content.split(" ").length / 200));
}

function formatPostDate(dateString: string) {
  const d = new Date(dateString);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

async function LeadPost({ post }: { post: Post }) {
  const images = await getImagesForPost(post.id);
  const readTime = estimateReadTime(post.content);

  return (
    <article className="flex flex-col">
      <Link href={`/blog/${post.id}`} className="block">
        <div
          className="relative w-full overflow-hidden rounded-sm"
          style={{ height: 380 }}
        >
          {images.length > 0 ? (
            <Image
              src={images[0].url}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover object-[center_40%] hover:scale-[1.02] transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-chalk-2 flex items-center justify-center">
              <MonoChip className="text-slate-400">NO PHOTO</MonoChip>
            </div>
          )}
        </div>
      </Link>
      <div className="pt-4">
        <div className="flex items-center gap-3">
          <MonoChip>{formatPostDate(post.created_at)}</MonoChip>
          <span className="text-chalk-3 font-mono text-[10px]">/</span>
          <MonoChip>{readTime} MIN</MonoChip>
        </div>
        <Link href={`/blog/${post.id}`}>
          <h3
            className="font-display uppercase font-bold text-granite-100 mt-3 mb-2.5 leading-none tracking-[0.005em] hover:text-ember transition-colors"
            style={{ fontSize: "clamp(28px, 3vw, 38px)", textWrap: "balance" }}
          >
            {post.title}
          </h3>
        </Link>
        <p
          className="text-[15px] leading-[1.6] text-slate-700 max-w-140 line-clamp-4 font-body"
          style={{ textWrap: "pretty" }}
        >
          {post.content}
        </p>
        <Link
          href={`/blog/${post.id}`}
          className="inline-block mt-4 font-display uppercase text-[12px] tracking-widest text-ember border-b border-ember pb-0.5 hover:text-ember-deep hover:border-ember-deep transition-colors"
        >
          Read entry →
        </Link>
      </div>
    </article>
  );
}

async function SecondaryPost({ post }: { post: Post }) {
  const images = await getImagesForPost(post.id);
  const readTime = estimateReadTime(post.content);

  return (
    <article>
      <Link href={`/blog/${post.id}`} className="block">
        <div
          className="relative w-full overflow-hidden rounded-sm"
          style={{ height: 220 }}
        >
          {images.length > 0 ? (
            <Image
              src={images[0].url}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-cover object-center hover:scale-[1.02] transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-chalk-2 flex items-center justify-center">
              <MonoChip className="text-slate-400">NO PHOTO</MonoChip>
            </div>
          )}
        </div>
      </Link>
      <div className="pt-3.5">
        <div className="flex items-center gap-2.5">
          <MonoChip>{formatPostDate(post.created_at)}</MonoChip>
          <span className="text-chalk-3 font-mono text-[10px]">/</span>
          <MonoChip>{readTime} MIN</MonoChip>
        </div>
        <Link href={`/blog/${post.id}`}>
          <h3
            className="font-display uppercase font-semibold text-[21px] leading-[1.05] text-granite-100 mt-2.5 mb-2 hover:text-ember transition-colors"
            style={{ textWrap: "balance" }}
          >
            {post.title}
          </h3>
        </Link>
        <p
          className="text-[13.5px] leading-[1.55] text-slate-700 line-clamp-3 font-body"
          style={{ textWrap: "pretty" }}
        >
          {post.content}
        </p>
      </div>
    </article>
  );
}

async function JournalGrid() {
  const posts = await getRecentPosts(3);
  if (!posts.length) return null;

  const [lead, ...rest] = posts;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-6 mt-2">
      <LeadPost post={lead} />
      {rest.map((post) => (
        <SecondaryPost key={post.id} post={post} />
      ))}
    </div>
  );
}

function JournalSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-6 mt-2">
      {[380, 220, 220].map((h, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-chalk-2 rounded-sm w-full" style={{ height: h }} />
          <div className="pt-4 space-y-2">
            <div className="h-2.5 bg-chalk-2 rounded w-1/3" />
            <div className="h-5 bg-chalk-2 rounded w-3/4" />
            <div className="h-4 bg-chalk-2 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MainPageBlog() {
  return (
    <section className="py-16 md:py-18 px-4 md:px-14 max-w-7xl mx-auto w-full">
      {/* Section header */}
      <div className="flex items-end justify-between gap-6 mb-6">
        <div>
          <MonoChip className="text-ember mb-2 block">
            — THE FIELD JOURNAL
          </MonoChip>
          <h2
            className="font-display uppercase font-semibold text-granite-100 leading-none tracking-[0.02em]"
            style={{ fontSize: 36 }}
          >
            Recent entries
          </h2>
        </div>
        <Link
          href="/blog"
          className="hidden md:inline-block font-display uppercase text-[13px] tracking-[0.04em] text-granite-100 border-b border-granite-100 pb-0.5 hover:text-ember hover:border-ember transition-colors shrink-0"
        >
          All entries →
        </Link>
      </div>

      <Suspense fallback={<JournalSkeleton />}>
        <JournalGrid />
      </Suspense>
    </section>
  );
}
