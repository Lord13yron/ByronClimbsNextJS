# Handoff: Contact Page (Dynamic Redesign)

## Overview
A redesigned **Contact** page for Byron Climbs — a personal climbing blog/database. It replaces the static contact page (`app/contact/page.tsx`) with a more dynamic, scroll-driven experience built on the existing **Granite & Chalk** design system. The page invites visitors to reach Byron by email, Instagram, or in person, and surfaces a **live "where I am right now" status** derived from the current time in Kelowna, BC.

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype showing the intended look, motion, and behavior. They are **not production code to copy directly**.

This project already has a target environment: a **Next.js (App Router) + React + TypeScript + Tailwind CSS v4** codebase (see `app/contact/page.tsx`, `app/globals.css`, and the `components/` directory). The task is to **recreate this design in that existing environment**, reusing its established patterns:
- Tailwind utility classes mapped to the Granite & Chalk tokens already defined in `app/globals.css`
- Existing UI primitives: `components/ui/MonoChip`, `components/ui/TopoLine`, `components/Header`, `components/Footer`
- The existing font setup (`--font-saira`, `--font-inter`, `--font-jetbrains`)

The prototype loads GSAP via CDN. In the codebase, install GSAP as a dependency (`gsap`, with `ScrollTrigger`) and run it inside a client component (`"use client"`) via `useEffect` / `useLayoutEffect` with `gsap.context()` for cleanup. Respect the existing `prefers-reduced-motion` handling already present in `globals.css`.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, motion, and copy are all specified. Recreate the UI as closely as possible using the codebase's existing tokens and components. The HTML prototype is the source of truth for layout and motion timing.

## Prototype source files
- `Byron Climbs Contact.dc.html` — the full prototype (markup + GSAP logic). The `<helmet>` block holds fonts/keyframes; the `<script data-dc-script>` block at the bottom holds the `Component` class with all motion + interaction logic.
- `support.js` — runtime for the prototype's authoring format only. **Not relevant to the codebase implementation; ignore it.**
- `assets/squamish-meadow.jpg` — hero background image.
- `assets/cliff-over-water.jpg` — side "personal note" card image.

---

## Screens / Views

Single scrolling page, max content width **1320px** (header/footer) and **1180px** (body), centered. Page background `#F4F1EC` (chalk). Sections top → bottom:

### 1. Header (sticky)
- **Purpose**: Global nav; marks Contact active.
- **Layout**: `position: sticky; top: 0; z-index: 50`. Translucent chalk background `rgba(244,241,236,0.9)` with `backdrop-filter: saturate(180%) blur(10px)`, bottom border `1px solid #DCD5C8`. Inner row: `flex; align-items:center; justify-content:space-between`, padding `12px clamp(20px,5vw,56px)`, `max-width:1320px; margin:0 auto`.
- **Components**:
  - **Brand mark** (left): 34×34 SVG logo (concentric circles + mountain peak with an ember dot) + wordmark. Wordmark "BYRON CLIMBS" — Saira Condensed, 700, 19px, uppercase, `letter-spacing:0.06em`, color `#1F1F21`. Sub-line "EST. 2019 · KELOWNA, BC" — JetBrains Mono, 9px, uppercase, `letter-spacing:0.18em`, color `#6E6E74`. (Reuse `components/BrandMark`.)
  - **Desktop nav** (`@media min-width >760px`): links Home, Field Notes, Database, About, **Contact**. Saira Condensed, 600, 13px, uppercase, `letter-spacing:0.06em`, padding `8px 14px`, color `#6E6E74` (hover `#1F1F21`). **Active = Contact**: color `#1F1F21`, `border-bottom:2px solid #C8541E`.
  - **Sign in** link (desktop) + **hamburger button** (mobile only, ≤760px): 1px `#DCD5C8` border, 3px radius, 18×18 menu icon.

