import express from 'express';
import 'dotenv/config';
import {loginUser, registerUser, resetPassword} from "../controllers/authController.js";

const router = express.Router();

router.post('/login', loginUser);
router.post("/register", registerUser);
router.post("/reset", resetPassword);

export default router;