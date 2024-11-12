import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   courses: [],
   semesterDetails: {},
};

const curriculumSlice = createSlice({
   name: "curriculum",
   initialState,
   reducers: {
      setCurriculum: (state, action) => {
         state.courses = action.payload.courses;
         state.semesterDetails = action.payload.semesterDetails;
      },
   },
});

export const { setCurriculum } = curriculumSlice.actions;

export default curriculumSlice.reducer;
