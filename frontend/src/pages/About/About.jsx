import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
   hidden: { opacity: 0, y: 30 },
   visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, duration: 0.6, ease: "easeOut" },
   },
};

const itemVariants = {
   hidden: { opacity: 0, y: 20 },
   visible: { opacity: 1, y: 0 },
};

export default function About() {
   return (
      <main>
         <motion.section
            className="min-h-screen bg-lightBackground dark:bg-darkBackground text-gray-900 dark:text-gray-100 px-6 py-16 flex flex-col items-center justify-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
         >
                 {" "}
            <motion.h1
               className="text-4xl md:text-5xl font-bold mb-6 text-center"
               variants={itemVariants}
            >
                       About Student Mentor Space      {" "}
            </motion.h1>
                 {" "}
            <motion.p
               className="text-lg md:text-xl text-center max-w-4xl mb-10 leading-relaxed"
               variants={itemVariants}
            >
                       Student Mentor Space is a comprehensive academic
               management platform that empowers students and faculty by
               simplifying communication, progress tracking, and mentoring
               workflows.      {" "}
            </motion.p>
                 {" "}
            <motion.div
               className="grid md:grid-cols-2 gap-8 w-full max-w-6xl"
               variants={itemVariants}
            >
                      {" "}
               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                           {" "}
                  <h2 className="text-2xl font-semibold text-indigo-700 dark:text-indigo-400 mb-4">
                                 Our Mission          {" "}
                  </h2>
                           {" "}
                  <p className="text-base leading-relaxed">
                                 To bridge the gap between students and mentors
                     by offering a reliable, transparent, and engaging platform
                     that facilitates academic growth and mentorship with ease.
                              {" "}
                  </p>
                         {" "}
               </div>
                      {" "}
               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                           {" "}
                  <h2 className="text-2xl font-semibold text-indigo-700 dark:text-indigo-400 mb-4">
                                 What We Offer          {" "}
                  </h2>
                           {" "}
                  <ul className="list-disc list-inside space-y-2">
                                 <li>Real-time academic progress tracking.</li> 
                              {" "}
                     <li>
                        Streamlined communication between students and faculty.
                     </li>
                                 <li>Secure and intuitive data handling.</li>   
                            {" "}
                     <li>Dashboards tailored for both students and mentors.</li>
                              {" "}
                  </ul>
                         {" "}
               </div>
                    {" "}
            </motion.div>
                 {" "}
            <motion.div className="mt-16 text-center" variants={itemVariants}>
                      {" "}
               <p className="text-base md:text-lg">
                            Join us in redefining academic mentoring. Together,
                  we create a smarter and more connected campus.        {" "}
               </p>
                      {" "}
               <button className="mt-6 px-8 py-3 bg-indigo-600 text-white rounded-full text-lg font-medium shadow-lg hover:bg-indigo-700 active:scale-95 transition-transform duration-150">
                            Learn More        {" "}
               </button>
                    {" "}
            </motion.div>
               {" "}
         </motion.section>
      </main>
   );
}
