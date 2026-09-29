import multer from "multer";

// NOTE: Vercel's filesystem is read-only — disk uploads are not persisted.
// Buffer files in memory and upload to cloud storage (S3, Cloudinary, etc.)
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export default upload;
