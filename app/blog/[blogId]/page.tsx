import {
  getPostById,
  getImagesForPost,
  getRecentPosts,
  getAllPostImages,
} from "@/lib/data-service";
import Link from "next/link";
import Image from "next/image";
import TopoLine from "@/components/ui/TopoLine";

function formatDate(iso: string) {
  const d = new Date(iso);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
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

function getMonthYear(iso: string) {
  const d = new Date(iso);
  return `${MONTHS_SHORT[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function estimateReadTime(content: string) {
  return Math.max(1, Math.round(content.split(/\s+/).length / 200));
}

function getExcerpt(content: string, max = 200) {
  const plain = content.replace(/<[^>]+>/g, "");
  return plain.length > max ? plain.slice(0, max).trimEnd() + "…" : plain;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  const { title } = await getPostById(Number(blogId));
  return {
    title: `${title} — Field Journal`,
    description: `Read ${title} on the Field Journal.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;

  const [post, images, recentPosts, allImages] = await Promise.all([
    getPostById(Number(blogId)),
    getImagesForPost(Number(blogId)),
    getRecentPosts(4),
    getAllPostImages(),
  ]);

  const related = recentPosts.filter((p) => p.id !== post.id).slice(0, 3);
  const imageByPost = new Map<number, string>();
  for (const img of allImages) {
    if (img.post_id != null && !imageByPost.has(img.post_id)) {
      imageByPost.set(img.post_id, img.url);
    }
  }
  const heroImage = images[0]?.url;
  const readTime = estimateReadTime(post.content);
  const date = formatDate(post.created_at);
  const monthYear = getMonthYear(post.created_at);
  const titleShort =
    post.title.length > 24
      ? post.title.slice(0, 24).trimEnd() + "…"
      : post.title;

  const paragraphs = post.content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="bg-chalk min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-245 mx-auto px-4 md:px-14 pt-6">
        <div className="flex gap-2 items-center flex-wrap font-mono text-[10.5px] uppercase tracking-widest text-slate-500">
          <Link href="/blog" className="hover:text-ember transition-colors">
            Field Journal
          </Link>
          <span className="text-chalk-3">›</span>
          <span>{monthYear}</span>
          <span className="text-chalk-3">›</span>
          <span className="text-ember">{titleShort.toUpperCase()}</span>
        </div>
      </div>

      {/* Article masthead */}
      <article className="max-w-245 mx-auto px-4 md:px-14 pt-8">
        <div className="flex gap-2.5 items-center flex-wrap font-mono text-[10.5px] uppercase tracking-widest text-slate-500 mb-4">
          <span>{date}</span>
          <span>·</span>
          <span>{readTime} MIN READ</span>
        </div>
        <h1 className="font-display uppercase text-[44px] md:text-[78px] leading-[0.95] tracking-[0.005em] text-balance text-granite-100">
          {post.title}
        </h1>

        {/* Hero image */}
        <div className="-mx-4 md:-mx-14 mt-8 md:mt-10">
          {heroImage ? (
            <div className="relative h-70 md:h-135 w-full overflow-hidden">
              <Image
                src={heroImage}
                alt={post.title}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          ) : (
            <div className="photo-ph h-70 md:h-135">
              <span className="font-mono text-[10.5px] uppercase tracking-widest text-slate-500">
                PHOTO
              </span>
            </div>
          )}
        </div>

        {/* Reading body — 680px centered */}
        <div className="max-w-170 mx-auto mt-10 mb-16">
          {paragraphs.map((para, i) => {
            if (i === 0 && para.length > 0) {
              const firstLetter = para[0];
              const rest = para.slice(1);
              return (
                <p
                  key={i}
                  className="text-[17px] leading-[1.75] text-granite-100 text-pretty mb-4.5 overflow-hidden"
                >
                  <span className="font-display float-left text-[76px] font-extrabold text-ember leading-[0.85] pr-2 pt-1">
                    {firstLetter}
                  </span>
                  {rest}
                </p>
              );
            }
            return (
              <p
                key={i}
                className="text-[17px] leading-[1.75] text-granite-100 text-pretty mb-4.5"
              >
                {para}
              </p>
            );
          })}

          {/* Article footer */}
          <div className="border-t border-chalk-3 pt-6 mt-8">
            <p className="font-mono text-[10.5px] uppercase tracking-widest text-slate-500">
              FILED {date} · KELOWNA, BC
            </p>
          </div>
        </div>
      </article>

      {/* Topo divider */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 md:px-14 text-chalk-3 opacity-60">
          <TopoLine height={36} seed={11} />
        </div>
      )}

      {/* Related entries */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-14 pt-10 md:pt-16 pb-16 md:pb-24">
          <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-widest text-ember mb-2.5">
                — KEEP READING
              </p>
              <h2 className="font-display uppercase text-[30px] md:text-[40px] leading-none text-granite-100">
                More from the journal
              </h2>
            </div>
            <Link
              href="/blog"
              className="font-display uppercase text-[13px] font-semibold border-b border-granite-100 pb-0.5 hover:text-ember hover:border-ember transition-colors"
            >
              All entries →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rp) => (
              <article key={rp.id}>
                <Link href={`/blog/${rp.id}`} className="group block">
                  {imageByPost.get(rp.id) ? (
                    <div className="relative h-50 md:h-55 mb-3.5 overflow-hidden">
                      <Image
                        src={imageByPost.get(rp.id)!}
                        alt={rp.title}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  ) : (
                    <div className="photo-ph h-50 md:h-55 mb-3.5">
                      <span className="font-mono text-[10.5px] uppercase tracking-widest text-slate-500">
                        PHOTO
                      </span>
                    </div>
                  )}
                  <p className="font-mono text-[10.5px] uppercase tracking-widest text-slate-500 mb-2">
                    {formatDate(rp.created_at)} · {estimateReadTime(rp.content)}{" "}
                    MIN
                  </p>
                  <h3 className="font-display uppercase text-[21px] leading-[1.05] text-balance text-granite-100 group-hover:text-ember transition-colors mb-2">
                    {rp.title}
                  </h3>
                  <p className="text-[13.5px] leading-[1.55] text-slate-700 text-pretty">
                    {getExcerpt(rp.content, 120)}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
