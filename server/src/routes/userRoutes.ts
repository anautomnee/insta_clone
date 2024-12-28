import express from 'express';
import ifAuthenticated from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadImage";
import {getUserByUsername, updateProfile} from "../controllers/userController";

const router = express.Router();

router.get('/:username', ifAuthenticated, getUserByUsername);
router.post('/:id/update_profile', upload.single('photo'), updateProfile);

export default router;