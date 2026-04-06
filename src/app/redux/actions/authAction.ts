import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProfileApi, loginApi, registerApi } from '../../api/config';
import rootApi from '../../api/rootApi';
import { AuthResponseModel, ProfileResponseModel } from '../models/authModel';

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
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data);
    }
});

export const GetProfileAction = createAsyncThunk<
    ProfileResponseModel,
    {}, // No payload needed
    { rejectValue: ProfileResponseModel }
>('profile/get', async (_, { rejectWithValue }) => {
    try {
        const response = await rootApi.get(getProfileApi);
        console.log('GetProfileAction-response', response.data);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data);
    }
});