### 2. Hero — "Find me on the wall."
- **Purpose**: Set tone; show live availability status.
- **Layout**: `position: relative; overflow: hidden; min-height: clamp(520px, 80vh, 720px)`; flex column, content bottom-aligned (`justify-content: flex-end`).
- **Components**:
  - **Background image** (`assets/squamish-meadow.jpg`): absolutely positioned, `width:100%; height:122%; top:-10%; object-fit:cover; object-position:center 42%`. Entrance: scales from `1.16 → 1.0` over 1.8s; on scroll, parallax `yPercent 0 → 10` (6 on mobile), scrubbed.
  - **Dark gradient overlay**: `linear-gradient(180deg, rgba(14,14,16,0.18) 0%, rgba(14,14,16,0.40) 46%, rgba(14,14,16,0.82) 100%)`.
  - **Ember glow**: radial `rgba(200,84,30,0.34) → transparent`, bottom-right, slow `bcGlow` pulse (opacity/scale, 7s).
  - **Topo line strip** (decorative): 6 horizontal sine-wave SVG paths, `#F4F1EC` at opacity 0.15, bottom 46% of hero; each path "draws in" via `stroke-dashoffset` (1.8s, 0.12s stagger). See `topoPath()` in the prototype, or reuse `components/ui/TopoLine`.
  - **Kicker**: "— CONTACT · LET'S TIE IN" — JetBrains Mono, 11px, uppercase, color `#E8884F`, margin-bottom 16px.
  - **Headline**: two lines, each in an `overflow:hidden` mask wrapper; lines slide up (`yPercent 120 → 0`, 1.0s, 0.12s stagger). Saira Condensed, 800, uppercase, `font-size: clamp(54px, 10vw, 132px)`, `line-height:0.88`, `letter-spacing:0.01em`. Line 1 "Find me on" color `#F4F1EC`; line 2 "the wall." color `#E8884F`.
  - **Subhead**: `max-width:560px`, `clamp(14px,1.6vw,17px)`, `line-height:1.6`, color `rgba(244,241,236,0.92)`, `text-shadow:0 1px 8px rgba(0,0,0,0.6)`. Copy: *"If you're in the Kelowna area and want to share beta, meet up for a session, or just talk climbing over coffee — I'd love to hear from you."*
  - **Live status chip** (id `bc-status-chip`): inline-flex pill, padding `11px 16px 11px 14px`, background `rgba(14,14,16,0.55)`, `1px solid rgba(244,241,236,0.18)`, `border-radius:999px`, `backdrop-filter:blur(6px)`. Contains:
    - **Live dot**: 9px circle, pulsing (`bcLiveDot`, opacity 1↔0.25, 1.8s). Color changes with status (see Interactions).
    - **Clock line** (id `bc-clock`): JetBrains Mono, 9px, `rgba(244,241,236,0.62)` — `RIGHT NOW IN KELOWNA · {time}`.
    - **Status line** (id `bc-status`): Saira Condensed, 600, 14px, uppercase, `letter-spacing:0.04em`, `#F4F1EC`.

### 3. Body — "Reach me from anywhere on the route."
- **Purpose**: The three contact methods + a personal note.
- **Layout**: `padding: clamp(56px,8vw,96px) clamp(20px,5vw,56px) clamp(48px,7vw,80px)`, inner `max-width:1180px`. Heading block (max-width 680px) above a **2-column grid**: `grid-template-columns: 1.05fr 0.95fr; gap: clamp(36px,5vw,72px); align-items:start`. **Collapses to 1 column at ≤880px** (gap 44px); right column is `position:sticky; top:96px` on desktop, static on mobile.
  - **Heading**: kicker "— THREE WAYS TO CLIP IN" (mono, `#C8541E`); H2 "Reach me from anywhere on the route." — Saira Condensed, 700, uppercase, `clamp(30px,5vw,52px)`, `line-height:0.96`.

