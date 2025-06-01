import React, { useState, useEffect } from "react";
import axios from "axios";

function SearchInternship() {
   const [rollNumber, setRollNumber] = useState("");
   const [internships, setInternships] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const token = localStorage.getItem("token");

   useEffect(() => {
      if (!token) {
         setError("Authentication token is missing.");
         setInternships([]);
         return;
      }
      if (!rollNumber) {
         setInternships([]);
         setError(null);
         return;
      }

      const fetchInternships = async () => {
         setLoading(true);
         setError(null);
         try {
            const response = await axios.get(
               `http://localhost:8000/api/v1/internships/student/${rollNumber}`,
               {
                  headers: { Authorization: `Bearer ${token}` },
               }
            );

            setInternships(response.data.data || []);
         } catch (error) {
            console.error("Error fetching internships:", error);
            setInternships([]);
            if (error.response?.status === 404) {
               setError("No internships found for this student.");
            } else if (error.response?.status === 403) {
               setError(
                  "Access denied. You must be a teacher to view internships."
               );
            } else {
               setError("Failed to fetch internships. Please try again.");
            }
         } finally {
            setLoading(false);
         }
      };

      fetchInternships();
   }, [rollNumber, token]);

   const handleInputChange = (e) => {
      setRollNumber(e.target.value.trim());
   };

   return (
      <main className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden p-6">
         <section className="max-w-4xl mx-auto w-full">
            <h1 className="text-3xl font-bold mb-6 text-center">
               Search Student Internships
            </h1>

            <div className="mb-6 flex justify-center">
               <input
                  type="text"
                  placeholder="Enter Student Roll Number"
                  value={rollNumber}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div>

            {loading && (
               <p className="text-center text-gray-600 dark:text-gray-400 font-semibold">
                  Loading internships...
               </p>
            )}

            {error && !loading && (
               <p className="text-center text-red-600 font-semibold mb-4">
                  {error}
               </p>
            )}

            {!loading && !error && internships.length === 0 && rollNumber && (
               <p className="text-center text-gray-600 dark:text-gray-400">
                  No internships exist for this student.
               </p>
            )}

            {!loading && internships.length > 0 && (
               <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                     <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                           <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Company
                           </th>
                           <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Duration (months)
                           </th>
                           <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Join Date
                           </th>
                           <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Source
                           </th>
                        </tr>
                     </thead>
                     <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {internships.map((internship) => (
                           <tr key={internship._id}>
                              <td className="px-6 py-4 text-sm font-medium">
                                 {internship.companyName}
                              </td>
                              <td className="px-6 py-4 text-sm">
                                 {internship.internshipDuration}
                              </td>
                              <td className="px-6 py-4 text-sm">
                                 {internship.joinDate
                                    ? internship.joinDate.slice(0, 10)
                                    : "N/A"}
                              </td>
                              <td className="px-6 py-4 text-sm">
                                 {internship.internshipSource || "N/A"}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            )}
         </section>
      </main>
   );
}

export default SearchInternship;
