import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import StudentHeader from "../HeaderLinks/StudentHeader.jsx";

function S_Internship() {
   const [formData, setFormData] = useState({
      companyName: "",
      internshipDuration: "",
      joinDate: "",
      internshipSource: "",
      _id: "",
   });

   const [loading, setLoading] = useState(true);
   const [internships, setInternships] = useState([]);
   const [isEditing, setIsEditing] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const token = useSelector((state) => state.auth.token);

   useEffect(() => {
      document.body.style.overflow = isModalOpen ? "hidden" : "auto";
      return () => {
         document.body.style.overflow = "auto";
      };
   }, [isModalOpen]);

   useEffect(() => {
      if (!token) return;

      const fetchInternships = async () => {
         try {
            const response = await axios.get(
               "http://localhost:8000/api/v1/internships/",
               {
                  headers: { Authorization: `Bearer ${token}` },
               }
            );
            setInternships(response.data.data || []);
         } catch (error) {
            console.error("Error fetching internships:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchInternships();
   }, [token]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const url = isEditing
         ? `http://localhost:8000/api/v1/internships/${formData._id}`
         : "http://localhost:8000/api/v1/internships";

      try {
         if (isEditing) {
            await axios.put(url, formData, {
               headers: { Authorization: `Bearer ${token}` },
            });
            alert("Internship updated!");
         } else {
            await axios.post(url, formData, {
               headers: { Authorization: `Bearer ${token}` },
            });
            alert("Internship added!");
         }

         const updated = await axios.get(
            "http://localhost:8000/api/v1/internships/",
            {
               headers: { Authorization: `Bearer ${token}` },
            }
         );
         setInternships(updated.data.data || []);
         setFormData({
            companyName: "",
            internshipDuration: "",
            joinDate: "",
            internshipSource: "",
            _id: "",
         });
         setIsEditing(false);
         setIsModalOpen(false);
      } catch (error) {
         console.error("Error saving internship:", error);
         alert("Error saving internship.");
      }
   };

   const handleEdit = (internship) => {
      setFormData({
         companyName: internship.companyName,
         internshipDuration: internship.internshipDuration,
         joinDate: internship.joinDate ? internship.joinDate.slice(0, 10) : "",
         internshipSource: internship.internshipSource,
         _id: internship._id,
      });
      setIsEditing(true);
      setIsModalOpen(true);
   };

   const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this internship?"))
         return;

      try {
         await axios.delete(`http://localhost:8000/api/v1/internships/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
         });
         setInternships((prev) => prev.filter((item) => item._id !== id));
         alert("Internship deleted successfully.");
      } catch (error) {
         console.error("Error deleting internship:", error);
         alert("Failed to delete internship.");
      }
   };

   if (loading) {
      return (
         <div className="flex items-center justify-center h-screen text-xl font-semibold">
            Loading...
         </div>
      );
   }

   return (
      <main className="min-w-screen min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
         <StudentHeader />
         <section className="flex-grow p-8 max-w-7xl mx-auto w-full overflow-y-auto">
            <header className="flex justify-between items-center mb-8">
               <h1 className="text-3xl font-bold">My Internships</h1>
               <button
                  onClick={() => {
                     setFormData({
                        companyName: "",
                        internshipDuration: "",
                        joinDate: "",
                        internshipSource: "",
                        _id: "",
                     });
                     setIsEditing(false);
                     setIsModalOpen(true);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
               >
                  + Add Internship
               </button>
            </header>

            {internships.length === 0 ? (
               <p className="text-center text-gray-600 dark:text-gray-400">
                  You haven't added any internships yet.
               </p>
            ) : (
               <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                     <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                           <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Company
                           </th>
                           <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Duration
                           </th>
                           <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Join Date
                           </th>
                           <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Source
                           </th>
                           <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                              Actions
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
                              <td className="px-6 py-4 text-sm flex justify-center gap-3">
                                 <button
                                    onClick={() => handleEdit(internship)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                                 >
                                    Edit
                                 </button>
                                 <button
                                    onClick={() => handleDelete(internship._id)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                                 >
                                    Delete
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            )}

            {isModalOpen && (
               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
                     <h2 className="text-2xl font-bold mb-6">
                        {isEditing ? "Edit Internship" : "Add New Internship"}
                     </h2>
                     <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                           <label
                              htmlFor="companyName"
                              className="block font-medium mb-1"
                           >
                              Company Name{" "}
                              <span className="text-red-500">*</span>
                           </label>
                           <input
                              id="companyName"
                              type="text"
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                           />
                        </div>

                        <div>
                           <label
                              htmlFor="internshipDuration"
                              className="block font-medium mb-1"
                           >
                              Duration (months)
                           </label>
                           <input
                              id="internshipDuration"
                              type="number"
                              name="internshipDuration"
                              value={formData.internshipDuration}
                              onChange={handleChange}
                              min={0}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                           />
                        </div>

                        <div>
                           <label
                              htmlFor="joinDate"
                              className="block font-medium mb-1"
                           >
                              Join Date
                           </label>
                           <input
                              id="joinDate"
                              type="date"
                              name="joinDate"
                              value={formData.joinDate}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                           />
                        </div>

                        <div>
                           <label
                              htmlFor="internshipSource"
                              className="block font-medium mb-1"
                           >
                              Internship Source
                           </label>
                           <input
                              id="internshipSource"
                              type="text"
                              name="internshipSource"
                              value={formData.internshipSource}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                           />
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
                              {isEditing
                                 ? "Update Internship"
                                 : "Add Internship"}
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

export default S_Internship;
