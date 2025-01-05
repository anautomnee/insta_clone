import { Router } from 'express';
import ifAuthenticated from "../middlewares/authMiddleware.ts";
import {getChatByReceiverUsername, getUserChats} from "../controllers/messageController.ts";

const router: Router = Router();

router.post('/get_chat', ifAuthenticated, getChatByReceiverUsername );
router.get('/get_user_chats', ifAuthenticated, getUserChats );

export default router;