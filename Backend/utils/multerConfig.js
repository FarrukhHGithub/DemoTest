import multer from "multer";

// NOTE: Vercel's filesystem is read-only (ephemeral).
// Files saved to local disk (uploads/) are NOT persisted between requests.
// Use multer.memoryStorage() and forward req.file.buffer to cloud storage
// (AWS S3, Cloudinary, etc.) before saving the URL to MongoDB.
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    cb(null, true);
};


export const upload = multer({ storage: storage, fileFilter: fileFilter });
export const uploads = multer({ storage: storage, fileFilter: fileFilter }).array('attachment', 10);
