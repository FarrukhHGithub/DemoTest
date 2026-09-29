import express from 'express';
import { getAllSlots, generateSlotsHandler, deletePastSlots, deleteSlot } from '../controllers/slotController.js';

const router = express.Router();

router.get('/', getAllSlots);
router.post('/generate', generateSlotsHandler);
router.delete('/past', deletePastSlots);
router.delete('/:id', deleteSlot);

export default router;
