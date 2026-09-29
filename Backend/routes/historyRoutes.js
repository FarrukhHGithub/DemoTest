import express from "express";
import { getPatientHistoryByEmail } from "../controllers/HistoryController/history.js";

const router = express.Router();

// GET history by email
router.get("/:email", getPatientHistoryByEmail);

export default router;