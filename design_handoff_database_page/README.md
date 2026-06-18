# Handoff: Byron Climbs — Database / Logbook Page (V2)

## Overview
This is a redesign of the **Byron Climbs** Database page (route: `/database`) — the searchable logbook of every problem Byron Hayes has touched. The page now reads as a full editorial "logbook" experience rather than a bare table:

1. **Masthead** — a dark, animated **3D grade-skyline** (three.js) behind the page title + live count stats.
2. **Logbook** — the route browser: status + grade filters, search, list/cards toggle, sortable columns, active-filter pills, and pagination.
3. **Field Stats** — "by the numbers": a **grade pyramid**, **top crags** bar chart, and a **regions** list.
4. **Milestones** — a strip of firsts & favourites cards.
5. **Footer**.

It keeps the established "Granite & Chalk" aesthetic — warm chalk paper, near-black granite, a single rust-ember accent, condensed uppercase display type, mono micro-labels, hand-drawn topographic line dividers — and matches the V2 Landing page redesign.

---

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype showing the intended look, layout, and motion. **They are not production code to paste in.** `Byron Climbs Database.dc.html` uses a small in-house templating runtime (`support.js`) purely so the prototype renders in a browser; **ignore that runtime entirely** when building. The three.js, GSAP, and font `<script>`/`<link>` tags in the prototype's `<helmet>` are just there to make the demo run.

Your task is to **recreate this design in the existing `next-climbing` codebase** (Next.js App Router + React + Tailwind v4 + shadcn + TanStack Table + Supabase). The database page **already exists** in the repo in an earlier, plainer form — **this is an iteration on it, not a greenfield build.** Wherever possible, modify the existing components rather than introducing parallel ones, and keep the existing data fetching, URL-param state, and signed-in / signed-out forks intact.

To view the prototype: open `Byron Climbs Database.dc.html` in a browser. Scroll to see the 3D masthead, counter count-ups, topo line draw-ons, and the bar-chart grow-ins.

---

## Fidelity
**High-fidelity.** Colors, typography, spacing, and interactions are final and intentional. Recreate the UI faithfully using the codebase's existing Tailwind theme and component patterns. Every hex value below already exists as a CSS variable / Tailwind utility in `app/globals.css` — **use the token names (`bg-ember`, `text-chalk`, `border-chalk-3`), not raw hex.**

---

## How this maps to the existing codebase

The page is assembled in `app/database/page.tsx` → `DatabaseWrapper.tsx` → `DatabasePageControls.tsx` + `DatabaseTable.tsx` (which renders `DataTable` / `CardView`). Map the design's sections onto these:

| Design section | Existing file(s) to edit | Status |
|---|---|---|
| Masthead (3D skyline + title + stats) | `app/database/page.tsx` header block | **Iterate heavily** — replace the plain text header with the animated masthead. Stats already exist in `DatabaseMeta`. |
| Topo dividers | `components/ui/TopoLine.tsx` | Reuse the existing component between sections. |
| Logbook filters / search / view toggle | `components/DatabasePageControls.tsx` | **Iterate** — add the grade-chip row, active-filter pills, and "result count" label. |
| Logbook table (list view) | `app/database/columns.tsx` + `app/database/data-table.tsx` | Reuse — sortable headers + pagination already implemented via TanStack Table. |
| Logbook cards (grid view) | `components/DatabaseTable.tsx` → `CardView` | Reuse — restyle to match the card spec below. |
| Field Stats (pyramid / crags / regions) | `components/GradePieChart.tsx`, `components/DateBarGraph.tsx` | **Net-new layout** — these existing stat components are superseded; build the pyramid + crag + region cards described below. Reuse the data sources they read. |
| Milestones strip | — | **Net-new.** |
| Footer | `components/Footer.tsx` | Reuse as-is. |
| Signed-out variant | `DatabaseTableSignedout.tsx`, `ClimbSignedOut.tsx`, `columnsSignedout.tsx` | **Keep the fork** — signed-out users see no Sends/Favorites filters and a CTA-forward table. |

> The prototype draws the brand mark, type glyphs, and topo lines inline as SVG. In the repo these already exist as `BrandMark.tsx`, `ui/TypeGlyph.tsx`, `ui/TopoLine.tsx` — **reuse those**, don't re-inline SVG. The header/footer are shared layout chrome (`components/Header.tsx`, `components/Footer.tsx`) — the prototype re-draws them only so it renders standalone; don't fork them.

---

