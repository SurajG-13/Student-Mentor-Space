import React from "react";
import { motion } from "framer-motion";
import {
   UserGroupIcon,
   SparklesIcon,
   ShieldCheckIcon,
   ArrowPathIcon,
} from "@heroicons/react/24/outline";

const features = [
   {
      icon: SparklesIcon,
      bgColor: "bg-blue-300 dark:bg-blue-500",
      text: "Simple, Intuitive Interface",
   },
   {
      icon: ShieldCheckIcon,
      bgColor: "bg-green-300 dark:bg-green-500",
      text: "Secure Data Management",
   },
   {
      icon: ArrowPathIcon,
      bgColor: "bg-purple-300 dark:bg-purple-500",
      text: "Real-time Updates",
   },
   {
      icon: UserGroupIcon,
      bgColor: "bg-yellow-300 dark:bg-yellow-500",
      text: "Role-based Access",
   },
];

const containerVariants = {
   hidden: { opacity: 0, y: 30 },
   visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.3, duration: 0.6, ease: "easeOut" },
   },
};

const itemVariants = {
   hidden: { opacity: 0, y: 20 },
   visible: { opacity: 1, y: 0 },
};

const HomePageInfo = () => {
   return (
      <main className="bg-lightBackground dark:bg-darkBackground">
         {/* Hero Section */}
         <motion.main
            className="flex flex-col justify-center items-center px-6 py-16 text-highlightBlack dark:text-highlightWhite"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
         >
            <motion.div
               className="grid place-content-center text-inherit w-full max-w-[90vw]"
               variants={itemVariants}
            >
               <h1 className="max-w-2xl text-center text-4xl sm:text-5xl leading-snug">
                  Academic Data{" "}
                  <span className="relative">
                     Management
                     <svg
                        viewBox="0 0 286 73"
                        fill="none"
                        className="absolute -left-2 -right-2 -top-2 bottom-0 translate-y-1"
                        aria-hidden="true"
                     >
                        <motion.path
                           initial={{ pathLength: 0 }}
                           whileInView={{ pathLength: 1 }}
                           transition={{ duration: 1.25, ease: "easeInOut" }}
                           d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
                           stroke="#FACC15"
                           strokeWidth="3"
                        />
                     </svg>
                  </span>
               </h1>
            </motion.div>
         </motion.main>

         {/* Feature Section */}
         <section className="pb-12 dark:bg-dark lg:pb-[90px]">
            <div className="flex justify-center items-center">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 sm:px-10 md:px-20 mb-12 w-full max-w-7xl">
                  {features.map((feature, index) => (
                     <div
                        key={index}
                        className="flex flex-col items-center bg-lightBackground dark:bg-darkBackground rounded-xl p-4 shadow-md text-center"
                     >
                        <div className={`${feature.bgColor} p-3 rounded-lg`}>
                           <feature.icon className="w-10 h-10" />
                        </div>
                        <p className="text-primaryBlack dark:text-highlightWhite mt-4">
                           {feature.text}
                        </p>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      </main>
   );
};

export default HomePageInfo;
