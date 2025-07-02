import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
  Currentuser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    sigininStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signinSuccess: (state, action) => {
      state.Currentuser = action.payload;
      state.loading = false;
      state.error = null;// Clear any previous errors on successful sign-in
    },
    signinFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // signout: (state) => {
    //   state.Currentuser = null;
    //   state.error = null;
    //   state.loading = false;
    // },
  },
});

export const { sigininStart, signinSuccess, signinFailure } = userSlice.actions;// Exporting the actions to be used in components
export default userSlice.reducer;// Export the reducer to be used in the store