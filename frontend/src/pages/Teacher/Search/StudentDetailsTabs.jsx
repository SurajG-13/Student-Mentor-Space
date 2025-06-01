import { useState } from "react";
import SearchStudent from "./SearchStudent";
import SearchProject from "./SearchProject";
import SearchAcademics from "./SearchAcademics";
import SearchCertificate from "./SearchCertificate";

function StudentDetailsTabs() {
   const tabs = [
      "Basic Details",
      "Academics",
      "Certifications",
      "Internships",
      "Projects",
      "Others",
   ];

   const [activeTab, setActiveTab] = useState("Basic Details");

   // Dummy components for other tabs
   const Academics = () => <div>Academics information will be shown here.</div>;
   const Certifications = () => (
      <div>Certifications information will be shown here.</div>
   );
   const Internships = () => (
      <div>Internships information will be shown here.</div>
   );

   const Others = () => <div>Other details will be shown here.</div>;

   // Render content based on activeTab
   const renderContent = () => {
      switch (activeTab) {
         case "Basic Details":
            return <SearchStudent />;
         case "Academics":
            return <SearchAcademics />;
         case "Certifications":
            return <SearchCertificate />;
         case "Internships":
            return <Internships />;
         case "Projects":
            return <SearchProject />;
         case "Others":
            return <Others />;
         default:
            return null;
      }
   };

   return (
      <div className="w-full max-w-5xl mx-auto">
         <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
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

         <div className="p-6 bg-white rounded-lg shadow-md min-h-[300px]">
            {renderContent()}
         </div>
      </div>
   );
}

export default StudentDetailsTabs;
