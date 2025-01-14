import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {CreatePost, FetchPostParams, UpdatePostParams} from "../types/postTypes.ts";
import {axiosInstance, backendURL} from "../../uitls/apiCalls.ts";

export const createPost = createAsyncThunk(
    'post/createPost',
    async ({photo, content}: CreatePost, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('photo', photo[0]);
            formData.append('content', content);

                const response = await axiosInstance.post(
                `${backendURL}/posts/create`,
                formData
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

export const fetchPost = createAsyncThunk(
    'post/fetchPost',
    async ({id}: FetchPostParams, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(
                `${backendURL}/posts/get/${id}`
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

export const updatePost = createAsyncThunk(
    'post/updatePost',
    async ({id, content}: UpdatePostParams, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                `${backendURL}/posts/${id}`,
                {content}
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