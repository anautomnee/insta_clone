import express from 'express';
import ifAuthenticated from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadImage";
import {
    createPost,
    getPostById,
    likePost,
    deletePost,
    unLikePost,
    updatePost,
    getFollowedPosts,
    getRandomPosts
} from "../controllers/postController";
import ifPostAuthor from "../middlewares/authorMiddleware.ts";

const router = express.Router();

router.get('/get/:postId', ifAuthenticated, getPostById);
router.get('/get_followed', ifAuthenticated, getFollowedPosts);
router.get('/random', ifAuthenticated, getRandomPosts);
router.post('/create', upload.single('photo'), ifAuthenticated, createPost);
router.put('/:postId', ifAuthenticated, ifPostAuthor, updatePost);
router.post('/:postId/like', ifAuthenticated, likePost);
router.delete('/:postId', ifAuthenticated, ifPostAuthor, deletePost);
router.delete('/:postId/unlike', ifAuthenticated, unLikePost);

export default router;