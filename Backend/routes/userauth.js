import express from 'express';
import { login, register, changePassword, getClientById, updateClientById, logout, sendEmail, getAllUsers,deleteUser } from '../controllers/user.js';
import { upload } from '../utils/multerConfig.js';
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/users', getAllUsers);
router.put('/change-password/:clientId', changePassword);
router.put('/logout', logout);
router.get('/:clientId', getClientById);
router.put('/:clientId', upload.single('image'), updateClientById);
router.post('/send-email', sendEmail);
router.delete("/users/:id", deleteUser);


export default router;
