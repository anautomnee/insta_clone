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
                'Authorization': `Bearer ${token}`,
            },
        }
        const response = await axios.get(
            `${backendURL}/users/${id}`,
            config
        );
        const user = response.data.user;
        user.fullName = user.full_name;
        user.profileImage = user.profile_image;
        delete user.profile_image;
        delete user.full_name;
        console.log(user);
        return user;
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