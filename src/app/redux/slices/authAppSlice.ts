import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterAction } from '../actions/authAction';
import { AuthRegisterResponseModel, AuthRegisterUserModel } from '../models/authModel';

export interface AuthAppState {
    registerResponse: AuthRegisterResponseModel | null;
    registerUser: AuthRegisterUserModel | null;
    token: string;
    isRegisterLoading: boolean;
    isError: boolean;
    errorMessage: string | undefined;
}

const initialState: AuthAppState = {
    registerResponse: null,
    registerUser: null,
    token: '',
    isRegisterLoading: false,
    isError: false,
    errorMessage: '',
};

const authAppSlice = createSlice({
    name: 'authApp',
    initialState,
    reducers: {
        setRegisterResponse: (state, action: PayloadAction<AuthRegisterResponseModel | null>) => {
            state.registerResponse = action.payload;
        },
        setRegisterUser: (state, action: PayloadAction<AuthRegisterUserModel | null>) => {
            state.registerUser = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setIsRegisterLoading: (state, action: PayloadAction<boolean>) => {
            state.isRegisterLoading = action.payload;
        },
        setIsError: (state, action: PayloadAction<boolean>) => {
            state.isError = action.payload;
        },
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        },
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
            (state, action: PayloadAction<AuthRegisterResponseModel>) => {
                state.isRegisterLoading = false;
                const responseData = action.payload;
                state.isError = false;
                state.registerResponse = responseData;
                state.registerUser = responseData.user || null;
                state.errorMessage = responseData?.message || '';
            },
        );

        // Register - rejected (failure)
        builder.addCase(RegisterAction.rejected, (state, action: PayloadAction<AuthRegisterResponseModel | any>) => {
            state.isRegisterLoading = false;
            state.isError = true;
            const responseData = action.payload;
            state.errorMessage = responseData?.message || 'Registration Failed';
            state.registerResponse = responseData;
            state.registerUser = null;
        });
    },
});

export const { } = authAppSlice.actions;

export default authAppSlice.reducer;