import React, { useEffect, useState } from "react";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import SidebarLink from "../../components/Sidebar/SidebarLink";
import { useNavigate } from "react-router-dom";

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

const containerVariants = {
   closed: {
      width: "4.5rem",
      transition: {
         type: "spring",
         damping: 20,
         stiffness: 300,
         duration: 0.4,
      },
   },
   open: {
      width: "16rem",
      transition: {
         type: "spring",
         damping: 20,
         stiffness: 300,
         duration: 0.4,
      },
   },
};

const svgVariants = {
   closed: { rotate: 0 },
   open: { rotate: 180 },
};

function S_Sidebar() {
   const [isOpen, setIsOpen] = useState(false);
   const [isMouseOver, setIsMouseOver] = useState(false);

   const containerControls = useAnimationControls();
   const svgControls = useAnimationControls();
   const navigate = useNavigate();

   useEffect(() => {
      if (isOpen) {
         containerControls.start("open");
         svgControls.start("open");

         const timer = setTimeout(() => {
            if (!isMouseOver) {
               setIsOpen(false);
            }
         }, 1800);

         return () => clearTimeout(timer);
      } else {
         containerControls.start("closed");
         svgControls.start("closed");
      }
   }, [isOpen, isMouseOver, containerControls, svgControls]);

   const handleOpenClose = () => setIsOpen((prev) => !prev);
   const handleMouseEnter = () => setIsMouseOver(true);
   const handleMouseLeave = () => setIsMouseOver(false);

   // Logout logic: clear tokens and redirect to login

   const handleLogout = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // If using cookies, clear them via server response or client-side methods
      // Then redirect to signin/login page
      navigate("/signin", { replace: true });
   };

   return (
      <>
         <motion.nav
            variants={containerVariants}
            animate={containerControls}
            initial="closed"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="fixed pt-20 top-0 left-0 h-screen bg-lightBackground dark:bg-darkBackground shadow-lg shadow-black/40 flex flex-col p-5 gap-10 z-50 select-none"
            style={{ boxSizing: "border-box" }}
         >
            {/* Top Bar: Logo + Toggle */}
            <div className="flex items-center justify-between w-full">
               <button
                  aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                  onClick={handleOpenClose}
                  className="bg-neutral-400 flex-shrink-0 p-2 rounded-full hover:bg-neutral-800 transition-colors"
                  type="button"
               >
                  <motion.svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="w-7 h-7 text-neutral-200"
                     variants={svgVariants}
                     animate={svgControls}
                     transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                     <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0L13.5 19.5M21 12H3"
                     />
                  </motion.svg>
               </button>
            </div>

            {/* Sidebar Links */}
            <nav className="flex flex-col gap-3 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
               <SidebarLink to="/s_home" name="Dashboard" isOpen={isOpen}>
                  <ChartBarIcon className="w-7 h-7" />
               </SidebarLink>

               <SidebarLink to="/s_basicdetails" name="Profile" isOpen={isOpen}>
                  <IdentificationIcon className="w-7 h-7" />
               </SidebarLink>

               <SidebarLink to="/s_academics" name="Academics" isOpen={isOpen}>
                  <AcademicCapIcon className="w-7 h-7" />
               </SidebarLink>

               <SidebarLink
                  to="/S_Certificate"
                  name="Certifications"
                  isOpen={isOpen}
               >
                  <DocumentDuplicateIcon className="w-7 h-7" />
               </SidebarLink>

               <SidebarLink to="/project" name="Project" isOpen={isOpen}>
                  <CodeBracketIcon className="w-7 h-7" />
               </SidebarLink>

               <SidebarLink
                  to="/s_internship"
                  name="Internship"
                  isOpen={isOpen}
               >
                  <BuildingLibraryIcon className="w-7 h-7" />
               </SidebarLink>

               <SidebarLink
                  to="/StudentAttendance"
                  name="Attendance"
                  isOpen={isOpen}
               >
                  <BuildingLibraryIcon className="w-7 h-7" />
               </SidebarLink>
            </nav>

            {/* Logout Link */}
            <button
               onClick={handleLogout}
               className={`flex items-center gap-3 text-red-600 hover:text-red-800 transition-colors ${
                  isOpen ? "justify-start" : "justify-center"
               }`}
               aria-label="Logout"
               title="Logout"
            >
               <PowerIcon className="w-7 h-7" />
               {isOpen && <span className="font-semibold">Logout</span>}
            </button>
         </motion.nav>
      </>
   );
}

export default S_Sidebar;