## Design Tokens
All already defined in `app/globals.css` (`:root` + `@theme inline`). Reference the Tailwind utility.

### Color
| Token | Tailwind | Hex | Usage |
|---|---|---|---|
| `--chalk` | `chalk` | `#F4F1EC` | Page bg, light text on dark, card fills |
| `--chalk-2` | `chalk-2` | `#ECE7DE` | Field-stats section bg, table header row, bar tracks, hover rows |
| `--chalk-3` | `chalk-3` | `#DCD5C8` | Borders, dividers, dashed rules |
| `--granite-100` | `granite-100` | `#1F1F21` | Primary text; active chip fill; grade-chip bg (unsent) |
| `--granite-200` | `granite-200` | `#161618` | Masthead background |
| `--granite-300` | `granite-300` | `#0E0E10` | Footer background |
| `--slate-700` | `slate-700` | `#4A4A4F` | Body copy, secondary mono labels |
| `--slate-500` | `slate-500` | `#6E6E74` | Mono micro-labels |
| `--slate-400` | `slate-400` | `#8C8C92` | Placeholder text, inactive mono, counts |
| `--ember` | `ember` | `#C8541E` | **Accent** — eyebrows, sent state, active sort, progress bar, grade-chip bg (sent) |
| `--ember-soft` | `ember-soft` | `#E37A3F` | Accent on dark (masthead eyebrow, top-send number); skyline gradient front |
| `--ember-deep` | `ember-deep` | `#8E3A12` | Skyline gradient back; CTA hover |
| `--heat-1…4` | `heat-1…4` | `#E8C9B5` `#D89669` `#C8541E` `#8E3A12` | Available heat ramp (not used on this page, but keep consistent) |

On the dark masthead, light text uses `chalk` at reduced alpha: headline `1.0`, body `0.78`, mono captions `0.5`, hairlines `~0.4` (ember-soft).

### Type
- `--font-display` → **Saira Condensed** (600/700/800). Uppercase, tight tracking (`0.01–0.08em`), line-height `0.86–1.05`. Headings, nav, chips, route names, stat numbers. Tailwind: `font-display`.
- `--font-body` → **Inter** (300–600). Body copy. Tailwind: `font-body`.
- Mono micro-label → **JetBrains Mono** (400/500), uppercase, `letter-spacing:0.18em` (chips use `0.08–0.14em`), `~9–10px`, `slate-500`. Use `ui/MonoChip.tsx` for all eyebrows, dates, counts, captions.

Display sizes (clamp min→max): Masthead H1 `52→120px` / weight 800 / lh 0.86; masthead stat numbers `38→54px`; section H2 `28→42px` / weight 700; stat-card H3 `23px`; route name `17px`; card grade chip `13px`.

### Radius, spacing, shadow
- `--radius: 0.25rem` (4px) — squared aesthetic. Cards, chips, buttons, inputs all `rounded-sm`. **No pill radii.**
- Max content width `1320px` (Tailwind `max-w-7xl` is used in repo today — keep that), centered. Horizontal padding `clamp(20px, 5vw, 56px)` (repo uses `px-4 md:px-14`).
- Card border: `1px solid chalk-3`. No shadows on this page — depth comes from the borders + the dark masthead.

---

## Screens / Views (section specs)

### 1. Masthead — `app/database/page.tsx` header
- **Container:** `position:relative; overflow:hidden; background:granite-200`, `min-height: clamp(520px, 80vh, 680px)`, flex column, content anchored bottom.
- **3D skyline** fills the background (`position:absolute; inset:0; z-index:0`). See **Masthead 3D scene** below. Over it, stacked overlays (all `pointer-events:none`):
  - (a) ember radial glow top-right — `radial-gradient(ellipse, rgba(200,84,30,0.20), transparent 64%)`, slow `9s` drift (translateY ±7px), **disabled under `prefers-reduced-motion`**.
  - (b) vertical scrim `linear-gradient(180deg, rgba(22,22,24,0.88) 0%, 0.30 @30%, 0.12 @52%, 0.82 @100%)` so text reads.
  - (c) top fade band (88px) `linear-gradient(rgba(22,22,24,0.85) → transparent)` to seat the sticky header.
