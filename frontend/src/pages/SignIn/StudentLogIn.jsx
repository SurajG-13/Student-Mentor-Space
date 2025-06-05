import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/features/authSlice";
import { userActions } from "../../redux/features/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const openModal = () => setIsModalOpen(true);
   const closeModal = () => setIsModalOpen(false);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleLogin = async (e) => {
      e.preventDefault();
      setError(null);

      try {
         const response = await axios.post(
            "http://localhost:8000/api/v1/students/login",
            {
               eMail: email,
               studentPassword: password,
            }
         );

         const { accessToken, student } = response.data.data;

         dispatch(authActions.login(accessToken));

         dispatch(
            userActions.setStudentInfo({
               name: student.studentName,
               email: student.eMail,
               roll: student.rollNumber,
            })
         );

         dispatch(
            userActions.setUserRole({
               token: accessToken,
               role: "Student",
            })
         );

         dispatch(authActions.login({ token: accessToken }));

         localStorage.setItem("token", accessToken);
         localStorage.setItem("role", "Student");

         localStorage.setItem("studentName", student.studentName);
         localStorage.setItem("rollNumber", student.rollNumber);

         navigate("/s_basicdetails");
         closeModal();
      } catch (error) {
         console.error("Login error:", error);

         if (error.response) {
            setError(
               error.response.data.message || "Login failed. Please try again."
            );
         } else if (error.request) {
            setError(
               "No response from the server. Please check your internet connection."
            );
         } else {
            setError("An error occurred. Please try again.");
         }
      }
   };

   return (
      <>
         <button
            onClick={openModal}
            className="bg-green-600 text-white w-[150px] h-[40px] mt-10 mb-10"
         >
            Login
         </button>

         {isModalOpen && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
               <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                  <h2 className="text-2xl font-semibold text-center mb-4">
                     Student Login
                  </h2>

                  <form onSubmit={handleLogin}>
                     {error && (
                        <p className="text-red-500 text-sm mb-4">{error}</p>
                     )}

                     <div className="mb-4">
                        <label
                           htmlFor="email"
                           className="block text-gray-700 font-medium"
                        >
                           Email
                        </label>
                        <input
                           type="email"
                           id="email"
                           name="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                           placeholder="Enter your email"
                           required
                        />
                     </div>

                     <div className="mb-4">
                        <label
                           htmlFor="password"
                           className="block text-gray-700 font-medium"
                        >
                           Password
                        </label>
                        <input
                           type="password"
                           id="password"
                           name="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                           placeholder="Enter your password"
                           required
                        />
                     </div>

                     <div className="flex justify-between items-center">
                        <button
                           type="submit"
                           className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
                        >
                           Login
                        </button>
                        <button
                           type="button"
                           onClick={closeModal}
                           className="text-red-500 hover:text-red-700"
                        >
                           Cancel
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </>
   );
};

export default StudentLogin;
