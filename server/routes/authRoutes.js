import express from 'express';
import User from '../db/models/User.js';
import bcrypt from "bcrypt";
import 'dotenv/config';
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        if (!usernameOrEmail || !password) {
            return res.status(400).send('Username or email and password is required');
        }
        // Check if user exists
        const user = await User.findOne({$or: [{username: usernameOrEmail}, {email: usernameOrEmail}]});
        console.log(user);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send('Wrong password or username');
        }
        const token = await jwt.sign({username: user.username}, process.env.JWT_KEY, {expiresIn: "1h"});
        res.status(200).json({message: 'Successfully logged in with token ', data: {
                token, username: user.username,
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

export default router;