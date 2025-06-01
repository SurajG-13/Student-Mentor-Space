import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Register = () => {
   const [userData, setUserData] = useState({
      fullName: "",
      eMail: "",
      userPassword: "",
      confirmPassword: "",
      role: "",
      teacherPassword: "",
      studentPassword: "",
      teacherAccessCode: "",
      studentRoll: "",
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const handleRoleSelect = (role) => {
      setUserData((prevData) => ({
         ...prevData,
         role,
         teacherPassword: role === "Teacher" ? prevData.teacherPassword : "",
         studentPassword: role === "Student" ? prevData.studentPassword : "",
         teacherAccessCode:
            role === "Teacher" ? prevData.teacherAccessCode : "",
         studentRoll: role === "Student" ? prevData.studentRoll : "",
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      // Basic validation for passwords match
      if (userData.userPassword !== userData.confirmPassword) {
         alert("Passwords do not match!");
         return;
      }

      try {
         let data = {};
         let endpoint = "";

         if (
            userData.role === "Teacher" &&
            userData.teacherAccessCode === "9090"
         ) {
            data = {
               fullName: userData.fullName,
               eMail: userData.eMail,
               teacherPassword: userData.userPassword,
               teacherAccessCode: userData.teacherAccessCode,
               role: "Teacher",
            };
            endpoint = "/teachers/register";
         } else if (userData.role === "Student") {
            data = {
               studentName: userData.fullName,
               eMail: userData.eMail,
               studentPassword: userData.userPassword,
               rollNumber: userData.studentRoll,
               role: "Student",
            };
            endpoint = "/students/register";
         }

         const response = await axios.post(
            `http://localhost:8000/api/v1${endpoint}`,
            data,
            {
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );

         console.log(
            `${userData.role} registered successfully:`,
            response.data
         );

         // Reset the form after successful registration
         setUserData({
            fullName: "",
            eMail: "",
            userPassword: "",
            confirmPassword: "",
            role: "",
            teacherPassword: "",
            studentPassword: "",
            teacherAccessCode: "",
            studentRoll: "",
            department: "",
         });
      } catch (error) {
         console.error(
            "Error registering user:",
            error.response?.data || error.message
         );
      }
   };

   return (
      <main className="overflow-hidden bg-lightBackground dark:bg-darkBackground font-sans w-[30vw] lg:ml-40">
         <div className="flex items-center justify-center p-6">
            <motion.form
               onSubmit={handleSubmit}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 rounded-lg max-w-lg w-full"
            >
               <div className="mb-6">
                  <label className="block text-primaryBlack dark:text-primaryWhite font-semibold mb-2 text-sm sm:text-base">
                     Full Name
                  </label>
                  <input
                     type="text"
                     name="fullName"
                     placeholder="Full Name"
                     value={userData.fullName}
                     onChange={handleChange}
                     className="w-full bg-inherit border text-primaryBlack dark:text-primaryWhite py-3 px-4 rounded-3xl outline-none focus:ring-2 focus:ring-blue-500"
                     required
                  />
               </div>

               <div className="mb-6">
                  <label className="block text-primaryBlack dark:text-primaryWhite font-semibold mb-2 text-sm sm:text-base">
                     E-mail Address
                  </label>
                  <input
                     type="email"
                     name="eMail"
                     placeholder="you@xyz.com"
                     value={userData.eMail}
                     onChange={handleChange}
                     className="w-full bg-inherit border text-primaryBlack dark:text-primaryWhite py-3 px-4 rounded-3xl outline-none focus:ring-2 focus:ring-blue-500"
                     required
                  />
               </div>

               <div className="mb-6">
                  <label className="block text-primaryBlack dark:text-primaryWhite font-semibold mb-2 text-sm sm:text-base">
                     Password
                  </label>
                  <input
                     type="password"
                     name="userPassword"
                     placeholder="Make sure to remember it!"
                     value={userData.userPassword}
                     onChange={handleChange}
                     className="w-full bg-inherit border text-primaryBlack dark:text-primaryWhite py-3 px-4 rounded-3xl outline-none focus:ring-2 focus:ring-blue-500"
                     required
                  />
               </div>

               <div className="mb-6">
                  <label className="block text-primaryBlack dark:text-primaryWhite font-semibold mb-2 text-sm sm:text-base">
                     Confirm Password
                  </label>
                  <input
                     type="password"
                     name="confirmPassword"
                     placeholder="Confirm your password"
                     value={userData.confirmPassword}
                     onChange={handleChange}
                     className="w-full bg-inherit border text-primaryBlack dark:text-primaryWhite py-3 px-4 rounded-3xl outline-none focus:ring-2 focus:ring-blue-500"
                     required
                  />
               </div>

               <div className="mb-6">
                  <label className="block text-primaryBlack dark:text-primaryWhite font-semibold mb-2 text-sm sm:text-base">
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

               {userData.role === "Teacher" && (
                  <div className="mb-6">
                     <label className="block text-primaryBlack dark:text-primaryWhite font-semibold mb-2 text-sm sm:text-base">
                        Teacher Access Code
                     </label>
                     <input
                        type="text"
                        name="teacherAccessCode"
                        placeholder="Enter Teacher Access Code"
                        value={userData.teacherAccessCode}
                        onChange={handleChange}
                        className="w-full bg-inherit border text-primaryBlack dark:text-primaryWhite py-3 px-4 rounded-3xl outline-none focus:ring-2 focus:ring-blue-500"
                        required={userData.role === "Teacher"}
                     />
                  </div>
               )}

               {userData.role === "Student" && (
                  <div className="mb-6">
                     <label className="block text-primaryBlack dark:text-primaryWhite font-semibold mb-2 text-sm sm:text-base">
                        Student Roll Number
                     </label>
                     <input
                        type="text"
                        name="studentRoll"
                        placeholder="Enter Student Roll Number"
                        value={userData.studentRoll}
                        onChange={handleChange}
                        className="w-full bg-inherit border text-primaryBlack dark:text-primaryWhite py-3 px-4 rounded-3xl outline-none focus:ring-2 focus:ring-blue-500"
                        required={userData.role === "Student"}
                     />
                  </div>
               )}

               <div className="text-center">
                  <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     type="submit"
                     className="w-full border-2 py-3 px-6 text-lg text-primaryBlack dark:text-primaryWhite bg-primaryGreen rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                     Register
                  </motion.button>
               </div>
            </motion.form>
         </div>
      </main>
   );
};

export default Register;
