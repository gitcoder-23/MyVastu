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
    { rejectValue: AuthRegisterResponseModel } // Define the rejected value type
>('register/post', async (postRegister, { rejectWithValue }) => {
    try {
        const response = await rootApi.post(registerApi, postRegister);
        return response.data;
    } catch (err: any) {
        // Return the API error response body (e.g., {success: false, message: "..."})
        return rejectWithValue(err.response?.data);
    }
});

