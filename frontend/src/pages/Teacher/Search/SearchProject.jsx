// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function SearchProject() {
//    const [rollNumber, setRollNumber] = useState("");
//    const [projects, setProjects] = useState([]);
//    const [loading, setLoading] = useState(false);
//    const [error, setError] = useState(null);

//    const token = localStorage.getItem("token");

//    // Fetch projects when rollNumber changes and is valid
//    useEffect(() => {
//       if (!token) {
//          setError("Authentication token is missing.");
//          setProjects([]);
//          return;
//       }
//       if (!rollNumber) {
//          setProjects([]);
//          setError(null);
//          return;
//       }

//       const fetchProjects = async () => {
//          setLoading(true);
//          setError(null);
//          try {
//             const response = await axios.get(
//                `http://localhost:8000/api/v1/projects/viewProject/${rollNumber}`,
//                {
//                   headers: { Authorization: `Bearer ${token}` },
//                }
//             );

//             setProjects(response.data.data || []);
//          } catch (error) {
//             console.error("Error fetching projects:", error);
//             setProjects([]);
//             if (error.response?.status === 404) {
//                setError("No projects found for this student.");
//             } else if (error.response?.status === 403) {
//                setError(
//                   "Access denied. You must be a teacher to view projects."
//                );
//             } else {
//                setError("Failed to fetch projects. Please try again.");
//             }
//          } finally {
//             setLoading(false);
//          }
//       };

//       fetchProjects();
//    }, [rollNumber, token]);

//    // Handler for roll number input change
//    const handleInputChange = (e) => {
//       setRollNumber(e.target.value.trim());
//    };

//    return (
//       <main className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden p-6">
//          <section className="max-w-4xl mx-auto w-full">
//             <h1 className="text-3xl font-bold mb-6 text-center">
//                Search Student Projects
//             </h1>

//             <div className="mb-6 flex justify-center">
//                <input
//                   type="text"
//                   placeholder="Enter Student Roll Number"
//                   value={rollNumber}
//                   onChange={handleInputChange}
//                   className="border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                />
//             </div>

//             {loading && (
//                <p className="text-center text-gray-600 dark:text-gray-400 font-semibold">
//                   Loading projects...
//                </p>
//             )}

//             {error && !loading && (
//                <p className="text-center text-red-600 font-semibold mb-4">
//                   {error}
//                </p>
//             )}

//             {!loading && !error && projects.length === 0 && rollNumber && (
//                <p className="text-center text-gray-600 dark:text-gray-400">
//                   No projects exist for this student.
//                </p>
//             )}

//             {!loading && projects.length > 0 && (
//                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//                   {projects.map((project) => (
//                      <article
//                         key={project._id}
//                         className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col"
//                      >
//                         {project.projectAvatar ? (
//                            <img
//                               src={project.projectAvatar}
//                               alt={`${project.projectName} avatar`}
//                               className="h-48 w-full object-cover"
//                            />
//                         ) : (
//                            <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">
//                               No Image
//                            </div>
//                         )}

//                         <div className="p-4 flex flex-col flex-grow">
//                            <h2 className="text-xl font-semibold mb-1">
//                               {project.projectName}
//                            </h2>
//                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
//                               {project.projectStack || "No stack info"}
//                            </p>
//                            {project.projectLink && (
//                               <a
//                                  href={project.projectLink}
//                                  target="_blank"
//                                  rel="noopener noreferrer"
//                                  className="text-blue-600 hover:underline mb-4 truncate"
//                               >
//                                  Project Link
//                               </a>
//                            )}
//                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-auto">
//                               {project.projectBio}
//                            </p>
//                         </div>
//                      </article>
//                   ))}
//                </div>
//             )}
//          </section>
//       </main>
//    );
// }

// export default SearchProject;

import React, { useState, useEffect } from "react";
import axios from "axios";

