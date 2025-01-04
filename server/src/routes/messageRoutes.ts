import { Router } from 'express';
import ifAuthenticated from "../middlewares/authMiddleware.ts";
import {getChatMessages} from "../controllers/messageController.ts";
import messagesMiddleware from "../middlewares/messagesMiddleware.ts";

const router: Router = Router();

router.post('/get_chat', ifAuthenticated, messagesMiddleware, getChatMessages );

export default router;