import express from 'express';
import ifAuthenticated from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadImage.js";
import {getUserById, updateProfile} from "../controllers/userController.js";

const router = express.Router();

router.get('/:id', ifAuthenticated, getUserById);
router.post('/:id/update_profile', upload.single('photo'), updateProfile);

export default router;