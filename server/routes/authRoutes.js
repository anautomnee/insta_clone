import express from 'express';
import User from '../db/models/User.js';
import 'dotenv/config';
import nodemailer from "nodemailer";
import {loginUser, registerUser, resetPassword} from "../controllers/authController.js";

const router = express.Router();

router.post('/login', loginUser);

router.post("/register", registerUser);

router.post("/reset", resetPassword);

export default router;