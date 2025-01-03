import { Router } from 'express';
import ifAuthenticated from "../middlewares/authMiddleware.ts";
import {getChatMessages, saveMessage, startChat} from "../controllers/messageController.ts";
import messagesMiddleware from "../middlewares/messagesMiddleware.ts";

const router: Router = Router();

router.post('/start_chat', ifAuthenticated, messagesMiddleware, startChat);
router.post('/save', ifAuthenticated, messagesMiddleware, saveMessage);
router.post('/get_chat', ifAuthenticated, messagesMiddleware, getChatMessages );

export default router;