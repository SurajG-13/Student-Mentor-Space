import { useState } from "react";

import SearchProfile from "./Search/SearchProfile";
import SearchAcademics from "./Search/SearchAcademics";
import SearchProject from "./Search/SearchProject";
import SearchCertificate from "./Search/SearchCertificate";
import SearchInternship from "./Search/SearchInternship";
import SearchAttendance from "./Search/SearchAttendance";

function StudentDetailsTabs() {
   const tabs = [
      "Basic Details",
      "Academics",
      "Attendance",
      "Certifications",
      "Internships",
      "Projects",
   ];

   const [activeTab, setActiveTab] = useState("Basic Details");

   // Render content based on activeTab
   const renderContent = () => {
      switch (activeTab) {
         case "Basic Details":
            return <SearchProfile />;
         case "Academics":
            return <SearchAcademics />;
         case "Attendance":
            return <SearchAttendance />;
         case "Certifications":
            return <SearchCertificate />;
         case "Internships":
            return <SearchInternship />;
         case "Projects":
            return <SearchProject />;

         default:
            return null;
      }
   };

   return (
      <div className="overflow-hidden">
         <div className="flex flex-wrap justify-center items-center gap-4 mb-6 ">
            {tabs.map((tab) => (
               <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full font-medium transition-colors duration-300 focus:outline-none ${
                     activeTab === tab
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                  }`}
               >
                  {tab}
               </button>
            ))}
         </div>

         <div className="p-2 bg-whiteBackground dark:bg-darkBackground">
            {renderContent()}
         </div>
      </div>
   );
}

export default StudentDetailsTabs;
