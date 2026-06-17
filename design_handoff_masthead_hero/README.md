# Handoff: Masthead Hero (Byron Climbs homepage)

## Overview
This is a redesign of the homepage hero for the Byron Climbs field-journal site. It replaces the current "wordmark-on-the-photo" hero (`components/HeroContent.tsx`) with a **newspaper-masthead layout**: a header bar, a dateline rule, a large centered wordmark, a stat strip, and *then* the photo as a cinematic band. The "Latest Send" card and intro copy live in/around the photo on desktop, and reflow cleanly on mobile.

The whole thing is built on the codebase's **existing Granite & Chalk design tokens** — every color, font, and radius below already exists in `app/globals.css`. There are no new tokens to add.

## About the Design Files
The file in this bundle — `Codebase Masthead Hero (preview).dc.html` — is a **design reference created in HTML**, not production code to copy directly. It is a single file that renders *two frames side by side*: a **Desktop** frame and a **Mobile — 390px** frame, so you can see both breakpoints at once. (The `support.js` file and the `{{ }}` template holes are just the preview runtime — ignore them; they are not part of the design.)

Your task is to **recreate this design in the existing Next.js + Tailwind v4 codebase**, using its established patterns: the `@theme` tokens in `app/globals.css`, the existing UI primitives in `components/ui/`, GSAP for animation (`components/anim/gsap`), and `next/image` + `next/link`. Reuse what's already there — do not introduce new CSS systems or hardcode hex values when a token exists.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and layout are final and exact. Recreate pixel-faithfully using the codebase's tokens and primitives. The one intentional choice you must honor is the **mobile layout = "Card below"** (see *Responsive behavior*).

---

## Where this goes in the codebase

| Design piece | Existing file to modify / reference |
|---|---|
| Hero section (the whole thing) | `components/HeroContent.tsx` — **rewrite this** to the masthead layout below. Keep it a `"use client"` component receiving `climb` + `sendDate` props. |
| Data fetch wrapper | `components/HeroBanner.tsx` — **unchanged.** Still fetches the latest send and renders `<HeroContent climb sendDate />`. |
| Grade chip | `components/ui/GradeChip.tsx` (`<GradeChip grade variant="ember" />`) |
| Mono caption text | `components/ui/MonoChip.tsx` |
| Topo line accent (optional) | `components/ui/TopoLine.tsx` |
| Brand logo lockup | `components/BrandMark.tsx` |
| Site header / nav | `components/Header.tsx` — the masthead's top bar; reuse the existing header if it already provides Home / Field Notes / Database nav, otherwise model it on the design's `.hdr`. |
| Animation helpers | `components/anim/gsap` (`gsap`, `prefersReducedMotion`, `useIsomorphicLayoutEffect`) |

> Note: the current `HeroContent.tsx` overlays the wordmark **on** the photo. The new design moves the wordmark **above** the photo and restructures the section into the stacked masthead described below. This is a structural change, not a tweak.

---

## Screens / Views

### 1. Desktop masthead (≥ 760px)

**Purpose:** Homepage hero — establishes the brand as an editorial climbing journal and surfaces the most recent send.

**Layout (top → bottom), all on a chalk paper background `--chalk #F4F1EC`:**

1. **Header bar** (`.hdr`)
   - Flex row, `space-between`, vertically centered. Padding `10px clamp(14px, 4cqw, 56px)`. Bottom border `1px solid --chalk-3 (#DCD5C8)`. Background `rgba(244,241,236,0.9)`.
   - **Left — brand lockup:** 32px circular logo mark + two stacked lines:
     - Line 1 "Byron Climbs" — `font-display`, 700, uppercase, 17px, letter-spacing `0.06em`, color `--granite-100 (#1F1F21)`.
     - Line 2 "EST. 2019 · KELOWNA, BC" — `font-mono`, 9px, letter-spacing `0.12em`, color `--slate-500 (#6E6E74)`, 4px top margin.
   - **Center/right — nav:** "Home" (active: `--granite-100` with a 2px `--ember` bottom border, 3px padding-bottom) · "Field Notes" · "Database" (inactive: `--slate-500`). Each `font-display`, 600, uppercase, 13px, letter-spacing `0.06em`. Gap 18px.

2. **Dateline rule** (`.rule.top`) — flex row `space-between`, padding `12px clamp(14px,4cqw,56px)`, bottom border `1px solid --chalk-3`. Three mono captions (`font-mono`, 10px, letter-spacing `0.13em`, uppercase, `--slate-500`):
   - "Vol. 07 — The Okanagan Issue"
   - "A Climbing Journal & Send Database" (center)
   - "Kelowna BC — Free"

