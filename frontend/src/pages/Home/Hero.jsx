import React from "react";
import { motion } from "framer-motion";

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

export default function Hero() {
   return (
      <>
         <motion.main
            className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 flex flex-col justify-center items-center px-6 py-16 text-gray-900"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
         >
            <motion.h1
               className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-6 text-center max-w-4xl"
               variants={itemVariants}
            >
               Student Mentor Space
            </motion.h1>

            <motion.p
               className="text-lg md:text-xl text-center max-w-3xl mb-10 leading-relaxed"
               variants={itemVariants}
            >
               Bridging the gap in academic management by providing a unified
               platform for students and faculty to seamlessly track academic
               progress, input marks, and communicate effectively.
            </motion.p>

            <motion.div
               className="bg-indigo-100 rounded-xl shadow-lg p-8 max-w-4xl w-full"
               variants={itemVariants}
            >
               <h2 className="text-2xl font-semibold text-indigo-800 mb-4 text-center">
                  Key Features
               </h2>
               <ul className="list-disc list-inside space-y-3 text-indigo-900 text-lg">
                  <li>
                     Secure input and storage of student marks and curriculum
                     details.
                  </li>
                  <li>
                     Intuitive interface for students to update their academic
                     progress.
                  </li>
                  <li>
                     Easy access for faculty to evaluate and mentor students
                     efficiently.
                  </li>
                  <li>
                     Eliminates manual record keeping and fosters transparent
                     communication.
                  </li>
                  <li>
                     Performance tracking dashboard for both students and
                     mentors.
                  </li>
               </ul>
            </motion.div>

            <motion.button
               className="mt-12 px-8 py-3 bg-indigo-600 text-white rounded-full text-lg font-medium shadow-lg hover:bg-indigo-700 active:scale-95 transition-transform duration-150"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
            >
               Get Started
            </motion.button>
         </motion.main>
      </>
   );
}
