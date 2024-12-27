import express from 'express';
import ifAuthenticated from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadImage";
import {createPost, getPostById, likePost, unLikePost} from "../controllers/postController";

const router = express.Router();

router.post('/create', upload.single('photo'), ifAuthenticated, createPost);
router.get('/:postId', ifAuthenticated, getPostById);
router.post('/:postId/like', ifAuthenticated, likePost);
router.delete('/:postId/unlike', ifAuthenticated, unLikePost);

export default router;