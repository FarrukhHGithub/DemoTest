// api/index.js
// Vercel serverless function entry point.
// This file imports the Express app (which already exports `default app`)
// and re-exports it so Vercel can treat it as a serverless handler.

import connectToDatabase from '../db.js';
import app from '../index.js';

// Ensure the DB connection is established before the first request is handled.
await connectToDatabase();

export default app;
