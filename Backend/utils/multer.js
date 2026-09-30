import multer from "multer";

// NOTE: Vercel's filesystem is read-only — disk uploads are not persisted.
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export default upload;
