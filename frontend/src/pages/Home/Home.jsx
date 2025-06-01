import React from "react";
import Hero from "./Hero";
import Info from "./Info";

import { motion } from "framer-motion";
import About from "../About/About";

export default function Home() {
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
   return (
      <>
         <Hero />
         <About />
         <section>
            <motion.main
               className="mt-20 bg-lightBackground dark:bg-darkBackground flex flex-col justify-center items-center px-6 py-16 text-gray-900 dark:text-gray-100"
               initial="hidden"
               animate="visible"
               variants={containerVariants}
            >
               <motion.div
                  className="grid place-content-center bg-inherit text-inherit w-[90vw]"
                  variants={itemVariants}
               >
                  <h1 className="max-w-2xl text-center text-5xl leading-snug">
                     Academic Data{" "}
                     <span className="relative">
                        Management
                        <svg
                           viewBox="0 0 286 73"
                           fill="none"
                           className="absolute -left-2 -right-2 -top-2 bottom-0 translate-y-1"
                        >
                           <motion.path
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 1 }}
                              transition={{
                                 duration: 1.25,
                                 ease: "easeInOut",
                              }}
                              d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
                              stroke="#FACC15"
                              strokeWidth="3"
                           />
                        </svg>
                     </span>{" "}
                  </h1>
               </motion.div>
            </motion.main>
         </section>
      </>
   );
}
