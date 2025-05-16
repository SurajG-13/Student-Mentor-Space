import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import S_Sidebar from "../S_Sidebar";
import { authActions } from "../../../redux/features/authSlice";

function Project() {
   const [formData, setFormData] = useState({
      projectName: "",
      projectDomain: "",
      projectStack: "",
      projectDuration: "",
      projectBio: "",
      projectMentor: "",
      projectMembers: "",
      projectLink: "",
   });

   const [loading, setLoading] = useState(true);
   const [projects, setProjects] = useState([]);
   const [isEditing, setIsEditing] = useState(false);

   const rollNumber = useSelector((state) => state.user.studentInfo.roll);
   const token = useSelector((state) => state.auth.token);

   useEffect(() => {
      const fetchProjects = async () => {
         if (!token) {
            console.error("No token available");
            return;
         }

         try {
            const response = await axios.get(
               `http://localhost:8000/api/v1/projects/student/${rollNumber}`,
               {
                  headers: {
                     Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                  },
               }
            );
            setProjects(response.data.data || []); // Assuming response contains a 'data' key with the projects
            setLoading(false);
         } catch (error) {
            console.error("Error fetching projects:", error);
            setLoading(false);
         }
      };

      if (token) {
         fetchProjects();
      }
   }, [rollNumber, token]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const projectId = isEditing ? formData.projectId : null;
      const url = isEditing
         ? `http://localhost:8000/api/v1/projects/${projectId}`
         : "http://localhost:8000/api/v1/projects/addProject";

      try {
         let response;
         if (isEditing) {
            response = await axios.put(url, formData, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });
         } else {
            response = await axios.post(url, formData, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });
         }

         alert(isEditing ? "Project updated!" : "Project added!");
         setIsEditing(false);
         setFormData({
            projectName: "",
            projectDomain: "",
            projectStack: "",
            projectDuration: "",
            projectBio: "",
            projectMentor: "",
            projectMembers: "",
            projectLink: "",
         });

         // After the project is added or updated, re-fetch the projects
         const updatedProjects = await axios.get(
            `http://localhost:8000/api/v1/projects/student/${rollNumber}`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );
         setProjects(updatedProjects.data.data); // Make sure you are getting the correct data structure
      } catch (error) {
         console.error("Error saving project:", error);
         alert("Error saving project.");
      }
   };

   const handleEdit = (project) => {
      setFormData(project);
      setIsEditing(true);
   };

   const handleAddNew = () => {
      setFormData({
         projectName: "",
         projectDomain: "",
         projectStack: "",
         projectDuration: "",
         projectBio: "",
         projectMentor: "",
         projectMembers: "",
         projectLink: "",
      });
      setIsEditing(false);
   };

   if (loading) {
      return <div>Loading...</div>;
   }

   return (
      <main className="bg-lightBackground dark:bg-darkBackground text-primaryBlack dark:text-primaryWhite">
         <S_Sidebar />
         <section className="p-4">
            <h2>Your Projects</h2>
            {projects.length > 0 ? (
               <div>
                  {projects.map((project) => (
                     <div key={project._id} className="project-card">
                        <h3>{project.projectName}</h3>
                        <p>{project.projectDomain}</p>
                        <button onClick={() => handleEdit(project)}>
                           Edit Project
                        </button>
                     </div>
                  ))}
               </div>
            ) : (
               <div>
                  <p>You haven't added any projects yet.</p>
               </div>
            )}

            <button onClick={handleAddNew}>
               {projects.length > 0 ? "Add New Project" : "Add Project"}
            </button>

            {/* Project Form */}
            <form onSubmit={handleSubmit}>
               <div>
                  <label>Project Name</label>
                  <input
                     type="text"
                     name="projectName"
                     value={formData.projectName}
                     onChange={handleChange}
                     required
                  />
               </div>
               <div>
                  <label>Project Domain</label>
                  <input
                     type="text"
                     name="projectDomain"
                     value={formData.projectDomain}
                     onChange={handleChange}
                     required
                  />
               </div>
               <div>
                  <label>Project Stack</label>
                  <input
                     type="text"
                     name="projectStack"
                     value={formData.projectStack}
                     onChange={handleChange}
                     required
                  />
               </div>
               <div>
                  <label>Project Duration</label>
                  <input
                     type="text"
                     name="projectDuration"
                     value={formData.projectDuration}
                     onChange={handleChange}
                  />
               </div>
               <div>
                  <label>Project Bio</label>
                  <textarea
                     name="projectBio"
                     value={formData.projectBio}
                     onChange={handleChange}
                  />
               </div>
               <div>
                  <label>Project Mentor</label>
                  <input
                     type="text"
                     name="projectMentor"
                     value={formData.projectMentor}
                     onChange={handleChange}
                  />
               </div>
               <div>
                  <label>Project Members</label>
                  <input
                     type="text"
                     name="projectMembers"
                     value={formData.projectMembers}
                     onChange={handleChange}
                  />
               </div>
               <div>
                  <label>Project Link</label>
                  <input
                     type="url"
                     name="projectLink"
                     value={formData.projectLink}
                     onChange={handleChange}
                  />
               </div>

               <button type="submit">
                  {isEditing ? "Update Project" : "Add Project"}
               </button>
            </form>
         </section>
      </main>
   );
}

export default Project;
