import React from "react";
import { Link } from "react-router-dom";
import S_Sidebar from "../S_Sidebar";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

const S_Academics = () => {
   return (
      <>
         <main className="w-full h-screen flex flex-row relative">
            <S_Sidebar />
            <section className="ml-[5rem] w-full h-screen">
               <div className="mt-6 flex justify-center text-4xl">
                  Academic Performance
               </div>

               <section className="m-2 pb-8 grid grid-cols-4 gap-6">
                  <div className=" mt-12 ml-6 w-[275px] p-4 h-fit rounded-md border">
                     <Link to="/sem1">
                        <h1 className="inline-flex items-center text-lg">
                           Semester - 1{" "}
                           <ArrowUpRightIcon className="ml-4 h-4 w-4" />
                        </h1>
                        <p className="mt-6 pb-6 text-sm text-gray-600">
                           Track your Academic Performance <br />
                           Throughout the Semester.
                        </p>
                        <button
                           type="button"
                           className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                           Details
                        </button>
                     </Link>
                  </div>

                  <div className=" mt-12 ml-6 w-[275px] p-4 h-fit rounded-md border">
                     <h1 className="inline-flex items-center text-lg">
                        Semester - 2{" "}
                        <ArrowUpRightIcon className="ml-4 h-4 w-4" />
                     </h1>
                     <p className="mt-6 pb-6 text-sm text-gray-600">
                        Track your Academic Performance <br />
                        Throughout the Semester.
                     </p>
                     <button
                        type="button"
                        className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                     >
                        Details
                     </button>
                  </div>

                  <div className=" mt-12 ml-6 w-[275px] p-4 h-fit rounded-md border">
                     <h1 className="inline-flex items-center text-lg">
                        Semester - 3{" "}
                        <ArrowUpRightIcon className="ml-4 h-4 w-4" />
                     </h1>
                     <p className="mt-6 pb-6 text-sm text-gray-600">
                        Track your Academic Performance <br />
                        Throughout the Semester.
                     </p>
                     <button
                        type="button"
                        className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                     >
                        Details
                     </button>
                  </div>

                  <div className=" mt-12 ml-6 w-[275px] p-4 h-fit rounded-md border">
                     <h1 className="inline-flex items-center text-lg">
                        Semester - 4{" "}
                        <ArrowUpRightIcon className="ml-4 h-4 w-4" />
                     </h1>
                     <p className="mt-6 pb-6 text-sm text-gray-600">
                        Track your Academic Performance <br />
                        Throughout the Semester.
                     </p>
                     <button
                        type="button"
                        className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                     >
                        Details
                     </button>
                  </div>

                  <div className=" mt-12 ml-6 w-[275px] p-4 h-fit rounded-md border">
                     <h1 className="inline-flex items-center text-lg">
                        Semester - 5{" "}
                        <ArrowUpRightIcon className="ml-4 h-4 w-4" />
                     </h1>
                     <p className="mt-6 pb-6 text-sm text-gray-600">
                        Track your Academic Performance <br />
                        Throughout the Semester.
                     </p>
                     <button
                        type="button"
                        className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                     >
                        Details
                     </button>
                  </div>

                  <div className=" mt-12 ml-6 w-[275px] p-4 h-fit rounded-md border">
                     <h1 className="inline-flex items-center text-lg">
                        Semester - 6{" "}
                        <ArrowUpRightIcon className="ml-4 h-4 w-4" />
                     </h1>
                     <p className="mt-6 pb-6 text-sm text-gray-600">
                        Track your Academic Performance <br />
                        Throughout the Semester.
                     </p>
                     <button
                        type="button"
                        className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                     >
                        Details
                     </button>
                  </div>

                  <div className=" mt-12 ml-6 w-[275px] p-4 h-fit rounded-md border">
                     <h1 className="inline-flex items-center text-lg">
                        Semester - 7{" "}
                        <ArrowUpRightIcon className="ml-4 h-4 w-4" />
                     </h1>
                     <p className="mt-6 pb-6 text-sm text-gray-600">
                        Track your Academic Performance <br />
                        Throughout the Semester.
                     </p>
                     <button
                        type="button"
                        className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                     >
                        Details
                     </button>
                  </div>

                  <div className=" mt-12 ml-6 w-[275px] p-4 h-fit rounded-md border">
                     <h1 className="inline-flex items-center text-lg">
                        Semester - 8{" "}
                        <ArrowUpRightIcon className="ml-4 h-4 w-4" />
                     </h1>
                     <p className="mt-6 pb-6 text-sm text-gray-600">
                        Track your Academic Performance <br />
                        Throughout the Semester.
                     </p>
                     <button
                        type="button"
                        className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                     >
                        Details
                     </button>
                  </div>
               </section>
            </section>
         </main>
      </>
   );
};

export default S_Academics;
