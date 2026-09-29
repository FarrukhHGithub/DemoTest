# Rule: Explicit Skill Invocation Only

**CRITICAL**: Do not load or apply any skill from `.agent/skills/` automatically based on semantic matching of the user's request.

- Only load a skill when the user explicitly names it in their message (e.g. "use nextjs-vercel-performance", "apply express-mongo-performance", "run the vercel skill").
- Mentioning a related topic (Next.js, Vercel, Express, MongoDB) is NOT sufficient on its own to trigger a skill. The user must name the skill.
- If a skill seems relevant but wasn't named, do not load it — instead briefly mention it exists and ask if the user wants it applied, then continue with the default behavior.
- This rule exists to control token usage: every skill loaded adds tokens to the active context on top of the always-loaded MEMORY.md. Loading skills only on demand keeps daily quota usage predictable.

This rule overrides each skill's own semantic-triggering description — even skills whose YAML `description` field sounds like a natural match should stay dormant unless named. (Each skill in this project also sets `allow_implicit_invocation: false` in its frontmatter for the same reason — this rule is the backstop in case that policy field is ever ignored.)
