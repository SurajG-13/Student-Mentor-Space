import React, { useEffect, useState, useScroll } from "react";
import { LineEffect } from "../../Utilities/LineEffect";

import {
   useMotionTemplate,
   useMotionValue,
   motion,
   animate,
} from "framer-motion";

export default function Hero() {
   return (
      <>
         <motion.section>
            <LineEffect className="w-full relative">
               <div className="pointer-events-none absolute inset-0 flex flex-col gap-5 items-center justify-center z-10 mb-10">
                  <motion.h1
                     initial={{ opacity: 0, y: 100 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="text-6xl uppercase tracking-tight"
                  >
                     Student Mentoring Portal
                  </motion.h1>
                  <motion.p
                     initial={{ opacity: 0, y: 100 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.25 }}
                     className="w-1/2 text-xl text-center tracking-wide"
                  >
                     Full Stack Web Developer, I love building things and
                     helping people.
                  </motion.p>

                  <motion.button
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                     transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                     }}
                     // className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
                     className="text-neutral-100 group relative inline-flex w-fit rounded-full text-xl bg-indigo-700 px-10 py-3 border border-indigo-900 pointer-events-auto"
                  >
                     Button
                  </motion.button>
               </div>
            </LineEffect>
         </motion.section>
      </>
   );
}
