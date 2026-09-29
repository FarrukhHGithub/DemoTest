// routes/fileRoutes.js

import express from "express";
import * as fileShare from "../controllers/FlieShare/FileShare.js";
import { upload } from '../utils/multerConfig.js';


const router = express.Router();

router.post('/share/email',fileShare.shareViaEmail);
router.post('/share/whatsapp', fileShare.shareViaWhatsApp);

export default router;



