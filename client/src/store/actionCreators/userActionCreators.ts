import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {fetchUserData} from "../types/userTypes.ts";

let backendURL;

if(import.meta.env.VITE_ENV === 'local') {
    backendURL = 'http://localhost:3001';
} else {
    backendURL = import.meta.env.VITE_BACKEND_URL;
}


export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async ({id, token}: fetchUserData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        }
        const response = await axios.get(
            `${backendURL}/users/${id}`,
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