- **Left column — "The belay rope" with 3 anchors** (id `bc-rail-wrap`, `padding-left: clamp(44px,7vw,76px)`):
  - **The rope** (id `bc-rail`): absolute vertical line, `left: clamp(14px,3vw,26px)`, `top:10px; bottom:18px; width:2px; background:#DCD5C8`.
    - **Fill** (id `bc-rail-fill`): same line, `linear-gradient(180deg,#E8884F,#C8541E)`, `transform-origin:top center`, animated `scaleY 0 → 1`, **scrubbed to scroll** (ScrollTrigger start `top 72%`, end `bottom 80%`, scrub 0.6).
    - **Climber dot** (id `bc-climber`): 18px ember circle, 3px chalk border, ember glow shadow, `bcPulse` ring animation (2.4s). Its `y` is driven by the rope-fill ScrollTrigger `onUpdate`/`onRefresh` = `railHeight * progress`, so it rides up the rope as you scroll.
  - Each **anchor** is a row with a **bolt marker** on the rope: 14px chalk circle with 2px ember border; an inner 6px ember `bc-bolt-core` that pops from `scale 0 → 1` (`back.out(2.2)`, 0.4s) when the row enters view. Anchor card content slides in (`x: 26 → 0`, opacity 0 → 1, 0.7s, `power3.out`) on `top 84%`.

    - **Anchor 1 — Email (primary):**
      - Label "— EMAIL · PRIMARY ANCHOR" (mono, `#6E6E74`).
      - **Email text** (id `bc-email-text`): Saira Condensed, 700, `clamp(24px,3.6vw,38px)`, `line-height:1`, `text-transform:none`, color `#1F1F21`, `transition:color .25s`. It's inside a borderless `<button>` — **click to copy** (see Interactions).
      - Below: a **copy hint** (id `bc-copy-hint`, mono `#6E6E74`) = copy icon + label (id `bc-copy-label`) "CLICK TO COPY"; and an **"Open mail →"** link (id `bc-mail-open`, Saira Condensed 600 12px uppercase, `#C8541E`, hover `#8E3A12`).
      - **Email address: `byron.climbs.rocks@gmail.com`** (full, real value). Both the display text and the `mailto:` href use this.

    - **Anchor 2 — Instagram:**
      - Label "— INSTAGRAM · CONDITIONS & SENDS".
      - Link (id `bc-ig-link`, `href="https://www.instagram.com/byron.hayes.77"`, `target="_blank"`, `rel="noopener noreferrer"`): handle **`@byron.hayes.77`** (Saira Condensed 700, `clamp(24px,3.6vw,38px)`, hover color `#C8541E`) + a 38px round **arrow button** (id `bc-ig-arrow`, `background:#1F1F21`, `#F4F1EC` arrow icon) that is **magnetic** on desktop.
      - Sub-copy (`#6E6E74`, 14px): *"Casual updates — trip photos, conditions reports, and the occasional send."*

    - **Anchor 3 — In person (weekends):**
      - Label "— IN PERSON · WEEKENDS".
      - H3 "At the crag" (Saira Condensed 700, `clamp(24px,3.6vw,38px)`).
      - **Spot chips** (3): "The Boulderfields", "Cougar Canyon", "Skaha Bluffs" — Saira Condensed 600 12px uppercase, padding `7px 12px`, `1px solid #DCD5C8`, `border-radius:999px`, color `#1F1F21`, hover `border-color:#C8541E; color:#C8541E`. Lay out with `flex; flex-wrap:wrap; gap:8px`.

- **Right column — Personal note card** (id `bc-side`, `bc-side-card`): `background:#FBFAF6; border:1px solid #DCD5C8; border-radius:3px; overflow:hidden`. Reveals (`y:30 → 0`, opacity, 0.9s) on view.
  - **Image header**: `height: clamp(180px,26vw,240px)`, `assets/cliff-over-water.jpg` (`object-position:center 38%`), subtle scroll parallax (`yPercent -5 → 5`). Bottom gradient overlay. Caption pill (bottom-left): mono "BOULDERFIELDS · 49.46°N", `background:rgba(15,15,16,0.7)`, `#F4F1EC`.
  - **Body** (padding `clamp(22px,3vw,32px)`): H3 "Always down for a session." (Saira Condensed 700, `clamp(22px,3vw,30px)`); then two paragraphs (`#4A4A4F`, 15px, `line-height:1.62`):
    1. *"You'll usually find me at the Boulderfields or Cougar Canyon on weekends. Email's the best way to reach me before then — I check it regularly and I'm always happy to talk climbing, share local beta, or point someone toward a good project."*
    2. *"Coming to climbing later in life? Even better. That's exactly who I built this for."*

