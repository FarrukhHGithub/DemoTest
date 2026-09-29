---
name: express-mongo-performance
description: Express/Node.js + MongoDB (Mongoose) backend performance patterns — connection handling, indexing, query shape, caching, clustering. Use ONLY when explicitly invoked by the user (e.g. "use express-mongo-performance").
policy:
  allow_implicit_invocation: false
---

# Express + Node.js + MongoDB Performance Skill

Apply these when writing or reviewing backend code in this MERN stack. Prefer targeted fixes over rewrites.

## 1. MongoDB connection handling
- One connection (pool) per process, reused across requests — never call `mongoose.connect()` per request.
- In serverless (Vercel functions, Lambda): cache the connection on the global/module scope so warm invocations reuse it:
  ```js
  let cached = global.mongoose;
  if (!cached) cached = global.mongoose = { conn: null, promise: null };
  async function dbConnect() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
      cached.promise = mongoose.connect(process.env.MONGODB_URI, {
        maxPoolSize: 10,
      }).then(m => m);
    }
    cached.conn = await cached.promise;
    return cached.conn;
  }
  ```
- Set `maxPoolSize` deliberately (default 100 is often too high for small serverless instances; too low starves a busy traditional server) — tune to your actual concurrency.

## 2. Query performance
- Use `.lean()` on read-only queries that don't need Mongoose document methods — skips hydration overhead, meaningfully faster on large result sets.
- Select only needed fields: `.select('name price')` instead of returning full documents.
- Always check `.explain('executionStats')` on a slow query before assuming an index will fix it.
- Index fields used in `find`, `sort`, and `filter` — especially compound indexes matching actual query shape (order matters: equality fields first, then sort, then range).
- Avoid `$where` and unindexed regex scans on large collections.
- Paginate with cursor-based pagination (`_id > lastId` or a sort-stable cursor) instead of `skip()` for large offsets — `skip()` gets linearly slower as offset grows.
- Use aggregation pipelines for computed/joined data instead of pulling documents into Node and processing in JS.

## 3. Express layer
- Use `compression()` middleware for JSON/text responses.
- Use `helmet()` for security headers (cheap, no perf cost).
- Rate-limit write-heavy or public endpoints (`express-rate-limit`) to protect the DB from abuse-driven load spikes.
- Keep request handlers non-blocking — never use sync fs/crypto calls in the hot path.
- Validate input early (e.g. `zod`/`joi`) so bad requests fail before touching the DB.

## 4. Caching
- Cache expensive/read-heavy queries in Redis (or Vercel KV) with a short TTL, keyed by query params.
- Invalidate cache keys on write (or use short TTL + accept eventual consistency for non-critical reads).
- Don't cache per-user sensitive data without a scoping key (userId in the cache key).

## 5. Scaling the Node process
- If deploying long-running (non-serverless) Express: use the Node `cluster` module or PM2 in cluster mode to use all CPU cores — a single Node process only uses one core.
- Keep CPU-heavy work (image processing, PDF generation, heavy computation) out of the request/response cycle — offload to a queue (BullMQ + Redis) and respond immediately.

## 6. Quick checklist before shipping an endpoint
- [ ] Is the connection reused, not reconnected per request?
- [ ] Does every filter/sort field have a matching index?
- [ ] Is `.lean()` used where a full Mongoose document isn't needed?
- [ ] Is pagination cursor-based for large collections?
- [ ] Is anything CPU-heavy blocking the event loop?
- [ ] Should this response be cached?
