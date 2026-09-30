// routes/emailCampaignRoutes.js

import express from 'express';
import multer from 'multer'; // Import multer for handling file uploads
import { createEmailCampaign, getEmailCampaigns, getEmailCampaignById, updateEmailCampaign, deleteEmailCampaign } from '../controllers/emailCampaignController.js';

const router = express.Router();
// NOTE: Vercel's filesystem is read-only — local disk uploads are not persisted.
// Files are buffered in memory here and should be forwarded to cloud storage
const upload = multer({ storage: multer.memoryStorage() });
router.post('/email-campaigns', upload.single('image'), createEmailCampaign);
router.get('/email-campaigns', getEmailCampaigns);

// Route to get a specific email campaign by ID
router.get('/email-campaigns/:id', getEmailCampaignById);

// Route to update an email campaign by ID
router.put('/email-campaigns/:id', updateEmailCampaign);

// Route to delete an email campaign by ID
router.delete('/email-campaigns/:id', deleteEmailCampaign);

export default router;
