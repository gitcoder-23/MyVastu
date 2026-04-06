import { createAsyncThunk } from '@reduxjs/toolkit';
import { postRooms } from '../../api/config';
import rootApi from '../../api/rootApi';
import { RoomResponseModel } from '../models/roomModel';


type RoomActionType = {
    address: string;
    angle: number;
    direction: string;
    lat: number;
    lng: number;
};

export const PostRoomAction = createAsyncThunk<
    RoomResponseModel,
    RoomActionType,
    { rejectValue: RoomResponseModel }
>('room/post', async (postRoomBody, { rejectWithValue }) => {
    try {
        const response = await rootApi.post(postRooms, postRoomBody);
        console.log('PostRoomAction-response==>', response.data);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data);
    }
});


