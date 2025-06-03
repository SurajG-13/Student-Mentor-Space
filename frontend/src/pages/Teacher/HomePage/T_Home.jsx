// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import StudentDetailsTabs from "../StudentDetailsTabs";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//    UserCircleIcon,
//    PowerIcon,
//    MagnifyingGlassIcon,
// } from "@heroicons/react/24/outline";

// function T_Home() {
//    const [isClicked, setIsClicked] = useState(false);
//    const [inputValue, setInputValue] = useState("");
//    const [studentCount, setStudentCount] = useState(0);
//    const navigate = useNavigate();

//    // Function to handle Enter key press

//    const handleKeyDown = (event) => {
//       if (event.key === "Enter") {
//          setIsClicked(true);
//          console.log("Input value: ", inputValue);
//       }
//    };

//    useEffect(() => {
//       const fetchStudentCount = async () => {
//          try {
//             const response = await axios.get(
//                "http://localhost:8000/api/v1/students/count"
//             );
//             setStudentCount(response.data.totalStudents);
//          } catch (error) {
//             console.error("Error fetching student count:", error);
//          }
//       };

//       fetchStudentCount();
//    }, []);

//    const handleLogout = () => {
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");

//       navigate("/signin", { replace: true });
//    };

//    useEffect(() => {
//       const savedValue = localStorage.getItem("inputValue");
//       if (savedValue) {
//          setInputValue(savedValue);
//       }
//    }, []);

//    const handleChange = (e) => {
//       const newValue = e.target.value;
//       setInputValue(newValue);
//       localStorage.setItem("inputValue", newValue);
//    };

//    const teacherName = useSelector((state) => state.user.teacherInfo.name);

//    const [sidebarOpen, setSidebarOpen] = useState(false);

//    return (
//       <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
//          {/* Main content */}
//          <div className="flex flex-col flex-1 min-h-screen">
//             {/* Header */}
//             <header className="flex items-center justify-between bg-white dark:bg-gray-800 shadow px-4 py-3 md:px-8">
//                <div className="flex items-center space-x-6 w-full justify-end">
//                   <button
//                      className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                      aria-label="User menu"
//                   >
//                      <UserCircleIcon className="h-10 w-10 text-gray-600 dark:text-gray-300" />
//                   </button>

//                   <button
//                      className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                      aria-label="Search Menu"
//                   >
//                      <div className="relative w-auto">
//                         <input
//                            type="text"
//                            placeholder="Enter University Roll ..."
//                            className="w-full py-3 pl-10 pr-4 text-lg text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                            onKeyDown={handleKeyDown}
//                            value={inputValue}
//                            onChange={handleChange}
//                            autoFocus
//                         />
//                         <svg
//                            className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
//                            fill="currentColor"
//                            viewBox="0 0 20 20"
//                            xmlns="http://www.w3.org/2000/svg"
//                         >
//                            <path
//                               fillRule="evenodd"
//                               d="M12.9 14.32a8 8 0 111.414-1.414l4.243 4.242-1.414 1.415-4.243-4.243zm-1.4-2.236a6 6 0 111.415-1.415 6 6 0 01-1.415 1.415z"
//                               clipRule="evenodd"
//                            />
//                         </svg>
//                      </div>
//                   </button>

//                   <button
//                      onClick={handleLogout}
//                      className={`flex items-center gap-3 text-red-600 hover:text-red-800 transition-colors`}
//                      aria-label="Logout"
//                      title="Logout"
//                   >
//                      <PowerIcon className="w-10 h-10" />
//                   </button>
//                </div>
//             </header>

//             {/* Content */}
//             <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-gray-50 dark:bg-gray-900">
//                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col justify-between">
//                      <div>
//                         <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
//                            Registered Students
//                         </h3>
//                         <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
//                            {studentCount}
//                         </p>
//                      </div>
//                      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
//                         Updated just now
//                      </div>
//                   </div>

//                   <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col justify-between">
//                      <div>
//                         <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
//                            Courses Offered
//                         </h3>
//                         <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
//                            8
//                         </p>
//                      </div>
//                      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
//                         Updated just now
//                      </div>
//                   </div>

//                   <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col justify-between">
//                      <div>
//                         <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
//                            Total Subjects
//                         </h3>
//                         <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
//                            {studentCount}
//                         </p>
//                      </div>
//                      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
//                         Updated just now
//                      </div>
//                   </div>
//                </div>

//                {/* Additional content can go here */}
//                <section className="mt-10 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//                   <div className="flex-1 ml-0 md:ml-[5rem] p-6 md:p-10">
//                      {!isClicked ? (
//                         // <div className="mt-20 flex justify-center items-center px-4">
//                         //    <div className="relative w-full max-w-lg">
//                         //       <input
//                         //          type="text"
//                         //          placeholder="Enter University Roll ..."
//                         //          className="w-full py-3 pl-10 pr-4 text-lg text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                         //          onKeyDown={handleKeyDown}
//                         //          value={inputValue}
//                         //          onChange={handleChange}
//                         //          autoFocus
//                         //       />
//                         //       <svg
//                         //          className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
//                         //          fill="currentColor"
//                         //          viewBox="0 0 20 20"
//                         //          xmlns="http://www.w3.org/2000/svg"
//                         //       >
//                         //          <path
//                         //             fillRule="evenodd"
//                         //             d="M12.9 14.32a8 8 0 111.414-1.414l4.243 4.242-1.414 1.415-4.243-4.243zm-1.4-2.236a6 6 0 111.415-1.415 6 6 0 01-1.415 1.415z"
//                         //             clipRule="evenodd"
//                         //          />
//                         //       </svg>
//                         //    </div>
//                         // </div>

