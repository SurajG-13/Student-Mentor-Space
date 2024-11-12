// src/features/studentSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   marks: [],
   courses: [],
   semester: "",
   studentId: null,
};

const studentSlice = createSlice({
   name: "student",
   initialState,
   reducers: {
      setStudentInfo: (state, action) => {
         state.studentId = action.payload.studentId;
         state.marks = action.payload.marks;
         state.courses = action.payload.courses;
         state.semester = action.payload.semester;
      },
      updateMarks: (state, action) => {
         const { courseId, newMarks } = action.payload;
         const course = state.courses.find((course) => course.id === courseId);
         if (course) {
            course.marks = newMarks;
         }
      },
   },
});

export const { setStudentInfo, updateMarks } = studentSlice.actions;

export default studentSlice.reducer;
