# Handoff: Byron Climbs — Article / Post Detail Page (V2)

## Overview
This is a **redesign of the blog post detail page** for **Byron Climbs** — a personal climbing journal for Byron Hayes (Kelowna, BC). The page lives at the dynamic route `/blog/[blogId]` and renders a single field-journal entry: a **cinematic dark hero**, a **drop-cap reading column** flanked by a sticky **reading-progress rail**, an inline **pull quote**, **inline media** and a **gallery**, then a **"Keep reading"** related-entries grid.

The big change in V2 is the **hero**: the current post page opens with a flat light-chalk masthead (small mono meta + big title + a contained hero image). This redesign replaces it with a **dark, full-bleed cinematic hero** — the cover photo bled edge-to-edge under layered scrims, a slow ken-burns + scroll parallax, drifting **ember particle dust** (three.js), a coordinates marker, and a line-masked title that slides up on load. Below the hero, the existing reading body, gallery, and related grid get a **motion + layout pass**: a new left **reading rail** with live percent, a **pull quote**, caption overlays on media, and scroll-reveal/parallax throughout.

The design keeps the established **"Granite & Chalk"** system — warm chalk paper, near-black granite, a single rust-ember accent, condensed uppercase display type, mono micro-labels, and hand-drawn topographic line motifs.

---

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype showing the intended look, layout, and motion. **They are not production code to paste in.** `Byron Climbs Article.dc.html` uses a small in-house templating runtime (`support.js`) purely so the prototype renders in a browser; **ignore that runtime entirely** when building — it is not part of the deliverable.

Your task is to **recreate this design in the existing `next-climbing` codebase** (Next.js 16 App Router + React 19 + Tailwind v4 + shadcn), using its already-established tokens and components. **The post page already exists** at `app/blog/[blogId]/page.tsx` in an earlier form — **this is an iteration on it, not a greenfield build.** Wherever possible, modify the existing page and reuse the existing animation/UI primitives rather than introducing new ones; the only genuinely new pieces are the cinematic hero (a client component) and the reading rail.

To view the prototype: open `Byron Climbs Article.dc.html` in a browser and scroll to see the entrance + scroll-driven animation.

---

## Fidelity
**High-fidelity.** Colors, typography, spacing, and interactions are final and intentional. Recreate the UI faithfully using the codebase's existing Tailwind theme and component patterns. Every hex value below already exists as a CSS variable / Tailwind utility in `app/globals.css` — **use the token names, not raw hex.**

---

## How this maps to the existing codebase

The page is a server component in `app/blog/[blogId]/page.tsx` and already fetches the post, its images/videos, and recent posts, and already splits the content into paragraphs and groups media into inline vs. gallery (see **State & Data**). **Keep that data layer**; restyle the markup, restructure into the hero + rail + body layout, and layer in motion. The reusable motion/UI primitives already exist — wrap markup in them rather than re-implementing GSAP per element.

| Design section | Where it lives / what to do |
|---|---|
| Scroll-progress bar | `components/blog/ScrollProgress.tsx` — **reuse as-is** (drop one instance at the top of the page). |
| Header / nav | `components/Header.tsx` — **already matches.** `/blog/*` keeps "Field Notes" active. No change. |
| **Cinematic hero (NEW)** | New client component, e.g. `components/blog/ArticleHero.tsx` (bled cover photo + ember dust + scrims + breadcrumb/meta/title). Replaces the current light masthead block (breadcrumb + meta + H1 + contained hero image) at the top of the page. |
| **Reading rail (NEW)** | New client component, e.g. `components/blog/ReadingRail.tsx` (sticky left rail: live percent + fill bar + date/read-time + back-to-top). Desktop only. |
| Topo dividers | `components/ui/TopoLine.tsx` + `components/anim/DrawOn.tsx` — reuse (two instances bracket the gallery). |
| Reading body | post body block in `page.tsx` — keep the paragraph split + drop cap; wrap reveals in `components/anim/Reveal.tsx`. |
| **Pull quote (NEW)** | A `<blockquote>` injected into the reading column (ember left-border, condensed display). See note on data below — there is no quote field. |
| Inline media / gallery | existing media blocks — add caption overlays + `components/anim/Parallax.tsx`. |
| Related entries | existing "Keep reading" grid — restyle + `Reveal`. |
| Mono micro-labels | `components/ui/MonoChip.tsx` — use for all eyebrows, dates, read-times, captions, coordinates. |
| Footer | `components/Footer.tsx` — already matches, no change. |
| Motion | `gsap` + `ScrollTrigger` via `components/anim/gsap.ts` (already a dependency). |
| Hero dust | **three.js** — already introduced for the blog masthead (`components/blog/BlogMasthead.tsx`); reuse the dependency. |

