# Handoff: Account Page (`/account`) Redesign

## Overview
This is a full redesign of the signed-in **Account page** (`/account` → `components/UserPage.tsx`, "Welcome back" / the owner's personal logbook dashboard). The current page is a light-chalk masthead (kicker + "Welcome, {username}." + Sign out) followed by Recent sends, two grade pie charts, and a sends-over-time bar chart.

The redesign keeps the same information but restructures it into the site's **field-journal** language (the same vocabulary as the Database and Field Notes pages):
1. A **dark granite hero/masthead** with a topo-contour backdrop, an editable username headline, a status/meta row, and a 4-stat counter strip.
2. A **two-column "Latest sends + Favorites"** block (light card beside a dark card).
3. A **"By the numbers" breakdown**: two grade **donut** charts (Boulder + Sport, with a Sport empty-state), a **Sends-over-time** bar timeline, and a **Top crags** bar list.

The goal is to make the account page feel like the rest of the site instead of a plain settings screen, while reusing every existing component and token.

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype of the intended look and behavior, **not production code to copy**. `Byron Climbs Account.dc.html` is a self-contained sandbox format; ignore its `<x-dc>` wrapper, the `data-dc-script` block, the `renderVals()` plumbing, the inline `CLIMBS` array (sample data), and the `ac-`/`disp`/`mono` class names. Recreate the design in the existing Next.js app (`next-climbing/`) using its real components, tokens, and data layer.

## Fidelity
**High-fidelity.** Colors, type, spacing, and motion are final — match them. But **prefer existing components over the prototype's hand-rolled SVG/markup**: the codebase already has donut charts, a bar timeline, a crag-bar list, a username editor, and a count-up animation. Map onto those (details below) rather than porting the prototype's bespoke donut/leader-line math.

## What changes (file-level)
- **Rewrite:** `components/UserPage.tsx` — restructure into the three blocks below. It stays an async server component; it already fetches `user`, `sendsForUser`, and `climbs`.
- **Rewrite:** `components/UsernameEditor.tsx` — keep its server-action wiring (`useActionState(updateUsername)`, `signOutUser`), but restyle for the dark hero (chalk text on granite, ember accents, inline edit affordance). See "Hero" below.
- **Reuse, restyled if needed:**
  - `components/RecentSends.tsx` → the "Latest sends" card. It already renders a paginated list of sends with `GradeChip`. In the redesign it sits in a light card in the left column; keep its pagination. (The prototype shows 8 rows with no pager — keep the existing pager; it's better.)
  - `components/GradePieChart.tsx` → the two donut cards (Boulder + Sport). **Already a donut with leader-line labels, hover-to-isolate, center total, and a built-in empty-state** — it matches the prototype's donuts almost exactly. Reuse as-is; only the surrounding grid/section styling changes.
  - `components/DateBarGraph.tsx` → "Sends over time". Already a per-month bar chart with a year selector and max-month ember highlight. Reuse as-is.
  - `components/ui/TopoLine.tsx` → topo dividers between sections (already used on this page) **and** the hero backdrop (stack several for a full-height contour field, or add a `rows`/`count` prop).
  - `components/ui/MonoChip.tsx`, `components/ui/GradeChip.tsx`, `components/anim/Counter.tsx` (hero stat count-up), `components/anim/gsap.ts`, `components/anim/DrawOn.tsx` (optional topo draw-on), `components/anim/Reveal.tsx` (section reveals), `components/ui/button.tsx` (Sign out).
- **New (small):** a **Top crags** card. `FieldStats.tsx` (Database) already renders an identical ember-gradient crag-bar list — lift that markup into a small `AccountTopCrags` card, or factor the crag-bar list out of `FieldStats` into a shared piece. Feed it with `getTopCrags(climbs, sends)` from `lib/database-stats.ts`.
- **New (optional):** a **Favorites** card (dark, right column). The current page has no favorites list. The prototype shows the owner's starred climbs. **Confirm with the owner whether to add this** — it needs a "favorites for the owner" query. If not adding it now, make "Latest sends" full-width and drop the two-column split. Don't invent a data source.
- **No change:** `app/account/page.tsx` (Suspense + `UserPageSkeleton`) — though update `UserPageSkeleton` to roughly match the new layout's blocks so the loading state doesn't jump.

## The page, block by block

### 1. Hero / Masthead (the focus of recent design changes)
Dark granite banner, bottom-anchored content. **Note:** the prototype originally had a newspaper "dateline" strip (VOL/NO/EST) pinned to the top — **that was removed; do not build it.** The hero is now just the contour backdrop + the bottom headline cluster.

- `<section>`: `position:relative; overflow:hidden;` background **granite-200** (`bg-granite-200`, `#161618`); `min-height: clamp(420px,58vh,540px)`; `display:flex; flex-direction:column; justify-content:flex-end` (content sits at the bottom — no tall empty band at the top).
- **Layer stack** (all `pointer-events:none` except content):
  1. **Ember glow** (z-1), top-right drifting radial: `radial-gradient(ellipse at center, rgba(200,84,30,0.18), transparent 66%)`, positioned `top:-10%; right:2%; width:54%; height:70%`, animated with the existing **`mast-glow`** keyframe (`animation: mast-glow 9s ease-in-out infinite alternate`; already in `globals.css`, already disabled under reduced-motion).
  2. **Topo contour backdrop** (z-1), full-bleed `absolute inset-0`: ~14 stacked horizontal contour lines spanning the height, **chalk** stroke, layer **opacity ~0.10**, `stroke-width 1.2`, `aria-hidden`. Build from `TopoLine` (stack instances or extend with a `rows` prop) — don't hand-roll paths.
  3. **Bottom scrim** (z-1): `linear-gradient(180deg, rgba(22,22,24,0.25) 0%, transparent 42%, rgba(22,22,24,0.5) 100%)`.
  4. **Content** (z-2): `mx-auto w-full max-w-7xl` (prototype uses 1320px; `max-w-7xl`=1280 is fine — match the page body), padding `0 clamp(20px,5vw,56px) clamp(30px,5vw,48px)`.
- **Content cluster** (bottom):
  1. **Eyebrow**: `MonoChip` `— ACCOUNT` in **ember-soft** (`text-ember-soft`), with a trailing hairline rule `height:1px; max-width:200px; flex:1; background:linear-gradient(90deg, rgba(227,122,63,0.4), transparent)`.
  2. **Headline** `<h1>`, `font-display` extrabold uppercase, **chalk**, `font-size: clamp(48px,9vw,118px); line-height:0.86; letter-spacing:0.01em`. Two lines:
     - line 1: `Welcome back,` rendered smaller and dimmer — `font-size:0.42em; color:rgba(244,241,236,0.62)`.
     - line 2: **`{username}.`** at full size, followed by an inline **pencil edit button** (`ember-soft`, `opacity 0.34 → 1` on hover). This is `UsernameEditor` restyled for the hero. Edit mode: an inline `Input` with `border-bottom:3px solid var(--ember)` on a faint `rgba(244,241,236,0.08)` field, plus Save (ember solid) / Cancel (ghost, chalk outline) buttons. Wrap each line's text in an `overflow:hidden` clip span so the line-rise animation is masked.
  3. **Meta row** (`margin-top:24px`, flex, `gap:12px`, wrap): a green "**SIGNED IN**" pill (7px dot, `#5FB87A`, `box-shadow:0 0 0 3px rgba(95,184,122,0.18)`); a "**MEMBER SINCE 2019**" mono chip on `rgba(244,241,236,0.06)`; **admin-only** (`user.role === "admin"`) an "**ADMIN PRIVILEGES**" pill (ember-soft, star glyph, `border:1px solid rgba(227,122,63,0.5)`) + an "**Admin dashboard →**" link to `/admin`; a flex spacer; then the **Sign out** `Button` (chalk outline, `form action={signOutUser}`). Hide the admin items entirely for non-admins (matches current logic).
  4. **Stat strip** (`margin-top:clamp(34px,5vw,52px)`, `padding-top:clamp(26px,3vw,34px)`, `border-top:1px solid rgba(244,241,236,0.14)`): four stats, each a big `font-display` number (`clamp(40px,5.4vw,60px)`, chalk; the "Top send" number ember-soft) over a `MonoChip` caption (`rgba(244,241,236,0.5)`). Use `<Counter value={…} />` for the three numeric stats; **Top send is static text** (e.g. `V8`), not a counter.
     | Value (source) | Caption | Color |
     |---|---|---|
     | total sends (`sends.length`) | `SENDS LOGGED` | chalk |
     | favorites count | `FAVORITES` | chalk |
     | top grade `V{n}` (static) | `TOP SEND` | ember-soft |
     | crags visited | `CRAGS VISITED` | chalk |
     - **Responsive (recently tuned):** on small screens the four stats must **stay on one line** — do not wrap. Below **620px**: `flex-wrap:nowrap`, `gap:12px`, numbers → `30px`. Below **420px**: `gap:8px`, numbers → `25px`, captions → `8.5px`. (All four are kept; Crags visited is not dropped.)

### 2. Latest sends + Favorites (two columns)
- Grid: `grid-cols-[1.45fr_1fr]` desktop, single column under ~920px (the prototype breaks at 920; `lg:` is fine). `gap: clamp(18px,2.4vw,22px)`.
- **Left — "Latest sends"** (light card, `bg-chalk-2 border border-chalk-3 rounded-md`, `p` ~`clamp(18px,2.4vw,26px)`): kicker `— THE LOGBOOK` (ember), `<h2>` "Latest sends" (`font-display` uppercase, `clamp(26px,3.2vw,38px)`), a "View all →" link to `/database`. List rows = `RecentSends` items: a solid ember `GradeChip` (e.g. `V10`), name (uppercase, truncate), a mono sub-line (`area · sector`), a favorite heart when starred, and a "SENT" check. Row hover: `bg-chalk-2 → ECE7DE`, `border-color → ember`. **Reuse `RecentSends` and keep its pager.**
- **Right — "Favorites"** (dark card, `bg-granite-100 border-granite-100 rounded-md`, same padding, `overflow:hidden` with a faint ember radial top-right): kicker `— STARRED` (ember-soft), `<h2>` "Favorites" (chalk), an "{n} SAVED" mono count. Rows on `rgba(244,241,236,0.05)`, name chalk + mono `area · CITY`, outline ember-soft `GradeChip`. Row hover nudges `translateX(3px)` and `border-color → ember`. **Only build if the owner-favorites data source is confirmed** (see file-level notes).

### 3. By the numbers (breakdown)
Light `bg-chalk-2` section, `max-w-7xl`, padding ~`clamp(26px,4vw,40px) … clamp(48px,7vw,72px)`. Header: kicker `— BY THE NUMBERS` (ember) + `<h2>` "The shape of the grind" (`clamp(28px,3.6vw,42px)`). Then:
- **Two donut cards** in a `grid-cols-1 md:grid-cols-2 gap-…`: **`GradePieChart type="boulder"`** and **`GradePieChart type="sport"`**. These already render the donut + leader-lined labels + hover isolation + center total, and **already handle the empty state** ("No {type} sends yet.") — the prototype's "No sport sends yet" panel is the same idea. Feed them the existing `boulderGradeData` / `sportGradeData` that `UserPage` already computes. Footnote line under each (mono, slate, top-border) is optional polish.
- **Sends over time** (full width, `md:col-span-2`): **`DateBarGraph sends={sends}`** as-is — bar-per-month, year selector (2025/2026), ember highlight on the busiest month, range label. (Prototype uses a 2-button toggle; the existing `Select` is fine.)
- **Top crags** (full width): the crag-bar list — area name (uppercase, hover → ember), `count · CITY` mono meta, and a horizontal bar `linear-gradient(90deg, var(--ember), var(--ember-soft))` that grows `scaleX 0→1` on scroll. Two-column grid of bars on desktop. Lift from `FieldStats.tsx` (identical markup exists) and feed `getTopCrags(climbs, sends)`.

### Topo dividers
Between sections, keep the existing `TopoLine` divider treatment already on the page (e.g. `text-chalk-3 opacity-60` over chalk, and a darker variant over `chalk-2`). Optionally animate their stroke draw-on with `DrawOn`.

## Interactions & Behavior
Use the existing gsap helpers (`components/anim/gsap.ts`: `gsap`, `prefersReducedMotion`, `useIsomorphicLayoutEffect`) and the pattern from `FieldStats`/`DatabaseMasthead` — wrap tweens in `gsap.context(scope)` inside a layout effect, guard with `prefersReducedMotion()`, and `ctx.revert()` on cleanup. Under reduced motion everything renders in its final state.

- **Hero load timeline:** headline lines rise (`yPercent ~115 → 0`, masked by the clip spans, small stagger); eyebrow fades in from the left; meta-row items and stat columns fade-rise with a stagger. (The old dateline tween is gone — don't reintroduce it.)
- **Topo backdrop draw-on (optional):** stroke-dashoffset draw via `DrawOn`.
- **Hero stat count-up:** `Counter` (counts once in view). Top-send stays static text.
- **Donuts:** hover a slice → isolate it (others dim) and swap the center total to that grade's count — **already implemented in `GradePieChart`**.
- **Timeline / crag bars:** grow on scroll into view (`scaleX`/height), once. Crag bars and the pyramid bars in `FieldStats` already do this via the `.fs-bar` pattern.
- **Username edit:** inline; `useActionState(updateUsername)`; on success collapse back to display; autofocus the input on open. Sign out posts to `signOutUser`.
- **Scroll progress bar:** the prototype adds a 2px ember progress bar fixed at the top. Optional — the site has `ScrollProgressBar` (Database) / `ScrollProgress` (Blog) you can reuse if you want it here; otherwise omit.

## Responsive behavior
- Hero headline scales `clamp(48px,9vw,118px)`; on phones the "Welcome back," line and `{username}.` stack naturally.
- **Hero stat strip stays single-line at all widths** with the 620px / 420px step-downs above (no wrap, all four kept).
- "Latest sends + Favorites" collapses to one column under ~920px.
- Donut grid → one column under `md`; "Sends over time" and "Top crags" are always full width.
- Meta row wraps; the Sign out button drops below the chips on narrow widths.

## State & Data
- **Server component** (`UserPage`): `getUser()`, `getSendsForUser()`, `getClimbs()` (already wired). Derive `sends` (climbs the user sent, with `created_at`), `boulderSends`/`sportSends`, and the two `gradeData` arrays (already done). Add `getTopCrags(climbs, sends)` for the crag card and `getMastheadStats(climbs, sends)` (or local reductions) for the hero stats (`routes`, `sends`, `crags`, `topSend`).
- **Client state** is local only: `UsernameEditor` (editing/pending), `GradePieChart` (hovered slice), `DateBarGraph` (selected year), `RecentSends` (page). No new global state.
- `topSend` should come from `getMastheadStats(...).topSend` (boulder-preferred `V{n}`, else sport, else "—") — don't recompute ad hoc.

## Design Tokens (all defined in `app/globals.css`)
| Token | Value | Use |
|---|---|---|
| `--granite-200` / `bg-granite-200` | `#161618` | hero bg |
| `--granite-100` / `bg-granite-100` | `#1F1F21` | Favorites card |
| `--granite-300` | `#0E0E10` | footer |
| `--chalk` | `#F4F1EC` | hero text, stat numbers, contour strokes, light cards |
| `--chalk-2` | `#ECE7DE` | "Latest sends" card / breakdown section bg |
| `--chalk-3` | `#DCD5C8` | borders, topo dividers |
| `--ember` | `#C8541E` | kickers, solid grade chips, bar fills, progress bar |
| `--ember-soft` | `#E37A3F` | eyebrow, top-send stat, admin pill, edit affordance |
| `--slate-500` / `--slate-400` | `#6E6E74` / `#8C8C92` | mono captions/meta on light |
| `--font-display` (Saira Condensed) | — | headline, h2/h3, stat numbers, grade chips |
| `--font-body` (Inter) | — | body copy |
| `--font-mono` (JetBrains Mono) | — | all `MonoChip` text |
| `--radius` | `0.25rem` | squared corners |
| Donut slice palette | see `GradePieChart` `SEGMENT_COLORS` | per-grade donut slices |

Ad-hoc rgba (inline, on the dark hero): text `rgba(244,241,236,0.62/0.5)`, faint fields/borders `rgba(244,241,236,0.06/0.08/0.14/0.16)`, glow `rgba(200,84,30,0.18)`, eyebrow rule `rgba(227,122,63,0.4)`, scrim `rgba(22,22,24,0.25→0.5)`, signed-in green `#5FB87A`.

Spacing: hero `min-h clamp(420px,58vh,540px)`, content pad `0 clamp(20px,5vw,56px) clamp(30px,5vw,48px)`; cards `p clamp(18px,2.4vw,26px)`; section paddings per block above; container `max-w-7xl`.

## Assets
**None.** No photos, no WebGL. The only graphics are procedurally generated topo contours via `TopoLine` (SVG) and the chart SVGs that existing components already draw.

## Files in this bundle
- `Byron Climbs Account.dc.html` — the full Account prototype (sandbox format). Hero is the first `<section screen="Account Hero">`; its motion is in the `motion()` method of the trailing `data-dc-script` block (`heroTopo`, `.ac-line`, `.ac-herotopo`, `#ac-stats`, `.ac-listrow`, `.ac-favrow`, donut `.ac-seg`, `.ac-cbar`, `.ac-tbar`). The inline `CLIMBS` array is sample data — ignore it; use the real Supabase data layer.
- `support.js` — sandbox runtime; ignore for implementation.

## Target codebase reference (`next-climbing/`)
- Rewrite: `components/UserPage.tsx`, `components/UsernameEditor.tsx`.
- Reuse: `components/RecentSends.tsx`, `components/GradePieChart.tsx`, `components/DateBarGraph.tsx`, `components/ui/{TopoLine,MonoChip,GradeChip,button}.tsx`, `components/anim/{Counter,gsap,DrawOn,Reveal}.tsx`.
- Lift crag-bar list from `components/database/FieldStats.tsx`.
- Data/actions: `lib/data-service.ts` (`getClimbs`, `getSendsForUser`), `lib/database-stats.ts` (`getMastheadStats`, `getTopCrags`), `lib/actions.ts` (`updateUsername`), `lib/auth-actions.ts` (`getUser`, `signOutUser`). Types in `app/types/types.ts` (`Climb`, `Send`).
- Update `components/UserPageSkeleton.tsx` to match the new blocks.
