import React from "react";
import ContainerScroll from "../../components/ContainerScroll";

function Hero() {
   return (
      <>
         <article className="overflow-hidden bg-lightBackground dark:bg-darkBackground">
            <main className="overflow-hidden bg-purple-200 m-20 rounded-3xl dark:bg-darkBackground">
               <ContainerScroll
                  titleComponent={
                     <>
                        <div className="flex items-center justify-center">
                           <h1 className="px-5 m-4 w-fit rounded-full bg-gray-200 text-black">
                              Version 1.0.0 Launched
                           </h1>
                        </div>
                        <h1 className="text-2xl text-black dark:text-white">
                           Simplifying Academic Management with
                           <br />
                           <span className="text-4xl md:text-[5rem] font-bold mt-1 leading-none">
                              Student Mentor Space
                           </span>
                        </h1>
                     </>
                  }
               >
                  <img
                     src="/src/assets/images/TeacherUI.png"
                     alt="hero"
                     height={720}
                     width={1400}
                     className="mx-auto rounded-2xl object-cover h-full object-left-top"
                     draggable={false}
                  />
               </ContainerScroll>
            </main>
         </article>
      </>
   );
}

export default Hero;
