import express from "express";
import { getPatientHistoryByEmail } from "../controllers/HistoryController/history.js";

const router = express.Router();

router.get("/:email", getPatientHistoryByEmail);

export default router;