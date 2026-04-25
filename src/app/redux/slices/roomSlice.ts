import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostRoomAction } from '../actions/roomAction';
import { RoomResponseModel } from '../models/roomModel';

export interface RoomState {
    roomResponse: RoomResponseModel | null;
    isRoomLoading: boolean;
    responseMessage: string | undefined;
    isError: boolean;
}

const initialState: RoomState = {
    roomResponse: null,
    isRoomLoading: false,
    responseMessage: '',
    isError: false,
};

const roomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
    },
    extraReducers: function (builder) {
        // Post Room - pending
        builder.addCase(PostRoomAction.pending, state => {
            state.isRoomLoading = true;
            state.isError = false;
            state.responseMessage = '';
        });

        // Post Room - fulfilled (success)
        builder.addCase(
            PostRoomAction.fulfilled,
            (state, action: PayloadAction<RoomResponseModel>) => {
                state.isRoomLoading = false;
                state.isError = false;
                const responseData = action.payload;
                state.roomResponse = responseData;
            },
        );

        // Post Room - rejected (failure)
        builder.addCase(PostRoomAction.rejected, (state, action) => {
            state.isRoomLoading = false;
            state.isError = true;
            const responseData = action.payload as RoomResponseModel;
            state.responseMessage = responseData?.message || 'Room Creation Failed';
            state.roomResponse = responseData || null;
        });

    },
});

export const { } = roomSlice.actions;

export default roomSlice.reducer;