3. **Wordmark** (`.wm-wrap` / `.wm`) — overflow hidden, padding `14px clamp(12px,2.5cqw,44px) 0`. `<h1>` "Byron Climbs", `font-display`, 800, uppercase, centered, `line-height: 0.88`, `white-space: nowrap`, color `--granite-100`, `font-size: clamp(54px, 12.4cqw, 200px)`.

4. **Stat strip** (`.rule.stat`) — flex row `space-between`, top + bottom border `1px solid --granite-100`, `margin-top: 18px`, padding `12px clamp(14px,4cqw,56px)`. Mono captions, uppercase:
   - "182 Problems" — `--granite-100`
   - "Hardest Send V9" — `--granite-100`
   - "Started at 38 · Hooked Since" — `--granite-100`
   - "● Now Sending" — `--ember`. The leading ● bullet **pulses** (opacity 1 → 0.25 → 1, 1.8s ease-in-out, infinite).

5. **Photo band** (`.photo`) — `position: relative`, `overflow: hidden`, `min-height: 540px`.
   - **Background image:** `/hero-boulder-bw.jpg` (provided in `assets/`), absolutely positioned overscan wrapper (`top: -8%; height: 116%`, `object-fit: cover`, `object-position: center 35%`) so it can parallax.
   - **Scrim:** full-cover `linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.68) 100%)`.
   - **Ember glow:** full-cover, `pointer-events:none`, `radial-gradient(ellipse at 78% 18%, rgba(200,84,30,0.30), transparent 58%)`, slow opacity pulse 0.3 → 0.55 (≈7s ease-in-out infinite). On the current codebase this is the `.hero-glow` GSAP tween — reuse it.
   - **Content row** (`.pcontent`) — pinned to the bottom (`margin-top:auto`), flex row, `align-items: flex-end`, `space-between`, gap 20px, padding 32px, `z-index: 10`:
     - **Left — intro copy** (`.copy`, `max-width: 560px`, color `--chalk`):
       - `<p>`: *"Boulders sent, projects dropped, beta left behind. A field journal kept by a Kelowna climber who started at 38 — and never quite stopped."* — `font-body`, 16px, `line-height: 1.55`, `--chalk`, `text-shadow: 0 1px 6px rgba(0,0,0,0.55)`, `text-wrap: pretty`.
       - **CTAs** (`.ctas`, flex, gap 10px, `margin-top: 16px`, wrap):
         - **Primary** "Read latest entry →" → `/blog`. `font-display`, 600, uppercase, 13px, letter-spacing `0.06em`, padding `10px 18px`, `border-radius: 2px`, background `--ember`, border `1px solid --ember`, text `--chalk`. Hover: background + border `--ember-deep (#8E3A12)`.
         - **Ghost** "Browse the database" → `/database`. Same type metrics; transparent background, text `--chalk`, border `1px solid rgba(244,241,236,0.5)`. Hover: background `rgba(244,241,236,0.1)`.
     - **Right — Latest Send card** (`.card`) — see *Latest Send card* below.

**Total desktop section height** in the live codebase should match the current hero's `clamp(520px, 44vw, 640px)`; the `min-height:540px` in the static mock is just the photo band.

### 2. Mobile masthead (< 760px) — **"Card below" layout (chosen)**

Same vertical stack as desktop, with these container-query changes (the mock uses `@container (max-width: 620px)`; in the app use the `max-width: 760px` matchMedia/Tailwind breakpoint already used by `HeroContent`):

