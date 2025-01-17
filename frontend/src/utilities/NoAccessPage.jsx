import React from "react";

function NoAccessPage() {
   return (
      <>
         <main className="h-screen w-screen overflow-hidden bg-primaryWhite dark:bg-darkBackground">
            <div className="flex justify-center items-center h-full w-full">
               <p className="text-6xl font-bold text-primaryBlack dark:text-primaryWhite">
                  You Are Not Authorized to View this Page
               </p>
            </div>
         </main>
      </>
   );
}

export default NoAccessPage;