- **Content block** (`z-index:2`, max-width `1320px`, padding `clamp(36px,7vw,60px) … clamp(30px,5vw,48px)`):
  - Eyebrow row: "— THE DATABASE" (`MonoChip`, `ember-soft`) + a 1px ember-soft gradient hairline (max 200px).
  - H1 "The logbook." — `font-display` 800 uppercase, `clamp(52px,9vw,120px)`, lh 0.86, `chalk`. Wrap the line in `overflow:hidden` so it can slide up on entrance.
  - Bottom row (flex, align-end, space-between, wraps): **sub-paragraph** (max 540px, Inter, `clamp(14px,1.5vw,16.5px)`, lh 1.65, `chalk @0.78`) on the left; **stat cluster** on the right.
  - **Stat cluster** (flex, gap `clamp(20px,3vw,34px)`): four stats — `179 ROUTES LOGGED`, `166 SENDS`, `14 CRAGS`, `V8 TOP SEND` (last one `ember-soft`). Big number `font-display` `clamp(38px,5vw,54px)` lh 0.9; caption `MonoChip` `chalk @0.5`. **Numbers are real data** — wire to the same source as `DatabaseMeta` (`getClimbs`, `getSendsForUser`), don't hard-code. Count up from 0 on load (see Interactions).
- **Scroll hint** (bottom-center): "EXPLORE" mono + down-arrow SVG, gentle bob.

### 2. Topo dividers — `components/ui/TopoLine.tsx`
Two full-width inline-SVG bands (height ~38px, 5 stacked sine paths, `1px` stroke). Divider 1 sits on `chalk` (stroke ~`#CFC7B8`); divider 2 sits on `chalk-2` (stroke ~`#C9C1B2`). Each draws on via stroke-dashoffset when scrolled into view. Reuse the existing component (`height`/`seed` props).

### 3. Logbook — controls + table/cards
**Background:** `chalk`. Inner max-width `1320px`.

**Header row** (flex, align-end, space-between): eyebrow "— THE LOGBOOK" (`MonoChip`, ember) over H2 "Every route, on file" (`font-display` `clamp(28px,3.6vw,42px)` uppercase); right side a mono result label "SHOWING 1–24 OF 166 ROUTES" (`slate-400`), recomputed from the current filter/page.

**Controls block** (`border-top`/`border-bottom` `chalk-3`, vertical padding 14px, three stacked rows):
- **Row 1** — left: status chips **All / Sends / Favorites**, each with a trailing count (`All 179`, etc.); active = `granite-100` fill + `chalk` text, inactive = `chalk` fill + `chalk-3` border. Right: a **search input** (mono, `SEARCH ROUTES, CRAGS…` placeholder, magnifier icon, `1px chalk-3`, width `clamp(160px,30vw,260px)`) + a **list/cards segmented toggle** (`1px chalk-3`, active segment `granite-100`/`chalk`). *Signed-out: hide Sends + Favorites — keep the existing fork in `DatabasePageControls`.*
- **Row 2 — grade filter:** "GRADE" mono label then a single-select chip row **All · V0 … V10** (mono, 10px, `chalk-2` bg / `slate-500`; active = `ember` bg / `chalk`). This filter is **shared with the pyramid** in Field Stats — clicking a pyramid row selects the same grade.
- **Row 3 — active pills** (only when grade and/or crag is filtered): "FILTERED:" label, then dark dismissible pills (`granite-100` bg, `chalk` text, "×"), plus a "CLEAR ALL" ember mono link. *In the repo, drive all of this through the existing URL-param state (`filter`, `type`, `q`, `view`, plus new `grade` / `crag` params) so it stays server-renderable and shareable.*

**List view** (`isList`, default) — the existing `DataTable`:
- Bordered card (`1px chalk-3 rounded-sm`). Header row bg `chalk-2`, bottom-border `chalk-3`.
- Columns: **GRADE** (sortable) · **ROUTE** (sortable) · AREA · CITY · TYPE · STATUS (right-aligned). Sortable headers show a caret; active sort column turns `ember` (existing `ChevronsUpDown` pattern is fine).
- Each row (hover bg `chalk-2`, bottom hairline `chalk-2`): grade chip (`ember` bg if sent, else `granite-100`), route name (`font-display` 17px uppercase, `→ ember` on hover, links to `/database/{id}-{slug}`), area (name + sub-area mono), city mono, type glyph + label, and a status cell with a heart (if favourite) + a "✓ SENT" mark (if sent).
- **Responsive:** below `760px` the AREA / CITY / TYPE columns hide and the route name gets a mono sub-line "Area · Sub-area" (the repo already does this via `DESKTOP_ONLY_COLUMNS` + the `md:hidden` sub-line in `columns.tsx`).