> **Reuse the animation primitives.** `components/anim/` already contains `Reveal` (scroll-in entrance), `Parallax` (scroll-scrubbed drift), `DrawOn` (stroke-dashoffset draw for topo paths), `Counter` (count-up), and the shared `gsap.ts` (registers `ScrollTrigger`, exposes `prefersReducedMotion()`). **All of them already gate on `prefers-reduced-motion`.** Prefer wrapping markup in these over hand-writing GSAP.

> **three.js dependency:** the hero dust uses three.js. If the blog-masthead handoff has already landed, `three` (+ dev `@types/three`) is in `package.json` — reuse it. If not, add it: `npm i three && npm i -D @types/three`. See **Hero fallback** for the no-WebGL path.

---

## Design Tokens
All already defined in `app/globals.css` (`:root` + `@theme inline`). Reference the Tailwind utility (e.g. `bg-ember`, `text-chalk`, `border-chalk-3`).

### Color
| Token (CSS var) | Tailwind | Hex | Usage |
|---|---|---|---|
| `--chalk` | `chalk` | `#F4F1EC` | Page background; light text on the dark hero |
| `--chalk-2` | `chalk-2` | `#ECE7DE` | Muted fills, placeholder hatch |
| `--chalk-3` | `chalk-3` | `#DCD5C8` | Borders, dividers, dashed rules, rail track |
| `--granite-100` | `granite-100` | `#1F1F21` | Primary text on light |
| `--granite-200` | `granite-200` | `#161618` | **Hero background** (behind/around the photo); image placeholder bg |
| `--granite-300` | `granite-300` | `#0E0E10` | Footer background |
| `--slate-700` | `slate-700` | `#4A4A4F` | Related-card excerpt copy |
| `--slate-500` | `slate-500` | `#6E6E74` | Mono labels, inactive nav, back-to-top |
| `--slate-400` | `slate-400` | `#8C8C92` | De-emphasized meta (rail caption, filed line) |
| `--ember` | `ember` | `#C8541E` | **Accent** — eyebrows, drop cap, pull-quote border, rail fill, progress bar, links, dust glow |
| `--ember-soft` | `ember-soft` | `#E37A3F` | Accent on dark (hero crumb/meta highlight, dust particle color) |
| `--ember-deep` | `ember-deep` | `#8E3A12` | Link hover |

On the dark hero, light text uses `chalk` at reduced alpha: title `chalk` (1.0), crumb/meta inactive `rgba(244,241,236,0.66)`, dividers `rgba(244,241,236,0.3)`, coordinates + scroll cue `rgba(244,241,236,0.4)`. Caption pills over photos: text `chalk` on `rgba(22,22,24,0.55)` with `backdrop-blur(4px)`.

### Type
- `--font-display` → **Saira Condensed** (600/700/800). Uppercase, tight tracking (`0.005–0.06em`), line-height `0.86–1.05`. Hero title, nav, pull quote, section heads, related titles, rail percent, drop cap. Tailwind: `font-display`.
- `--font-body` → **Inter** (300–600). Body copy & excerpts. Tailwind: `font-body`.
- Mono micro-label → **JetBrains Mono** (400/500), `uppercase`, `letter-spacing:0.18em`, `~10px`, `slate-500`. Use `ui/MonoChip.tsx` for all dates, eyebrows, read-times, captions, coordinates. Tailwind: `font-mono`.

Display sizes (clamp, min→max): Hero H1 `46→116px` / weight 800 / line-height `0.86`; drop cap `78px` / 800; pull quote `28→46px` / 700 / line-height `1.04`; "More from the journal" H2 `30→44px` / 700; related card H3 `22px` / 600; rail percent `34px`. Body paragraphs: Inter `16.5→18px` / line-height `1.78`.

