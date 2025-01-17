import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
   name: "auth",
   initialState: {
      isLoggedIn: false,
      token: null, // Store token if the user is logged in
   },
   reducers: {
      // Login action: sets isLoggedIn to true and stores the token
      login: (state, action) => {
         state.isLoggedIn = true;
         state.token = action.payload.token; // Store the token from the backend
      },

      // Logout action: sets isLoggedIn to false and removes the token
      logout: (state) => {
         state.isLoggedIn = false;
         state.token = null; // Remove the token
      },

      // Action to set the login status on initial load (e.g., from localStorage)
      setLoginStatus: (state, action) => {
         state.isLoggedIn = action.payload.isLoggedIn;
         state.token = action.payload.token;
      },
   },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
