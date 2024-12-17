import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {CreatePost} from "../types/postTypes.ts";

let backendURL;

if(import.meta.env.VITE_ENV === 'local') {
    backendURL = 'http://localhost:3001';
} else {
    backendURL = import.meta.env.VITE_BACKEND_URL;
}

export const createPost = createAsyncThunk(
    'post/createPost',
    async ({photo, content, token}: CreatePost, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
            const response = await axios.post(
                `${backendURL}/posts/create`,
                {photo, content},
                config
            );
            return response.data;
        } catch (error: unknown) {
            // return custom error message from backend if present
            console.log(error)
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data.message) {
                    return rejectWithValue(error.response.data.message)
                } else {
                    return rejectWithValue(error.message)
                }
            }
        }
    }
);