import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginAction, RefreshTokenAction, RegisterAction } from '../actions/authAction';
import { AuthResponseModel, AuthRegisterUserModel, AuthRefreshTokenModel } from '../models/authModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        // Reducer action
        setLogin: (state, action: PayloadAction<{ token: string }>) => {
            state.accessToken = action.payload.token;
            state.errorMessage = 'Login success';
            state.isLoginLoading = false;
        },
        setRefreshToken: (state, action: PayloadAction<{ refreshToken: string }>) => {
            state.refreshToken = action.payload.refreshToken;
            state.errorMessage = 'Refresh token success';
            state.isLoginLoading = false;
        },
        setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;

            // Save to AsyncStorage
            saveTokensToStorage(action.payload);
        },
        setLogout: state => {
            state.accessToken = '';
            state.refreshToken = '';
            state.loginResponse = null;
            state.loginUser = null;
            state.errorMessage = 'Logout success';
            state.isLoginLoading = false;

            // Clear from AsyncStorage
            clearTokensFromStorage();
        },
        restoreTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
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

                // Save tokens to storage
                // if (state.accessToken && state.refreshToken) {
                //     saveTokensToStorage({
                //         accessToken: state.accessToken,
                //         refreshToken: state.refreshToken
                //     });
                // }
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


                // Save tokens to storage
                if (state.accessToken && state.refreshToken) {
                    saveTokensToStorage({
                        accessToken: state.accessToken,
                        refreshToken: state.refreshToken
                    });
                }
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

        // Refresh Token - pending
        builder.addCase(RefreshTokenAction.pending, state => {
            state.isLoginLoading = true;
            state.isError = false;
            state.errorMessage = '';
        });

        // Refresh Token - fulfilled (success)
        builder.addCase(
            RefreshTokenAction.fulfilled,
            (state, action: PayloadAction<AuthRefreshTokenModel>) => {
                state.isLoginLoading = false;
                state.isError = false;
                const responseData = action.payload;
                // Only update if new tokens are provided
                if (responseData.data?.accessToken) {
                    state.accessToken = responseData.data.accessToken || '';
                }
                if (responseData.data?.refreshToken) {
                    state.refreshToken = responseData.data.refreshToken || '';
                }
                // state.refreshToken = responseData.data?.refreshToken || '';
                // state.accessToken = responseData.data?.accessToken || '';
                state.errorMessage = responseData?.message || '';

                // Save updated tokens to storage
                if (state.accessToken && state.refreshToken) {
                    saveTokensToStorage({
                        accessToken: state.accessToken,
                        refreshToken: state.refreshToken
                    });
                }
            },
        );

        // Refresh Token - rejected (failure)
        builder.addCase(RefreshTokenAction.rejected, (state, action) => {
            state.isLoginLoading = false;
            state.isError = true;
            const responseData = action.payload as AuthRefreshTokenModel;
            state.errorMessage = responseData?.message || 'Refresh Token Failed';
            state.refreshToken = '';
            state.accessToken = '';

            // Only clear tokens if refresh fails permanently
            if (responseData?.statusCode === 401) {
                state.refreshToken = '';
                state.accessToken = '';
                clearTokensFromStorage();
            }
        });
    },
});


// AsyncStorage helper functions
const TOKEN_STORAGE_KEY = '@auth_tokens';

const saveTokensToStorage = async (tokens: { accessToken: string; refreshToken: string }) => {
    try {
        await AsyncStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
    } catch (error) {
        console.error('Error saving tokens:', error);
    }
};

const clearTokensFromStorage = async () => {
    try {
        await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing tokens:', error);
    }
};

export const loadTokensFromStorage = async (): Promise<{ accessToken: string; refreshToken: string } | null> => {
    try {
        const tokens = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
        return tokens ? JSON.parse(tokens) : null;
    } catch (error) {
        console.error('Error loading tokens:', error);
        return null;
    }
};



export const { setLogin, setLogout, setRefreshToken, setTokens, restoreTokens } = authAppSlice.actions;
export default authAppSlice.reducer;