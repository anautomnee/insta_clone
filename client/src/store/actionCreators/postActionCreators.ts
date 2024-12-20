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
                    'Authorization': `Bearer ${token}`,
                },
            }
            const formData = new FormData();
            formData.append('photo', photo[0]);
            formData.append('content', content);

                const response = await axios.post(
                `${backendURL}/posts/create`,
                formData,
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