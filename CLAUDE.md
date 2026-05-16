# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Important**: This project runs Next.js 16 with Turbopack. APIs and conventions may differ from training data — check `node_modules/next/dist/docs/` if something seems wrong.

## Commands

```bash
npm run dev      # dev server with Turbopack (http://localhost:3000)
npm run build    # production build — run this to catch type errors before committing
npm run start    # serve production build
npm run lint     # ESLint
```

There are no tests configured.

## Architecture

**Single continuous-scroll page** — `src/app/page.tsx` is a `"use client"` component that dynamically imports all 8 sections with `{ ssr: false }` (required because every section uses browser-only APIs: Three.js, GSAP, Lenis, Framer Motion).

**Scroll infrastructure** lives in two places:
- `LenisProvider` wraps the whole page and drives smooth scroll. It connects Lenis to GSAP's ticker so `ScrollTrigger` gets scrub updates from Lenis rather than native scroll events. Every component that uses `ScrollTrigger` must be a descendant of `LenisProvider`.
- GSAP `ScrollTrigger` is used directly inside each section component via `useEffect` + `gsap.context()`. Always clean up with `ctx.revert()` on unmount.

**Three.js crane** (`ThreeCrane.tsx`) renders into a raw `<div>` ref using a manual WebGL renderer — not `@react-three/fiber`. It is `position: fixed`, `z-index: 0`, `pointer-events: none`, always behind page content. The Hero section sits above it at `z-index: 10`.

**X-Ray Building** (`XRayBuilding.tsx`) is a sticky-scroll section: the outer `<section>` has a fixed tall height (`6 × 80vh`) and the inner panel is `position: sticky; top: 0`. Six `ScrollTrigger` instances fire sequentially as the user scrolls through, each activating a floor and triggering SVG rect scale + pipe `strokeDashoffset` animations.

**Quality section** (`Quality.tsx`) uses a similar sticky-scroll pattern but drives a Framer Motion `AnimatePresence` panel swap instead of SVG drawing.

## Key conventions

- All section components are `"use client"` — no server components below `page.tsx`.
- Brand tokens are CSS custom properties on `:root` in `globals.css` and used as inline style values (e.g. `style={{ color: 'var(--color-gold)' }}`). Tailwind classes like `text-gold` are also defined there.
- Fonts (Bebas Neue + Inter) are loaded via a `@import url(...)` at the top of `globals.css` — **not** via `next/font`. The `@import` must precede `@import "tailwindcss"` or the build emits a CSS ordering warning.
- `@/*` resolves to `src/*` (see `tsconfig.json` paths).
- Images from `images.unsplash.com` are whitelisted in `next.config.ts`.
- `gsap.registerPlugin(ScrollTrigger)` is called at module scope in each file that uses it — this is intentionally duplicated to avoid import-order issues with dynamic loading.
