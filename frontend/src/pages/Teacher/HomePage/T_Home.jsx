import React from "react";
import T_Sidebar from "../T_Sidebar";

function T_Home() {
  return (
    <>
      <main className="w-full h-screen flex flex-row relative">
        <T_Sidebar />

        <div className="ml-[5rem] flex min-h-screen bg-gray-100">
          <div className="flex-1 p-10  w-screen">
            <h2 className="text-3xl font-semibold mb-6">
              Welcome Teacher_Name
            </h2>
            <div className="flex justify-center items-center bg-gray-100">
              <div className="relative w-full max-w-lg">
                <input
                  type="text"
                  placeholder="Enter University Roll ..."
                  className="w-full py-3 pl-10 pr-4 text-lg text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                <svg
                  className="absolute left-4 top-3.5 w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.9 14.32a8 8 0 111.414-1.414l4.243 4.242-1.414 1.415-4.243-4.243zm-1.4-2.236a6 6 0 111.415-1.415 6 6 0 01-1.415 1.415z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default T_Home;
