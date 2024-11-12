import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Register from "./Register";
import { HiArrowUpRight } from "react-icons/hi2";

function GetStarted() {
   const [isSignInBoxClicked, setIsSignInBoxClicked] = useState(false);
   const [clickedRole, setClickedRole] = useState("");
   const signInBoxClickedRef = useRef(null);

   const handleButtonClick = (role) => {
      setClickedRole(role);
      setIsSignInBoxClicked(true);
   };

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (
            signInBoxClickedRef.current &&
            !signInBoxClickedRef.current.contains(event.target)
         ) {
            setIsSignInBoxClicked(false);
            setClickedRole("");
         }
      };
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
   }, []);

   return (
      <main className="flex h-screen w-screen overflow-hidden bg-lightBackground dark:bg-darkBackground">
         <section className="h-full w-full md:w-1/2 flex flex-col items-center justify-evenly p-6 md:p-12">
            <div className="text-center md:text-left">
               <p className="text-4xl md:text-6xl font-bold font-spaceGrotesk">
                  Get Started With <br />
                  Student Mentor Space
               </p>
               <p className="text-lg md:text-xl font-sans mt-4">
                  Personalize your set-up accordingly
               </p>

               <ul className="mt-8 space-y-4 md:space-y-0 md:flex md:space-x-6 justify-center md:justify-start">
                  <li>
                     <motion.button
                        whileHover={{ backgroundColor: "#16423C" }}
                        ref={signInBoxClickedRef}
                        onClick={() => handleButtonClick("Teacher")}
                        className="inline-flex text-lg md:text-2xl relative border bg-green-500 text-highlightWhite rounded-3xl px-6 py-2 md:px-8 md:py-3"
                     >
                        I am a Teacher
                        <HiArrowUpRight className="ml-2" />
                     </motion.button>
                  </li>

                  <li>
                     <motion.button
                        whileHover={{ backgroundColor: "#16423C" }}
                        ref={signInBoxClickedRef}
                        onClick={() => handleButtonClick("Student")}
                        className="inline-flex text-lg md:text-2xl relative border bg-green-500 text-highlightWhite rounded-3xl px-6 py-2 md:px-8 md:py-3"
                     >
                        I am a Student
                        <HiArrowUpRight className="ml-2" />
                     </motion.button>
                  </li>
               </ul>
            </div>
         </section>

         <section className="h-full w-full md:w-1/2 flex items-center justify-center p-6">
            <Register />
         </section>
      </main>
   );
}

export default GetStarted;
