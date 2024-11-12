import React, { useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../../utilities/axiosInstance"; // Assuming you want to use axiosInstance

const Register = () => {
   const [userData, setUserData] = useState({
      name: "",
      email: "",
      department: "", // Separate department from services
      role: "", // Separate role from services
      teacherCode: "", // New field for teacher code
   });

   // Handle input changes
   const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData({
         ...userData,
         [name]: value,
      });
   };

   // Handle department selection
   const handleDepartmentSelect = (department) => {
      setUserData((prevData) => ({
         ...prevData,
         department, // Replace selected department
      }));
   };

   // Handle role selection
   const handleRoleSelect = (role) => {
      setUserData((prevData) => ({
         ...prevData,
         role, // Replace selected role
         // Reset teacher code if switching to Student
         teacherCode: role === "Teacher" ? prevData.teacherCode : "",
      }));
   };

   // Handle form submission
   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await axiosInstance.post(
            "/api/v1/users/register", // Assuming your axiosInstance is configured with the base URL
            userData,
            {
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );

         console.log("User registered:", response.data);
         // Handle success (redirect, show message, etc.)
      } catch (error) {
         console.error(
            "Error registering user:",
            error.response?.data || error.message
         );
      }
   };

   return (
      <main className="overflow-hidden bg-lightBackground dark:bg-darkBackground font-sans">
         <div className="flex items-center justify-center p-6">
            <motion.form
               onSubmit={handleSubmit}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 rounded-lg shadow-lg max-w-lg w-full"
            >
               <div className="mb-6">
                  <label className="block text-primaryWhite font-semibold mb-2 text-sm sm:text-base">
                     Full Name
                  </label>
                  <input
                     type="text"
                     name="name"
                     placeholder="Full Name"
                     value={userData.name}
                     onChange={handleChange}
                     className="w-full bg-inherit border text-primaryWhite py-3 px-4 rounded-3xl outline-none focus:ring-2 focus:ring-blue-500"
                     required
                  />
               </div>

               <div className="mb-6">
                  <label className="block text-primaryWhite font-semibold mb-2 text-sm sm:text-base">
                     E-mail Address
                  </label>
                  <input
                     type="email"
                     name="email"
                     placeholder="you@xyz.com"
                     value={userData.email}
                     onChange={handleChange}
                     className="w-full bg-inherit border text-primaryWhite py-3 px-4 rounded-3xl outline-none focus:ring-2 focus:ring-blue-500"
                     required
                  />
               </div>

               <div className="mb-6">
                  <label className="block text-primaryWhite font-semibold mb-2 text-sm sm:text-base">
                     Department
                  </label>
                  <div className="flex flex-wrap gap-2">
                     {["CSE", "AI/ML", "IT", "ME", "ECE"].map((department) => (
                        <button
                           type="button"
                           key={department}
                           className={`bg-[#303030] text-primaryWhite py-2 px-4 rounded-full hover:bg-blue-400 ${
                              userData.department === department
                                 ? "bg-blue-500"
                                 : ""
                           }`}
                           onClick={() => handleDepartmentSelect(department)}
                        >
                           {department}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="mb-6">
                  <label className="block text-primaryWhite font-semibold mb-2 text-sm sm:text-base">
                     I am a
                  </label>
                  <div className="flex flex-wrap gap-2">
                     {["Teacher", "Student"].map((role) => (
                        <button
                           type="button"
                           key={role}
                           className={`bg-[#303030] text-primaryWhite py-2 px-4 rounded-full hover:bg-blue-400 ${
                              userData.role === role ? "bg-blue-500" : ""
                           }`}
                           onClick={() => handleRoleSelect(role)}
                        >
                           {role}
                        </button>
                     ))}
                  </div>
               </div>

               {/* Conditionally render the teacher code input */}
               {userData.role === "Teacher" && (
                  <div className="mb-6">
                     <label className="block text-primaryWhite font-semibold mb-2 text-sm sm:text-base">
                        Access Code
                     </label>
                     <input
                        type="text"
                        name="teacherCode"
                        placeholder="Enter Authentication Code"
                        value={userData.teacherCode}
                        onChange={handleChange}
                        className="w-full bg-inherit border text-primaryWhite py-3 px-4 rounded-3xl outline-none focus:ring-2 focus:ring-blue-500"
                        required={userData.role === "Teacher"}
                     />
                  </div>
               )}

               <div className="text-center">
                  <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     className="bg-blue-600 text-white py-3 px-6 rounded-3xl hover:bg-blue-500 transition"
                     type="submit"
                  >
                     Submit
                  </motion.button>
               </div>
            </motion.form>
         </div>
      </main>
   );
};

export default Register;
