import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistCongig={
    key:"root",
    storage:AsyncStorage
}

const rootReducer = combineReducers({
    auth:authReducer,
})

const persistedReducer = persistReducer(persistCongig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;