import { Skeleton } from "./ui/skeleton";

const s = "bg-chalk-3";
const d = "bg-granite-100";

export default function UserPageSkeleton() {
  return (
    <div className="bg-chalk min-h-screen">
      {/* HERO (dark) */}
      <section className="flex min-h-[clamp(420px,58vh,540px)] flex-col justify-end overflow-hidden bg-granite-200">
        <div
          className="mx-auto w-full max-w-7xl"
          style={{ padding: "0 clamp(20px,5vw,56px) clamp(30px,5vw,48px)" }}
        >
          {/* Eyebrow */}
          <Skeleton className={`mb-5 h-2.5 w-24 rounded-sm ${d}`} />
          {/* Headline lines */}
          <Skeleton className={`h-9 w-48 rounded-sm ${d}`} />
          <Skeleton className={`mt-3 h-16 w-80 rounded-sm md:h-24 md:w-[34rem] ${d}`} />
          {/* Meta row */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Skeleton className={`h-7 w-28 rounded-sm ${d}`} />
            <Skeleton className={`h-7 w-44 rounded-sm ${d}`} />
          </div>
          {/* Stat strip */}
          <div
            className="mt-[clamp(34px,5vw,52px)] flex flex-wrap gap-[clamp(20px,3vw,40px)] pt-[clamp(26px,3vw,34px)]"
            style={{ borderTop: "1px solid rgba(244,241,236,0.14)" }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className={`h-12 w-16 rounded-sm ${d}`} />
                <Skeleton className={`h-2.5 w-20 rounded-sm ${d}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOPO DIVIDER */}
      <div className="mx-auto max-w-7xl px-4 opacity-50 md:px-14">
        <Skeleton className={`h-8 w-full rounded-none ${s}`} />
      </div>

      {/* LATEST SENDS + FAVORITES */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-14 md:py-12">
        <div className="grid grid-cols-1 gap-[clamp(18px,2.4vw,22px)] lg:grid-cols-[1.45fr_1fr]">
          {/* Latest sends (light) */}
          <div className="rounded-md border border-chalk-3 bg-chalk-2 p-[clamp(18px,2.4vw,26px)]">
            <div className="mb-4.5 flex flex-wrap items-end justify-between gap-3">
              <div className="flex flex-col gap-1.5">
                <Skeleton className={`h-2.5 w-24 rounded-sm ${s}`} />
                <Skeleton className={`h-9 w-44 rounded-sm ${s}`} />
              </div>
              <Skeleton className={`h-3 w-20 rounded-sm ${s}`} />
            </div>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {Array.from({ length: 6 }).map((_, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-3 border border-chalk-3 bg-chalk px-3.5 py-3 md:px-4.5 md:py-3.5"
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <Skeleton
                      className={`h-4 rounded-sm ${s}`}
                      style={{ width: `${55 + (i % 3) * 15}%` }}
                    />
                    <Skeleton className={`h-2.5 w-32 rounded-sm ${s}`} />
                  </div>
                  <Skeleton className={`h-6 w-11 shrink-0 rounded-sm ${s}`} />
                </li>
              ))}
            </ul>
          </div>

          {/* Favorites (dark) */}
          <div className="rounded-md bg-granite-100 p-[clamp(18px,2.4vw,26px)]">
            <div className="mb-4.5 flex flex-wrap items-end justify-between gap-3">
              <div className="flex flex-col gap-1.5">
                <Skeleton className={`h-2.5 w-20 rounded-sm ${d}`} />
                <Skeleton className={`h-9 w-36 rounded-sm ${d}`} />
              </div>
              <Skeleton className={`h-2.5 w-16 rounded-sm ${d}`} />
            </div>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-3 rounded-sm px-3.5 py-3"
                  style={{ background: "rgba(244,241,236,0.05)" }}
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <Skeleton
                      className={`h-4 rounded-sm ${d}`}
                      style={{ width: `${50 + (i % 3) * 15}%` }}
                    />
                    <Skeleton className={`h-2.5 w-28 rounded-sm ${d}`} />
                  </div>
                  <Skeleton className={`h-6 w-11 shrink-0 rounded-sm ${d}`} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section className="bg-chalk-2">
        <div className="mx-auto w-full max-w-7xl px-4 py-[clamp(26px,4vw,40px)] pb-[clamp(48px,7vw,72px)] md:px-14">
          <Skeleton className={`mb-2 h-2.5 w-28 rounded-sm ${s}`} />
          <Skeleton className={`mb-8 h-10 w-72 rounded-sm ${s}`} />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Two donut cards */}
            {[0, 1].map((i) => (
              <div
                key={i}
                className="rounded-md border border-chalk-3 bg-chalk p-5.5"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex flex-col gap-1.5">
                    <Skeleton className={`h-2.5 w-16 rounded-sm ${s}`} />
                    <Skeleton className={`h-5 w-40 rounded-sm ${s}`} />
                  </div>
                  <Skeleton className={`h-5 w-4 rounded-sm ${s}`} />
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <Skeleton className={`h-50 w-50 shrink-0 rounded-full ${s}`} />
                  <div className="flex flex-1 flex-col gap-2.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div
                        key={j}
                        className="flex items-center justify-between gap-2.5"
                      >
                        <div className="flex items-center gap-2.5">
                          <Skeleton className={`h-3 w-3 rounded-[1px] ${s}`} />
                          <Skeleton
                            className={`h-3 rounded-sm ${s}`}
                            style={{ width: `${40 + (j % 3) * 12}px` }}
                          />
                        </div>
                        <Skeleton className={`h-2.5 w-5 rounded-sm ${s}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Date bar graph — full width */}
            <div className="rounded-md border border-chalk-3 bg-chalk p-5.5 md:col-span-2">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div className="flex flex-col gap-1.5">
                  <Skeleton className={`h-2.5 w-16 rounded-sm ${s}`} />
                  <Skeleton className={`h-5 w-36 rounded-sm ${s}`} />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className={`h-2.5 w-28 rounded-sm ${s}`} />
                  <Skeleton className={`h-8 w-24 rounded-sm ${s}`} />
                </div>
              </div>
              <div
                className="flex items-end gap-1.5 border-b border-chalk-3 md:gap-3"
                style={{ height: 180, paddingBottom: 28 }}
              >
                {[30, 0, 50, 70, 100, 80, 45, 20, 0, 0, 20, 60].map((h, i) => (
                  <div key={i} className="flex h-full flex-1 items-end">
                    {h > 0 && (
                      <Skeleton
                        className={`w-full rounded-sm ${s}`}
                        style={{ height: `${h}%` }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Top crags — full width */}
            <div className="rounded-sm border border-chalk-3 bg-chalk p-5 md:col-span-2 md:p-6">
              <Skeleton className={`h-2.5 w-32 rounded-sm ${s}`} />
              <Skeleton className={`mb-4 mt-1 h-6 w-40 rounded-sm ${s}`} />
              <div className="grid grid-cols-1 gap-x-10 gap-y-3.5 md:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i}>
                    <div className="mb-1 flex items-baseline justify-between gap-2">
                      <Skeleton className={`h-4 w-28 rounded-sm ${s}`} />
                      <Skeleton className={`h-2.5 w-16 rounded-sm ${s}`} />
                    </div>
                    <Skeleton
                      className={`h-2 rounded-sm ${s}`}
                      style={{ width: `${90 - i * 12}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
