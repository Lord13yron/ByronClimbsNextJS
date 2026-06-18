# Handoff: Database Hero (Masthead) Redesign

## Overview
This handoff covers a redesign of the **hero / masthead at the top of the Database page** (`/database`, "The Logbook"). The previous masthead used an animated three.js "grade skyline" behind the headline. The new design replaces it with a **field-journal masthead**: a topographic contour backdrop on the dark granite ground, a newspaper-style **dateline strip** pinned to the top edge, and the headline + stat cluster anchored to the bottom. No photograph, no WebGL.

The goal is a quieter, editorial "topo notebook" header that matches the Landing and Field Notes (Blog) headers' visual language while being lighter to render.

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype showing the intended look and behavior, **not production code to copy directly**. The `.dc.html` file is a self-contained sandbox format; ignore its custom `<x-dc>` / `data-dc-script` wrapper and the inline `renderVals()` plumbing.

Your task is to **recreate this masthead in the existing Next.js codebase** (`next-climbing/`) using its established patterns, components, and design tokens — Tailwind v4 theme tokens, the `MonoChip` / `Counter` / `TopoLine` components, and the gsap helpers in `components/anim/`. Do not introduce new styling systems; reuse what's there.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and animation are final. Recreate pixel-for-pixel using the codebase's existing utilities and tokens. All raw values below already map onto existing CSS variables — prefer the token name over the hex.

## What changes (file-level)
- **Rewrite:** `components/database/DatabaseMasthead.tsx` — replace the skyline + scrims with the topo masthead described below.
- **Delete / retire:** `components/database/GradeSkyline.tsx` — no longer used. Remove the `dynamic(() => import("./GradeSkyline"))` import from the masthead.
- **Update:** `app/database/page.tsx` — the `<Masthead />` server component currently computes `skylineCounts` via `getGradeCounts(...)` purely to feed the skyline. That prop is no longer needed; drop `skylineCounts` from the `DatabaseMasthead` props and from the page (the `getMastheadStats` call stays — it still feeds the headline stats).
- **No change:** `components/ui/MonoChip.tsx`, `components/ui/TopoLine.tsx`, `components/anim/Counter.tsx`, `components/anim/gsap.ts`, `app/globals.css` tokens. Reuse as-is. (`globals.css` already defines `mast-glow` / `mast-bob` keyframes you can keep using.)

## The Masthead — layout & components

### Section shell
- `<section>`: `position: relative; overflow: hidden;` background **granite-200** (`bg-granite-200`, `#161618`).
- Min height: `clamp(420px, 58vh, 540px)` (shorter than the old `clamp(520px,80vh,680px)` — the redesign removed the tall empty top band).
- Layout: `display: flex; flex-direction: column; justify-content: space-between;` — dateline rides the top, headline block sits at the bottom, contour fills between.

### Layer stack (back → front), all `pointer-events: none` except content
1. **Ember glow** (z-1): a drifting radial highlight, top-right.
   `radial-gradient(ellipse at center, rgba(200,84,30,0.18), transparent 66%)`, positioned `top:-10%; right:2%; width:54%; height:70%`. Animate with the existing `mast-glow` keyframe (`animation: mast-glow 9s ease-in-out infinite alternate`).
2. **Topo contour backdrop** (z-1): full-bleed `absolute inset-0`. This is the signature element. Stack of ~**14 horizontal contour lines** spanning the full height, ember-free **chalk** stroke at low opacity.
   - Color: **chalk** (`#F4F1EC`), layer **opacity 0.10**, `stroke-width: 1.2`.
   - In the prototype these are wavy sine/cosine paths over a `0 0 1440 720` viewBox. **In the codebase, reuse `components/ui/TopoLine.tsx`** instead of hand-rolling paths: render several stacked `<TopoLine>` instances (each is already a 5-ply contour band) inside a `text-chalk opacity-10` wrapper, or extend `TopoLine` with a `count`/`rows` prop to emit a denser full-height field. Either approach keeps it in the design system. Wrap in `aria-hidden`.
