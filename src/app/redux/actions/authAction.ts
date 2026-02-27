import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerApi } from '../../api/config';
import rootApi from '../../api/rootApi';
import { AuthResponseModel } from '../models/authModel';

type registerActionType = {
    email: string;
    password: string;
    password_confirmation: string;
};
export const RegisterAction = createAsyncThunk<
    AuthResponseModel,
    registerActionType,
    {}
>('register/post', async postRegister => {
    console.log('postRegister@-->', postRegister);
    const response = await rootApi.post(registerApi, postRegister);
    console.log('responseSE1->', response.data);
    return response.data;
});