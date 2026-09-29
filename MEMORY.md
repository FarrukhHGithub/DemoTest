# Project Memory

## Stack
- Frontend: Next.js (App Router) + Vercel
- Backend: Express + Node.js
- DB: MongoDB (Mongoose)
- Full stack: MERN + Next.js

## Skill Policy (token control)
- Do NOT auto-load skills from `.agent/skills/` based on topic match. Load a skill only when the user names it explicitly (see `.agent/rules/skill-invocation-policy.md`).
- Available skills (load by name only): `nextjs-vercel-performance`, `express-mongo-performance`.
- Keep this file the only always-loaded context. Anything skill-specific belongs in the skill file, not here.

## Response Style (token control)
- Be concise by default. No repeated restating of the request, no filler summaries before/after code.
- Show only the changed code/diff, not the whole file, unless the whole file is requested.
- Don't re-explain project stack/conventions already listed above — assume they're known.
- Ask at most one clarifying question, only if truly blocking; otherwise pick the sensible default and note the assumption in one line.

## Conventions
- [Add 2-3 real conventions here, e.g.: API routes under /api, error format, auth pattern]

## Commands
- `npm run dev` — start dev server
- `npm test` — run tests
- `npm run build` — production build