3. **Bottom scrim** (z-1): `linear-gradient(180deg, rgba(22,22,24,0.25) 0%, transparent 42%, rgba(22,22,24,0.5) 100%)` — seats the header at top and the headline copy at bottom for legibility over the contours.
4. **Content** (z-2): two blocks (top dateline, bottom headline cluster), each `mx-auto w-full` with a max width of **1320px** and horizontal padding `clamp(20px, 5vw, 56px)`. (Codebase uses `max-w-7xl` = 1280px elsewhere; either is acceptable — match the page's table width for alignment.)

### Top block — Dateline strip
A 4-cell newspaper masthead rule, full content width, pinned to the top.
- Container: `display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;` padding `11px 0`, **border-top & border-bottom `1px solid rgba(244,241,236,0.3)`**. Outer wrapper padding `clamp(20px,4vw,32px) clamp(20px,5vw,56px) 0`.
- Four `MonoChip` cells, color `rgba(244,241,236,0.72)`, content (left→right):
  - `VOL. VII · NO. 179`
  - `THE OKANAGAN RECORD`
  - `KELOWNA · BC`
  - `EST. 2019`
- These are editorial decoration. **Recommended:** make `NO. {n}` dynamic from `stats.routes` (the total routes on file) so it stays truthful; the rest are static. On narrow screens, hide the middle two cells (`hidden md:block`) the way `HeroContent.tsx`'s dateline does.

### Bottom block — Headline cluster
Outer wrapper padding `0 clamp(20px,5vw,56px) clamp(30px,5vw,48px)`.
1. **Eyebrow row** (`margin-bottom:20px`): `MonoChip` text `— THE DATABASE` in **ember-soft** (`text-ember-soft`, `#E37A3F`), followed by a hairline rule: `height:1px; max-width:200px; flex:1; background:linear-gradient(90deg, rgba(227,122,63,0.55), transparent)`.
2. **Title** `<h1>`: `font-display` (Saira Condensed), **extrabold**, **uppercase**, color **chalk** (`text-chalk`, `#F4F1EC`). `font-size: clamp(52px, 9vw, 120px); line-height: 0.86; letter-spacing: 0.01em`. Text: **"The logbook."** Wrap the text span in an `overflow:hidden` clip span so the line-rise animation is masked (see Animation).
3. **Sub-row** (`margin-top:22px`): `display:flex; align-items:flex-end; justify-content:space-between; gap:28px; flex-wrap:wrap`.
   - **Subtitle `<p>`**: `font-body` (Inter), `max-width:540px`, `font-size: clamp(14px,1.5vw,16.5px); line-height:1.65`, color `rgba(244,241,236,0.82)`, `text-shadow: 0 1px 8px rgba(0,0,0,0.5)`, `text-wrap: pretty`. Copy:
     > Every problem I've touched, logged honestly — Okanagan granite and gneiss, a few Sea-to-Sky classics, and the odd block from Font and North Wales. Sends, projects, and the pyramid underneath it all.
   - **Stat cluster**: `display:flex; align-items:flex-end; gap:clamp(20px,3vw,34px); flex-wrap:wrap`. Four stats; each = a big number over a `MonoChip` caption.
     - Number: `font-display` extrabold, `font-size: clamp(38px,5vw,54px); line-height:0.9`, color **chalk** (the first three) — use `<Counter value={…} />` so they count up on view.
     - Caption: `MonoChip` `margin-top:8px`, color `rgba(244,241,236,0.5)`.
     - The four stats, in order:
       | Value (source) | Caption | Color |
       |---|---|---|
       | `stats.routes` (Counter) | `ROUTES LOGGED` | chalk |
       | `stats.sends` (Counter) | `SENDS` | chalk |
       | `stats.crags` (Counter) | `CRAGS` | chalk |
       | `stats.topSend` e.g. `V8` (static text, **not** a Counter) | `TOP SEND` | **ember-soft** |
   - `stats` is the existing `MastheadStats` from `lib/database-stats.ts` (`{ routes, sends, crags, topSend }`) — unchanged.

### Removed vs. the old masthead
- ❌ `GradeSkyline` three.js canvas and its `skylineCounts` prop.
- ❌ The old heavy four-stop vertical scrim and the top fade band (replaced by the lighter bottom scrim — the contour backdrop doesn't need as much darkening).
- ❌ The "EXPLORE ↓" scroll hint at the bottom center (optional to keep; the prototype drops it. If you keep it, it still uses the `mast-bob` keyframe).
- ➖ The headline is unchanged in copy ("The logbook.") and the stat set is the same; only the backdrop and the new dateline strip change.

## Interactions & Behavior
All animation uses the existing gsap context pattern from `DatabaseMasthead.tsx` / `HeroContent.tsx` (`gsap.context(... , section)` inside `useIsomorphicLayoutEffect`, guarded by `prefersReducedMotion()`; revert on cleanup). Under reduced motion, everything renders in its final state.

On load (timeline):
- **Headline rise** — target the inner title span (class e.g. `mast-line`): `from({ yPercent: 120, duration: 0.95, ease: "power3.out" })`, masked by the `overflow:hidden` clip span.
- **Staggered fade-rise** for the dateline, eyebrow, subtitle, and each stat (class e.g. `mast-rise`): `from({ autoAlpha: 0, y: 14, duration: 0.65, stagger: 0.1, ease: "power2.out" }, 0.45)`. (The prototype additionally nudges the dateline in from `y:-10`; either is fine.)

Continuous / on-scroll:
- **Ember glow drift** — CSS `mast-glow` keyframe, infinite alternate (already in `globals.css`). No JS.
- **Stat count-up** — handled by `Counter` (counts once when scrolled into view).
- **Topo draw-on (optional, nice-to-have)** — the prototype draws the contour strokes on with a stroke-dashoffset tween. The codebase already has `components/anim/DrawOn.tsx` for exactly this; wrapping the contour paths in it is optional polish, not required.

No click handlers, forms, loading, or error states in this section. The sticky site `Header` overlays the top of the section as it does today.

## Responsive behavior
- Single-column at all sizes; it's a banner, not a grid.
- Dateline: hide the middle two cells under `md` (`hidden md:block`), keeping the outer two so the rule still reads as a masthead on mobile.
- Sub-row wraps (`flex-wrap`) so the stat cluster drops below the subtitle on narrow screens.
- Type scales via the `clamp()` values above; no separate mobile sizes needed.
- Min-height `clamp(420px,58vh,540px)` keeps it compact on short viewports.

## State Management
None local to the masthead. It's a presentational component fed by server-computed `stats: MastheadStats`. Remove the now-unused `skylineCounts` prop and its `getGradeCounts` computation in `app/database/page.tsx`'s `Masthead()`.

## Design Tokens (all already defined in `app/globals.css`)
| Token | Value | Use here |
|---|---|---|
| `--granite-200` / `bg-granite-200` | `#161618` | section background |
| `--chalk` / `text-chalk` | `#F4F1EC` | headline, stat numbers, contour strokes |
| `--ember` | `#C8541E` | glow color (`rgba(200,84,30,…)`) |
| `--ember-soft` / `text-ember-soft` | `#E37A3F` | eyebrow, "top send" stat, eyebrow rule |
| `--font-display` (Saira Condensed) | — | headline + stat numbers |
| `--font-body` (Inter) | — | subtitle |
| `--font-mono` (JetBrains Mono) | — | all `MonoChip` text |
| `--radius` | `0.25rem` (4px) | squared aesthetic (no rounding needed in this section) |

Ad-hoc rgba values (not tokens — use inline):
- Dateline text / rules: `rgba(244,241,236,0.72)` text, `rgba(244,241,236,0.3)` borders.
- Subtitle: `rgba(244,241,236,0.82)`; stat captions: `rgba(244,241,236,0.5)`.
- Glow: `rgba(200,84,30,0.18)`; eyebrow rule: `rgba(227,122,63,0.55)`.
- Bottom scrim: `rgba(22,22,24,0.25)` → transparent → `rgba(22,22,24,0.5)`.

Spacing (inline `clamp`, matching the page rhythm):
- Section min-h `clamp(420px,58vh,540px)`; content max-width `1320px` / `max-w-7xl`.
- Top wrapper pad `clamp(20px,4vw,32px) clamp(20px,5vw,56px) 0`; bottom wrapper pad `0 clamp(20px,5vw,56px) clamp(30px,5vw,48px)`.
- Headline `clamp(52px,9vw,120px)`; stat numbers `clamp(38px,5vw,54px)`; subtitle `clamp(14px,1.5vw,16.5px)`.

## Assets
**None.** The redesign removes the photograph and the WebGL canvas. The only "graphic" is the procedurally generated topo contour (SVG, via `TopoLine`). No image files, no three.js dependency for this section. (If `GradeSkyline` is the only remaining `three` consumer after deletion, you can drop `three` from `package.json` — verify with a repo-wide search first; the Blog masthead may still use it.)

## Files in this bundle
- `Byron Climbs Database.dc.html` — the full Database page prototype (sandbox format). The masthead is the first `<section data-screen-label="Masthead" id="db-hero">`; its animation logic is in the `motion()` method of the trailing `<script data-dc-script>` block (`heroTopo`, `.db-line`, `.db-herotopo`, `#db-dateline`). The rest of the file (logbook table, field stats, milestones) is **out of scope** for this handoff and already covered by the existing `design_handoff_database_page` bundle.
- `support.js` — sandbox runtime; only needed to open the `.dc.html` in a browser. Ignore for implementation.

## Target codebase reference (in `next-climbing/`)
- `components/database/DatabaseMasthead.tsx` — the file to rewrite.
- `components/database/GradeSkyline.tsx` — the file to delete.
- `app/database/page.tsx` — drop `skylineCounts`.
- `components/ui/TopoLine.tsx`, `components/ui/MonoChip.tsx`, `components/anim/Counter.tsx`, `components/anim/gsap.ts`, `components/anim/DrawOn.tsx` — reuse.
- `lib/database-stats.ts` — `MastheadStats` shape (unchanged).
