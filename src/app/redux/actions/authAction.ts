import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerApi } from '../../api/config';
import rootApi from '../../api/rootApi';
import { AuthRegisterResponseModel } from '../models/authModel';

type registerActionType = {
    name: string;
    email: string;
    mobile: string | undefined;
    password: string;
};
export const RegisterAction = createAsyncThunk<
    AuthRegisterResponseModel,
    registerActionType,
    {}
>('register/post', async postRegister => {
    const response = await rootApi.post(registerApi, postRegister);
    return response.data;
});