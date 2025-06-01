// import { createSlice } from "@reduxjs/toolkit";

// // Initial state for user (token, role, and information for both Teacher and Student)
// const initialState = {
//    token: localStorage.getItem("token") || null, // Persist token if present in localStorage
//    role: localStorage.getItem("role") || null, // Persist role if present in localStorage
//    teacherInfo: {
//       id: null,
//       name: "",
//       email: "",
//    },
//    studentInfo: {
//       id: null,
//       name: "",
//       email: "",
//       roll: "",
//    },
// };

// // Create slice for user state management
// const userSlice = createSlice({
//    name: "user",
//    initialState,
//    reducers: {
//       // Action to set token and role after successful login
//       setUserRole(state, action) {
//          state.token = action.payload.token; // Store access token
//          state.role = action.payload.role; // Store user role
//          // Persist in localStorage
//          localStorage.setItem("token", action.payload.token);
//          localStorage.setItem("role", action.payload.role);
//       },

//       // Action to set teacher's information after login
//       setTeacherInfo(state, action) {
//          state.teacherInfo = action.payload; // Store teacher's information
//          localStorage.setItem("teacherName", action.payload.name); // Persist teacher's name in localStorage
//       },

//       // Action to set student's information after login
//       setStudentInfo(state, action) {
//          state.studentInfo = action.payload; // Store student's information
//          localStorage.setItem("studentName", action.payload.name);
//          localStorage.setItem("rollNumber", action.payload.roll); // Persist student's name in localStorage
//       },

//       // Action to log out (clear token, role, and user info)
//       logout(state) {
//          state.token = null;
//          state.role = null;
//          state.teacherInfo = { id: null, name: "", email: "" };
//          state.studentInfo = { id: null, name: "", email: "", roll: "" };
//          localStorage.removeItem("token");
//          localStorage.removeItem("role");
//          localStorage.removeItem("teacherName");
//          localStorage.removeItem("studentName");
//       },

//       setCurrentStudentRoll(state, action) {
//          state.studentInfo.roll = action.payload;
//       },
//    },
// });

// export const userActions = userSlice.actions;
// export default userSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch student info by roll number
export const fetchStudentByRoll = createAsyncThunk(
   "user/fetchStudentByRoll",
   async (roll, { rejectWithValue }) => {
      try {
         const response = await axios.get(
            `http://localhost:8000/api/v1/students/${roll}`
         ); // <-- Adjust this URL if needed
         return response.data;
      } catch (error) {
         return rejectWithValue("Student not found");
      }
   }
);

// Initial state
const initialState = {
   token: localStorage.getItem("token") || null,
   role: localStorage.getItem("role") || null,
   teacherInfo: {
      id: null,
      name: "",
      email: "",
   },
   studentInfo: {
      id: null,
      name: "",
      email: "",
      roll: "",
   },
   currentStudent: null, // holds data of student searched by roll number
};

// Create slice
const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      setUserRole(state, action) {
         state.token = action.payload.token;
         state.role = action.payload.role;
         localStorage.setItem("token", action.payload.token);
         localStorage.setItem("role", action.payload.role);
      },

      setTeacherInfo(state, action) {
         state.teacherInfo = action.payload;
         localStorage.setItem("teacherName", action.payload.name);
      },

      setStudentInfo(state, action) {
         state.studentInfo = action.payload;
         localStorage.setItem("studentName", action.payload.name);
         localStorage.setItem("rollNumber", action.payload.roll);
      },

      logout(state) {
         state.token = null;
         state.role = null;
         state.teacherInfo = { id: null, name: "", email: "" };
         state.studentInfo = { id: null, name: "", email: "", roll: "" };
         state.currentStudent = null;
         localStorage.removeItem("token");
         localStorage.removeItem("role");
         localStorage.removeItem("teacherName");
         localStorage.removeItem("studentName");
         localStorage.removeItem("rollNumber");
      }, // optional if needed for UI resets

      clearCurrentStudent(state) {
         state.currentStudent = null;
      },
   },

   extraReducers: (builder) => {
      builder
         .addCase(fetchStudentByRoll.fulfilled, (state, action) => {
            state.currentStudent = action.payload;
         })
         .addCase(fetchStudentByRoll.rejected, (state) => {
            state.currentStudent = null;
         });
   },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
