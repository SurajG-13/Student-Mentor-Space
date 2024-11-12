import React, { lazy } from "react";
import Login from "./Login.jsx";

function StudentLogIn() {
   return (
      <>
         <main className="grid grid-cols-2 grid-flow-col w-screen h-screen bg-lightBackground dark:bg-darkBackground border-4 border-red-600">
            <video
               src="/src/assets/videos/Student.mp4"
               autoPlay
               loop
               muted
               loading="lazy"
               className="w-full h-full object-cover border-4 border-blue-900"
               poster="src/assets/images/fallback-image.jpg"
            />

            <section className="border-2 border-green-500">
               <Login />
            </section>
         </main>
      </>
   );
}

export default StudentLogIn;
