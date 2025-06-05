// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import S_Sidebar from "../S_Sidebar";

// function Project() {
//    const [formData, setFormData] = useState({
//       projectName: "",
//       projectAvatar: null,
//       projectDomain: "",
//       projectStack: "",
//       projectDuration: "",
//       projectBio: "",
//       projectMentor: "",
//       projectMembers: "",
//       projectLink: "",
//       _id: "",
//    });

//    const [loading, setLoading] = useState(true);
//    const [projects, setProjects] = useState([]);
//    const [isEditing, setIsEditing] = useState(false);
//    const [isModalOpen, setIsModalOpen] = useState(false);

//    const rollNumber = useSelector((state) => state.user.studentInfo.roll);
//    const token = useSelector((state) => state.auth.token);

//    // Lock scroll when modal is open
//    useEffect(() => {
//       document.body.style.overflow = isModalOpen ? "hidden" : "auto";
//       return () => {
//          document.body.style.overflow = "auto";
//       };
//    }, [isModalOpen]);

//    useEffect(() => {
//       if (!token) return;
//       const fetchProjects = async () => {
//          try {
//             const response = await axios.get(
//                `http://localhost:8000/api/v1/projects/student/${rollNumber}`,
//                { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setProjects(response.data.data || []);
//          } catch (error) {
//             console.error("Error fetching projects:", error);
//          } finally {
//             setLoading(false);
//          }
//       };
//       fetchProjects();
//    }, [rollNumber, token]);

//    const handleChange = (e) => {
//       const { name, value, files } = e.target;
//       if (name === "projectAvatar") {
//          setFormData((prev) => ({ ...prev, [name]: files[0] || null }));
//       } else {
//          setFormData((prev) => ({ ...prev, [name]: value }));
//       }
//    };

//    const handleSubmit = async (e) => {
//       e.preventDefault();

//       const url = isEditing
//          ? `http://localhost:8000/api/v1/projects/updateProject/${formData._id}`
//          : "http://localhost:8000/api/v1/projects/addProject";

//       const form = new FormData();
//       Object.entries(formData).forEach(([key, val]) => {
//          if (key !== "_id" && val !== null) form.append(key, val);
//       });

//       try {
//          const config = {
//             headers: {
//                Authorization: `Bearer ${token}`,
//                "Content-Type": "multipart/form-data",
//             },
//          };

//          if (isEditing) {
//             await axios.put(url, form, config);
//             alert("Project updated!");
//          } else {
//             await axios.post(url, form, config);
//             alert("Project added!");
//          }

//          const updatedProjects = await axios.get(
//             `http://localhost:8000/api/v1/projects/student/${rollNumber}`,
//             { headers: { Authorization: `Bearer ${token}` } }
//          );
//          setProjects(updatedProjects.data.data || []);
//          setFormData({
//             projectName: "",
//             projectAvatar: null,
//             projectDomain: "",
//             projectStack: "",
//             projectDuration: "",
//             projectBio: "",
//             projectMentor: "",
//             projectMembers: "",
//             projectLink: "",
//             _id: "",
//          });
//          setIsEditing(false);
//          setIsModalOpen(false);
//       } catch (error) {
//          console.error("Error saving project:", error);
//          alert("Error saving project.");
//       }
//    };

//    const handleEdit = (project) => {
//       setFormData({ ...project, projectAvatar: null });
//       setIsEditing(true);
//       setIsModalOpen(true);
//    };
//    // Function to delete a project
//    const handleDelete = async (projectId) => {
//       const confirmDelete = window.confirm(
//          "Are you sure you want to delete this project?"
//       );
//       if (!confirmDelete) return;

//       try {
//          await axios.delete(
//             `http://localhost:8000/api/v1/projects/deleteProject/${projectId}`,
//             {
//                headers: { Authorization: `Bearer ${token}` },
//             }
//          ); // Remove the deleted project from the UI
//          setProjects((prev) =>
//             prev.filter((project) => project._id !== projectId)
//          );
//          alert("Project deleted successfully.");
//       } catch (error) {
//          console.error("Error deleting project:", error);
//          alert("Failed to delete the project.");
//       }
//    };

//    const handleAddNew = () => {
//       setFormData({
//          projectName: "",
//          projectAvatar: null,
//          projectDomain: "",
//          projectStack: "",
//          projectDuration: "",
//          projectBio: "",
//          projectMentor: "",
//          projectMembers: "",
//          projectLink: "",
//          _id: "",
//       });
//       setIsEditing(false);
//       setIsModalOpen(true);
//    };

