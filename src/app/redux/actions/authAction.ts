import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerApi } from '../../api/config';
import rootApi from '../../api/rootApi';
import { AuthResponseModel } from '../models/authModel';

type registerActionType = {
    name: string;
    email: string;
    mobile: string;
    password: string;
};
export const RegisterAction = createAsyncThunk<
    any,
    registerActionType,
    {}
>('register/post', async postRegister => {
    console.log('postRegister@-->', postRegister);
    const response = await rootApi.post(registerApi, postRegister);
    console.log('responseSE1->', response.data);
    return response.data;
});