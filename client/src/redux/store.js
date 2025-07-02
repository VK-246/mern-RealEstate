import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js'// Importing the userReducer from the userSlice file to manage user-related state in the Redux store.
import { persistReducer, persistStore } from 'redux-persist';// Importing persistReducer and persistStore from redux-persist to enable state persistence in the Redux store.
import storage from 'redux-persist/lib/storage'; // Importing the default storage engine for Redux Persist, which uses localStorage in web applications.


const rootReducer = combineReducers({ user: userReducer }); 


const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig,rootReducer); // This applies the persist configuration to the root reducer, allowing the Redux store state to be persisted across sessions.

export const store = configureStore({
  reducer: persistedReducer, // This sets up the Redux store with a single slice of state called 'user', managed by userReducer.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),// This disables the serializable check for Redux Toolkit and prevents errors related to non-serializable values in the state.
});

export const persistor = persistStore(store);