import { getPosts, getAllPostImages, getClimbs } from "@/lib/data-service";
import Link from "next/link";
import Image from "next/image";
import TopoLine from "@/components/ui/TopoLine";
import MonoChip from "@/components/ui/MonoChip";
import DrawOn from "@/components/anim/DrawOn";
import Reveal from "@/components/anim/Reveal";
import Parallax from "@/components/anim/Parallax";
import BlogMasthead from "@/components/blog/BlogMasthead";
import ScrollProgress from "@/components/blog/ScrollProgress";
import ArchiveNav from "@/components/blog/ArchiveNav";
import { Post } from "@/app/types/types";

const PAGE_SIZE = 12;

function formatDate(iso: string) {
  const d = new Date(iso);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

function getMonthKey(iso: string) {
  return iso.slice(0, 7);
}

const MONTHS_SHORT = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
const MONTHS_LONG = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

function getMonthLabel(iso: string) {
  const d = new Date(iso);
  return `${MONTHS_SHORT[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function getMonthAbbrev(iso: string) {
  return MONTHS_SHORT[new Date(iso).getUTCMonth()];
}

function getMonthGroupLabel(iso: string) {
  const d = new Date(iso);
  return `${MONTHS_LONG[d.getUTCMonth()]} · ${d.getUTCFullYear()}`;
}

function estimateReadTime(content: string) {
  return Math.max(1, Math.round(content.split(/\s+/).length / 200));
}

function getExcerpt(content: string, max = 200) {
  const plain = content.replace(/<[^>]+>/g, "");
  return plain.length > max ? plain.slice(0, max).trimEnd() + "…" : plain;
}

export const metadata = {
  title: "Field Journal",
  description:
    "Trip reports, training journals, and the occasional rant about footwork.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageStr } = await searchParams;
  const page = Math.max(1, Number(pageStr) || 1);

  const [allPosts, allImages, climbs] = await Promise.all([
    getPosts(),
    getAllPostImages(),
    getClimbs().catch(() => []),
  ]);
  const imageByPost = new Map<number, string>();
  for (const img of allImages) {
    if (img.post_id != null && !imageByPost.has(img.post_id)) {
      imageByPost.set(img.post_id, img.url);
    }
  }

  // Live masthead stats — real data, sourced like the landing-page logbook.
  const cragsCount = new Set(climbs.map((c) => c.area).filter(Boolean)).size;

  const totalPages = Math.ceil(allPosts.length / PAGE_SIZE);
  const pagePosts = allPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const [featured, ...archivePosts] = pagePosts;

  const monthGroups = new Map<string, Post[]>();
  for (const post of archivePosts) {
    const key = getMonthKey(post.created_at);
    if (!monthGroups.has(key)) monthGroups.set(key, []);
    monthGroups.get(key)!.push(post);
  }

  const monthCounts = new Map<string, number>();
  for (const post of allPosts) {
    const key = getMonthKey(post.created_at);
    monthCounts.set(key, (monthCounts.get(key) ?? 0) + 1);
  }
  const allMonths = [...monthCounts.entries()].map(([key, count]) => {
    const iso = allPosts.find(
      (p) => getMonthKey(p.created_at) === key,
    )!.created_at;
    return { key, label: getMonthLabel(iso), count };
  });

  return (
    <div className="bg-chalk min-h-screen">
      <ScrollProgress />

      {/* Masthead */}
      <BlogMasthead entriesCount={allPosts.length} cragsCount={cragsCount} />

      {/* Topo divider */}
      <DrawOn className="max-w-7xl mx-auto px-4 md:px-14 text-chalk-3 opacity-60 pt-12 md:pt-16">
        <TopoLine height={40} seed={4} />
      </DrawOn>

      {/* Featured entry */}
      {featured && (
        <section className="max-w-7xl mx-auto px-4 md:px-14 pt-8 md:pt-12 pb-8">
          <MonoChip as="p" className="text-ember mb-4">
            — FEATURED · {formatDate(featured.created_at)}
          </MonoChip>
          <Reveal
            className="grid grid-cols-1 min-[1001px]:grid-cols-[1.45fr_1fr] gap-8 min-[1001px]:gap-12 items-stretch"
            y={46}
            stagger={0.12}
            duration={0.9}
          >
            <Link
              href={`/blog/${featured.id}`}
              className="group relative block min-h-85 overflow-hidden rounded-sm bg-chalk"
            >
              {imageByPost.get(featured.id) ? (
                <Parallax yPercent={7} className="absolute inset-[-6%]">
                  <div className="relative h-full w-full">
                    <Image
                      src={imageByPost.get(featured.id)!}
                      alt={featured.title}
                      fill
                      sizes="(min-width: 1001px) 58vw, 100vw"
                      className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                </Parallax>
              ) : (
                <div className="photo-ph absolute inset-0">
                  <MonoChip>FIELD PHOTO</MonoChip>
                </div>
              )}
            </Link>

            <div className="flex flex-col justify-between py-1">
              <div>
                <MonoChip as="p" className="mb-4">
                  {estimateReadTime(featured.content)} MIN READ
                </MonoChip>
                <Link href={`/blog/${featured.id}`}>
                  <h2 className="font-display font-bold uppercase leading-[0.96] tracking-[0.005em] text-balance text-granite-100 transition-colors hover:text-ember text-[clamp(34px,4.4vw,58px)]">
                    {featured.title}
                  </h2>
                </Link>
                <p className="text-[16px] leading-[1.7] text-slate-700 mt-5 text-pretty">
                  {getExcerpt(featured.content)}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-dashed border-chalk-3 flex items-center justify-between gap-4">
                <MonoChip className="text-slate-400">
                  FILED {formatDate(featured.created_at)} · KELOWNA, BC
                </MonoChip>
                <Link
                  href={`/blog/${featured.id}`}
                  className="font-display uppercase text-[13px] text-ember border-b-[1.5px] border-ember pb-0.5 hover:text-ember-deep hover:border-ember-deep transition-colors whitespace-nowrap"
                >
                  Read entry →
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Topo divider 2 */}
      <DrawOn className="max-w-7xl mx-auto px-4 md:px-14 text-chalk-3 opacity-60">
        <TopoLine height={40} seed={7} />
      </DrawOn>

      {/* Archive */}
      <section className="max-w-7xl mx-auto px-4 md:px-14 pt-9 md:pt-12 pb-16 md:pb-26">
        <div className="grid grid-cols-1 min-[861px]:grid-cols-[230px_1fr] gap-10 min-[861px]:gap-14 items-start">
          {/* Sidebar */}
          <ArchiveNav months={allMonths} />

          {/* Entry list */}
          <div>
            {archivePosts.length === 0 && (
              <MonoChip as="p">NO MORE ENTRIES ON THIS PAGE</MonoChip>
            )}
            {[...monthGroups.entries()].map(([key, posts]) => (
              <div key={key} id={`month-${key}`} className="scroll-mt-20 mb-2">
                <MonoChip
                  as="p"
                  className="text-slate-400 pb-2 mb-4 border-b border-chalk-3"
                >
                  {getMonthGroupLabel(posts[0].created_at)}
                </MonoChip>
                <Reveal y={40} stagger={0.1} duration={0.75}>
                  {posts.map((post) => {
                    const day = String(
                      new Date(post.created_at).getUTCDate(),
                    ).padStart(2, "0");
                    return (
                      <article
                        key={post.id}
                        className="grid grid-cols-1 min-[561px]:grid-cols-[184px_minmax(0,1fr)] min-[1121px]:grid-cols-[88px_184px_minmax(0,1fr)_64px] gap-6 py-6.5 border-b border-chalk-2 items-start"
                      >
                        {/* Day */}
                        <div className="hidden min-[1121px]:flex flex-col gap-1">
                          <span className="font-display text-[40px] leading-none text-granite-100">
                            {day}
                          </span>
                          <MonoChip>{getMonthAbbrev(post.created_at)}</MonoChip>
                        </div>

                        {/* Thumbnail */}
                        <Link
                          href={`/blog/${post.id}`}
                          className="group relative block h-34.5 overflow-hidden rounded-sm"
                        >
                          {imageByPost.get(post.id) ? (
                            <Image
                              src={imageByPost.get(post.id)!}
                              alt={post.title}
                              fill
                              sizes="184px"
                              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                            />
                          ) : (
                            <div className="photo-ph absolute inset-0">
                              <MonoChip>FIELD PHOTO</MonoChip>
                            </div>
                          )}
                        </Link>

                        {/* Body */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <MonoChip>
                              {estimateReadTime(post.content)} MIN
                            </MonoChip>
                            <MonoChip className="text-slate-400 min-[1121px]:hidden">
                              · {formatDate(post.created_at)}
                            </MonoChip>
                          </div>
                          <Link href={`/blog/${post.id}`}>
                            <h3 className="font-display font-semibold uppercase leading-[1.05] text-balance text-granite-100 transition-colors hover:text-ember mb-2 text-[clamp(22px,2.4vw,27px)]">
                              {post.title}
                            </h3>
                          </Link>
                          <p className="text-[14px] leading-[1.6] text-slate-700 text-pretty line-clamp-2">
                            {getExcerpt(post.content, 160)}
                          </p>
                        </div>

                        {/* Meta-right */}
                        <div className="hidden min-[1121px]:flex flex-col items-end gap-2">
                          <MonoChip className="text-slate-400">
                            {formatDate(post.created_at)}
                          </MonoChip>
                          <span
                            aria-hidden="true"
                            className="text-chalk-3 text-lg leading-none"
                          >
                            →
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </Reveal>
              </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-10 gap-4">
                {page > 1 ? (
                  <Link
                    href={`/blog?page=${page - 1}`}
                    className="font-display uppercase text-[13px] font-semibold text-granite-100 hover:text-ember transition-colors"
                  >
                    ← Newer entries
                  </Link>
                ) : (
                  <span className="font-display uppercase text-[13px] font-semibold text-slate-400">
                    ← Newer entries
                  </span>
                )}
                <MonoChip className="text-slate-400">
                  PAGE {page} OF {totalPages}
                </MonoChip>
                {page < totalPages ? (
                  <Link
                    href={`/blog?page=${page + 1}`}
                    className="font-display uppercase text-[13px] font-semibold text-granite-100 hover:text-ember transition-colors"
                  >
                    Older entries →
                  </Link>
                ) : (
                  <span className="font-display uppercase text-[13px] font-semibold text-slate-400">
                    Older entries →
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
