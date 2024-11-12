import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/features/authSlice"; // Adjust import according to your store setup
import { userActions } from "../../redux/features/userSlice"; // Adjust import according to your store setup
import { useNavigate } from "react-router-dom"; // Using useNavigate for React Router v6

const Login = () => {
   const [loginData, setLoginData] = useState({
      email: "",
      password: "",
   });
   const [error, setError] = useState(""); // To handle error messages
   const dispatch = useDispatch();
   const navigate = useNavigate(); // For redirection after login

   // Handle form input changes
   const handleChange = (e) => {
      const { name, value } = e.target;
      setLoginData({
         ...loginData,
         [name]: value,
      });
   };

   // Handle form submission (login logic)
   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         // API call to login
         const response = await axios.post(
            "http://localhost:3000/api/v1/users/login", // Replace with your actual API endpoint
            loginData,
            {
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );

         console.log("Login successful:", response.data);

         // Store token in localStorage
         localStorage.setItem("authToken", response.data.token);

         // Dispatch actions to set authentication and user role
         dispatch(authActions.login(response.data.token)); // Update auth state with token
         dispatch(userActions.setUserRole(response.data.role)); // Role is 'teacher' or 'student'

         // Reset the form state
         setLoginData({
            email: "",
            password: "",
         });

         // Redirect to dashboard or home page after successful login
         navigate("/dashboard"); // Adjust the route as per your app's flow
      } catch (error) {
         // If there's an error (e.g., wrong credentials), show error message
         setError(
            error.response?.data?.message || "Login failed. Please try again."
         );
         console.error(
            "Error logging in:",
            error.response?.data || error.message
         );
      }
   };

   return (
      <div className="max-w-md mx-auto mt-10">
         <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-6 rounded-lg shadow-md"
         >
            <h2 className="text-center text-xl font-bold mb-6">Login</h2>

            {/* Error message display */}
            {error && (
               <div className="text-red-500 text-sm mb-4">
                  <p>{error}</p>
               </div>
            )}

            <div>
               <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
               >
                  Email
               </label>
               <input
                  type="email"
                  id="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                  required
               />
            </div>

            <div>
               <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
               >
                  Password
               </label>
               <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                  required
               />
            </div>

            <button
               type="submit"
               className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
               Login
            </button>
         </form>
      </div>
   );
};

export default Login;