### Radius, spacing, shadow
- `--radius: 0.25rem` (≈3–4px) — squared utility aesthetic. Images, caption pills, buttons all use `rounded-sm`. **No large pill radii.**
- **Page header content max-width `1320px`** (`max-w-7xl`), horizontal padding `px-4 md:px-14` (`clamp(20px,5vw,56px)`).
- **Article reading column is a 3-column grid** (see layout spec): `184px` rail / `minmax(0,720px)` reading column / `184px` right spacer, centered. The reading measure is **720px max**.
- Filed footer + article rules use **dashed / hairline** styles (`1px dashed chalk-3`, `1px solid chalk-3`).
- No drop shadows on this page except the hero's own gradient scrims and the translucent caption pills.

---

## Screens / Views (section specs)

The page is one scrolling route. Top-to-bottom: **Scroll-progress bar → Cinematic hero → Topo divider → Article body (reading rail + reading column) → Gallery → Topo divider → Related ("Keep reading") → Footer.**

### 0. Scroll-progress bar — `components/blog/ScrollProgress.tsx`
- Reuse the existing component as-is. Fixed top hairline, `height:2px`, `bg-ember`, `z-50`+, width tracks document scroll 0→100% (`transition: width 0.08s linear`). Decorative, `aria-hidden`.

### 1. Cinematic hero — NEW (`components/blog/ArticleHero.tsx`, client component)
- **Container:** full-bleed, `bg-granite-200` (`#161618`), `position:relative; overflow:hidden`, `min-height: clamp(560px, 90vh, 820px)`, flex column, content anchored **bottom**.
- **Cover photo (bled):** the post's hero image (`images[0]`) fills the section, `object-cover`, positioned slightly oversize (`left:-4%; top:-8%; width:108%; height:118%`) so the ken-burns/parallax never reveals an edge. Tone it down to sit under text: `filter: saturate(0.86) contrast(1.04) brightness(0.78)`, `object-position: center 46%`. *(The current page renders the hero image **contained** below the title; here it is the **background**, cover-cropped.)*
- **Ember particle dust (three.js):** a drifting field of warm ember motes floats up over the photo (`z` above the image, below the scrims, `pointer-events:none`).
  - ~900 desktop / ~340 mobile `THREE.Points` in a `~46×26×24` box, soft round radial-gradient sprite texture (white→`#FFECDC`→`#E37A3F`→transparent), `color #E37A3F`, `PointsMaterial` with `AdditiveBlending`, `sizeAttenuation`, `depthWrite:false`, `opacity ~0.5` (fades in over the first frames).
  - Each frame: particles rise (`y += 0.013·speed`, wrap at the top), sway slightly on x; the whole field slowly rotates (`rotation.y += 0.0007`).
  - **Subtle pointer parallax** (desktop only): camera eases toward the cursor (`±2.6` x, `±1.5` y, lerp 0.04).
  - **Perf:** `pixelRatio` capped at 2; mobile drops particle count + bumps size; an `IntersectionObserver` **pauses the RAF loop when the hero scrolls offscreen**; resize debounced (~150ms).
- **Overlays (stacked, `pointer-events:none`):** (a) ember radial **glow** top-right `radial-gradient(ellipse, rgba(200,84,30,0.26), transparent 64%)` with a slow ~9s vertical drift; (b) legibility **scrim** `linear-gradient(180deg, rgba(22,22,24,0.78) 0% → 0.25 @26% → 0.18 @48% → 0.88 @100%)`; (c) a **top fade** `linear-gradient(180deg, rgba(22,22,24,0.82), transparent)` ~96px tall.
- **Coordinates marker:** top-right, mono, `rgba(244,241,236,0.4)`, right-aligned two lines — e.g. `49.70° N` / `123.16° W`.
- **Content block (bottom, max-width 1320px inner, padding `clamp(40px,7vw,68px) clamp(20px,5vw,56px) clamp(34px,5vw,56px)`):**
  - **Breadcrumb** (mono row, wraps): "Field Journal" (`ember-soft` on hover, links `/blog`) `/` month-year (e.g. "AUG 2024") `/` area (e.g. "SQUAMISH", `ember-soft`). Slashes at `rgba(244,241,236,0.3)`.
  - **Meta row** (mono, wraps, dot separators `rgba(244,241,236,0.4)`): date `YYYY.MM.DD` (`ember-soft`) · "N MIN READ" · category (e.g. "DEEP WATER SOLO").
  - **H1 title:** `font-display` 800 uppercase, `clamp(46px,8.4vw,116px)`, line-height `0.86`, `max-width:14ch`, `text-balance`. Each line wrapped in an `overflow:hidden` mask so it can slide up on entrance (the prototype splits the title into two masked lines; in production, render the title and wrap it so it can be revealed — a single masked block is fine if line-splitting is impractical).
