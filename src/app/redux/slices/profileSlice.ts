import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetCreditAction, GetProfileAction } from '../actions/profileAction';
import { CreditResponseModel, ProfileResponseModel } from '../models/profileModel';

export interface ProfileAppState {
    profileResponse: ProfileResponseModel | null;
    isProfileLoading: boolean;
    creditResponse: CreditResponseModel | null;
    isCreditLoading: boolean;
}

const initialState: ProfileAppState = {
    profileResponse: null,
    isProfileLoading: false,
    creditResponse: null,
    isCreditLoading: false,
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

        // Credit - pending
        builder.addCase(GetCreditAction.pending, state => {
            state.isCreditLoading = true;
        });

        // Credit - fulfilled (success)
        builder.addCase(
            GetCreditAction.fulfilled,
            (state, action: PayloadAction<CreditResponseModel>) => {
                state.isCreditLoading = false;
                const responseData = action.payload;
                state.creditResponse = responseData;
            },
        );

        // Credit - rejected (failure)
        builder.addCase(GetCreditAction.rejected, (state, action) => {
            state.isCreditLoading = false;
            const responseData = action.payload as CreditResponseModel;
            state.creditResponse = responseData || null;
        });
    },
});

export const { } = profileSlice.actions;

export default profileSlice.reducer;