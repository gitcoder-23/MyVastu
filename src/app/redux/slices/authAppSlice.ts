import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginAction, RegisterAction } from '../actions/authAction';
import { AuthResponseModel, AuthRegisterUserModel } from '../models/authModel';

export interface AuthAppState {
    registerResponse: AuthResponseModel | null;
    registerUser: AuthRegisterUserModel | null;
    accessToken: string;
    refreshToken: string;
    isRegisterLoading: boolean;
    isError: boolean;
    errorMessage: string | undefined;

    // Login
    loginResponse: AuthResponseModel | null;
    loginUser: AuthRegisterUserModel | null;
    isLoginLoading: boolean;
}

const initialState: AuthAppState = {
    registerResponse: null,
    registerUser: null,
    accessToken: '',
    refreshToken: '',
    isRegisterLoading: false,
    isError: false,
    errorMessage: '',
    // Login
    loginResponse: null,
    loginUser: null,
    isLoginLoading: false,
};

const authAppSlice = createSlice({
    name: 'authApp',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setRefreshToken: (state, action: PayloadAction<string>) => {
            state.refreshToken = action.payload;
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
            (state, action: PayloadAction<AuthResponseModel>) => {
                state.isRegisterLoading = false;
                state.isError = false;
                const responseData = action.payload;
                state.registerResponse = responseData;
                state.registerUser = responseData.data?.user || null;
                state.accessToken = responseData.data?.tokens?.accessToken || '';
                state.refreshToken = responseData.data?.tokens?.refreshToken || '';
                state.errorMessage = responseData?.message || '';
            },
        );

        // Register - rejected (failure)
        builder.addCase(RegisterAction.rejected, (state, action) => {
            state.isRegisterLoading = false;
            state.isError = true;
            const responseData = action.payload as AuthResponseModel;
            state.errorMessage = responseData?.message || 'Registration Failed';
            state.registerResponse = responseData || null;
            state.registerUser = null;
            state.accessToken = '';
            state.refreshToken = '';
        });

        // Login - pending
        builder.addCase(LoginAction.pending, state => {
            state.isLoginLoading = true;
            state.isError = false;
            state.errorMessage = '';
        });

        // Login - fulfilled (success)
        builder.addCase(
            LoginAction.fulfilled,
            (state, action: PayloadAction<AuthResponseModel>) => {
                state.isLoginLoading = false;
                state.isError = false;
                const responseData = action.payload;
                state.loginResponse = responseData;
                state.loginUser = responseData.data?.user || null;
                state.accessToken = responseData.data?.tokens?.accessToken || '';
                state.refreshToken = responseData.data?.tokens?.refreshToken || '';
                state.errorMessage = responseData?.message || '';
            },
        );

        // Login - rejected (failure)
        builder.addCase(LoginAction.rejected, (state, action) => {
            state.isLoginLoading = false;
            state.isError = true;
            const responseData = action.payload as AuthResponseModel;
            state.errorMessage = responseData?.message || 'Login Failed';
            state.loginResponse = responseData || null;
            state.loginUser = null;
            state.accessToken = '';
            state.refreshToken = '';
        });
    },
});

export const { setAccessToken, setRefreshToken } = authAppSlice.actions;

export default authAppSlice.reducer;