**Cards view** (`isGrid`) — the existing `CardView`:
- Grid `repeat(4,1fr)` → 3 ≤1080px → 2 ≤760px, gap 18px (repo: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5`).
- Card (`1px chalk-3 rounded-sm`, hover `border-ember`): a 150–200px image area — real cover image if present, else a 45° hatch placeholder (`repeating-linear-gradient(45deg, chalk-2 0 8px, chalk 8px 16px)`) with the route name as a mono label. Overlays: grade chip top-left, favourite heart in a translucent square top-right, "✓ SENT {date}" badge bottom-left on a `chalk` chip. Body: route name (`font-display` 17px, truncate, `→ ember` hover), city mono, then a dashed-top-border footer with type-glyph+label on the left and area on the right. Card thumb scales `1.05` on hover.

**Empty state:** centered "Nothing logged here" (`font-display` 26px `#B5B2AB`) + "Try clearing a filter or two." mono.

**Pagination:** below a `chalk-3` top-border. Left: "PER PAGE" + chips `12 / 24 / 48 / 96 / ALL` (active `granite-100`). Right (only when >1 page): "← Prev", "PAGE n OF m" mono, "Next →"; disabled buttons go `#C7C0B2`. *The repo's `data-table.tsx` already implements rows-per-page + prev/next via TanStack — restyle its controls to match; the prototype's flat list is just the demo equivalent.*

### 4. Field Stats — net-new section
**Background:** `chalk-2`. Eyebrow "— BY THE NUMBERS" (ember) over H2 "The shape of the grind". Layout `db-stats` = 2-col grid `1.25fr 1fr` gap 26px, collapses to 1 column ≤920px. All three cards: `chalk` fill, `1px chalk-3`, `rounded-sm`.

- **Grade pyramid (left, tall card):** header "— THE PYRAMID" / "Sends by grade" + a legend (solid ember square = Sent, hatched-outline square = Project). Rows **V10 → V0**, each a clickable `grid 34px 1fr 42px` button: grade label (turns ember when its grade is the active filter), a horizontal bar in a `chalk-2` track whose total width ∝ count and whose **sent portion is solid ember** with the **remaining (project) portion ember-outline + diagonal hatch**, then the count. Bars animate width via `scaleX` on scroll-in. Footnote (mono): "{sent} SENT · {proj} STILL ON THE PROJECT LIST · TOP SEND V8". Clicking a row sets the shared grade filter (scrolls/links into the logbook).
- **Top crags (right, upper card):** "— GROUND COVERED" / "Top crags". Top 6 crags by route count; each a clickable row: crag name + "count · CITY" mono, over a thin `chalk-2` track with an ember→ember-soft gradient bar (`scaleX` grow-in). Clicking sets the shared crag filter.
- **Regions (right, lower card):** "— ON THE MAP" / "Regions". List of regions (Okanagan BC / Sea-to-Sky BC / Fontainebleau FR / North Wales UK), each row: name + a short ember dot-bar (width ∝ count, `opacity 0.55`) + count. Hairline `chalk-2` between rows. *Region is derived from city — see `regionOf()` in the prototype logic; replicate that mapping (or store region on the climb record).*

### 5. Milestones — net-new strip
Still on `chalk-2`. Eyebrow "— FIRSTS & FAVOURITES". A 5-col grid (→3 ≤1080px, →2 ≤760px) of cards (`chalk` fill, `1px chalk-3`): top row = a mono tag ("FIRST V6", "FIRST V7", "FIRST V8", "FAVOURITE", "HARDEST PROJECT") + a grade chip (solid `granite-100` if sent, ember-outline if project), then the climb name (`font-display` 18px uppercase), then a mono "AREA · CITY" caption pinned to the bottom. *These are curated picks — surface them from data (e.g. first send at each grade, favourite flag, hardest unsent) rather than hard-coding names.*

### 6. Footer — `components/Footer.tsx`
`granite-300` bg, `chalk` text, padding `40px clamp(20px,5vw,56px)`. Brand mark (30px, chalk) + "BYRON CLIMBS" wordmark on the left; mono `chalk @0.45` "© 2026 BYRON HAYES · KELOWNA, BC · LOGGED BETWEEN SESSIONS" on the right. Reuse as-is.

---

## Masthead 3D scene (three.js)
The masthead background is an `InstancedMesh` "skyline" of bars whose heights encode Byron's send distribution. Treat it as **decorative** — it must degrade gracefully and never block content.

- **Grid:** `COLS = 11` (grades V0→V10 along X) × `ROWS = 13` desktop / `7` mobile (depth in Z). Bar footprint `1.5`, gap `2.4`.
- **Heights** driven by per-grade counts `[39,39,32,17,19,6,10,7,3,4,3]` (V0→V10), normalised to max 39, base height `1.2 + (count/max)*12`.
- **Material:** each bar is a wireframe box (ember-soft → ember-deep color-lerped front-to-back by grade) over a translucent dark fill instance. Wire opacity ~0.62, fill ~0.32, faded in over the first frames.
- **Camera:** `PerspectiveCamera(52°)`, positioned high (y≈13, z≈30) looking down at the ridge; subtle pointer-parallax on desktop. `FogExp2(0x161618, 0.038)` for depth.
- **Motion:** slow group `rotation.y` (`t * 0.045`) + a gentle per-bar height wobble. Pauses via `IntersectionObserver` when off-screen.
- **Reduced motion / no-WebGL:** under `prefers-reduced-motion` render a single static frame (fixed rotation `0.35`, no wobble, no rAF loop). If three.js / WebGL is unavailable, the section is still fully legible on `granite-200` + the gradient overlays — **render nothing in the canvas slot and don't error.**
- **In the Next app:** build this as a self-contained client component (`"use client"`, mount in a `useEffect`, clean up on unmount, lazy-load three.js / dynamic-import with `ssr:false`). The grade counts should come from the real climb data, not the hard-coded array, so the skyline reflects the live logbook.

---

## Interactions & Behavior
The prototype uses **GSAP + ScrollTrigger** for entrances and **three.js** for the masthead. In the Next app, reproduce the *feel* with whatever the repo already uses for motion (GSAP if present, otherwise Framer Motion / CSS). All scroll-triggered animations fire **once**. **Every motion must respect `prefers-reduced-motion: reduce`** — counters jump to final value, topo lines render fully drawn, bars appear at full width, the skyline renders one static frame, the glow stops drifting, entrance transforms are skipped.

| Element | Motion | Duration / easing |
|---|---|---|
| Scroll progress bar (fixed, 2px, ember, top) | width = scroll progress | linear |
| Masthead H1 line | slide up `yPercent 120→0` | 0.95s `power3.out` |
| Masthead eyebrow / sub / stat cluster | fade + rise, sequenced after H1 | 0.6–0.7s, stagger 0.1 |
| Stat counters (masthead) | count 0→target, snap to int | 1.5s `power2.out`, on scroll-in |
| Topo dividers | stroke draw-on via dashoffset | 1.4s `power1.inOut`, stagger 0.1 |
| Pyramid bars | `scaleX 0→1` (origin left) | 0.9s `power3.out`, stagger 0.05 |
| Crag bars | `scaleX 0→1` | 0.9s `power3.out`, stagger 0.06 |
| Milestone cards | `y:28→0` + fade | 0.6s, stagger 0.08, `power3.out` |
| Card/list refresh on filter change | children `y:14→0` + fade | 0.42s, stagger 0.018, `power2.out` |
| Skyline | rotate + wobble + fade-in | continuous; paused off-screen |

> Bars animate with `scaleX` (not width) on purpose so a React re-render (filter change) doesn't reset a completed animation. Keep that approach.

**Hover states:** status/grade chips & view toggle → fill swap; route names → `ember`; card border → `ember` + thumb `scale(1.05)`; list rows → `chalk-2` bg; pyramid/crag rows → pointer (clickable).

**Filtering & sorting (the core behavior):**
- **Status** (all/sends/favorites), **type** (all/boulder/sport/trad — exists in repo controls), **grade** (single-select, shared with pyramid), **crag** (set from Top-crags click), and **text search** (debounced ~300ms, matches name/area/city/sub-area) **compose** — all active filters AND together.
- **Sort** by grade or route name, toggling asc/desc; default grade-desc.
- **Pagination** resets to page 1 whenever any filter/sort/search/per-page changes.
- The result-count label and active-pill row reflect the live filtered set.
- Keep this server-rendered via URL params (the repo's existing approach) so views are shareable and back/forward works.

**Navigation:** route names link to `/database/{id}-{slug}`. Header nav + footer are the shared site chrome.

---

## State & Data
Server-rendered page; "state" is URL search params + fetched data. **Preserve the existing data flow, restyle the markup, and add the new derived aggregates.**

- **Climbs / sends / favorites / images:** already fetched in `DatabaseTable.tsx` / `DatabaseWrapper.tsx` via `lib/data-service` (`getClimbs`, `getSendsForUser`, `getFavoritesForUser`, `getAllClimbImages`). Reuse.
- **Masthead stats** (routes / sends / crags / top send): derive from `getClimbs` + `getSendsForUser` (crags = distinct `area`; top send = max graded sent). Extend the existing `DatabaseMeta`.
- **Field Stats aggregates** (grade pyramid, top crags, regions) and **Milestones**: derive on the server from the same climb/send data. The prototype's `renderVals()` shows the exact reductions (grade totals/sent counts, crag counts sorted desc, region map via `regionOf`, milestone picks).
- **URL params:** `filter`, `type`, `q`, `view` already exist; add `grade`, `crag`, and (optionally) `page`/`perPage` if you move pagination to URL state. TanStack Table currently owns sort + pagination client-side — either keep that or lift to params; just keep behavior consistent.
- **Signed-out fork:** no Sends/Favorites filters, CTA-forward table (`DatabaseTableSignedout`, `columnsSignedout`, `ClimbSignedOut`). Keep it.
- `SupabaseAuthListener` stays mounted in the layout.

---

## Responsive behavior
- **≥1080px:** cards grid 4-col; field-stats 2-col.
- **≤1080px:** cards grid 3-col; milestones 3-col.
- **≤920px:** field-stats collapses to 1 column.
- **≤760px:** desktop nav → hamburger; cards 2-col; milestones 2-col; list table hides AREA/CITY/TYPE columns and shows the route's mono sub-line; masthead skyline uses fewer depth rows.
- Padding and most type sizes are `clamp()`-fluid; honor the min/max values above. Pointer-parallax on the skyline is desktop-only.

---

## Accessibility
- Maintain the `prefers-reduced-motion` handling above (the prototype gates all of it).
- Masthead text sits on a 3D canvas — the gradient scrim is tuned so `chalk` text clears AA; keep it.
- All route names / nav / CTA links are real anchors; the mobile menu button has `aria-label="Menu"`; decorative SVG (brand mark, topo lines, glyphs, skyline canvas) are `aria-hidden`.
- Filter chips and sort headers are real `<button>`s; sort state is conveyed by the caret + color, and grade/type info is text, not color alone.
- The 3D canvas is purely decorative and must be skippable / inert to AT.

---

## Assets
- **No raster images** are required for this page's chrome. Route **cover photos** in Cards view come from Supabase (`getAllClimbImages`); missing images fall back to the 45° hatch placeholder.
- Fonts (Google Fonts, already loaded in the repo via `next/font`): **Saira Condensed**, **Inter**, **JetBrains Mono**.
- Brand mark, type glyphs, and topo lines are **code-drawn SVG** — use the existing `BrandMark.tsx`, `ui/TypeGlyph.tsx`, `ui/TopoLine.tsx`.
- The masthead needs **three.js** (r128 in the prototype). Add it as a dependency / dynamic import in the app.

---

## Files in this bundle
- `Byron Climbs Database.dc.html` — the hi-fi design prototype (open in a browser to view + interact). All sample data lives in the `CLIMBS` array inside it.
- `support.js` — runtime required only to render the prototype. **Not part of the deliverable; do not port it.**
- `README.md` — this spec.

### Key repo files to edit / reference
```
app/database/page.tsx                 ← page header → animated masthead + stats
app/database/columns.tsx              ← list-view columns (sortable headers)
app/database/data-table.tsx           ← list table + pagination
app/database/columnsSignedout.tsx     ← signed-out columns (keep fork)
app/database/data-table-signed-out.tsx
app/globals.css                       ← all design tokens (already defined)
components/DatabaseWrapper.tsx        ← auth fork + data fetch
components/DatabasePageControls.tsx   ← filters / search / view toggle (+ grade chips, pills)
components/DatabaseTable.tsx          ← list/cards switch + CardView
components/DatabaseTableSignedout.tsx ← signed-out table
components/GradePieChart.tsx          ← superseded by the grade pyramid (reuse its data)
components/DateBarGraph.tsx           ← superseded by field-stats charts (reuse its data)
components/Footer.tsx                 ← footer (reuse)
components/Header.tsx                 ← header / nav (shared chrome)
components/{FavoriteIcon,TickBox}.tsx ← favourite / sent controls
components/BrandMark.tsx
components/ui/{GradeChip,MonoChip,TypeGlyph,TopoLine}.tsx
lib/data-service.ts                   ← getClimbs / getSendsForUser / getFavoritesForUser / getAllClimbImages
```
