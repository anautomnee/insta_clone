import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserData} from "../types/userTypes.ts";

let backendURL;

if(import.meta.env.VITE_ENV === 'local') {
    backendURL = 'http://localhost:3001';
} else {
    backendURL = import.meta.env.VITE_BACKEND_URL;
}


export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async ({username, token}: fetchUserData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }
        const response = await axios.get(
            `${backendURL}/users/${username}`,
            config
        );
        return response.data[0];
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