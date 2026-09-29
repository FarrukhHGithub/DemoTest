---
name: nextjs-vercel-performance
description: Next.js (App Router) and Vercel deployment performance patterns — rendering strategy, caching, image/font optimization, Edge runtime, bundle size. Use ONLY when explicitly invoked by the user (e.g. "use nextjs-vercel-performance").
policy:
  allow_implicit_invocation: false
---

# Next.js + Vercel Performance Skill

Apply these patterns when writing or reviewing Next.js code for this MERN/Next.js stack. Prefer the smallest change that fixes the issue — don't rewrite working code to "optimize" unless asked.

## 1. Rendering strategy (pick per-route, not globally)
- Static content (marketing, docs, blog) → static generation, no `force-dynamic`.
- Data that changes occasionally → ISR: `export const revalidate = 60` (or on-demand via `revalidatePath` / `revalidateTag` after a mutation).
- Truly per-request data (auth-gated dashboards) → `dynamic = 'force-dynamic'`, but scope it to the smallest possible component tree, not the whole layout.
- Default to Server Components. Only add `"use client"` at the leaf where interactivity is actually needed — it shouldn't creep up into layouts/pages.

## 2. Data fetching & caching
- Use `fetch()` with explicit `{ next: { revalidate, tags } }` — never rely on Next's default fetch caching without understanding it, since defaults changed across versions and silently serving stale data is a common bug.
- Tag fetches (`tags: ['product-123']`) so mutations can surgically `revalidateTag` instead of blowing the whole cache.
- Deduplicate requests with React `cache()` for server-side functions called from multiple components in one render.
- Don't waterfall: fetch independent data in parallel (`Promise.all`), not sequential `await`s across components.

## 3. Images & fonts
- Always use `next/image`, never raw `<img>`, for anything above the fold or repeated (cards, avatars, product grids).
- Set `sizes` correctly for responsive images — a missing `sizes` prop is the most common cause of over-fetching large images.
- Use `next/font` (not a `<link>` to Google Fonts) so fonts self-host and don't block render.

## 4. Bundle size
- Dynamic-import anything heavy that isn't needed on first paint: `next/dynamic(() => import('./Chart'), { ssr: false })` for charts, editors, maps.
- Check for accidental client-side imports of server-only packages (e.g. `mongoose` imported into a client component) — this bloats the client bundle silently.
- Run `@next/bundle-analyzer` when a page feels heavy rather than guessing.

## 5. Vercel-specific
- Use Edge runtime (`export const runtime = 'edge'`) only for latency-sensitive, stateless logic (auth checks, redirects, geolocation) — not for anything using Node-only APIs or your MongoDB driver (Mongoose doesn't run on Edge).
- Use Vercel's Route Segment caching + `Cache-Control` headers on API routes deliberately; don't leave API routes uncached by accident when they return the same data repeatedly.
- For MERN-style API routes deployed as serverless functions: keep them short-lived and stateless — no in-memory caches that assume a warm, persistent process, since each invocation may be a cold instance.
- If you need persistent connections (DB pooling) inside serverless functions, see the `express-mongo-performance` skill for the connection-caching pattern — the same "cache across invocations" idea applies to Next.js API routes/Route Handlers too.

## 6. Quick checklist before shipping a page
- [ ] Is this route as static/ISR as it can be, given the data?
- [ ] Any client component that could be a server component?
- [ ] Any `<img>` that should be `next/image`?
- [ ] Any sequential `await`s that could run in parallel?
- [ ] Any large dependency that could be dynamically imported?
