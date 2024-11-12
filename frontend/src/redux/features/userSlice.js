import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
   name: "user",
   initialState: {
      isUser: false,
      role: "none", // Default role is 'none', only updated after login
   },
   reducers: {
      setTeacher: (state) => {
         state.isUser = true;
         state.role = "teacher"; // Set the user's role to 'teacher'
      },

      setStudent: (state) => {
         state.isUser = true;
         state.role = "student"; // Set the user's role to 'student'
      },

      // Action to reset the user state (logout)
      logout: (state) => {
         state.isUser = false;
         state.role = "none"; // Reset the role to default ('none')
      },

      // Action to set the user's role dynamically
      setUserRole: (state, action) => {
         state.isUser = true; // Mark the user as logged in
         state.role = action.payload; // Set the user's role to whatever is passed in
      },
   },
});

export const userActions = userSlice.actions;
export default userSlice;

// // at the Layout file:

// // const isLoggedIn = useSelector(State => state.user.isLoggedIn);
// // then add a if-else block to render layout.

// // at Login File:

// // const dispatch = useDispatch
// // const handleSubmit = (e) => {
// //     e.preventDefault();
// //     dispatch(userActions.login())

// // }
