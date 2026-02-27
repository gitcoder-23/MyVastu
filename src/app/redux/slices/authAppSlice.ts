import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponseModel } from '../models/authModel';
import { RegisterAction } from '../actions/authAction';

export interface AuthAppState {
    registerItem: AuthResponseModel | null;
    token: string;
    isRegisterLoading: boolean;
    isError: boolean;
    errorMessage: string | undefined;
}

const initialState: AuthAppState = {
    registerItem: null,
    token: '',
    isRegisterLoading: false,
    isError: false,
    errorMessage: '',
};

const authAppSlice = createSlice({
    name: 'authApp',
    initialState,
    reducers: {
        // No need for additional reducers for now
    },
    extraReducers: function (builder) {
        // Register - pending
        builder.addCase(RegisterAction.pending, state => {
            state.isRegisterLoading = true;
            state.isError = false;
            state.errorMessage = '';
        });

        // Register - fulfilled (success)
        builder.addCase(
            RegisterAction.fulfilled,
            (state, action: PayloadAction<AuthResponseModel>) => {
                state.isRegisterLoading = false;
                const responseData = action.payload;
                if (responseData.code === 201) {
                    state.isError = false;
                    state.registerItem = responseData;
                    state.token = responseData.data?.token || '';
                    state.errorMessage = responseData.data?.message || '';
                }
            },
        );

        // Register - rejected (failure)
        builder.addCase(RegisterAction.rejected, (state, action) => {
            state.isRegisterLoading = false;
            state.isError = true;
            if (action.error.message === 'Request failed with status code 422') {
                state.errorMessage = action.error.message || 'Registration failed';
            } else {
                state.errorMessage = 'Registration failed';
            }
            state.registerItem = null;
        });
    },
});

export const { } = authAppSlice.actions;

export default authAppSlice.reducer;