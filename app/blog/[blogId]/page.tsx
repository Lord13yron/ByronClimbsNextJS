import {
  getPostById,
  getImagesForPost,
  getRecentPosts,
  getAllPostImages,
  getVideosForPost,
} from "@/lib/data-service";
import Link from "next/link";
import Image from "next/image";
import TopoLine from "@/components/ui/TopoLine";
import MonoChip from "@/components/ui/MonoChip";
import ScrollProgress from "@/components/blog/ScrollProgress";
import ArticleHero from "@/components/blog/ArticleHero";
import ReadingRail from "@/components/blog/ReadingRail";
import Reveal from "@/components/anim/Reveal";
import Parallax from "@/components/anim/Parallax";
import DrawOn from "@/components/anim/DrawOn";

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

  const [post, images, videos, recentPosts, allImages] = await Promise.all([
    getPostById(Number(blogId)),
    getImagesForPost(Number(blogId)),
    getVideosForPost(Number(blogId)),
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
  const media = [
    ...images.slice(1).map((img) => ({
      type: "image" as const,
      ...img,
    })),
    ...videos.map((video) => ({
      type: "video" as const,
      ...video,
    })),
  ];
  const readTime = estimateReadTime(post.content);
  const date = formatDate(post.created_at);
  const monthYear = getMonthYear(post.created_at);

  const paragraphs = post.content
    .split(/\r?\n\r?\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const inlineMedia = media.slice(0, paragraphs.length);
  const galleryMedia = media.slice(paragraphs.length);

  return (
    <div className="bg-chalk">
      <ScrollProgress />

      {/* Cinematic hero */}
      <ArticleHero
        image={heroImage}
        title={post.title}
        date={date}
        readTime={readTime}
        monthYear={monthYear}
      />

      {/* Topo divider */}
      <div className="mx-auto max-w-7xl px-4 text-chalk-3/60 md:px-14">
        <DrawOn>
          <TopoLine height={40} seed={7} />
        </DrawOn>
      </div>

      {/* Article body — reading rail + reading column */}
      <section className="py-[clamp(34px,5vw,56px)]">
        <div className="grid grid-cols-[minmax(0,720px)] justify-center px-[clamp(20px,5vw,56px)] min-[1080px]:grid-cols-[184px_minmax(0,720px)_184px]">
          {/* Reading rail (desktop only) */}
          <div className="hidden min-[1080px]:block">
            <ReadingRail date={date} readTime={readTime} />
          </div>

          {/* Reading column */}
          <article id="article-body" className="min-w-0 max-w-180">
            <Reveal y={26} stagger={0.08} className="space-y-7">
              {paragraphs.map((para, i) => (
                <div key={i}>
                  {i === 0 && para.length > 0 ? (
                    <p className="overflow-hidden text-pretty text-[clamp(16.5px,1.7vw,18px)] leading-[1.78] text-granite-100">
                      <span className="float-left pr-3 pt-1 font-display text-[78px] font-extrabold leading-[0.74] text-ember">
                        {para[0]}
                      </span>
                      {para.slice(1)}
                    </p>
                  ) : (
                    <p className="text-pretty text-[clamp(16.5px,1.7vw,18px)] leading-[1.78] text-granite-100">
                      {para}
                    </p>
                  )}

                  {inlineMedia[i] && (
                    <figure className="relative mt-8 h-[clamp(280px,40vw,440px)] overflow-hidden rounded-sm bg-granite-200">
                      {inlineMedia[i].type === "image" ? (
                        <Parallax
                          yPercent={12}
                          className="absolute inset-x-0 -top-[8%] h-[116%]"
                        >
                          <Image
                            src={inlineMedia[i].url}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 720px"
                            className="object-cover object-center transition-transform duration-700 hover:scale-[1.04]"
                          />
                        </Parallax>
                      ) : (
                        <iframe
                          src={`https://www.youtube.com/embed/${inlineMedia[i].url}`}
                          title={post.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 h-full w-full"
                        />
                      )}
                    </figure>
                  )}
                </div>
              ))}
            </Reveal>

            {/* Filed footer */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-chalk-3 pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                FILED {date} · KELOWNA, BC
              </p>
              <Link
                href="/blog"
                className="font-display text-[13px] uppercase tracking-[0.02em] text-ember underline-offset-4 hover:text-ember-deep hover:underline"
              >
                ← All entries
              </Link>
            </div>
          </article>

          {/* Right spacer */}
          <div aria-hidden="true" className="hidden min-[1080px]:block" />
        </div>
      </section>

      {/* Gallery */}
      {galleryMedia.length > 0 && (
        <section className="mx-auto max-w-295 px-[clamp(20px,5vw,56px)] pb-[clamp(48px,6vw,76px)] pt-[clamp(20px,3vw,32px)]">
          <MonoChip className="mb-5 block text-ember">— FROM THE TRIP</MonoChip>
          <Reveal
            stagger={0.12}
            className="grid grid-cols-1 gap-5 min-[760px]:grid-cols-2"
          >
            {galleryMedia.map((item, i) => (
              <figure
                key={`${item.type}-${item.id}`}
                className={`relative overflow-hidden rounded-sm bg-granite-200 ${
                  i === 0
                    ? "h-[clamp(280px,46vw,520px)] min-[760px]:col-span-2"
                    : "h-[clamp(220px,30vw,340px)]"
                }`}
              >
                {item.type === "image" ? (
                  <Parallax
                    yPercent={6}
                    className="absolute inset-x-0 -top-[5%] h-[110%]"
                  >
                    <Image
                      src={item.url}
                      alt={post.title}
                      fill
                      sizes="(max-width: 760px) 100vw, 590px"
                      className="object-cover object-center transition-transform duration-700 hover:scale-[1.05]"
                    />
                  </Parallax>
                ) : (
                  <iframe
                    src={`https://www.youtube.com/embed/${item.url}`}
                    title={post.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                )}
              </figure>
            ))}
          </Reveal>
        </section>
      )}

      {/* Topo divider */}
      {related.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 text-chalk-3/60 md:px-14">
          <DrawOn>
            <TopoLine height={40} seed={19} />
          </DrawOn>
        </div>
      )}

      {/* Related entries */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-[clamp(20px,5vw,56px)] pb-[clamp(64px,8vw,96px)] pt-[clamp(32px,5vw,52px)]">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <MonoChip className="mb-2.5 block text-ember">
                — KEEP READING
              </MonoChip>
              <h2 className="font-display text-[clamp(30px,4vw,44px)] uppercase leading-none text-granite-100">
                More from the journal
              </h2>
            </div>
            <Link
              href="/blog"
              className="border-b border-granite-100 pb-0.5 font-display text-[13px] font-semibold uppercase transition-colors hover:border-ember hover:text-ember"
            >
              All entries →
            </Link>
          </div>
          <Reveal
            y={40}
            stagger={0.1}
            className="grid grid-cols-1 gap-7.5 min-[760px]:grid-cols-3"
          >
            {related.map((rp) => (
              <article key={rp.id}>
                <Link href={`/blog/${rp.id}`} className="group block">
                  {imageByPost.get(rp.id) ? (
                    <div className="relative mb-3.5 h-[clamp(190px,24vw,230px)] overflow-hidden rounded-sm">
                      <Image
                        src={imageByPost.get(rp.id)!}
                        alt={rp.title}
                        fill
                        sizes="(max-width: 760px) 100vw, 400px"
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                    </div>
                  ) : (
                    <div className="photo-ph mb-3.5 h-[clamp(190px,24vw,230px)] rounded-sm">
                      <MonoChip>PHOTO</MonoChip>
                    </div>
                  )}
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                    {formatDate(rp.created_at)} · {estimateReadTime(rp.content)}{" "}
                    MIN
                  </p>
                  <h3 className="mb-2 text-balance font-display text-[22px] uppercase leading-[1.05] text-granite-100 transition-colors group-hover:text-ember">
                    {rp.title}
                  </h3>
                  <p className="text-pretty text-[13.5px] leading-[1.55] text-slate-700">
                    {getExcerpt(rp.content, 120)}
                  </p>
                </Link>
              </article>
            ))}
          </Reveal>
        </section>
      )}
    </div>
  );
}
