# Muhammed Easa — Portfolio

A five-page bilingual portfolio set like a manuscript. Two rooms, no gold:
the **Scriptorium** (night — lampblack, heavy paper, one aged-vermilion
*rubric* accent) and the **Reading Room** (day — white laid paper, iron-gall
ink, deep rubrication red). English and Arabic with a fully mirrored RTL
layout. Cormorant and Amiri carry the display voices; Hanken Grotesk and
IBM Plex Sans Arabic do the quiet machinery.

## Pages

| Route             | Leaf                          |
| ----------------- | ----------------------------- |
| `/`               | Frontispiece · الديباجة        |
| `/work`           | The Works · الأعمال            |
| `/practice`       | The Practice · الخدمات         |
| `/chronicle`      | The Chronicle · السيرة         |
| `/correspondence` | Correspondence · المراسلات     |

## How it's built

- **Content** lives in [src/lib/manuscript.ts](src/lib/manuscript.ts) — every
  string is an `{ en, ar }` pair. Edit copy there, never in components.
- **Themes** are CSS custom properties switched by `data-theme="day"` on
  `<html>` ([globals.css](src/app/globals.css)), exposed to Tailwind via
  `@theme inline`. Tokens: ground, panel, veil, ink, quiet, rubric, vermilion.
- **Direction**: `dir="rtl"` flips the layout through logical properties;
  GSAP/Motion x-transforms read the direction and invert.
## Component glossary

Crafted names, plain meanings — each file also opens with a one-line comment.

| Component   | What it is                                                       |
| ----------- | ---------------------------------------------------------------- |
| `Masthead`  | The navbar (floating pills; hides on scroll down)                |
| `Cipher`    | The logo (custom-drawn E)                                        |
| `Vestibule` | The first-load loading screen                                    |
| `PageTurn`  | Route transitions (a leaf sweeps across, names its destination)  |
| `Quill`     | The custom cursor                                                |
| `Cadence`   | Smooth scroll (Lenis + ScrollTrigger wiring)                     |
| `Arrive`    | Scroll-entrance animation wrapper                                |
| `Drift`     | Scroll parallax wrapper                                          |
| `Filament`  | Section rules that draw themselves                               |
| `InkReveal` | Prose that darkens word-by-word as you scroll                    |
| `InkThread` | The red line drawn down the home page, linking sections          |
| `Ascend`    | Go-to-top button with a scroll-progress ring                     |
| `WhatsApp`  | Floating WhatsApp chat button (+971 50 422 8524)                 |
| `Colophon`  | The footer (offers the next page)                                |
| `FolioHead` | Inner-page header (folio mark, title, argument)                  |
| `Letter`    | The contact form                                                 |
| `TurnLink`  | Internal link that routes through PageTurn                       |

`HeroFilm` plays the cinematic background loop on the frontispiece; the
hero is a bottom-anchored title card over it, with a masked blur (no
darkening) rising from the page edge and ink-based liquid-glass pills.

`lib/manuscript.ts` holds all copy (bilingual), `lib/theme.tsx` the theme
provider (`useHall`), `lib/tongue.tsx` the language provider (`useTongue`).

## Stack

Next.js 16 · TypeScript · Tailwind CSS 4 · GSAP · Motion · Lenis · Resend ·
Zod 4.

## Running

```bash
npm install
npm run dev     # development
npm run build   # production build
npm run start   # serve production build
```

## Environment

Copy `.env.example` to `.env.local`:

```
RESEND_API_KEY=   # Resend API key
CONTACT_FROM=     # verified sender (onboarding@resend.dev for sandbox)
CONTACT_TO=       # where correspondence is delivered
```

Resend's sandbox sender only delivers to the account owner's address; verify a
domain in Resend to send from your own.

## Deploying

Vercel-ready: import the repo, set the three environment variables, deploy.
All pages prerender statically; only `/api/contact` runs on demand.

## Testing

- `node scripts/visual-check.mjs` (against `npm run start`) — walks every page
  × {en, ar} × {night, day} × {desktop, mobile}, audits the contrast of every
  rendered text node, exercises the letter form in both tongues, and verifies
  both toggles, the masthead's scroll behaviour, the ascend button, and the
  RTL page turn.
- Lighthouse (`npx lighthouse`, Chromium via `CHROME_PATH`): desktop preset
  scores 97–100 performance and 100/100/100 accessibility / best practices /
  SEO on every page; mobile preset holds 100/100/100 with 88–91 performance —
  the remainder is the display serif's swap repaint, which is the design.
