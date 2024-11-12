import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

function TeacherLogIn() {
   return (
      <>
         <div className="flex w-[100%] h-screen">
            <video
               src="/src/assets/videos/Teacher.mp4"
               autoPlay
               loop
               muted
               loading="lazy"
               className="w-full h-full object-cover"
            />

            <div className="absolute right-0 h-full flex items-center justify-center mr-48 mb-6">
               <Login />
            </div>
         </div>
      </>
   );
}

export default TeacherLogIn;
