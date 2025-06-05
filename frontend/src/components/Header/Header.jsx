import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
// import { motion, useMotionValueEvent, useScroll } from "framer-motion";

export default function Header() {
   // .................. DropDown Menu Logic ..................

   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const dropdownRef = useRef(null);

   const handleMouseEnter = () => {
      setIsDropdownOpen(true);
   };

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
         ) {
            setIsDropdownOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   // .................. Theme Mode Logic ..................

   const [themeMode, setThemeMode] = useState("light");
   const darkTheme = () => {
      setThemeMode("dark");
   };

   const lightTheme = () => {
      setThemeMode("light");
   };

   useEffect(() => {
      document.querySelector("html").classList.remove("dark", "light");
      document.querySelector("html").classList.add(themeMode);
   }, [themeMode]);

   const onChangeTheme = (e) => {
      const darkModeStatus = e.currentTarget.checked;
      if (themeMode === "dark") {
         lightTheme();
      } else {
         darkTheme();
      }
   };

   return (
      <>
         <header className="shadow sticky z-50 top-0 overflow-hidden">
            <nav className="bg-white border-gray-200 dark:text-white dark:bg-neutral-950  px-4 lg:px-6 py-2.5">
               <div
                  className="flex flex-wrap justify-between items-center 
                        mx-auto max-w-screen-xl"
               >
                  {/* Logo */}
                  <Link to="/" className="flex items-center">
                     <h1 className="text-xl">Student Mentor Space</h1>
                  </Link>

                  {/* 
                            Log-in Box
            */}
                  <div
                     className="flex items-center 
                          lg:order-2"
                  >
                     <Link
                        to="/signin"
                        className="text-gray-800 hover:text-orange-700 focus:ring-4 focus:ring-gray-300 
                         font-medium rounded-lg text-sm 
                         px-4 lg:px-5 py-2 lg:py-2.5 mr-2 
                         focus:outline-none dark:text-white"
                     >
                        Log in
                     </Link>

                     <Link
                        to="/getstarted"
                        className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 
                         font-medium rounded-lg text-sm 
                         px-4 lg:px-5 py-2 lg:py-2.5 mr-2 
                         focus:outline-none"
                     >
                        Get started
                     </Link>

                     <ul className="flex items-center lg:ml-4">
                        <li>
                           <button
                              onClick={onChangeTheme}
                              className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800"
                              aria-label="Toggle dark mode"
                           >
                              {themeMode === "dark" ? (
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                    className="w-6 h-6"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                                    />
                                 </svg>
                              ) : (
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                    className="w-6 h-6"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                                    />
                                 </svg>
                              )}
                           </button>
                        </li>
                     </ul>
                  </div>
               </div>
            </nav>
         </header>
      </>
   );
}
