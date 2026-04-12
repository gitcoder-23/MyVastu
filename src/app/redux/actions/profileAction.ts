import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreditResponseModel, ProfileResponseModel } from '../models/profileModel';
import rootApi from '../../api/rootApi';
import { addCreditApi, getCreditsApi, getProfileApi } from '../../api/config';



export const GetProfileAction = createAsyncThunk<
    ProfileResponseModel,
    {}, // No payload needed
    { rejectValue: ProfileResponseModel }
>('profile/get', async (_, { rejectWithValue }) => {
    try {
        const response = await rootApi.get(getProfileApi);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data);
    }
});

export const GetCreditAction = createAsyncThunk<
    CreditResponseModel,
    {},
    { rejectValue: CreditResponseModel }
>('credit/get', async (_, { rejectWithValue }) => {
    try {
        const response = await rootApi.get(getCreditsApi);
        console.log('GeetCreditAction-response', response.data);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data);
    }
});



export const PostPurchaseCreditAction = createAsyncThunk<
    CreditResponseModel,
    { amount: number },
    { rejectValue: CreditResponseModel }
>('credit/post', async ({ amount }, { rejectWithValue }) => {
    try {
        const response = await rootApi.post(addCreditApi, { amount });
        console.log('PostPurchaseCreditAction-response', response.data);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data);
    }
});


