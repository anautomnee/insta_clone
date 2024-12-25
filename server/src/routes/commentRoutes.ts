import { Router } from 'express';
import ifAuthenticated from "../middlewares/authMiddleware";
import {addCommentToPost} from "../controllers/commentController";
const router: Router = Router();

router.post('/:postId/add', ifAuthenticated, addCommentToPost);

export default router;