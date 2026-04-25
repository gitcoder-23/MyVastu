import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, refreshTokenApi, registerApi } from '../../api/config';
import rootApi from '../../api/rootApi';
import { AuthResponseModel, RefreshResponseModel } from '../models/authModel';

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
    { rejectValue: AuthResponseModel }
>('register/post', async (postRegister, { rejectWithValue }) => {
    try {
        const response = await rootApi.post(registerApi, postRegister);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data);
    }
});

export const LoginAction = createAsyncThunk<
    AuthResponseModel,
    loginActionType,
    { rejectValue: AuthResponseModel }
>('login/post', async (postLogin, { rejectWithValue }) => {
    try {
        const response = await rootApi.post(loginApi, postLogin);
        console.log('LoginAction==>', response.data);

        return response.data;
    } catch (err: any) {

        console.log('LoginAction-err==>', err.response?.data);
        return rejectWithValue(err.response?.data);
    }
});

export const RefreshTokenAction = createAsyncThunk<
    RefreshResponseModel,
    { refreshToken: string },
    { rejectValue: any }
>('auth/refresh', async (payload, { rejectWithValue }) => {
    try {
        // Use rootApi or rootApiNew depending on your config
        const response = await rootApi.post(refreshTokenApi, payload);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data);
    }
});


