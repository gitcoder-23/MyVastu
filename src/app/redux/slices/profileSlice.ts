import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetProfileAction } from '../actions/profileAction';
import { ProfileResponseModel } from '../models/profileModel';

export interface ProfileAppState {
    profileResponse: ProfileResponseModel | null;
    isProfileLoading: boolean;
}

const initialState: ProfileAppState = {
    profileResponse: null,
    isProfileLoading: false,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
    },
    extraReducers: function (builder) {
        // Profile - pending
        builder.addCase(GetProfileAction.pending, state => {
            state.isProfileLoading = true;
        });

        // Profile - fulfilled (success)
        builder.addCase(
            GetProfileAction.fulfilled,
            (state, action: PayloadAction<ProfileResponseModel>) => {
                state.isProfileLoading = false;
                const responseData = action.payload;
                state.profileResponse = responseData;
            },
        );

        // Profile - rejected (failure)
        builder.addCase(GetProfileAction.rejected, (state, action) => {
            state.isProfileLoading = false;
            const responseData = action.payload as ProfileResponseModel;
            state.profileResponse = responseData || null;
        });
    },
});

export const { } = profileSlice.actions;

export default profileSlice.reducer;