- **Scroll cue:** bottom-center, "READ" mono + down-arrow SVG, `rgba(244,241,236,0.42)`, gentle 2.4s bob.

> **Hero content that's real vs. invented.** Real (derive as the page already does): the cover **image**, **date** (`YYYY.MM.DD`), **read time** (`estimateReadTime`), **month-year** for the crumb (`getMonthYear`), **title**. **Invented for the mock — do not hard-code:** the **coordinates** (`49.70° N / 123.16° W`), the **area** crumb ("SQUAMISH"), and the **category** ("DEEP WATER SOLO"). The `Post` type is `{ id, created_at, title, content }` — there is no `location`, `area`, `category`, or `coords` field. Either add real fields/derive a source, or **omit** these chips rather than shipping fake values.

> **Hero fallback (no three.js / reduced motion):** keep the bled cover photo, scrims, and all text; **skip the dust layer** (and the ken-burns/parallax). The hero still reads as a full, intentional cinematic block — never a flat dark rectangle. The dust is an enhancement, not load-bearing.

### 2. Topo dividers — `components/ui/TopoLine.tsx` + `components/anim/DrawOn.tsx`
- Two instances: one just below the hero (before the body) and one between the gallery and the related grid, on `chalk` background. Full-width SVG band, stroke `chalk-3`, `1px`, `~40px` tall, ~`text-chalk-3`/60% opacity, `max-w-7xl` centered. Wrap each in `DrawOn` so the contour lines **draw on** (stroke-dashoffset) when scrolled into view. Prototype seeds differ between the two for visual variety.

### 3. Article body — reading rail + reading column
- **Background:** `chalk`. Section padding `clamp(34px,5vw,56px) 0 clamp(20px,4vw,40px)`.
- **Layout (the defining structural change):** a centered CSS grid
  `grid-template-columns: 184px minmax(0,720px) 184px; justify-content:center; padding:0 clamp(20px,5vw,56px)`.
  - **≤1080px:** collapse to a single `minmax(0,720px)` column and **hide the rail**.

**3a. Reading rail (`<aside>`, NEW client component, sticky `top: 104px`, desktop only):**
- Eyebrow "— READING" (`MonoChip`, `ember`).
- A **vertical track** (`2px` wide, `200px` tall, `bg-chalk-3`, rounded) with an **ember fill** (`bg-ember`) whose **height tracks reading progress through the article body** 0→100%.
- Beside it: a big **percent number** (`font-display` `34px`, `granite-100`) that counts the same 0→100, with a "PERCENT" mono caption; below, the article's date + "N MIN" (mono `slate-400`).
- A "↑ Back to top" link (`font-display` uppercase `12px`, `slate-500` → `ember` on hover) that smooth-scrolls to top.
- **Progress source:** a `ScrollTrigger` on the article-body element (`start: "top 70%"`, `end: "bottom 80%"`) drives both the fill height and the percent text. (The prototype uses raw ScrollTrigger; you can also derive it with a small scroll listener like `ScrollProgress` does, scoped to the body element's bounds.) Honor reduced motion by still updating the value (it's information, not decoration) but skipping any easing.

