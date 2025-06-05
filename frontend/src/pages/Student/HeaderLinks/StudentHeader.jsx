import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
   ChartBarIcon,
   AcademicCapIcon,
   DocumentDuplicateIcon,
   BuildingLibraryIcon,
   CodeBracketIcon,
   IdentificationIcon,
   BookOpenIcon,
   CalendarDateRangeIcon,
   PowerIcon,
} from "@heroicons/react/24/outline";

function StudentHeader() {
   const studentName = useSelector((state) => state.user.studentInfo.name);
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

   const handleLogout = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // Assuming you have useNavigate imported and setup
      // navigate("/signin", { replace: true });
      window.location.href = "/signin"; // fallback if navigate not set
   };

   return (
      <header className="bg-lightBackground dark:bg-darkBackground w-full">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
               {/* Left: Teacher Name */}
               <div className="flex-shrink-0">{studentName}</div>

               {/* Center: NavLinks - hidden on mobile */}
               <nav className="w-full hidden md:flex justify-center space-x-8">
                  <NavLink
                     to="/s_basicdetails"
                     className={({ isActive }) =>
                        `inline-flex items-center px-1 pt-1 font-medium transition ${
                           isActive
                              ? "text-orange-600"
                              : "text-gray-700 hover:text-orange-600 dark:text-gray-300"
                        }`
                     }
                  >
                     <span className="flex items-center gap-2">
                        <IdentificationIcon className="w-5 h-5" />
                        Profile
                     </span>
                  </NavLink>
                  <NavLink
                     to="/StudentAttendance"
                     className={({ isActive }) =>
                        `inline-flex items-center px-1 pt-1 font-medium transition ${
                           isActive
                              ? "text-orange-600"
                              : "text-gray-700 hover:text-orange-600 dark:text-gray-300"
                        }`
                     }
                  >
                     <span className="flex items-center gap-2">
                        <CalendarDateRangeIcon className="w-5 h-5" />
                        Attendance
                     </span>
                  </NavLink>

                  <NavLink
                     to="/s_academics"
                     className={({ isActive }) =>
                        `inline-flex items-center px-1 pt-1  font-medium transition ${
                           isActive
                              ? "text-orange-600"
                              : "text-gray-700 hover:text-orange-600 dark:text-gray-300"
                        }`
                     }
                  >
                     <span className="flex items-center gap-2">
                        <AcademicCapIcon className="w-5 h-5" />
                        Result
                     </span>
                  </NavLink>

                  <NavLink
                     to="/project"
                     className={({ isActive }) =>
                        `inline-flex items-center px-1 pt-1  font-medium transition ${
                           isActive
                              ? "text-orange-600"
                              : "text-gray-700 hover:text-orange-600 dark:text-gray-300"
                        }`
                     }
                  >
                     <span className="flex items-center gap-2">
                        <CodeBracketIcon className="w-5 h-5" />
                        Project
                     </span>
                  </NavLink>
                  <NavLink
                     to="/S_Certificate"
                     className={({ isActive }) =>
                        `inline-flex items-center px-1 pt-1  font-medium transition ${
                           isActive
                              ? "text-orange-600"
                              : "text-gray-700 hover:text-orange-600 dark:text-gray-300"
                        }`
                     }
                  >
                     <span className="flex items-center gap-2">
                        <DocumentDuplicateIcon className="w-5 h-5" />
                        Courses
                     </span>
                  </NavLink>
                  <NavLink
                     to="/s_internship"
                     className={({ isActive }) =>
                        `inline-flex items-center px-1 pt-1  font-medium transition ${
                           isActive
                              ? "text-orange-600"
                              : "text-gray-700 hover:text-orange-600 dark:text-gray-300"
                        }`
                     }
                  >
                     <span className="flex items-center gap-2">
                        <BuildingLibraryIcon className="w-5 h-5" />
                        Internship
                     </span>
                  </NavLink>
               </nav>

               {/* Right: Logout button */}
               <div className="flex items-center">
                  <button
                     onClick={handleLogout}
                     aria-label="Logout"
                     title="Logout"
                     className="flex items-center text-red-600 hover:text-red-800 transition-colors"
                  >
                     <PowerIcon className="w-8 h-8" />
                  </button>

                  {/* Mobile menu button */}
                  <button
                     type="button"
                     className="ml-3 md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-orange-600 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
                     aria-controls="mobile-menu"
                     aria-expanded={mobileMenuOpen}
                     onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                     <span className="sr-only">Open main menu</span>
                     {mobileMenuOpen ? (
                        <XMarkIcon
                           className="block h-6 w-6"
                           aria-hidden="true"
                        />
                     ) : (
                        <Bars3Icon
                           className="block h-6 w-6"
                           aria-hidden="true"
                        />
                     )}
                  </button>
               </div>
            </div>
         </div>

         {/* Mobile menu, show/hide based on menu state */}
         {mobileMenuOpen && (
            <nav
               className="md:hidden bg-lightBackground dark:bg-darkBackground border-t border-gray-200 dark:border-gray-700"
               id="mobile-menu"
            >
               <div className="px-2 pt-2 pb-3 space-y-1">
                  <NavLink
                     to="/t_home"
                     onClick={() => setMobileMenuOpen(false)}
                     className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-base font-medium transition ${
                           isActive
                              ? "bg-orange-100 text-orange-700 dark:bg-darkBackgroundorange-600 dark:text-white"
                              : "text-gray-700 hover:bg-gray-100 hover:text-orange-600 dark:text-gray-300 dark:hover:bg-gray-800"
                        }`
                     }
                  >
                     Dashboard
                  </NavLink>
                  <NavLink
                     to="/SubjectManager"
                     onClick={() => setMobileMenuOpen(false)}
                     className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-base font-medium transition ${
                           isActive
                              ? "bg-orange-100 text-orange-700 dark:bg-darkBackgroundorange-600 dark:text-white"
                              : "text-gray-700 hover:bg-gray-100 hover:text-orange-600 dark:text-gray-300 dark:hover:bg-gray-800"
                        }`
                     }
                  >
                     Subjects
                  </NavLink>
                  <NavLink
                     to="/Departments"
                     onClick={() => setMobileMenuOpen(false)}
                     className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-base font-medium transition ${
                           isActive
                              ? "bg-orange-100 text-orange-700 dark:bg-darkBackgroundorange-600 dark:text-white"
                              : "text-gray-700 hover:bg-gray-100 hover:text-orange-600 dark:text-gray-300 dark:hover:bg-gray-800"
                        }`
                     }
                  >
                     Departments
                  </NavLink>
               </div>
            </nav>
         )}
      </header>
   );
}

export default StudentHeader;
