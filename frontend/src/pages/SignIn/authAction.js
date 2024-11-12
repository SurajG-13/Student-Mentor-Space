import { useDispatch } from "react-redux";
import axios from "axios";

import { authActions } from "../../redux/features/authSlice";
import { userActions } from "../../redux/features/userSlice";

const loginUser = async (username, password) => {
   const dispatch = useDispatch();

   try {
      // Send login request to the backend (adjust URL as needed)
      const response = await axios.post("/api/auth/login", {
         username,
         password,
      });

      // Assuming the backend returns a token and user role
      const { token, role } = response.data;

      // Dispatch login action to set the authentication status and token
      dispatch(authActions.login(token));

      // Dispatch role-specific action based on the user role (teacher/student)
      if (role === "teacher") {
         dispatch(userActions.setTeacher());
      } else {
         dispatch(userActions.setStudent());
      }
   } catch (error) {
      console.error("Login failed:", error);
   }
};

const logoutUser = async () => {
   const dispatch = useDispatch();

   try {
      // Send logout request to the backend (adjust URL as needed)
      await axios.post("/api/auth/logout");

      // Dispatch logout actions to reset the state
      dispatch(authActions.logout());
      dispatch(userActions.logout());
   } catch (error) {
      console.error("Logout failed:", error);
   }
};