function SearchProject() {
   const [projects, setProjects] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [selectedProject, setSelectedProject] = useState(null); // For modal

   const token = localStorage.getItem("token");
   const rollNumber = localStorage.getItem("rollNumber");

   useEffect(() => {
      if (!token) {
         setError("Authentication token is missing.");
         setProjects([]);
         return;
      }
      if (!rollNumber) {
         setProjects([]);
         setError(null);
         return;
      }

      const fetchProjects = async () => {
         setLoading(true);
         setError(null);
         try {
            const response = await axios.get(
               `http://localhost:8000/api/v1/projects/viewProject/${rollNumber}`,
               {
                  headers: { Authorization: `Bearer ${token}` },
               }
            );

            setProjects(response.data.data || []);
         } catch (error) {
            console.error("Error fetching projects:", error);
            setProjects([]);
            if (error.response?.status === 404) {
               setError("No projects found for this student.");
            } else if (error.response?.status === 403) {
               setError(
                  "Access denied. You must be a teacher to view projects."
               );
            } else {
               setError("Failed to fetch projects. Please try again.");
            }
         } finally {
            setLoading(false);
         }
      };

      fetchProjects();
   }, [rollNumber, token]);

   const openProjectDetails = (project) => {
      setSelectedProject(project);
   };

   const closeProjectDetails = () => {
      setSelectedProject(null);
   };

   return (
      <main className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden p-6">
         <section className="max-w-4xl mx-auto w-full">
            {/* <h1 className="text-3xl font-bold mb-6 text-center">
               Search Student Projects
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
                  Loading projects...
               </p>
            )}

            {error && !loading && (
               <p className="text-center text-red-600 font-semibold mb-4">
                  {error}
               </p>
            )}

            {!loading && !error && projects.length === 0 && rollNumber && (
               <p className="text-center text-gray-600 dark:text-gray-400">
                  No projects exist for this student.
               </p>
            )}

            {!loading && projects.length > 0 && (
               <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project) => (
                     <article
                        key={project._id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
                        onClick={() => openProjectDetails(project)}
                     >
                        {project.projectAvatar ? (
                           <img
                              src={project.projectAvatar}
                              alt={`${project.projectName} avatar`}
                              className="h-48 w-full object-cover"
                           />
                        ) : (
                           <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                              No Image
                           </div>
                        )}

                        <div className="p-4 flex flex-col flex-grow">
                           <h2 className="text-xl font-semibold mb-1">
                              {project.projectName}
                           </h2>
                           <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                              {project.projectStack || "No stack info"}
                           </p>
                           {project.projectLink && (
                              <a
                                 href={project.projectLink}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="text-blue-600 hover:underline mb-4 truncate"
                                 onClick={(e) => e.stopPropagation()} // Prevent modal open on link click
                              >
                                 Project Link
                              </a>
                           )}
                           <p className="text-sm text-gray-500 dark:text-gray-400 mt-auto truncate">
                              {project.projectBio || "No bio available"}
                           </p>
                        </div>
                     </article>
                  ))}
               </div>
            )}

            {/* Modal for Project Details */}
            {selectedProject && (
               <div
                  className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
                  onClick={closeProjectDetails}
               >
                  <div
                     className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
                     onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
                  >
                     <button
                        onClick={closeProjectDetails}
                        className="absolute top-4 right-4 text-3xl font-bold text-gray-500 hover:text-gray-700"
                        aria-label="Close modal"
                     >
                        &times;
                     </button>

                     <h2 className="text-2xl font-bold mb-6">
                        {selectedProject.projectName}
                     </h2>

                     {selectedProject.projectAvatar ? (
                        <img
                           src={selectedProject.projectAvatar}
                           alt={`${selectedProject.projectName} avatar`}
                           className="w-full max-h-64 object-contain mb-6 rounded"
                        />
                     ) : (
                        <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 mb-6 rounded">
                           No Image
                        </div>
                     )}

                     <div className="space-y-4 text-gray-800 dark:text-gray-200">
                        <p>
                           <strong>Domain:</strong>{" "}
                           {selectedProject.projectDomain || "N/A"}
                        </p>
                        <p>
                           <strong>Stack:</strong>{" "}
                           {selectedProject.projectStack || "N/A"}
                        </p>
                        <p>
                           <strong>Duration:</strong>{" "}
                           {selectedProject.projectDuration || "N/A"}
                        </p>
                        <p>
                           <strong>Mentor:</strong>{" "}
                           {selectedProject.projectMentor || "N/A"}
                        </p>
                        <p>
                           <strong>Members:</strong>{" "}
                           {selectedProject.projectMembers || "N/A"}
                        </p>
                        <p>
                           <strong>Link:</strong>{" "}
                           {selectedProject.projectLink ? (
                              <a
                                 href={selectedProject.projectLink}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="text-blue-600 hover:underline"
                              >
                                 {selectedProject.projectLink}
                              </a>
                           ) : (
                              "N/A"
                           )}
                        </p>
                        <p>
                           <strong>Bio:</strong>
                        </p>
                        <p className="whitespace-pre-wrap">
                           {selectedProject.projectBio || "N/A"}
                        </p>
                     </div>
                  </div>
               </div>
            )}
         </section>
      </main>
   );
}

export default SearchProject;
