import express from "express";
import { getWebHistoryByEmail } from "../controllers/WebHistoryController/historyController.js";

const router = express.Router();

// Get Web History By Email
router.get("/history/:email", getWebHistoryByEmail);

export default router;