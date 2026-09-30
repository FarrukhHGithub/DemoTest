import express from "express";
import { getWebHistoryByEmail } from "../controllers/WebHistoryController/historyController.js";

const router = express.Router();

router.get("/history/:email", getWebHistoryByEmail);

export default router;