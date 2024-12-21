import express from 'express';
import ifAuthenticated from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadImage";
import {getUserById, updateProfile} from "../controllers/userController";

const router = express.Router();

router.get('/:id', ifAuthenticated, getUserById);
router.post('/:id/update_profile', upload.single('photo'), updateProfile);

export default router;