import express from 'express';
import ifAuthenticated from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadImage";
import {followUser, getUserByUsername, unfollowUser, updateProfile} from "../controllers/userController";
import {ifFollowed} from "../middlewares/followMiddleware.ts";

const router = express.Router();

router.get('/:username', ifAuthenticated, getUserByUsername);
router.post('/:username/follow', ifAuthenticated, ifFollowed, followUser);
router.delete('/:username/unfollow', ifAuthenticated, ifFollowed, unfollowUser);
router.post('/:username/edit', ifAuthenticated, upload.single('photo'), updateProfile);

export default router;