/**
 * Redux store configuration with persistence support.
 * @module store
 *
 * @remarks
 * This module sets up a Redux store with the following features:
 * - Combines auth and UI reducers
 * - Implements Redux persistence using AsyncStorage
 * - Configures persistence to only persist auth state
 * - Disables serializable check for redux-persist compatibility
 *
 * @exports store - Configured Redux store instance
 * @exports persistor - Redux-Persist persistor instance
 * @exports RootState - Type representing the complete state tree
 * @exports AppDispatch - Type for store's dispatch function
 * @exports useAppSelector - Typed selector hook for accessing store state
 * @exports useAppDispatch - Typed dispatch hook for dispatching actions
 *
 * @example
 * ```typescript
 * import { store, persistor } from './store';
 * import { Provider } from 'react-redux';
 * import { PersistGate } from 'redux-persist/integration/react';
 *
 * function App() {
 *   return (
 *     <Provider store={store}>
 *       <PersistGate loading={null} persistor={persistor}>
 *         <YourApp />
 *       </PersistGate>
 *     </Provider>
 *   );
 * }
 * ```
 */
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import uiReducer from "./uiSlice";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Combine  slices
const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

//Setup persist configuration
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"],
  timeout: 0, // Disable timeout
  writeFailHandler: (err: any) => console.error("Persist write error:", err),
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // important for redux-persist
    }),
});

// Create persistor
export const persistor = persistStore(store);

//  Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
