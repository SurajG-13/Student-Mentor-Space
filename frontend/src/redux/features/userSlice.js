import { createSlice } from "@reduxjs/toolkit";

// Initial state for user (token and role)
const initialState = {
   token: localStorage.getItem("token") || null, // Persist token if present in localStorage
   role: localStorage.getItem("role") || null, // Persist role if present in localStorage
};

// Create slice for user state management
const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      // Action to set token and role after successful login
      setUserRole(state, action) {
         state.token = action.payload.token; // Store access token
         state.role = action.payload.role; // Store user role
         // Persist in localStorage
         localStorage.setItem("token", action.payload.token);
         localStorage.setItem("role", action.payload.role);
      },

      // Action to log out (clear token and role)
      logout(state) {
         state.token = null;
         state.role = null;
         localStorage.removeItem("token");
         localStorage.removeItem("role");
      },
   },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