- **Header:** nav collapses; show the **hamburger** button (34×34, `1px solid --chalk-3`, `border-radius: 2px`) instead of the nav links.
- **Dateline / stat strip:** the center caption(s) marked "center" hide on mobile (only the first + last of each rule remain). Stat strip keeps "182 Problems" + "● Now Sending".
- **Wordmark:** wraps to two lines ("Byron" / "Climbs"), `white-space: normal`, `font-size: clamp(56px, 17cqw, 150px)`, `line-height: 0.9`.
- **Photo band:** `min-height: 470px` (tall — because content still sits on it in this layout).
- **The chosen layout — "Card below":**
  - The **intro copy + CTAs stay overlaid on the photo** (`.pcontent` becomes a single column: `flex-direction: column; align-items: stretch; gap: 16px; padding: 18px`; copy `max-width: none`, paragraph 14px). The ghost CTA keeps its light-on-dark styling here.
  - The **Latest Send card moves OUT of the photo and into a new section directly below it** (`.belowsec`), on the chalk paper background:
    - `.belowsec`: background `--chalk`, padding `0 18px 22px`.
    - **Hairline separator** (`.belowsep`): `border-top: 1px solid --chalk-3` between photo and card.
    - **Card** (`.belowcard`, `padding-top: 14px`): full-width (`width: 100%`), softer shadow on paper `0 10px 30px rgba(0,0,0,0.14)` (vs the heavier `0 14px 50px rgba(0,0,0,0.35)` it uses when floating on the photo).

  > **Why "Card below":** on a 390px screen the opaque light card was covering the photo. Moving only the card below frees the image while keeping the cinematic copy+CTAs on it. Two other arrangements were prototyped but **not chosen** — you do not need to build them. (For reference: "Content below" = copy+CTAs+card all below a shorter 360px photo; "Split lede" = same plus a "● From the field ↓" mono caption above the card. Build **only "Card below"**.)

### Latest Send card (shared component, both breakpoints)

Container (`.card`): background `--chalk`, border `1px solid --chalk-3`, `border-radius: 2px`, padding 18px. Width 320px on desktop (floats bottom-right of photo); 100% on mobile (sits in `.belowsec`).

- **Top row** (`.card-top`, flex `space-between`, `margin-bottom: 12px`): "● Latest Send" (`font-mono` 10px, `--ember`) and the date "2025.06.16" (`font-mono` 10px, `--slate-500`). Date comes from the `sendDate` prop (`YYYY.MM.DD`, already formatted in `HeroBanner.tsx`).
- **Body row** (`.card-row`, flex, `align-items: flex-start`, gap 14px):
  - `<GradeChip grade={climb.grade} variant="ember" />` — solid ember chip, `font-display` 700, uppercase, 12px, letter-spacing `0.1em`, padding `2px 8px`, `min-width: 46px`, text `--chalk`.
  - Name block (`flex:1; min-width:0`): `<h3>` climb name (`font-display`, 600, uppercase, 22px, `line-height:1.05`, `--granite-100`, **truncate**), then a mono sub-line "{city} · {area}" (`--slate-500`, `margin-top: 4px`, truncate).
- **Meta row** (`.card-meta`, flex `space-between`, `margin-top: 14px`, `padding-top: 12px`, `border-top: 1px dashed --chalk-3`): three label/value pairs —
  - "AREA" / `{subArea || area}`, "TYPE" / `{type}`, "GRADE" / `{type === 'boulder' ? 'V'+grade : grade}`.
  - Labels (`.lab`): `font-mono`, 9px, letter-spacing `0.13em`, uppercase, `--slate-500`.
  - Values (`.val`): `font-display`, 15px (TYPE value 13px), `line-height: 1`, `margin-top: 4px`, uppercase, `--granite-100`.

The card only renders when `climb` is non-null (signed-in users with at least one send), matching current behavior.

---

## Interactions & Behavior

- **Navigation:** Primary CTA → `/blog`; Ghost CTA → `/database` (use `next/link`). Nav items → Home `/`, Field Notes `/blog` (or current route), Database `/database`.
- **Entrance animation (reuse the existing GSAP timeline in `HeroContent`):** on load —
  - `.hero-img` scales `1.16 → 1` over 1.7s `power2.out`.
  - Wordmark lines rise in (`.hero-line > span`, `yPercent 120 → 0`, 1s, stagger 0.1, `power3.out`) — apply to the new `.wm` lines.
  - Copy, CTAs, and card fade+rise (`.hero-rise`, `autoAlpha 0→1`, `y 18→0`, 0.7s, stagger 0.12, `power2.out`).
