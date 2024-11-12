import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function SignIn() {
  return (
    <>
      <main className="flex h-[100vh] dark:bg-slate-950 dark:text-white">
        {/* 
                                  Teacher Section  
       */}
        <section
          className="w-1/2 min-h-scren flex flex-col items-center justify-center 
                       bg-green-50 dark:bg-[#1E201E] dark:text-white"
        >
          <p className=" text-black text-center text-4xl mb-6 ">For Teachers</p>
          <p>Log in with Verified Credentials</p>

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "#16423C",
            }}
            transition={{ bounceDumping: 10, bounceStiffness: 600 }}
            className="bg-green-600 text-white w-[150px] h-[40px] mt-10 mb-10"
          >
            <Link to="/teacherlogin">Log In</Link>
          </motion.button>

          <p>Don't Have an Account?</p>

          <div>
            <Link to="/getstarted" className="font-bold">
              Sign up
            </Link>
          </div>
        </section>

        {/* 
                                 Student Section 
       */}
        <section className="w-1/2 min-h-scren flex flex-col items-center justify-center">
          <p className=" text-black text-center text-4xl mb-6">For Students</p>

          <p> Log in with Verified Credentials</p>

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "#16423C",
            }}
            transition={{ bounceDumping: 10, bounceStiffness: 600 }}
            className="bg-green-600 text-white w-[150px] h-[40px] mt-10 mb-10"
          >
            <Link to="/studentlogin">Log In </Link>
          </motion.button>

          <p>Don't Have an Account?</p>
          <div>
            <Link to="/getstarted" className="font-bold">
              Sign up
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default SignIn;
