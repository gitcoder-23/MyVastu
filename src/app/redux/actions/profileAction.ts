import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProfileResponseModel } from '../models/profileModel';
import rootApi from '../../api/rootApi';
import { getProfileApi } from '../../api/config';



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