### 4. CTA (dark) — "Bring chalk. I'll bring the beta."
- **Layout**: `background:#0E0E10; color:#F4F1EC; padding: clamp(64px,9vw,116px) clamp(20px,5vw,56px)`; inner `max-width:980px`. Ember glow top-left. Children fade/rise in (`y:32 → 0`, 0.8s, 0.1s stagger) on `top 80%`.
- **Components**:
  - Kicker "— SEE YOU OUT THERE" (mono `#E8884F`).
  - H2 "Bring chalk. / I'll bring the beta." — Saira Condensed 800, uppercase, `clamp(40px,7vw,84px)`, `line-height:0.92`.
  - **Buttons** (`flex; gap:10px; flex-wrap:wrap`):
    - **Primary** (id `bc-magnet`): "Send me a note →" — `background:#C8541E; color:#F4F1EC; border:1px solid #C8541E; border-radius:3px; padding:13px 24px`; Saira Condensed 600 13px uppercase. Hover `background:#8E3A12`. `href` = `mailto:byron.climbs.rocks@gmail.com?subject=Climbing — let's connect`. **Magnetic** on desktop.
    - **Secondary**: "Browse the database" → `Byron Climbs Database` route. Transparent, `1px solid rgba(244,241,236,0.4)`, hover `background:rgba(244,241,236,0.1)`.

### 5. Footer
- `background:#0E0E10; color:#F4F1EC; padding:40px clamp(20px,5vw,56px); border-top:1px solid rgba(244,241,236,0.08)`. Row: brand mark (chalk variant) + wordmark on the left; copyright on the right (mono, `rgba(244,241,236,0.45)`): "© 2026 BYRON HAYES · KELOWNA, BC · BUILT BETWEEN SESSIONS". `flex-wrap:wrap`. (Reuse `components/Footer`.)

---

## Interactions & Behavior

### Live "right now in Kelowna" status (the dynamic centerpiece)
Runs on an interval (every 5s) on the client. Compute the current time in **`America/Vancouver`** using `Intl.DateTimeFormat`:
- `timeStr` = `{ hour:'numeric', minute:'2-digit', hour12:true }` → e.g. "8:29 PM".
- `h` = 24-hour hour (`{ hour:'2-digit', hour12:false }`), `wd` = weekday short (`Sat`/`Sun` ⇒ weekend).
- Update `#bc-clock` → `RIGHT NOW IN KELOWNA · {timeStr}`; `#bc-status` → status text; recolor the live dot.

Status rules (first match wins):
| Condition | Status text | Dot color |
|---|---|---|
| `h < 6 || h >= 22` | "Asleep — rehearsing beta in my head" | `#8C8C92` |
| weekend && `8 ≤ h < 18` | "Probably at the Boulderfields" | `#3FB873` |
| weekday && `9 ≤ h < 17` | "At work — email's your best bet" | `#E8884F` |
| otherwise (evenings) | "Home, logging today's sends" | `#3FB873` |

Wrap `Intl` in try/catch with a `toLocaleTimeString` fallback. Clear the interval on unmount.

### Click-to-copy email
On clicking the email button: `navigator.clipboard.writeText(email)` (with a hidden-`textarea` + `execCommand('copy')` fallback). On success: set `#bc-copy-label` → "COPIED!", copy hint color → `#3FB873`, email text color → `#C8541E`, and a quick scale bounce (`1 → 1.04 → 1`, `transformOrigin:left center`). After **2s**, revert label/colors. Keep a single timeout handle so rapid clicks reset cleanly.

> **Email-obfuscation note:** the prototype assembles the address in JS at runtime (`"byron.climbs.rocks" + String.fromCharCode(64) + "gmail" + "." + "com"`) purely to defeat the prototype host's automatic email masking. **In the real codebase this is unnecessary** — just use the literal `byron.climbs.rocks@gmail.com` in the JSX text and `mailto:` href.

### Magnetic buttons (desktop only, viewport ≥ 760px)
On `mousemove` over the element, translate it toward the cursor: `x = offsetX * s`, `y = offsetY * s` (`gsap.to`, 0.4s, `power3.out`). On `mouseleave`, spring back to 0,0 (`elastic.out(1,0.4)`, 0.5s). Strengths: CTA `#bc-magnet` → (0.3, 0.4); Instagram arrow `#bc-ig-arrow` → (0.5, 0.5). Disable on mobile.

