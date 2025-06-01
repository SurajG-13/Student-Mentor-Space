import React from "react";
import { Link } from "react-router-dom";
import StudentLogin from "./StudentLogIn";
import TeacherLogin from "./TeacherLogIn";

function SignIn() {
   return (
      <>
         <main className="flex h-[100vh] dark:bg-slate-950 dark:text-white">
            <section
               className="w-1/2 min-h-screen flex flex-col items-center justify-center 
                       bg-green-50 dark:bg-[#1E201E] dark:text-white"
            >
               <p className=" text-black dark:text-highlightWhite text-center text-4xl mb-6 ">
                  For Teachers
               </p>
               <p>Log in with Verified Credentials</p>

               <TeacherLogin />

               <p>Don't Have an Account?</p>

               <div>
                  <Link to="/getstarted" className="font-bold">
                     Sign up
                  </Link>
               </div>
            </section>

            <section className="w-1/2 min-h-screen flex flex-col items-center justify-center">
               <p className=" text-black dark:text-highlightWhite text-center text-4xl mb-6">
                  For Students
               </p>

               <p> Log in with Verified Credentials</p>

               <StudentLogin />

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
