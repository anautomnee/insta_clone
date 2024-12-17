import express from 'express';
import User from '../db/models/User.js';
import bcrypt from "bcrypt";
import 'dotenv/config';
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        if (!usernameOrEmail || !password) {
            return res.status(400).send('Username or email and password is required');
        }
        // Check if user exists
        const user = await User.findOne({$or: [{username: usernameOrEmail}, {email: usernameOrEmail}]});
        if (!user) {
            return res.status(404).send('User not found');
        }
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send('Wrong password or username');
        }
        const token = await jwt.sign({username: user.username, id: user._id}, process.env.JWT_KEY, {expiresIn: "1h"});
        res.status(200).json({message: 'Successfully logged in with token ', data: {
                token,
                info: {
                    username: user.username,
                    id: user.id,
                    profile_image: user.profile_image
                }
            }});
    } catch (error) {
        console.error('Error registering a user: ', error);
        res.status(500).send('Error logging in');
    }
});

router.post("/register", async (req, res) => {
    try {
        const { username, fullName, email, password } = req.body;
        if (!username || !password || !email || !fullName) {
            return res.status(400).send('Username, email, full name and password are required');
        }
        // Check if user exists
        const user = await User.findOne({username: username});
        if (user) {
            return res.status(404).send('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, full_name: fullName, email, password: hashedPassword });
        res.status(200).send('Successfully registered!');
    } catch (error) {
        console.error('Error registering a user: ', error);
        res.status(500).send('Error registering');
    }
});

router.post("/reset", async (req, res) => {
    try {
        const { usernameOrEmail } = req.body;
        if (!usernameOrEmail) {
            return res.status(400).send('Username or email is required');
        }
        // Check if user exists
        const user = await User.findOne({$or: [{username: usernameOrEmail}, {email: usernameOrEmail}]});
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Create a transporter object
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can use other services like Outlook, Yahoo, etc.
            auth: {
                user: process.env.EMAIL, // Replace with your email
                pass: process.env.EMAIL_KEY, // Replace with your email password or app password
            },
        });

        // Email options
        const mailOptions = {
            from: 'insta_clone@gmail.com', // Sender address
            to: user.email, // Receiver address
            subject: 'Reset password', // Subject line
            text: '<b>Reset your password - </b> <a href="/">Link</a>', // Plain text body
        };
        const info = await transporter.sendMail(mailOptions);
        return res.status(201).json(
            {
                msg: "Email sent",
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            }
        );
    } catch (error) {
        console.error('Error registering a user: ', error);
        res.status(500).send('Error registering');
    }
});

export default router;