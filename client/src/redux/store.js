import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js'
// Importing the userReducer from the userSlice file to manage user-related state in the Redux store.
export const store = configureStore({
  reducer: {user: userReducer}, // This sets up the Redux store with a single slice of state called 'user', managed by userReducer.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),// This disables the serializable check for Redux Toolkit and prevents errors related to non-serializable values in the state.
});

