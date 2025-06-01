import React from "react";
import { MacbookScroll } from "../../components/MacBookScroll";

function Info() {
   return (
      <>
         {/* <section>
            <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
               <MacbookScroll
                  title={
                     <span>
                        This Macbook is built with Tailwindcss. <br /> No
                        kidding.
                     </span>
                  }
                  //   badge={
                  //     <a href="https://peerlist.io/manuarora">
                  //       <Badge className="h-10 w-10 transform -rotate-12" />
                  //     </a>
                  //   }
                  src={`/linear.webp`}
                  showGradient={false}
               />
            </div>
         </section> */}

         <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
            <MacbookScroll
               title={
                  <span>
                     This Macbook is built with Tailwindcss. <br /> No kidding.
                  </span>
               }
               //   badge={
               //     <a href="https://peerlist.io/manuarora">
               //       <Badge className="h-10 w-10 transform -rotate-12" />
               //     </a>
               //   }
               src={`/linear.webp`}
               showGradient={false}
            />
         </div>
      </>
   );
}

export default Info;
