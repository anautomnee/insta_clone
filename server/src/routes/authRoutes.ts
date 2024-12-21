import express, {Router} from 'express';
import 'dotenv/config';
import {loginUser, registerUser, resetPassword} from "../controllers/authController";

const router: Router = express.Router();

router.post('/login', loginUser);
router.post("/register", registerUser);
router.post("/reset", resetPassword);

export default router;