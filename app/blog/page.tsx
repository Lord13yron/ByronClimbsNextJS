import { getPosts, getAllPostImages } from "@/lib/data-service";
import Link from "next/link";
import Image from "next/image";
import TopoLine from "@/components/ui/TopoLine";
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

  const [allPosts, allImages] = await Promise.all([
    getPosts(),
    getAllPostImages(),
  ]);
  const imageByPost = new Map<number, string>();
  for (const img of allImages) {
    if (img.post_id != null && !imageByPost.has(img.post_id)) {
      imageByPost.set(img.post_id, img.url);
    }
  }

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
      {/* Masthead */}
      <section className="max-w-7xl mx-auto px-4 md:px-14 pt-10 md:pt-16 pb-8">
        <p className="font-mono text-[10.5px] uppercase tracking-widest text-ember mb-3">
          — THE FIELD JOURNAL
        </p>
        <div className="flex justify-between items-end gap-6 flex-wrap">
          <div>
            <h1 className="font-display uppercase text-[48px] md:text-[96px] leading-[0.95] tracking-[0.01em] text-granite-100 text-balance">
              Notes from
              <br />
              the gneiss.
            </h1>
            <p className="mt-4 text-[15px] text-slate-700 max-w-140 leading-relaxed text-pretty">
              Trip reports, training notes, and information about all the
              different places I climb.
            </p>
          </div>
        </div>
      </section>

      {/* Topo divider */}
      <div className="max-w-7xl mx-auto px-4 md:px-14 text-chalk-3 opacity-60">
        <TopoLine height={36} seed={4} />
      </div>

      {/* Featured entry */}
      {featured && (
        <section className="max-w-7xl mx-auto px-4 md:px-14 pt-8 md:pt-12 pb-8">
          <p className="font-mono text-[10.5px] uppercase tracking-widest text-ember mb-3">
            — FEATURED · {formatDate(featured.created_at)}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-5 md:gap-9 items-stretch">
            {imageByPost.get(featured.id) ? (
              <div className="relative h-70 md:h-120 overflow-hidden">
                <Image
                  src={imageByPost.get(featured.id)!}
                  alt={featured.title}
                  fill
                  className="object-cover object-center"
                />
              </div>
            ) : (
              <div className="photo-ph h-70 md:h-120">
                <span className="font-mono text-[10.5px] uppercase tracking-widest text-slate-500">
                  PHOTO
                </span>
              </div>
            )}
            <div className="flex flex-col justify-between py-1">
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-widest text-slate-500 mb-4">
                  {estimateReadTime(featured.content)} MIN READ
                </p>
                <h2 className="font-display uppercase text-[36px] md:text-[56px] leading-[0.98] tracking-[0.005em] text-balance text-granite-100">
                  {featured.title}
                </h2>
                <p className="text-[16px] leading-[1.7] text-slate-700 mt-5 text-pretty">
                  {getExcerpt(featured.content)}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-dashed border-chalk-3 flex justify-end">
                <Link
                  href={`/blog/${featured.id}`}
                  className="font-display uppercase text-[13px] text-ember border-b-[1.5px] border-ember pb-0.5 hover:text-ember-deep hover:border-ember-deep transition-colors"
                >
                  Read entry →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Topo divider 2 */}
      <div className="max-w-7xl mx-auto px-4 md:px-14 text-chalk-3 opacity-60">
        <TopoLine height={36} seed={7} />
      </div>

      {/* Archive */}
      <section className="max-w-7xl mx-auto px-4 md:px-14 pt-6 md:pt-8 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-14 items-start">
          {/* Sidebar */}
          <aside>
            <p className="font-mono text-[10.5px] uppercase tracking-widest text-ember mb-3.5">
              — THE ARCHIVE
            </p>
            <h2 className="font-display uppercase text-[32px] leading-none text-granite-100">
              Every entry,
              <br />
              by month.
            </h2>
            <div className="mt-6 flex flex-col gap-1.5">
              {allMonths.map((m, i) => (
                <a
                  key={m.key}
                  href={`#month-${m.key}`}
                  className={`flex justify-between items-center py-2 border-b border-chalk-2 font-display uppercase text-[13px] font-semibold transition-colors ${
                    i === 0 ? "text-ember" : "text-granite-100 hover:text-ember"
                  }`}
                >
                  <span>{m.label}</span>
                  <span
                    className={`font-mono text-[10.5px] tracking-widest ${
                      i === 0 ? "text-ember" : "text-slate-500"
                    }`}
                  >
                    {m.count}
                  </span>
                </a>
              ))}
            </div>
          </aside>

          {/* Entry list */}
          <div>
            {archivePosts.length === 0 && (
              <p className="font-mono text-[10.5px] uppercase tracking-widest text-slate-500">
                NO MORE ENTRIES ON THIS PAGE
              </p>
            )}
            {[...monthGroups.entries()].map(([key, posts]) => (
              <div key={key} id={`month-${key}`} className="scroll-mt-20">
                <p className="font-mono text-[10.5px] uppercase tracking-widest text-slate-500 pb-2 mb-4 border-b border-chalk-3">
                  {getMonthGroupLabel(posts[0].created_at)}
                </p>
                {posts.map((post) => {
                  const day = String(
                    new Date(post.created_at).getUTCDate(),
                  ).padStart(2, "0");
                  return (
                    <article
                      key={post.id}
                      className="grid grid-cols-1 md:grid-cols-[120px_200px_1fr_80px] gap-6 py-6 border-b border-chalk-2 items-start"
                    >
                      <div className="hidden md:flex flex-col gap-1">
                        <span className="font-display text-[36px] leading-none text-granite-100">
                          {day}
                        </span>
                        <span className="font-mono text-[10.5px] uppercase tracking-widest text-slate-500">
                          {getMonthLabel(post.created_at)}
                        </span>
                      </div>
                      {imageByPost.get(post.id) ? (
                        <div className="relative block h-48 md:h-32.5 overflow-hidden">
                          <Image
                            src={imageByPost.get(post.id)!}
                            alt={post.title}
                            fill
                            className="object-cover object-center"
                          />
                        </div>
                      ) : (
                        <div className="photo-ph flex h-48 md:h-32.5" />
                      )}
                      <div>
                        <Link href={`/blog/${post.id}`}>
                          <h3 className="font-display uppercase text-[22px] md:text-[26px] leading-[1.05] text-balance text-granite-100 hover:text-ember transition-colors mb-2">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-[14px] leading-[1.6] text-slate-700 text-pretty">
                          {getExcerpt(post.content, 160)}
                        </p>
                      </div>
                      <div className="hidden md:flex flex-col items-end">
                        <span className="font-mono text-[10.5px] uppercase tracking-widest text-slate-500">
                          {estimateReadTime(post.content)} MIN
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-8 gap-4">
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
                <span className="font-mono text-[10.5px] uppercase tracking-widest text-slate-500">
                  PAGE {page} OF {totalPages}
                </span>
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
