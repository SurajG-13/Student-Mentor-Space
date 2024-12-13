import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/features/authSlice"; // Importing authActions
import { userActions } from "../../redux/features/userSlice"; // Importing userActions
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleLogin = async (e) => {
      e.preventDefault();
      setError(null); // Reset error state before making the request

      try {
         // Hardcoding the role to "Teacher"
         const role = "Teacher";

         // Make the login API request
         const response = await axios.post(
            "http://localhost:8000/api/v1/teachers/login", // Ensure this endpoint is correct
            {
               eMail: email,
               teacherPassword: password,
               // You do not need to send `role` since it's hardcoded
            }
         );

         // Handle response
         const { accessToken } = response.data;

         // Dispatch the Redux actions
         dispatch(userActions.setUserRole({ token: accessToken, role }));
         dispatch(authActions.login(accessToken));

         // Store token and role in localStorage for persistence
         localStorage.setItem("token", accessToken);
         localStorage.setItem("role", role);

         // Redirect to teacher's home page
         navigate("/t_home");
      } catch (error) {
         // Handle errors: Check if there is a response from the server
         if (error.response) {
            setError(
               error.response.data.message || "Login failed. Please try again."
            );
         } else {
            // Network or server error
            setError(
               "An error occurred. Please check your network connection."
            );
         }
      }
   };

   return (
      <div className="login-form">
         <h2>Teacher Login</h2>
         {error && <p className="error-message">{error}</p>}
         <form onSubmit={handleLogin}>
            <div>
               <label>Email</label>
               <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />
            </div>

            <div>
               <label>Password</label>
               <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
               />
            </div>

            <button type="submit">Login</button>
         </form>
      </div>
   );
};

export default Login;
