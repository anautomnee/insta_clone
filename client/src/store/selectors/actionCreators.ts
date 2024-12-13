import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {LoginDataType, RegisterDataType, ResetDataType} from '../types/authTypes.ts';

let backendURL;

if(import.meta.env.VITE_ENV === 'local') {
    backendURL = 'http://localhost:3001';
} else {
    backendURL = import.meta.env.VITE_BACKEND_URL;
}

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ username, email, fullName, password }: RegisterDataType, { rejectWithValue }) => {
        try {
            console.log(username, password);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            await axios.post(
                `${backendURL}/auth/register`,
                { username, email, fullName, password },
                config
            )
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
)

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ usernameOrEmail, password }: LoginDataType, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.post(
                `${backendURL}/auth/login`,
                { usernameOrEmail, password },
                config
            )
            // store user's token in local storage
            localStorage.setItem('userToken', data.userToken)
            return data
        } catch (error: unknown) {
            // return custom error message from API if any

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

export const resetPassword = createAsyncThunk(
    'auth/reset',
    async ({ usernameOrEmail }: ResetDataType, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.post(
                `${backendURL}/auth/reset`,
                { usernameOrEmail },
                config
            )
            return data
        } catch (error: unknown) {
            // return custom error message from API if any

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