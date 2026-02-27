import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import authAppSlice from './slices/authAppSlice';

// const authPersistConfig = {
//     key: 'authApp',
//     storage: AsyncStorage,
//     // whitelist: ['authApp'],
// };

const combinedReducer = combineReducers({
    // authApp: persistReducer(authPersistConfig, authAppSlice),
    authApp: authAppSlice,
});

const rootReducer = (state: any, action: any) => {
    return combinedReducer(state, action as never);
};

const createEnhancers = (getDefaultEnhancers: any) => {
    if (__DEV__) {
        const reactotron = require('../../../ReactotronConfig').default;
        return getDefaultEnhancers().concat(reactotron.createEnhancer());
    } else {
        return getDefaultEnhancers();
    }
};

const store = configureStore({
    reducer: rootReducer,
    enhancers: createEnhancers,
});

export default store;

// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;