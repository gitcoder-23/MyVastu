import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import authAppSlice from './slices/authAppSlice';

// Configuration for auth persistence
const authPersistConfig = {
    key: 'authApp',
    storage: AsyncStorage,
    // whitelist: ['accessToken', 'refreshToken', 'loginUser', 'registerUser'], // Only persist these fields
    // blacklist: ['isRegisterLoading', 'isLoginLoading', 'isError', 'errorMessage'], // Don't persist loading/error states
};

// Combine reducers
const combinedReducer = combineReducers({
    authApp: persistReducer(authPersistConfig, authAppSlice),
    // Add other reducers here if needed
});

// Root reducer with action handling for logout
const rootReducer = (state: any, action: any) => {
    // Check for logout action to clear persisted state
    if (action.type === 'authApp/setLogout') {
        // Remove persisted auth state
        AsyncStorage.removeItem('persist:authApp');
        return combinedReducer(undefined, action);
    }
    return combinedReducer(state, action);
};

// Configure store
const store = configureStore({
    reducer: rootReducer,
    // Ignore serializable check for redux-persist actions
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
            // Add thunk middleware configuration if needed
            thunk: {
                extraArgument: {}, // Add extra arguments for thunks if needed
            },
        }),
    // Add Reactotron enhancer in development
    enhancers: (getDefaultEnhancers) => {
        if (__DEV__) {
            try {
                const reactotron = require('../../../ReactotronConfig').default;
                return getDefaultEnhancers().concat(reactotron.createEnhancer());
            } catch (error) {
                console.log('Reactotron not configured');
                return getDefaultEnhancers();
            }
        }
        return getDefaultEnhancers();
    },
});

// Create persistor
export const persistor = persistStore(store);

// Optional: Add listener for rehydration completion
persistor.subscribe(() => {
    const { bootstrapped } = persistor.getState();
    if (bootstrapped) {
        console.log('Redux persist has completed rehydration');
    }
});

// Export store and types
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
// } from 'redux-persist';
// import authAppSlice from './slices/authAppSlice';

// const authPersistConfig = {
//     key: 'authApp',
//     storage: AsyncStorage,
//     // whitelist: ['authApp'],
// };

// const combinedReducer = combineReducers({
//     authApp: persistReducer(authPersistConfig, authAppSlice),
// });

// const rootReducer = (state: any, action: any) => {
//     return combinedReducer(state, action as never);
// };

// const store = configureStore({
//     reducer: rootReducer,
//     // FIX 1: Ignore serializable check for redux-persist actions
//     // A non-serializable value was detected in an action, in the path: `register`.
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             },
//         }),
//     // FIX 2: Correct way to add Reactotron enhancers
//     enhancers: (getDefaultEnhancers) => {
//         if (__DEV__) {
//             const reactotron = require('../../../ReactotronConfig').default;
//             return getDefaultEnhancers().concat(reactotron.createEnhancer());
//         }
//         return getDefaultEnhancers();
//     },
// });

// export default store;
// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;





