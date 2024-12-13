import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
   name: "auth",
   initialState: {
      isLoggedIn: false,
      token: null, // Store token if the user is logged in
   },
   reducers: {
      login: (state, action) => {
         state.isLoggedIn = true;
         state.token = action.payload; // Store the token from the backend
      },

      logout: (state) => {
         state.isLoggedIn = false;
         state.token = null; // Remove the token
      },

      // Action to set the login status (useful for initial page load)
      setLoginStatus: (state, action) => {
         state.isLoggedIn = action.payload.isLoggedIn;
         state.token = action.payload.token;
      },
   },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
