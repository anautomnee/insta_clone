import express from 'express';
import ifAuthenticated from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadImage";
import {createPost} from "../controllers/postController";

const router = express.Router();

router.post('/create', upload.single('photo'), ifAuthenticated, createPost);

export default router;