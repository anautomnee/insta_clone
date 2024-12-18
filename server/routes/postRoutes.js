import express from 'express';
import ifAuthenticated from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadImage.js";
import {createPost} from "../controllers/postController.js";

const router = express.Router();

router.post('/create', upload.single('photo'), ifAuthenticated, createPost);

export default router;