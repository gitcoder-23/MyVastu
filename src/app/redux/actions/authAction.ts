import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, registerApi } from '../../api/config';
import rootApi from '../../api/rootApi';
import { AuthResponseModel } from '../models/authModel';

type registerActionType = {
    name: string;
    email: string;
    mobile: string | undefined;
    password: string;
};

type loginActionType = {
    email: string;
    mobile: string | undefined;
    password: string;
};

export const RegisterAction = createAsyncThunk<
    AuthResponseModel,
    registerActionType,
    { rejectValue: AuthResponseModel } // Define the rejected value type
>('register/post', async (postRegister, { rejectWithValue }) => {
    try {
        const response = await rootApi.post(registerApi, postRegister);
        return response.data;
    } catch (err: any) {
        // Return the API error response body (e.g., {success: false, message: "..."})
        return rejectWithValue(err.response?.data);
    }
});

export const LoginAction = createAsyncThunk<
    AuthResponseModel,
    loginActionType,
    { rejectValue: AuthResponseModel } // Define the rejected value type
>('login/post', async (postLogin, { rejectWithValue }) => {
    try {
        const response = await rootApi.post(loginApi, postLogin);
        return response.data;
    } catch (err: any) {
        // Return the API error response body (e.g., {success: false, message: "..."})
        return rejectWithValue(err.response?.data);
    }
});

