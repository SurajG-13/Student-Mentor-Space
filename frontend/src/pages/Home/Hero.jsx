import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
   return (
      <>
         <motion.section>
            <div className="pointer-events-none absolute inset-0 flex flex-col gap-5 items-center justify-center z-10 mb-10">
               <motion.h1
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-6xl"
               >
                  Student Mentor Space
               </motion.h1>
               <h2 className="text-4xl"> Home Page </h2>
            </div>
         </motion.section>
      </>
   );
}
