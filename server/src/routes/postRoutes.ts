import express from 'express';
import ifAuthenticated from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadImage";
import {createPost, getPostById, likePost, deletePost, unLikePost, updatePost} from "../controllers/postController";
import ifPostAuthor from "../middlewares/authorMiddleware.ts";

const router = express.Router();

router.post('/create', upload.single('photo'), ifAuthenticated, createPost);
router.get('/:postId', ifAuthenticated, getPostById);
router.put('/:postId', ifAuthenticated, ifPostAuthor, updatePost);
router.post('/:postId/like', ifAuthenticated, likePost);
router.delete('/:postId', ifAuthenticated, ifPostAuthor, deletePost);
router.delete('/:postId/unlike', ifAuthenticated, ifPostAuthor, unLikePost);

export default router;