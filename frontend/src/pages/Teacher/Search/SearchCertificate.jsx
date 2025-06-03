import React, { useState, useEffect } from "react";
import axios from "axios";

function SearchCertificate() {
   // const [rollNumber, setRollNumber] = useState("");
   const [certificates, setCertificates] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [selectedCertificate, setSelectedCertificate] = useState(null);

   const token = localStorage.getItem("token");
   const rollNumber = localStorage.getItem("inputValue");

   useEffect(() => {
      if (!token) {
         setError("Authentication token is missing.");
         setCertificates([]);
         return;
      }
      if (!rollNumber) {
         setCertificates([]);
         setError(null);
         return;
      }

      const fetchCertificates = async () => {
         setLoading(true);
         setError(null);
         try {
            const response = await axios.get(
               `http://localhost:8000/api/v1/certificates/student/${rollNumber}`,
               {
                  headers: { Authorization: `Bearer ${token}` },
               }
            );

            setCertificates(response.data.data || []);
         } catch (error) {
            console.error("Error fetching certificates:", error);
            setCertificates([]);
            if (error.response?.status === 404) {
               setError("No certificates found for this student.");
            } else if (error.response?.status === 403) {
               setError(
                  "Access denied. You must be a teacher to view certificates."
               );
            } else {
               setError("Failed to fetch certificates. Please try again.");
            }
         } finally {
            setLoading(false);
         }
      };

      fetchCertificates();
   }, [rollNumber, token]);

   // const handleInputChange = (e) => {
   //    setRollNumber(e.target.value.trim());
   // };

   const openCertificateDetails = (certificate) => {
      setSelectedCertificate(certificate);
   };

   const closeCertificateDetails = () => {
      setSelectedCertificate(null);
   };

   return (
      <main className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden p-6">
         <section className="max-w-4xl mx-auto w-full">
            {/* <h1 className="text-3xl font-bold mb-6 text-center">
               Search Student Certificates
            </h1>

            <div className="mb-6 flex justify-center">
               <input
                  type="text"
                  placeholder="Enter Student Roll Number"
                  value={rollNumber}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div> */}

            {loading && (
               <p className="text-center text-gray-600 dark:text-gray-400 font-semibold">
                  Loading certificates...
               </p>
            )}

            {error && !loading && (
               <p className="text-center text-red-600 font-semibold mb-4">
                  {error}
               </p>
            )}

            {!loading && !error && certificates.length === 0 && rollNumber && (
               <p className="text-center text-gray-600 dark:text-gray-400">
                  No certificates exist for this student.
               </p>
            )}

            {!loading && certificates.length > 0 && (
               <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {certificates.map((certificate) => (
                     <article
                        key={certificate._id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
                        onClick={() => openCertificateDetails(certificate)}
                     >
                        {certificate.certificateImage ? (
                           <img
                              src={certificate.certificateImage}
                              alt={`${certificate.certificateName} certificate`}
                              className="h-48 w-full object-cover"
                           />
                        ) : (
                           <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                              No Image
                           </div>
                        )}

                        <div className="p-4 flex flex-col flex-grow">
                           <h2 className="text-xl font-semibold mb-1">
                              {certificate.certificateName}
                           </h2>
                           <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                              Issued By: {certificate.certificateIssuedBy}
                           </p>
                           <p className="text-sm text-gray-500 dark:text-gray-400 mt-auto truncate">
                              Code: {certificate.certificateCode || "N/A"}
                           </p>
                        </div>
                     </article>
                  ))}
               </div>
            )}

            {/* Modal for Certificate Details */}
            {selectedCertificate && (
               <div
                  className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
                  onClick={closeCertificateDetails}
               >
                  <div
                     className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
                     onClick={(e) => e.stopPropagation()}
                  >
                     <button
                        onClick={closeCertificateDetails}
                        className="absolute top-4 right-4 text-3xl font-bold text-gray-500 hover:text-gray-700"
                        aria-label="Close modal"
                     >
                        &times;
                     </button>

                     <h2 className="text-2xl font-bold mb-6">
                        {selectedCertificate.certificateName}
                     </h2>

                     {selectedCertificate.certificateImage ? (
                        <img
                           src={selectedCertificate.certificateImage}
                           alt={`${selectedCertificate.certificateName} certificate`}
                           className="w-full max-h-64 object-contain mb-6 rounded"
                        />
                     ) : (
                        <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 mb-6 rounded">
                           No Image
                        </div>
                     )}

                     <div className="space-y-4 text-gray-800 dark:text-gray-200">
                        <p>
                           <strong>Code:</strong>{" "}
                           {selectedCertificate.certificateCode || "N/A"}
                        </p>
                        <p>
                           <strong>Issued By:</strong>{" "}
                           {selectedCertificate.certificateIssuedBy || "N/A"}
                        </p>
                        <p>
                           <strong>Duration:</strong>{" "}
                           {selectedCertificate.certificateDuration || "N/A"}{" "}
                           months
                        </p>
                        <p>
                           <strong>Points:</strong>{" "}
                           {selectedCertificate.certificatePoints || "N/A"}
                        </p>
                        <p>
                           <strong>Link:</strong>{" "}
                           {selectedCertificate.certificateLink ? (
                              <a
                                 href={selectedCertificate.certificateLink}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="text-blue-600 hover:underline"
                              >
                                 {selectedCertificate.certificateLink}
                              </a>
                           ) : (
                              "N/A"
                           )}
                        </p>
                     </div>
                  </div>
               </div>
            )}
         </section>
      </main>
   );
}

export default SearchCertificate;
