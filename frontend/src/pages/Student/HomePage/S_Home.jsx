import React from "react";
import S_Sidebar from "../S_Sidebar";

function S_Home() {
  return (
    <>
      <main className="w-full h-screen flex flex-row relative">
        <S_Sidebar />

        <div className="ml-[5rem] flex min-h-screen bg-gray-100">
          <div className="flex-1 p-10  w-screen">
            <h2 className="text-3xl font-semibold mb-6">
              Welcome Student_Name
            </h2>

            {/* Upcoming Event Content */}
            <div className="mt-10">
              <h3 className="text-2xl font-semibold mb-4">Upcoming Events</h3>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <ul>
                  <li className="mb-2">This is Upcoming Event 1</li>
                  <li className="mb-2">This is Upcoming Event 2</li>
                  <li className="mb-2">This is Upcoming Event 3</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default S_Home;
