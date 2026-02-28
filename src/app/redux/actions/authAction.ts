import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, refreshTokenApi, registerApi } from '../../api/config';
import rootApi from '../../api/rootApi';
import { AuthRefreshTokenModel, AuthResponseModel } from '../models/authModel';

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

type refreshTokenActionType = {
    refreshToken: string;
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
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data);
    }
});

export const RefreshTokenAction = createAsyncThunk<
    AuthRefreshTokenModel,
    refreshTokenActionType,
    { rejectValue: AuthRefreshTokenModel }
>('refreshToken/post', async (postRefreshToken, { rejectWithValue }) => {
    try {
        const response = await rootApi.post(refreshTokenApi, postRefreshToken);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data);
    }
});


