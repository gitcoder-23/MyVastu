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
import floorSidePlanSlice from './slices/floorSidePlanSlice';

const authPersistConfig = {
    key: 'authApp',
    storage: AsyncStorage,
    // whitelist: ['authApp'],
    blacklist: ['isRegisterLoading', 'isLoginLoading', 'isError']
};

const combinedReducer = combineReducers({
    authApp: persistReducer(authPersistConfig, authAppSlice),
    floorSidePlan: floorSidePlanSlice,
});

const rootReducer = (state: any, action: any) => {
    return combinedReducer(state, action as never);
};

const store = configureStore({
    reducer: rootReducer,
    // FIX 1: Ignore serializable check for redux-persist actions
    // A non-serializable value was detected in an action, in the path: `register`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    // FIX 2: Correct way to add Reactotron enhancers
    enhancers: (getDefaultEnhancers) => {
        if (__DEV__) {
            const reactotron = require('../../../ReactotronConfig').default;
            return getDefaultEnhancers().concat(reactotron.createEnhancer());
        }
        return getDefaultEnhancers();
    },
});

export default store;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;







// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { persistStore, persistReducer } from 'redux-persist';
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

// const createEnhancers = (getDefaultEnhancers: any) => {
//     if (__DEV__) {
//         const reactotron = require('../../../ReactotronConfig').default;
//         return getDefaultEnhancers().concat(reactotron.createEnhancer());
//     } else {
//         return getDefaultEnhancers();
//     }
// };

// const store = configureStore({
//     reducer: rootReducer,
//     enhancers: createEnhancers,
// });

// export default store;

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

