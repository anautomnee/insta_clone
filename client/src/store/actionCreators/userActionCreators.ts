import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {EditProfileData, fetchUserData} from "../types/userTypes.ts";

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

export const editProfile = createAsyncThunk(
    'user/editProfile',
    async ({profile_image, username, new_username, website, bio, token}: EditProfileData, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
            const formData = new FormData();
            if (profile_image) {
                formData.append('photo', profile_image[0]);
            }
            formData.append('new_username', new_username);
            formData.append('website', website);
            formData.append('bio', bio);

            const response = await axios.post(
                `${backendURL}/users/${username}/edit`,
                formData,
                config
            );
            return response.data;

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data?.message) {
                    return rejectWithValue(error.response.data.message); // Error message from backend
                }
                return rejectWithValue(error.message); // Axios generic error
            }
            return rejectWithValue("An unexpected error occurred");
        }
    }
);