- **Glow pulse:** `.hero-glow` opacity → 0.55, 3.5s, `yoyo`, `repeat: -1`, `sine.inOut`.
- **"Now Sending" dot:** opacity pulse 1 → 0.25 → 1, 1.8s ease-in-out infinite (CSS keyframe is fine; respect reduced-motion).
- **Parallax on scroll (existing):** image wrapper `yPercent` 5 (mobile) / 8 (desktop) on scrub; content `yPercent -7` on desktop only. Keep as-is.
- **Reduced motion:** all of the above must no-op under `prefersReducedMotion()` (the helper already exists). The mock's pulses are also gated by `@media (prefers-reduced-motion: reduce)`.
- **CTA hover states:** as specified per button above (150ms color transitions, matching the current code's `transition-colors duration-150`).

## Responsive behavior
- Breakpoint: the codebase uses `max-width: 760px` (matchMedia + `md:` Tailwind). The static mock uses a `620px` container query because it renders a fixed 390px frame — translate to the real `760px` breakpoint.
- **Mobile = "Card below"** (definitive): copy + CTAs overlaid on a `~470px` photo; Latest Send card in a chalk section below the photo, separated by a hairline, full-width, softer shadow.
- Desktop: copy bottom-left of photo, card bottom-right (320px), both overlaid.

## State Management
- No new client state. Props only: `climb: Climb | null` and `sendDate: string | null`, fetched server-side in `HeroBanner.tsx` (Supabase `sends` joined to `climbs`, newest first). Card hidden when `climb` is null.
- GSAP refs/timeline are local to `HeroContent` (existing pattern).

## Design Tokens
All already defined in `app/globals.css` — **use the token, not the hex**:

| Role | Token | Value |
|---|---|---|
| Paper background / card | `--chalk` / `bg-chalk` | `#F4F1EC` |
| Card secondary paper | `--chalk-2` | `#ECE7DE` |
| Hairlines, borders | `--chalk-3` | `#DCD5C8` |
| Primary ink (headings, wordmark) | `--granite-100` | `#1F1F21` |
| Stat-strip border | `--granite-100` | `#1F1F21` |
| Mono captions, sub-text | `--slate-500` | `#6E6E74` |
| Frame border (mock only) | `--slate-200` | `#D2CEC4` |
| Accent / CTAs / chip / live dot | `--ember` | `#C8541E` |
| CTA + accent hover | `--ember-deep` | `#8E3A12` |
| Display font (wordmark, headings, buttons, values) | `--font-display` (Saira Condensed) | 600–800 |
| Body font (intro copy) | `--font-body` (Inter) | 300–600 |
| Mono font (captions, labels, date) | `--font-mono` (JetBrains Mono) | 400–500 |
| Corner radius (buttons, chip, card) | `--radius-sm` / `rounded-sm` | `2–4px` |

Key spacing: header pad `10px clamp(14px,4cqw,56px)`; rules pad `12px clamp(14px,4cqw,56px)`; photo content pad `32px` desktop / `18px` mobile; CTA gap `10px`; card pad `18px`.

Shadows: card on photo `0 14px 50px rgba(0,0,0,0.35)`; card on paper (mobile) `0 10px 30px rgba(0,0,0,0.14)`; outer frame (mock only) `0 14px 44px rgba(0,0,0,0.10)`.

## Assets
- **`assets/hero-boulder-bw.jpg`** (2048×1155, B&W bouldering photo) — included in this bundle. It is the same asset already at `public/hero-boulder-bw.jpg` in the codebase; no new asset needed. Served via `next/image` with `fill`, `priority`, `sizes="100vw"`, `object-cover object-[center_35%]`.
- Logo mark: a small inline SVG in the mock (circle + mountain glyph with an ember dot). Use the existing `components/BrandMark.tsx` instead.
- No other images, icons, or fonts beyond the three Google Fonts already wired in the project (Saira Condensed, Inter, JetBrains Mono).

## Files
- `Codebase Masthead Hero (preview).dc.html` — the design reference (open in a browser to see Desktop + Mobile frames). Toggle the `mobileLayout` control in the preview's Tweaks panel to compare — but the implementation target is **"Card below"** only.
- `assets/hero-boulder-bw.jpg` — hero photo.
- `support.js` — preview runtime only; **not** part of the design, do not port.

### Implementation checklist
- [ ] Rewrite `components/HeroContent.tsx` to the masthead stack (header → dateline → wordmark → stat strip → photo band).
- [ ] Move the wordmark above the photo (centered, clamp-scaled), out of the image overlay.
- [ ] Build the dateline + stat strip rules with mono captions; center captions hidden on mobile.
- [ ] Photo band with overscan image, scrim, ember glow; copy + CTAs overlaid bottom-left (desktop) / stacked column (mobile); card bottom-right (desktop).
- [ ] Mobile "Card below": keep copy+CTAs on the ~470px photo, move the Latest Send card into a chalk section below with a hairline + softer shadow.
- [ ] Wire CTAs/nav with `next/link`; reuse `GradeChip`, `MonoChip`, `BrandMark`.
- [ ] Port the GSAP entrance timeline, glow pulse, parallax, and the "Now Sending" dot pulse; gate all on reduced-motion.
- [ ] Use only existing tokens (chalk/granite/slate/ember, font-display/body/mono, rounded-sm).