**3b. Reading column (`<article>`, `min-width:0`, max 720px):**
- **Drop cap:** first paragraph's first letter floated left, `font-display` `78px` weight 800 `ember`, `line-height:0.74`, `padding:6px 12px 0 0`. (This already exists on the current page — keep it.)
- **Body paragraphs:** Inter `clamp(16.5px,1.7vw,18px)`, line-height `1.78`, `granite-100`, `text-pretty`, `margin-bottom ~26px`. Built from `post.content` split on blank lines (already done). Wrap the set in `Reveal` (`y:26`, stagger `0.08`) so paragraphs rise in on scroll.
- **Inline media:** the existing inline images/videos, now each in a `rounded-sm overflow-hidden` figure, `object-cover`, with a **mono caption pill** bottom-left (`rgba(22,22,24,0.55)`, `backdrop-blur`). Hover → image `scale(1.04)` (0.6s ease). Wrap each in `Reveal` (`y:40`) and give the image a gentle `Parallax` (`yPercent ~8–16`, scrub). *(The current page uses `object-contain` with no caption; this redesign uses `object-cover` + caption overlay.)* Caption text (e.g. "THE APRON · DAWN WARM-UP") is **mock copy** — derive from real data or omit.
- **Pull quote (NEW):** a `<blockquote>` set wider than the measure (the prototype uses negative side margins `~-64px` on desktop, `0` under 1080px), `padding-left:30px`, `border-left:3px solid ember`. Text: `font-display` uppercase 700, `clamp(28px,4vw,46px)`, line-height `1.04`, `granite-100`, `text-balance`. Reveals on scroll (`y:24` + fade). **There is no quote field on `Post`** — the prototype's quote is invented. In production, either add a `pull_quote` field, derive one (e.g. first sentence over N chars), or **drop the pull quote** rather than fabricating text.
- **Filed footer:** a `1px dashed chalk-3` top rule, then a row (space-between, wraps): "FILED YYYY.MM.DD · KELOWNA, BC" (mono `slate-400`) on the left and a "← All entries" ember underline link (hover → `ember-deep`) to `/blog` on the right.