//                         // If the search button is clicked in the user menu tab, then render this component otherwise place somnething else here
//                      ) : (
//                         <StudentDetailsTabs />
//                      )}
//                   </div>
//                </section>
//             </main>
//          </div>
//       </div>
//    );
// }

// export default T_Home;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import StudentDetailsTabs from "../StudentDetailsTabs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
   UserCircleIcon,
   PowerIcon,
   MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import TeacherHeader from "./TeacherHeader";

// const API_BASE_URL =
//    process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

function T_Home() {
   const [isClicked, setIsClicked] = useState(false);
   const [inputValue, setInputValue] = useState("");
   const [studentCount, setStudentCount] = useState(0);
   const [subjectCount, setSubjectCount] = useState(0);
   const [departmentCount, setDepartmentCount] = useState(0);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const navigate = useNavigate();
   //    // Function to handle Enter key press

   const handleKeyDown = (event) => {
      if (event.key === "Enter") {
         setIsClicked(true);
         console.log("Input value: ", inputValue);
      }
   };
   // Fetch student count on component mount
   useEffect(() => {
      const fetchStudentCount = async () => {
         try {
            setLoading(true);
            const response = await axios.get(
               `http://localhost:8000/api/v1/students/count`
            );
            setStudentCount(response.data.totalStudents);
            setError(null);
         } catch (err) {
            console.error("Error fetching student count:", err);
            setError("Failed to load student count");
         } finally {
            setLoading(false);
         }
      };

      fetchStudentCount();
   }, []);

   // Fetch subject count on component mount
   useEffect(() => {
      const fetchSubjectCount = async () => {
         try {
            setLoading(true);
            const response = await axios.get(
               `http://localhost:8000/api/v1/subjects/count`
            );
            setSubjectCount(response.data.totalSubjects);
            setError(null);
         } catch (err) {
            console.error("Error fetching subject count:", err);
            setError("Failed to load subject count");
         } finally {
            setLoading(false);
         }
      };

      fetchSubjectCount();
   }, []);

   // Fetch department count on component mount
   useEffect(() => {
      const fetchDepartmentCount = async () => {
         try {
            setLoading(true);
            const response = await axios.get(
               `http://localhost:8000/api/v1/departments/count`
            );
            setDepartmentCount(response.data.totalDepartments);
            setError(null);
         } catch (err) {
            console.error("Error fetching department count:", err);
            setError("Failed to load department count");
         } finally {
            setLoading(false);
         }
      };

      fetchDepartmentCount();
   }, []);

   // Load saved input value from localStorage on mount
   useEffect(() => {
      const savedValue = localStorage.getItem("inputValue");
      if (savedValue) {
         setInputValue(savedValue);
      }
   }, []);

   // Handle input change and save to localStorage
   const handleChange = (e) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      localStorage.setItem("inputValue", newValue);
   };

   // Handle form submit (search)
   const handleSearchSubmit = (e) => {
      e.preventDefault();
      if (inputValue.trim() === "") return;
      setIsClicked(true);
   };

   // Logout handler
   const handleLogout = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/signin", { replace: true });
   };

   // Get teacher name from Redux store
   const teacherName = useSelector((state) => state.user.teacherInfo.name);

   return (
      <main className="w-screen h-screen border-4 border-blue-500">
         <TeacherHeader />
         <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Main content */}
            <div className="flex flex-col flex-1 min-h-screen">
               {/* Content */}
               <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-gray-50 dark:bg-gray-900">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                     {/* Registered Students */}
                     <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col justify-between">
                        <div>
                           <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                              Registered Students
                           </h3>
                           <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                              {loading
                                 ? "Loading..."
                                 : error
                                   ? error
                                   : studentCount}
                           </p>
                        </div>
                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                           Updated just now
                        </div>
                     </div>

                     {/* Courses Offered - hardcoded as 8 (update if dynamic) */}
                     <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col justify-between">
                        <div>
                           <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                              Courses Offered
                           </h3>
                           <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                              {loading
                                 ? "Loading..."
                                 : error
                                   ? error
                                   : departmentCount}
                           </p>
                        </div>
                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                           Updated just now
                        </div>
                     </div>

                     {/* Total Subjects - placeholder, update as needed */}
                     <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col justify-between">
                        <div>
                           <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                              Total Subjects
                           </h3>
                           <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                              {loading
                                 ? "Loading..."
                                 : error
                                   ? error
                                   : subjectCount}
                           </p>
                        </div>
                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                           Updated just now
                        </div>
                     </div>
                  </div>

                  {/* Search result section */}
                  <section className="mt-10 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                     <div className="flex-1 ml-0 md:ml-[5rem] p-6 md:p-10">
                        {!isClicked ? (
                           <div className="mt-20 flex justify-center items-center px-4">
                              <div className="relative w-full max-w-lg">
                                 <input
                                    type="text"
                                    placeholder="Enter University Roll ..."
                                    className="w-full py-3 pl-10 pr-4 text-lg text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    onKeyDown={handleKeyDown}
                                    value={inputValue}
                                    onChange={handleChange}
                                    autoFocus
                                 />
                                 <svg
                                    className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       fillRule="evenodd"
                                       d="M12.9 14.32a8 8 0 111.414-1.414l4.243 4.242-1.414 1.415-4.243-4.243zm-1.4-2.236a6 6 0 111.415-1.415 6 6 0 01-1.415 1.415z"
                                       clipRule="evenodd"
                                    />
                                 </svg>
                              </div>
                           </div>
                        ) : (
                           <StudentDetailsTabs />
                        )}
                     </div>
                  </section>
               </main>
            </div>
         </div>
      </main>
   );
}

export default T_Home;