### Scroll-driven motion (GSAP + ScrollTrigger)
- Hero: image scale-in + parallax; topo paths draw in; kicker/headline/subhead/chip timeline on load.
- Body heading: rise/fade on enter.
- Belay rope: `scaleY` fill scrubbed to scroll; climber dot `y` follows progress; bolt cores pop and anchor cards slide in per-row on enter.
- Side card: rise/fade in; inner image parallax.
- CTA: staggered rise/fade.

### Reduced motion
If `prefers-reduced-motion: reduce`: skip all entrance/scroll animations, but **set the rope fill to `scaleY:1` and all bolt cores to `scale:1`** so the page reads as complete. The live clock/status still updates. (`globals.css` already disables the keyframe animations.)

### Responsive behavior
- **≤880px**: contact grid → 1 column; right card un-sticks and stacks below.
- **≤760px**: desktop nav + Sign-in hidden; hamburger shown (wire to the codebase's existing mobile menu). Magnetic effects off.
- All type uses `clamp()` — scales fluidly; no fixed breakpoints needed for sizing.

## State Management
Minimal, all client-local:
- `now`/derived `timeStr` + `status` + `dotColor` — recomputed on a 5s interval (or `useEffect` + `setInterval`).
- `copied` boolean (+ a timeout ref) for the email button label/colors.
- No data fetching. No server state. Implement as a **client component** (`"use client"`).

## Design Tokens
(Already defined in `app/globals.css` as CSS variables — use those utilities.)

**Colors**
- Chalk bg `#F4F1EC` (`--chalk`); card `#FBFAF6`; chalk-2 `#ECE7DE`; border/chalk-3 `#DCD5C8`.
- Granite text `#1F1F21` (`--granite-100`); dark sections `#161618` / `#0E0E10`.
- Slate `#4A4A4F` (`--slate-700`), `#6E6E74` (`--slate-500`), `#8C8C92` (`--slate-400`).
- Ember `#C8541E` (`--ember`), soft `#E37A3F`/`#E8884F` (`--ember-soft`), deep `#8E3A12` (`--ember-deep`).
- Live-status green (custom to this page): `#3FB873`.

**Typography**
- Display: **Saira Condensed** (600/700/800) — headings, wordmark, buttons, big values. Mostly uppercase, `letter-spacing` ~`0.01–0.06em`.
- Body: **Inter** (300/400/500/600).
- Mono: **JetBrains Mono** (400/500) — labels/kickers, 9–11px, uppercase, `letter-spacing:0.18em`.

**Radius**: 3px (cards/buttons), 999px (pills/chips), 50% (dots/markers). Base `--radius: 0.25rem`.

**Spacing**: section padding `clamp(56px,8vw,96px)` vertical, `clamp(20px,5vw,56px)` horizontal; grid gap `clamp(36px,5vw,72px)`; anchor spacing `clamp(34px,5vw,52px)`.

**Shadows/glows**: climber dot `0 2px 10px rgba(200,84,30,0.5)`; ember radial glows as noted; subhead text-shadow `0 1px 8px rgba(0,0,0,0.6)`.

**Keyframes**: `bcGlow` (7s opacity/scale), `bcPulse` (2.4s ring), `bcLiveDot` (1.8s opacity). Equivalents (`mast-glow`, `ember-pulse`, `about-climber-pulse`) already exist in `globals.css`.

## Assets
- `assets/squamish-meadow.jpg` — hero background (already in repo at `public/squamish-meadow.jpg`).
- `assets/cliff-over-water.jpg` — side card image (already in repo at `public/cliff-over-water.jpg`).
- SVG icons (logo, copy, external-arrow, hamburger) are inline in the prototype — small enough to reuse inline or via the codebase's icon set. Logo: reuse `components/BrandMark`.

## Files
- `app/contact/page.tsx` — **the page to replace** (current static version).
- `app/globals.css` — design tokens, fonts, keyframes, reduced-motion rules.
- `components/ui/MonoChip.tsx`, `components/ui/TopoLine.tsx` — reusable primitives used by the original contact page; reuse here.
- `components/Header.tsx`, `components/Footer.tsx`, `components/BrandMark.tsx` — shared chrome.
- Prototype reference (this bundle): `Byron Climbs Contact.dc.html`.
