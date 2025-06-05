import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
   const fadeIn = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
   };

   return (
      <footer className="h-[40vh] bg-lightBackground dark:bg-darkBackground  text-primaryBlack dark:text-primaryWhite py-16 px-8 md:px-20  transition-colors duration-300">
         <main className="grid grid-cols-2">
            <section className="text-7xl font-bold">
               Student <br /> Mentor Space
            </section>
            <section>
               <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.6 }}
                  className="flex flex-row items-center justify-end gap-10 mx-auto"
               >
                  {/* Home Section */}
                  <div>
                     <h2 className="text-lg font-bold mb-4">Navigation</h2>
                     <ul className="space-y-2">
                        <li>
                           <a href="/" className="hover:underline text-sm">
                              Home
                           </a>
                        </li>
                        <li>
                           <a
                              href="/signin"
                              className="hover:underline text-sm"
                           >
                              Log In
                           </a>
                        </li>
                        <li>
                           <a
                              href="/getstarted"
                              className="hover:underline text-sm"
                           >
                              Get Started
                           </a>
                        </li>
                     </ul>
                  </div>

                  {/* Resource Section */}
                  <div>
                     <h2 className="text-lg font-bold mb-4">Resource</h2>
                     <ul className="space-y-2">
                        <li>
                           <a href="#" className="hover:underline text-sm">
                              Documentation
                           </a>
                        </li>
                        <li>
                           <a
                              href="https://github.com/SurajG-13/Student-Mentor-Space"
                              className="hover:underline text-sm"
                              target="_blank"
                              rel="noopener noreferrer"
                           >
                              GitHub
                           </a>
                        </li>
                        <li>
                           <a
                              href="https://github.com/SurajG-13/Student-Mentor-Space"
                              className="hover:underline text-sm"
                              target="_blank"
                              rel="noopener noreferrer"
                           >
                              About Project
                           </a>
                        </li>
                     </ul>
                  </div>
               </motion.div>
            </section>
         </main>
         <div className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Student Mentor Space. All rights
            reserved.
         </div>
      </footer>
   );
};

export default Footer;