//    if (loading) {
//       return (
//          <div className="flex items-center justify-center h-screen text-xl font-semibold">
//             Loading...
//          </div>
//       );
//    }

//    return (
//       <main className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
//          <S_Sidebar />

//          <section className="flex-grow p-8 max-w-7xl mx-auto w-full overflow-y-auto">
//             <header className="flex justify-between items-center mb-8">
//                <h1 className="text-3xl font-bold">My Projects</h1>
//                <button
//                   onClick={handleAddNew}
//                   className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
//                >
//                   + Add Project
//                </button>
//             </header>

//             {projects.length === 0 ? (
//                <p className="text-center text-gray-600 dark:text-gray-400">
//                   You haven't added any projects yet.
//                </p>
//             ) : (
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
//                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 flex-grow">
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

//                            <section className=" flex justify-around sm:ml-40">
//                               <button
//                                  onClick={() => handleEdit(project)}
//                                  className="bg-blue-600 hover:bg-blue-700 text-white px-5  py-2 rounded-md"
//                               >
//                                  Edit
//                               </button>
//                               <button
//                                  onClick={() => handleDelete(project._id)}
//                                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md"
//                               >
//                                  Delete
//                               </button>
//                            </section>
//                         </div>
//                      </article>
//                   ))}
//                </div>
//             )}

//             {isModalOpen && (
//                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                   <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
//                      <h2 className="text-2xl font-bold mb-6">
//                         {isEditing ? "Edit Project" : "Add New Project"}
//                      </h2>
//                      <form onSubmit={handleSubmit} className="space-y-4">
//                         {[
//                            {
//                               id: "projectName",
//                               label: "Project Name",
//                               required: true,
//                            },
//                            {
//                               id: "projectDomain",
//                               label: "Project Domain",
//                               required: true,
//                            },
//                            {
//                               id: "projectStack",
//                               label: "Project Stack",
//                               required: true,
//                            },
//                            { id: "projectDuration", label: "Project Duration" },
//                            { id: "projectMentor", label: "Project Mentor" },
//                            { id: "projectMembers", label: "Project Members" },
//                            {
//                               id: "projectLink",
//                               label: "Project Link",
//                               type: "url",
//                            },
//                         ].map(({ id, label, required, type = "text" }) => (
//                            <div key={id}>
//                               <label
//                                  htmlFor={id}
//                                  className="block font-medium mb-1"
//                               >
//                                  {label}{" "}
//                                  {required && (
//                                     <span className="text-red-500">*</span>
//                                  )}
//                               </label>
//                               <input
//                                  id={id}
//                                  type={type}
//                                  name={id}
//                                  value={formData[id]}
//                                  onChange={handleChange}
//                                  required={required}
//                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                               />
//                            </div>
//                         ))}

//                         <div>
//                            <label
//                               htmlFor="projectBio"
//                               className="block font-medium mb-1"
//                            >
//                               Project Bio
//                            </label>
//                            <textarea
//                               id="projectBio"
//                               name="projectBio"
//                               value={formData.projectBio}
//                               onChange={handleChange}
//                               rows={4}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                            />
//                         </div>

//                         <div>
//                            <label
//                               htmlFor="projectAvatar"
//                               className="block font-medium mb-1"
//                            >
//                               Project Avatar
//                            </label>
//                            <input
//                               id="projectAvatar"
//                               type="file"
//                               name="projectAvatar"
//                               accept="image/*"
//                               onChange={handleChange}
//                               className="w-full"
//                            />
//                            {formData.projectAvatar instanceof File && (
//                               <img
//                                  src={URL.createObjectURL(
//                                     formData.projectAvatar
//                                  )}
//                                  alt="Avatar preview"
//                                  className="mt-2 w-32 h-32 object-cover rounded-md"
//                                  onLoad={(e) =>
//                                     URL.revokeObjectURL(e.target.src)
//                                  }
//                               />
//                            )}
//                         </div>

//                         <div className="flex justify-end space-x-4 mt-6">
//                            <button
//                               type="button"
//                               onClick={() => setIsModalOpen(false)}
//                               className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300"
//                            >
//                               Cancel
//                            </button>
//                            <button
//                               type="submit"
//                               className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                            >
//                               {isEditing ? "Update Project" : "Add Project"}
//                            </button>
//                         </div>
//                      </form>
//                      <button
//                         onClick={() => setIsModalOpen(false)}
//                         className="absolute top-4 right-4 text-3xl font-bold text-gray-500 hover:text-gray-700"
//                         aria-label="Close modal"
//                      >
//                         &times;
//                      </button>
//                   </section>
//                </div>
//             )}
//          </section>
//       </main>
//    );
// }

