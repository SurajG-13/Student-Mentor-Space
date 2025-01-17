import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import SidebarLink from "../../components/Sidebar/SidebarLink";

import {
   ChartBarIcon,
   AcademicCapIcon,
   DocumentDuplicateIcon,
   BuildingLibraryIcon,
   CodeBracketIcon,
   Cog6ToothIcon,
   IdentificationIcon,
   BookOpenIcon,
   CalendarDateRangeIcon,
} from "@heroicons/react/24/outline";

const containerVariants = {
   close: {
      width: "5rem",
      transition: {
         type: "spring",
         damping: 15,
         duration: 0.5,
         stifness: 400,
      },
   },
   open: {
      width: "16rem",
      transition: {
         type: "spring",
         damping: 15,
         duration: 0.5,
         stifness: 400,
      },
   },
};

const svgVariants = {
   close: {
      rotate: 360,
   },
   open: {
      rotate: 180,
   },
};

function S_Sidebar() {
   const [isOpen, setIsOpen] = useState(false);
   const [isMouseOver, setIsMouseOver] = useState(false);

   const containerControls = useAnimationControls();
   const svgControls = useAnimationControls();

   useEffect(() => {
      if (isOpen) {
         containerControls.start("open");
         svgControls.start("open");

         const timer = setTimeout(() => {
            if (!isMouseOver) {
               setIsOpen(false);
            }
         }, 1500);

         return () => clearTimeout(timer);
      } else {
         containerControls.start("close");
         svgControls.start("close");
      }
   }, [isOpen, isMouseOver]);

   const handleOpenClose = () => {
      setIsOpen(!isOpen);
   };

   const handleMouseOverOff = () => {
      setIsMouseOver(!isMouseOver);
   };

   return (
      <>
         <motion.section
            variants={containerVariants}
            animate={containerControls}
            initial="close"
            onMouseEnter={handleMouseOverOff} // Pause closing when hovered
            onMouseLeave={handleMouseOverOff} // Allow closing when not hovered
            className="dark:bg-neutral-900 flex flex-col z-10 gap-20 p-5 absolute top-0 left-0 h-full shadow shadow-neutral-600"
         >
            <div className="flex flex-row w-full justify-between place-items-center">
               <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-700 rounded-full" />
               <button
                  className="p-1 rounded-full flex"
                  onClick={handleOpenClose}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1}
                     stroke="currentColor"
                     className="w-8 h-8 dark:stroke-neutral-200"
                  >
                     <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        variants={svgVariants}
                        animate={svgControls}
                        transition={{
                           duration: 0.5,
                           ease: "easeInOut",
                        }}
                     />
                  </svg>
               </button>
            </div>

            {/* 
          
                        ......      Sidebar Item List .........
     
     */}

            <div className="flex flex-col gap-3">
               <SidebarLink to="/s_home" name="Dashboard" isOpen={isOpen}>
                  <ChartBarIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
               </SidebarLink>

               <SidebarLink to="/s_basicdetails" name="Profile" isOpen={isOpen}>
                  <IdentificationIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
               </SidebarLink>

               <SidebarLink to="/s_academics" name="Academics" isOpen={isOpen}>
                  <AcademicCapIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
               </SidebarLink>

               <SidebarLink to="" name="Attendance" isOpen={isOpen}>
                  <CalendarDateRangeIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
               </SidebarLink>

               <SidebarLink to="" name="Clubs" isOpen={isOpen}>
                  <BookOpenIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
               </SidebarLink>

               <SidebarLink to="" name="Certifications" isOpen={isOpen}>
                  <DocumentDuplicateIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
               </SidebarLink>

               <SidebarLink to="" name="Project" isOpen={isOpen}>
                  <CodeBracketIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
               </SidebarLink>

               <SidebarLink to="" name="Internship" isOpen={isOpen}>
                  <BuildingLibraryIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
               </SidebarLink>

               <SidebarLink to="" name="Settings" isOpen={isOpen}>
                  <Cog6ToothIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
               </SidebarLink>
            </div>
         </motion.section>
      </>
   );
}

export default S_Sidebar;