### 4. Gallery — existing gallery media
- **Background:** `chalk`. `max-width:1180px` centered, padding `clamp(20px,3vw,32px) clamp(20px,5vw,56px) clamp(48px,6vw,76px)`.
- Eyebrow "— FROM THE TRIP" (`MonoChip`, `ember`).
- **Grid:** `grid-cols-2 gap-5`. The first item spans **full width** (`grid-column:1/-1`, `height clamp(280px,46vw,520px)`); the rest are half-width (`height clamp(220px,30vw,340px)`). **≤760px → single column.** Each tile: `rounded-sm overflow-hidden`, `object-cover`, granite placeholder bg, hover → `scale(1.05)` (0.6s), a mono **caption pill** bottom-left. Wrap the set in `Reveal` (stagger `0.12`); give each image a gentle `Parallax` (`yPercent ~6`). Source from `galleryMedia` (the media beyond what's placed inline — already computed). Caption text is mock; derive or omit.

### 5. Related ("Keep reading") — existing related grid
- **Background:** `chalk`. `max-w-7xl` centered, padding `clamp(32px,5vw,52px) clamp(20px,5vw,56px) clamp(64px,8vw,96px)`.
- Header row (flex, align-end, space-between, wraps): left — eyebrow "— KEEP READING" (`MonoChip`, `ember`) + H2 "More from the journal" (`font-display` 700 `clamp(30px,4vw,44px)`); right — "All entries →" ember-hover underline link to `/blog`.
- **Grid:** `grid-cols-3 gap-7.5` (`30px`). **≤760px → single column.** Each card (links to `/blog/{id}`): image `rounded-sm overflow-hidden` `height clamp(190px,24vw,230px)` `object-cover`, hover → `scale(1.05)`; below — mono "YYYY.MM.DD · N MIN"; H3 `font-display` 600 `22px` uppercase, **hover → ember**; 1–2 line excerpt Inter `13.5px` `slate-700`. Source is `related` (recent posts minus the current, already computed); images via the `imageByPost` map; no image → `.photo-ph` hatch placeholder. Wrap in `Reveal` (`y:40`, stagger `0.1`).

### 6. Footer — `components/Footer.tsx`
- Existing component, no change. `granite-300` (`#0E0E10`), chalk text, brand mark + wordmark left, mono copyright right.

---

## Interactions & Behavior
The prototype uses **GSAP + ScrollTrigger** (already a dependency, via `components/anim/gsap.ts`) and **three.js** for the hero dust. Reproduce the *feel* with the existing `anim/` primitives. All scroll-triggered entrances fire **once** (`once:true`). **Every motion must respect `prefers-reduced-motion: reduce`** — the `anim/` components already do; preserve that in the new hero + rail.

| Element | Motion | Duration / easing | Reduced-motion |
|---|---|---|---|
| Scroll-progress bar | width 0→100% with scroll | `transition 0.08s linear` | unchanged (position, not animation) |
| Hero dust | continuous rising particles + pointer parallax | RAF loop | **skip the dust entirely** (static photo + scrims) |
| Hero cover photo | slow ken-burns (`scale → 1.09`, 16s yoyo) + scroll parallax (`yPercent ~10`, scrub) | continuous / scrub | none (static) |
| Hero title lines | slide up `yPercent 120→0`, stagger | 1.0s, stagger 0.1, `power3.out` | skip (lines visible) |
| Hero crumb / meta | crumb fade+`x:-14`; meta items fade+`y:12` stagger | 0.6–0.7s, sequenced after title | skip |
| Topo dividers | stroke draw-on via dashoffset (`DrawOn`) | 1.5s `power1.inOut`, stagger 0.1 | render fully drawn |
| Reading-rail fill + percent | height + number track body scroll 0→100 | scrubbed to scroll | **keep** (it's information) — update value, no easing |
| Body paragraphs | `Reveal` `y:26` + fade, stagger | 0.7s, stagger 0.08, `power3.out` | skip |
| Inline media | `Reveal` `y:40` + fade; image `Parallax` scrub | 0.85s reveal / scrub | skip reveal; no parallax |
| Inline / gallery image | `scale(1.04–1.05)` on hover | `0.5–0.6s ease` | unchanged (hover) |
| Pull quote | `Reveal` `y:24` + fade | 0.9s `power3.out` | skip |
| Gallery tiles | `Reveal` stagger + image `Parallax` | 0.85s, stagger 0.12 | skip reveal; no parallax |
| Related cards | `Reveal` `y:40` + fade, stagger | 0.75s, stagger 0.1, `power3.out` | skip |
| Related title | color → ember | `transition 0.2s ease` | unchanged |
| Back-to-top | smooth-scroll to top on click | `behavior:"smooth"` | browser-native (fine) |

**Hover states:** links / titles `→ ember` (deep on the underlined "All entries"/"← All entries" read-links); images `→ scale(1.04–1.05)`; back-to-top `→ ember`; crumb "Field Journal" `→ ember-soft`. All transitions ~0.2–0.6s ease.

**Navigation:** breadcrumb "Field Journal" → `/blog`; "← All entries" / "All entries →" → `/blog`; related cards → `/blog/{id}`; back-to-top → in-page smooth scroll. Header nav unchanged (`/`, `/blog`, `/database`, `/about`, `/contact`).

---

## State & Data
Server-rendered route; the data flow **already exists** in `app/blog/[blogId]/page.tsx` — preserve it, restructure the markup.

- **Params:** `blogId` from `params` (Promise — `await` it). `generateMetadata` already builds `"<title> — Field Journal"`.
- **Fetch (parallel):** `getPostById`, `getImagesForPost`, `getVideosForPost`, `getRecentPosts(4)`, `getAllPostImages()` from `lib/data-service.ts`.
- **Derive (already done in the page):**
  - `heroImage = images[0]?.url` → the hero cover (was rendered contained; now the bled background).
  - `media = [...images.slice(1) as image, ...videos as video]` → combined media list.
  - `paragraphs = post.content.split(/\r?\n\r?\n+/)` (trimmed, non-empty).
  - `inlineMedia = media.slice(0, paragraphs.length)` interleaved into the body; `galleryMedia = media.slice(paragraphs.length)` → the gallery section.
  - `related = recentPosts.filter(p => p.id !== post.id).slice(0,3)`; `imageByPost` = first image per post id from `allImages`.
  - `readTime = estimateReadTime(content)` (≈200 wpm), `date = formatDate` (`YYYY.MM.DD`), `monthYear = getMonthYear` (`AUG 2024`), `getExcerpt` for related cards. **Keep these helpers.**
- **Client boundaries:** the hero (three.js dust + ken-burns/parallax) and the reading rail (live scroll progress) need `"use client"`. Keep `app/blog/[blogId]/page.tsx` a **server component** and drop client components into it, passing already-fetched data as props (e.g. `<ArticleHero image={heroImage} title={post.title} date={date} readTime={readTime} monthYear={monthYear} />`, `<ReadingRail date={date} readTime={readTime} />` wrapping/anchored to the body). The `Reveal`/`Parallax`/`DrawOn` wrappers are already client components — use them inline around server-rendered children.
- **`Post` has no `tags`, `read_time`, `location`, `area`, `category`, `coords`, or `pull_quote` field** (`{ id, created_at, title, content }`). Everything beyond title/date/read-time/content/images is **mock copy** in the prototype: hero coordinates, area + category chips, media caption pills, and the pull quote. Add real fields or omit — never hard-code the mock strings.

---

## Responsive behavior
- Page header content max-width `1320px` (`max-w-7xl`), horizontal padding `px-4 md:px-14` (`clamp(20px,5vw,56px)`).
- **Hero:** `min-height: clamp(560px,90vh,820px)`; type/padding `clamp()`-fluid.
- **≤1080px:** article grid collapses to the single `720px` reading column; **the reading rail is hidden**; the pull quote loses its negative side margins (sits flush in the column).
- **≤760px:** gallery + related grids → single column; desktop nav → hamburger drawer (already handled in `Header.tsx`).
- Reading measure stays ≤720px at all widths; most type sizes and section paddings are `clamp()`-fluid — honor the min/max in the specs.

---

## Accessibility
- Preserve the `prefers-reduced-motion` gating throughout (the `anim/` primitives already handle it). Specifically: **hero dust + ken-burns/parallax off**, entrances skip to final state, topo lines render drawn, inline/gallery parallax off; **the reading-rail percent still updates** (it's information, not decoration).
- Hero title sits over the photo — the stacked scrims are tuned so `chalk` text clears AA; keep them.
- All nav / breadcrumb / related / back-to-top links are real anchors. Decorative layers (dust canvas, topo lines, scrims, glow, coordinates, scroll cue, caption pills, "→/↑" glyphs) are `aria-hidden`. The mobile menu button keeps its `aria-label`.
- Mono chips convey info via text, not color alone. Inline media `<img>` keep meaningful `alt` (derive from post title as the page already does).

---

## Assets
Bundled in `assets/` (also already in the repo's `/public`):
- `cliff-over-water.jpg` — hero cover + an inline figure + a gallery tile in the prototype.
- `squamish-meadow.jpg` / `hero-boulder-bw.jpg` — sample inline / gallery / related images.

In production these are **post images from Supabase** (`post_images`, keyed by `post_id`) plus YouTube videos (`post_videos`) — the bundled JPGs are stand-ins for the mock. Posts/cards with no image fall back to the `.photo-ph` hatch placeholder. Use `next/image` with `fill` + `object-cover` (the hero and inline figures, which were `object-contain` on the current page, become `object-cover` here).

Fonts (Google Fonts, already loaded in the repo via `next/font`): **Saira Condensed**, **Inter**, **JetBrains Mono**.

Topo lines are **code-drawn SVG** — use the existing `ui/TopoLine.tsx`. The brand mark is `BrandMark.tsx`.

---

## Files in this bundle
- `Byron Climbs Article.dc.html` — the hi-fi design prototype (open in a browser to view + interact).
- `support.js` — runtime required only to render the prototype. **Not part of the deliverable; do not port it.**
- `assets/` — the three photographic images used in the design.
- `README.md` — this spec.

### Key repo files to touch
```
app/blog/[blogId]/page.tsx              ← page assembly, data, body/gallery/related markup (restructure + restyle)
components/blog/ArticleHero.tsx          ← NEW client component: bled cover photo + three.js ember dust + scrims + crumb/meta/title
components/blog/ReadingRail.tsx          ← NEW client component: sticky reading-progress rail (fill + percent + back-to-top)
components/blog/ScrollProgress.tsx       ← reuse as-is (top-of-page progress hairline)
components/anim/Reveal.tsx               ← scroll-in entrances (paragraphs, media, quote, gallery, related)
components/anim/Parallax.tsx             ← scrubbed image parallax (inline media, gallery)
components/anim/DrawOn.tsx               ← topo divider draw-on
components/anim/gsap.ts                  ← shared gsap + ScrollTrigger + prefersReducedMotion (for hero/rail)
components/ui/TopoLine.tsx               ← topo dividers (+ hero fallback motif if desired)
components/ui/MonoChip.tsx               ← all mono micro-labels
components/Header.tsx / Footer.tsx       ← already match — no change
app/globals.css                         ← all design tokens + .photo-ph (already defined)
lib/data-service.ts                     ← getPostById / getImagesForPost / getVideosForPost / getRecentPosts / getAllPostImages (already wired)
package.json                            ← `three` (+ dev `@types/three`) — reuse if the masthead added it, else add; `gsap` already present
```