// export default Project;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import StudentHeader from "../HeaderLinks/StudentHeader.jsx";

function Project() {
   const [formData, setFormData] = useState({
      projectName: "",
      projectAvatar: null,
      projectDomain: "",
      projectStack: "",
      projectDuration: "",
      projectBio: "",
      projectMentor: "",
      projectMembers: "",
      projectLink: "",
      _id: "",
   });

   const [loading, setLoading] = useState(true);
   const [projects, setProjects] = useState([]);
   const [isEditing, setIsEditing] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const rollNumber = useSelector((state) => state.user.studentInfo.roll);
   const token = useSelector((state) => state.auth.token);

   // Lock scroll when modal is open
   useEffect(() => {
      document.body.style.overflow = isModalOpen ? "hidden" : "auto";
      return () => {
         document.body.style.overflow = "auto";
      };
   }, [isModalOpen]);

   useEffect(() => {
      if (!token || !rollNumber) {
         setLoading(false);
         return;
      }

      const fetchProjects = async () => {
         setLoading(true);
         try {
            const response = await axios.get(
               `http://localhost:8000/api/v1/projects/student/me`,
               {
                  headers: { Authorization: `Bearer ${token}` },
               }
            );
            setProjects(response.data.data || []);
         } catch (error) {
            console.error("Error fetching projects:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchProjects();
   }, [rollNumber, token]);

   const handleChange = (e) => {
      const { name, value, files } = e.target;
      if (name === "projectAvatar") {
         setFormData((prev) => ({ ...prev, [name]: files[0] || null }));
      } else {
         setFormData((prev) => ({ ...prev, [name]: value }));
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!token) {
         alert("Authentication token missing. Please login again.");
         return;
      }

      const url = isEditing
         ? `http://localhost:8000/api/v1/projects/updateProject/${formData._id}`
         : "http://localhost:8000/api/v1/projects/addProject";

      try {
         const form = new FormData();

         // Append all fields except _id
         Object.entries(formData).forEach(([key, val]) => {
            if (key !== "_id" && val !== null && val !== "") {
               form.append(key, val);
            }
         });

         // If editing and projectAvatar is null, do NOT append projectAvatar (backend will keep existing)
         // If adding or projectAvatar is a file, append it (already handled above)

         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "multipart/form-data",
            },
         };

         if (isEditing) {
            await axios.put(url, form, config);
            alert("Project updated!");
         } else {
            await axios.post(url, form, config);
            alert("Project added!");
         }

         // Refresh projects list
         const updatedProjects = await axios.get(
            `http://localhost:8000/api/v1/projects/student/me`,
            { headers: { Authorization: `Bearer ${token}` } }
         );
         setProjects(updatedProjects.data.data || []);

         // Reset form and modal states
         setFormData({
            projectName: "",
            projectAvatar: null,
            projectDomain: "",
            projectStack: "",
            projectDuration: "",
            projectBio: "",
            projectMentor: "",
            projectMembers: "",
            projectLink: "",
            _id: "",
         });
         setIsEditing(false);
         setIsModalOpen(false);
      } catch (error) {
         console.error("Error saving project:", error);

         // Show backend error message if available
         const errorMsg =
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Error saving project.";
         alert(errorMsg);
      }
   };

   const handleEdit = (project) => {
      // When editing, do NOT set projectAvatar to file, keep null to avoid overwriting unless user uploads new
      setFormData({ ...project, projectAvatar: null });
      setIsEditing(true);
      setIsModalOpen(true);
   };

   const handleDelete = async (projectId) => {
      const confirmDelete = window.confirm(
         "Are you sure you want to delete this project?"
      );
      if (!confirmDelete) return;

      try {
         await axios.delete(
            `http://localhost:8000/api/v1/projects/deleteProject/${projectId}`,
            {
               headers: { Authorization: `Bearer ${token}` },
            }
         );
         setProjects((prev) =>
            prev.filter((project) => project._id !== projectId)
         );
         alert("Project deleted successfully.");
      } catch (error) {
         console.error("Error deleting project:", error);
         alert("Failed to delete the project.");
      }
   };

   const handleAddNew = () => {
      setFormData({
         projectName: "",
         projectAvatar: null,
         projectDomain: "",
         projectStack: "",
         projectDuration: "",
         projectBio: "",
         projectMentor: "",
         projectMembers: "",
         projectLink: "",
         _id: "",
      });
      setIsEditing(false);
      setIsModalOpen(true);
   };

   if (loading) {
      return (
         <div className="flex items-center justify-center h-screen text-xl font-semibold">
            Loading...
         </div>
      );
   }

   return (
      <main className="min-h-screen min-w-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
         <StudentHeader />

         <section className="flex-grow p-8 max-w-7xl mx-auto w-full overflow-y-auto">
            <header className="flex justify-between items-center mb-8">
               <h1 className="text-3xl font-bold">My Projects</h1>
               <button
                  onClick={handleAddNew}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
               >
                  + Add Project
               </button>
            </header>

            {projects.length === 0 ? (
               <p className="text-center text-gray-600 dark:text-gray-400">
                  You haven't added any projects yet.
               </p>
            ) : (
               <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project) => (
                     <article
                        key={project._id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col"
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
                           <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 flex-grow">
                              {project.projectStack || "No stack info"}
                           </p>
                           {project.projectLink && (
                              <a
                                 href={project.projectLink}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="text-blue-600 hover:underline mb-4 truncate"
                              >
                                 Project Link
                              </a>
                           )}

                           <section className="flex justify-around sm:ml-40">
                              <button
                                 onClick={() => handleEdit(project)}
                                 className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md"
                              >
                                 Edit
                              </button>
                              <button
                                 onClick={() => handleDelete(project._id)}
                                 className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md"
                              >
                                 Delete
                              </button>
                           </section>
                        </div>
                     </article>
                  ))}
               </div>
            )}

            {isModalOpen && (
               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
                     <h2 className="text-2xl font-bold mb-6">
                        {isEditing ? "Edit Project" : "Add New Project"}
                     </h2>
                     <form onSubmit={handleSubmit} className="space-y-4">
                        {[
                           {
                              id: "projectName",
                              label: "Project Name",
                              required: true,
                           },
                           {
                              id: "projectDomain",
                              label: "Project Domain",
                              required: true,
                           },
                           {
                              id: "projectStack",
                              label: "Project Stack",
                              required: true,
                           },
                           { id: "projectDuration", label: "Project Duration" },
                           { id: "projectMentor", label: "Project Mentor" },
                           { id: "projectMembers", label: "Project Members" },
                           {
                              id: "projectLink",
                              label: "Project Link",
                              type: "url",
                           },
                        ].map(({ id, label, required, type = "text" }) => (
                           <div key={id}>
                              <label
                                 htmlFor={id}
                                 className="block font-medium mb-1"
                              >
                                 {label}{" "}
                                 {required && (
                                    <span className="text-red-500">*</span>
                                 )}
                              </label>
                              <input
                                 id={id}
                                 type={type}
                                 name={id}
                                 value={formData[id]}
                                 onChange={handleChange}
                                 required={required}
                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                              />
                           </div>
                        ))}

                        <div>
                           <label
                              htmlFor="projectBio"
                              className="block font-medium mb-1"
                           >
                              Project Bio
                           </label>
                           <textarea
                              id="projectBio"
                              name="projectBio"
                              value={formData.projectBio}
                              onChange={handleChange}
                              rows={4}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                           />
                        </div>

                        <div>
                           <label
                              htmlFor="projectAvatar"
                              className="block font-medium mb-1"
                           >
                              Project Avatar
                           </label>
                           <input
                              id="projectAvatar"
                              type="file"
                              name="projectAvatar"
                              accept="image/*"
                              onChange={handleChange}
                              className="w-full"
                           />
                           {formData.projectAvatar instanceof File && (
                              <img
                                 src={URL.createObjectURL(
                                    formData.projectAvatar
                                 )}
                                 alt="Avatar preview"
                                 className="mt-2 w-32 h-32 object-cover rounded-md"
                                 onLoad={(e) =>
                                    URL.revokeObjectURL(e.target.src)
                                 }
                              />
                           )}
                        </div>

                        <div className="flex justify-end space-x-4 mt-6">
                           <button
                              type="button"
                              onClick={() => setIsModalOpen(false)}
                              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300"
                           >
                              Cancel
                           </button>
                           <button
                              type="submit"
                              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                           >
                              {isEditing ? "Update Project" : "Add Project"}
                           </button>
                        </div>
                     </form>
                     <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-4 right-4 text-3xl font-bold text-gray-500 hover:text-gray-700"
                        aria-label="Close modal"
                     >
                        &times;
                     </button>
                  </section>
               </div>
            )}
         </section>
      </main>
   );
}

export default Project;
