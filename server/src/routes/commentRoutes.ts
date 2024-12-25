import { Router } from 'express';
import ifAuthenticated from "../middlewares/authMiddleware";
import {addCommentToPost, likeComment} from "../controllers/commentController";
const router: Router = Router();

router.post('/:postId/add', ifAuthenticated, addCommentToPost);
router.post('/:commentId/like', ifAuthenticated, likeComment);

export default router;