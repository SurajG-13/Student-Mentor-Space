// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import S_Sidebar from "../S_Sidebar";

// function S_Certificate() {
//    const [formData, setFormData] = useState({
//       certificateName: "",
//       certificateCode: "",
//       certificateIssuedBy: "",
//       certificateDuration: "",
//       certificatePoints: "",
//       certificateLink: "",
//       certificateFile: null,
//       _id: "",
//    });

//    const [loading, setLoading] = useState(true);
//    const [certificates, setCertificates] = useState([]);
//    const [isEditing, setIsEditing] = useState(false);
//    const [isModalOpen, setIsModalOpen] = useState(false);

//    const rollNumber = useSelector((state) => state.user.studentInfo.roll);
//    const token = useSelector((state) => state.auth.token);

//    useEffect(() => {
//       document.body.style.overflow = isModalOpen ? "hidden" : "auto";
//       return () => {
//          document.body.style.overflow = "auto";
//       };
//    }, [isModalOpen]);

//    useEffect(() => {
//       if (!token) return;
//       const fetchCertificates = async () => {
//          try {
//             const response = await axios.get(
//                `http://localhost:8000/api/v1/certificates/student/${rollNumber}`,
//                { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setCertificates(response.data.data || []);
//          } catch (error) {
//             console.error("Error fetching certificates:", error);
//          } finally {
//             setLoading(false);
//          }
//       };
//       fetchCertificates();
//    }, [rollNumber, token]);

//    const handleChange = (e) => {
//       const { name, value, files } = e.target;
//       if (name === "certificateFile") {
//          setFormData((prev) => ({
//             ...prev,
//             certificateFile: files[0] || null,
//          }));
//       } else {
//          setFormData((prev) => ({ ...prev, [name]: value }));
//       }
//    };

//    const handleSubmit = async (e) => {
//       e.preventDefault();

//       const url = isEditing
//          ? `http://localhost:8000/api/v1/certificates/${formData._id}`
//          : "http://localhost:8000/api/v1/certificates";

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
//             alert("Certificate updated!");
//          } else {
//             await axios.post(url, form, config);
//             alert("Certificate added!");
//          }

//          const updatedCertificates = await axios.get(
//             `http://localhost:8000/api/v1/certificates/student/${rollNumber}`,
//             { headers: { Authorization: `Bearer ${token}` } }
//          );
//          setCertificates(updatedCertificates.data.data || []);
//          setFormData({
//             certificateName: "",
//             certificateCode: "",
//             certificateIssuedBy: "",
//             certificateDuration: "",
//             certificatePoints: "",
//             certificateLink: "",
//             certificateFile: null,
//             _id: "",
//          });
//          setIsEditing(false);
//          setIsModalOpen(false);
//       } catch (error) {
//          console.error("Error saving certificate:", error);
//          alert("Error saving certificate.");
//       }
//    };

//    const handleEdit = (certificate) => {
//       setFormData({ ...certificate, certificateFile: null });
//       setIsEditing(true);
//       setIsModalOpen(true);
//    };

//    const handleDelete = async (certificateId) => {
//       const confirmDelete = window.confirm(
//          "Are you sure you want to delete this certificate?"
//       );
//       if (!confirmDelete) return;

//       try {
//          await axios.delete(
//             `http://localhost:8000/api/v1/certificates/${certificateId}`,
//             {
//                headers: { Authorization: `Bearer ${token}` },
//             }
//          );
//          setCertificates((prev) =>
//             prev.filter((certificate) => certificate._id !== certificateId)
//          );
//          alert("Certificate deleted successfully.");
//       } catch (error) {
//          console.error("Error deleting certificate:", error);
//          alert("Failed to delete the certificate.");
//       }
//    };

//    const handleAddNew = () => {
//       setFormData({
//          certificateName: "",
//          certificateCode: "",
//          certificateIssuedBy: "",
//          certificateDuration: "",
//          certificatePoints: "",
//          certificateLink: "",
//          certificateFile: null,
//          _id: "",
//       });
//       setIsEditing(false);
//       setIsModalOpen(true);
//    };

//    if (loading) {
//       return (
//          <div className="flex items-center justify-center h-screen text-xl font-semibold">
//                     Loading...      {" "}
//          </div>
//       );
//    }

//    return (
//       <main className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
//                <S_Sidebar />     {" "}
//          <section className="flex-grow p-8 max-w-7xl mx-auto w-full overflow-y-auto">
//                    {" "}
//             <header className="flex justify-between items-center mb-8">
//                          <h1 className="text-3xl font-bold">My Certificates</h1>
//                         {" "}
//                <button
//                   onClick={handleAddNew}
//                   className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
//                >
//                               + Add Certificate          {" "}
//                </button>
//                       {" "}
//             </header>
//                    {" "}
//             {certificates.length === 0 ? (
//                <p className="text-center text-gray-600 dark:text-gray-400">
//                               You haven't added any certificates yet.          {" "}
//                </p>
//             ) : (
//                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//                              {" "}
//                   {certificates.map((certificate) => (
//                      <article
//                         key={certificate._id}
//                         className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col"
//                      >
//                                        {" "}
//                         {certificate.certificateFile ? (
//                            <img
//                               src={certificate.certificateFile}
//                               alt={`${certificate.certificateName} preview`}
//                               className="h-48 w-full object-cover"
//                            />
//                         ) : (
//                            <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">
//                                                   No Image                  {" "}
//                            </div>
//                         )}
//                                        {" "}
//                         <div className="p-4 flex flex-col flex-grow">
//                                             {" "}
//                            <h2 className="text-xl font-semibold mb-1">
//                                                   {certificate.certificateName}
//                                              {" "}
//                            </h2>
//                                             {" "}
//                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 flex-grow">
//                                                  {" "}
//                               {certificate.certificateIssuedBy ||
//                                  "No issuer info"}
//                                                {" "}
//                            </p>
//                                             {" "}
//                            {certificate.certificateLink && (
//                               <a
//                                  href={certificate.certificateLink}
//                                  target="_blank"
//                                  rel="noopener noreferrer"
//                                  className="text-blue-600 hover:underline mb-4 truncate"
//                               >
//                                                        View Certificate
//                                     {" "}
//                               </a>
//                            )}
//                                             {" "}
//                            <section className="flex justify-around sm:ml-40">
//                                                  {" "}
//                               <button
//                                  onClick={() => handleEdit(certificate)}
//                                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md"
//                               >
//                                                        Edit                    {" "}
//                               </button>
//                                                  {" "}
//                               <button
//                                  onClick={() => handleDelete(certificate._id)}
//                                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md"
//                               >
//                                                        Delete
//                                   {" "}
//                               </button>
//                                                {" "}
//                            </section>
//                                           {" "}
//                         </div>
//                                      {" "}
//                      </article>
//                   ))}
//                            {" "}
//                </div>
//             )}
//                    {" "}
//             {isModalOpen && (
//                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                              {" "}
//                   <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
//                                   {" "}
//                      <h2 className="text-2xl font-bold mb-6">
//                                        {" "}
//                         {isEditing ? "Edit Certificate" : "Add New Certificate"}
//                                      {" "}
//                      </h2>
//                                   {" "}
//                      <form onSubmit={handleSubmit} className="space-y-4">
//                                        {" "}
//                         {[
//                            {
//                               id: "certificateName",
//                               label: "Certificate Name",
//                               required: true,
//                            },
//                            { id: "certificateCode", label: "Certificate Code" },
//                            {
//                               id: "certificateIssuedBy",
//                               label: "Issued By",
//                               required: true,
//                            },
//                            { id: "certificateDuration", label: "Duration" },
//                            { id: "certificatePoints", label: "Points" },
//                            {
//                               id: "certificateLink",
//                               label: "Certificate Link",
//                               type: "url",
//                            },
//                         ].map(({ id, label, required, type = "text" }) => (
//                            <div key={id}>
//                                                  {" "}
//                               <label
//                                  htmlFor={id}
//                                  className="block font-medium mb-1"
//                               >
//                                                        {label}{" "}
//                                  {required && (
//                                     <span className="text-red-500">*</span>
//                                  )}
//                                                     {" "}
//                               </label>
//                                                  {" "}
//                               <input
//                                  id={id}
//                                  type={type}
//                                  name={id}
//                                  value={formData[id]}
//                                  onChange={handleChange}
//                                  required={required}
//                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                               />
//                                                {" "}
//                            </div>
//                         ))}
//                                        {" "}
//                         <div>
//                                             {" "}
//                            <label
//                               htmlFor="certificateFile"
//                               className="block font-medium mb-1"
//                            >
//                                                   Upload Certificate File
//                                          {" "}
//                            </label>
//                                             {" "}
//                            <input
//                               id="certificateFile"
//                               type="file"
//                               name="certificateFile"
//                               accept="image/*,application/pdf"
//                               onChange={handleChange}
//                               className="w-full"
//                            />
//                                           {" "}
//                         </div>
//                                        {" "}
//                         <div className="flex justify-end space-x-4 mt-6">
//                                             {" "}
//                            <button
//                               type="button"
//                               onClick={() => setIsModalOpen(false)}
//                               className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300"
//                            >
//                                                   Cancel                  {" "}
//                            </button>
//                                             {" "}
//                            <button
//                               type="submit"
//                               className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                            >
//                                                  {" "}
//                               {isEditing
//                                  ? "Update Certificate"
//                                  : "Add Certificate"}
//                                                {" "}
//                            </button>
//                                           {" "}
//                         </div>
//                                      {" "}
//                      </form>
//                                   {" "}
//                      <button
//                         onClick={() => setIsModalOpen(false)}
//                         className="absolute top-4 right-4 text-3xl font-bold text-gray-500 hover:text-gray-700"
//                         aria-label="Close modal"
//                      >
//                                         &times;              {" "}
//                      </button>
//                                 {" "}
//                   </section>
//                            {" "}
//                </div>
//             )}
//                  {" "}
//          </section>
//             {" "}
//       </main>
//    );
// }

// export default S_Certificate;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import S_Sidebar from "../S_Sidebar";

// function S_Certificate() {
//    const [formData, setFormData] = useState({
//       certificateName: "",
//       certificateCode: "",
//       certificateIssuedBy: "",
//       certificateDuration: "",
//       certificatePoints: "",
//       certificateLink: "",
//       certificateFile: null,
//       _id: "",
//    });

//    const [loading, setLoading] = useState(true);
//    const [certificates, setCertificates] = useState([]);
//    const [isEditing, setIsEditing] = useState(false);
//    const [isModalOpen, setIsModalOpen] = useState(false);

//    const rollNumber = useSelector((state) => state.user.studentInfo.roll);
//    const token = useSelector((state) => state.auth.token);

//    useEffect(() => {
//       document.body.style.overflow = isModalOpen ? "hidden" : "auto";
//       return () => {
//          document.body.style.overflow = "auto";
//       };
//    }, [isModalOpen]);

//    useEffect(() => {
//       if (!token) return;
//       const fetchCertificates = async () => {
//          try {
//             const response = await axios.get(
//                `http://localhost:8000/api/v1/certificates/student/${rollNumber}`,
//                { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setCertificates(response.data.data || []);
//          } catch (error) {
//             console.error("Error fetching certificates:", error);
//          } finally {
//             setLoading(false);
//          }
//       };
//       fetchCertificates();
//    }, [rollNumber, token]);

//    const handleChange = (e) => {
//       const { name, value, files } = e.target;
//       if (name === "certificateFile") {
//          setFormData((prev) => ({
//             ...prev,
//             certificateFile: files[0] || null,
//          }));
//       } else {
//          setFormData((prev) => ({ ...prev, [name]: value }));
//       }
//    };

//    const handleSubmit = async (e) => {
//       e.preventDefault();

//       const url = isEditing
//          ? `http://localhost:8000/api/v1/certificates/${formData._id}`
//          : "http://localhost:8000/api/v1/certificates";

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
//             alert("Certificate updated!");
//          } else {
//             await axios.post(url, form, config);
//             alert("Certificate added!");
//          }

//          const updatedCertificates = await axios.get(
//             `http://localhost:8000/api/v1/certificates/student/${rollNumber}`,
//             { headers: { Authorization: `Bearer ${token}` } }
//          );
//          setCertificates(updatedCertificates.data.data || []);
//          setFormData({
//             certificateName: "",
//             certificateCode: "",
//             certificateIssuedBy: "",
//             certificateDuration: "",
//             certificatePoints: "",
//             certificateLink: "",
//             certificateFile: null,
//             _id: "",
//          });
//          setIsEditing(false);
//          setIsModalOpen(false);
//       } catch (error) {
//          console.error("Error saving certificate:", error);
//          alert("Error saving certificate.");
//       }
//    };

//    const handleEdit = (certificate) => {
//       setFormData({ ...certificate, certificateFile: null });
//       setIsEditing(true);
//       setIsModalOpen(true);
//    };

//    const handleDelete = async (certificateId) => {
//       const confirmDelete = window.confirm(
//          "Are you sure you want to delete this certificate?"
//       );
//       if (!confirmDelete) return;

//       try {
//          await axios.delete(
//             `http://localhost:8000/api/v1/certificates/${certificateId}`,
//             {
//                headers: { Authorization: `Bearer ${token}` },
//             }
//          );
//          setCertificates((prev) =>
//             prev.filter((certificate) => certificate._id !== certificateId)
//          );
//          alert("Certificate deleted successfully.");
//       } catch (error) {
//          console.error("Error deleting certificate:", error);
//          alert("Failed to delete the certificate.");
//       }
//    };

//    const handleAddNew = () => {
//       setFormData({
//          certificateName: "",
//          certificateCode: "",
//          certificateIssuedBy: "",
//          certificateDuration: "",
//          certificatePoints: "",
//          certificateLink: "",
//          certificateFile: null,
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
//                <h1 className="text-3xl font-bold">My Certificates</h1>
//                <button
//                   onClick={handleAddNew}
//                   className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
//                >
//                   + Add Certificate
//                </button>
//             </header>

//             {certificates.length === 0 ? (
//                <p className="text-center text-gray-600 dark:text-gray-400">
//                   You haven't added any certificates yet.
//                </p>
//             ) : (
//                <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                      <thead className="bg-gray-100 dark:bg-gray-700">
//                         <tr>
//                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
//                               Name
//                            </th>
//                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
//                               Platform
//                            </th>
//                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
//                               Duration
//                            </th>
//                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
//                               Points
//                            </th>
//                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
//                               Link
//                            </th>
//                            <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
//                               Actions
//                            </th>
//                         </tr>
//                      </thead>
//                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                         {certificates.map((certificate) => (
//                            <tr key={certificate._id}>
//                               <td className="px-6 py-4 text-sm font-medium">
//                                  {certificate.certificateName}
//                               </td>
//                               <td className="px-6 py-4 text-sm">
//                                  {certificate.certificateIssuedBy || "N/A"}
//                               </td>
//                               <td className="px-6 py-4 text-sm">
//                                  {certificate.certificateDuration || "N/A"}
//                               </td>
//                               <td className="px-6 py-4 text-sm">
//                                  {certificate.certificatePoints || "N/A"}
//                               </td>
//                               <td className="px-6 py-4 text-sm">
//                                  {certificate.certificateLink ? (
//                                     <a
//                                        href={certificate.certificateLink}
//                                        target="_blank"
//                                        rel="noopener noreferrer"
//                                        className="text-blue-600 hover:underline"
//                                     >
//                                        View
//                                     </a>
//                                  ) : (
//                                     "N/A"
//                                  )}
//                               </td>
//                               <td className="px-6 py-4 text-sm flex justify-center gap-3">
//                                  <button
//                                     onClick={() => handleEdit(certificate)}
//                                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
//                                  >
//                                     Edit
//                                  </button>
//                                  <button
//                                     onClick={() =>
//                                        handleDelete(certificate._id)
//                                     }
//                                     className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
//                                  >
//                                     Delete
//                                  </button>
//                               </td>
//                            </tr>
//                         ))}
//                      </tbody>
//                   </table>
//                </div>
//             )}

//             {isModalOpen && (
//                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                   <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
//                      <h2 className="text-2xl font-bold mb-6">
//                         {isEditing ? "Edit Certificate" : "Add New Certificate"}
//                      </h2>
//                      <form onSubmit={handleSubmit} className="space-y-4">
//                         {[
//                            {
//                               id: "certificateName",
//                               label: "Certificate Name",
//                               required: true,
//                            },
//                            { id: "certificateCode", label: "Certificate Code" },
//                            {
//                               id: "certificateIssuedBy",
//                               label: "Issued By",
//                               required: true,
//                            },
//                            { id: "certificateDuration", label: "Duration" },
//                            { id: "certificatePoints", label: "Points" },
//                            {
//                               id: "certificateLink",
//                               label: "Certificate Link",
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
//                               htmlFor="certificateFile"
//                               className="block font-medium mb-1"
//                            >
//                               Upload Certificate File
//                            </label>
//                            <input
//                               id="certificateFile"
//                               type="file"
//                               name="certificateFile"
//                               accept="image/*,application/pdf"
//                               onChange={handleChange}
//                               className="w-full"
//                            />
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
//                               {isEditing
//                                  ? "Update Certificate"
//                                  : "Add Certificate"}
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

// export default S_Certificate;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";

// function S_Certificate() {
//    const [certificates, setCertificates] = useState([]);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState(null);
//    const [formData, setFormData] = useState({
//       certificateName: "",
//       certificateCode: "",
//       certificateIssuedBy: "",
//       certificateDuration: "",
//       certificatePoints: "",
//       certificateLink: "",
//       certificateImage: null,
//    });
//    const [isModalOpen, setIsModalOpen] = useState(false);

//    const token = useSelector((state) => state.auth.token);

//    useEffect(() => {
//       if (!token) {
//          setLoading(false);
//          setError("Authentication token missing.");
//          return;
//       }

//       const fetchCertificates = async () => {
//          setLoading(true);
//          setError(null);
//          try {
//             const response = await axios.get(
//                "http://localhost:8000/api/v1/certificates/",
//                {
//                   headers: { Authorization: `Bearer ${token}` },
//                }
//             );
//             setCertificates(response.data.data || []);
//          } catch (error) {
//             console.error("Error fetching certificates:", error);
//             setError("Failed to fetch certificates.");
//          } finally {
//             setLoading(false);
//          }
//       };

//       fetchCertificates();
//    }, [token]);

//    const handleChange = (e) => {
//       const { name, value, files } = e.target;
//       if (name === "certificateImage") {
//          setFormData((prev) => ({ ...prev, [name]: files[0] || null }));
//       } else {
//          setFormData((prev) => ({ ...prev, [name]: value }));
//       }
//    };

//    const handleSubmit = async (e) => {
//       e.preventDefault();

//       if (!token) {
//          alert("Authentication token missing. Please login.");
//          return;
//       }

//       const form = new FormData();
//       Object.entries(formData).forEach(([key, val]) => {
//          if (val !== null && val !== "") {
//             form.append(key, val);
//          }
//       });

//       try {
//          await axios.post("http://localhost:8000/api/v1/certificates/", form, {
//             headers: {
//                Authorization: `Bearer ${token}`,
//                "Content-Type": "multipart/form-data",
//             },
//          });
//          alert("Certificate added successfully!");
//          setIsModalOpen(false);
//          setFormData({
//             certificateName: "",
//             certificateCode: "",
//             certificateIssuedBy: "",
//             certificateDuration: "",
//             certificatePoints: "",
//             certificateLink: "",
//             certificateImage: null,
//          });

//          // Refresh certificates list
//          const response = await axios.get(
//             "http://localhost:8000/api/v1/certificates/",
//             {
//                headers: { Authorization: `Bearer ${token}` },
//             }
//          );
//          setCertificates(response.data.data || []);
//       } catch (error) {
//          console.error("Error adding certificate:", error);
//          alert("Failed to add certificate.");
//       }
//    };

//    return (
//       <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
//          <section className="max-w-4xl mx-auto">
//             <header className="flex justify-between items-center mb-6">
//                <h1 className="text-3xl font-bold">My Certificates</h1>
//                <button
//                   onClick={() => setIsModalOpen(true)}
//                   className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
//                >
//                   + Add Certificate
//                </button>
//             </header>

//             {loading && <p>Loading certificates...</p>}
//             {error && <p className="text-red-600">{error}</p>}

//             {!loading && certificates.length === 0 && (
//                <p>You haven't added any certificates yet.</p>
//             )}

//             {!loading && certificates.length > 0 && (
//                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//                   {certificates.map((cert) => (
//                      <article
//                         key={cert._id}
//                         className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer"
//                      >
//                         {cert.certificateImage ? (
//                            <img
//                               src={cert.certificateImage}
//                               alt={`${cert.certificateName} certificate`}
//                               className="h-48 w-full object-cover"
//                            />
//                         ) : (
//                            <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">
//                               No Image
//                            </div>
//                         )}

//                         <div className="p-4 flex flex-col flex-grow">
//                            <h2 className="text-xl font-semibold mb-1">
//                               {cert.certificateName}
//                            </h2>
//                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
//                               Issued By: {cert.certificateIssuedBy}
//                            </p>
//                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-auto truncate">
//                               Code: {cert.certificateCode || "N/A"}
//                            </p>
//                         </div>
//                      </article>
//                   ))}
//                </div>
//             )}

//             {/* Add Certificate Modal */}
//             {isModalOpen && (
//                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                   <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
//                      <h2 className="text-2xl font-bold mb-6">
//                         Add New Certificate
//                      </h2>
//                      <form onSubmit={handleSubmit} className="space-y-4">
//                         {[
//                            {
//                               id: "certificateName",
//                               label: "Certificate Name",
//                               required: true,
//                            },
//                            { id: "certificateCode", label: "Certificate Code" },
//                            {
//                               id: "certificateIssuedBy",
//                               label: "Issued By",
//                               required: true,
//                            },
//                            {
//                               id: "certificateDuration",
//                               label: "Duration (months)",
//                               type: "number",
//                            },
//                            {
//                               id: "certificatePoints",
//                               label: "Points",
//                               type: "number",
//                            },
//                            {
//                               id: "certificateLink",
//                               label: "Certificate Link",
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
//                               htmlFor="certificateImage"
//                               className="block font-medium mb-1"
//                            >
//                               Certificate Image
//                            </label>
//                            <input
//                               id="certificateImage"
//                               type="file"
//                               name="certificateImage"
//                               accept="image/*"
//                               onChange={handleChange}
//                               className="w-full"
//                            />
//                            {formData.certificateImage instanceof File && (
//                               <img
//                                  src={URL.createObjectURL(
//                                     formData.certificateImage
//                                  )}
//                                  alt="Certificate preview"
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
//                               Add Certificate
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

// export default S_Certificate;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import StudentHeader from "../HeaderLinks/StudentHeader.jsx";

function S_Certificate() {
   const [formData, setFormData] = useState({
      certificateName: "",
      certificateCode: "",
      certificateIssuedBy: "",
      certificateDuration: "",
      certificatePoints: "",
      certificateLink: "",
      certificateFile: null,
      _id: "",
   });

   const [loading, setLoading] = useState(true);
   const [certificates, setCertificates] = useState([]);
   const [isEditing, setIsEditing] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const rollNumber = useSelector((state) => state.user.studentInfo.roll);
   const token = useSelector((state) => state.auth.token);

   useEffect(() => {
      document.body.style.overflow = isModalOpen ? "hidden" : "auto";
      return () => {
         document.body.style.overflow = "auto";
      };
   }, [isModalOpen]);

   useEffect(() => {
      if (!token) return;
      const fetchCertificates = async () => {
         try {
            // Fetch certificates for authenticated student (no need for rollNumber param)
            const response = await axios.get(
               `http://localhost:8000/api/v1/certificates/`,
               { headers: { Authorization: `Bearer ${token}` } }
            );
            setCertificates(response.data.data || []);
         } catch (error) {
            console.error("Error fetching certificates:", error);
         } finally {
            setLoading(false);
         }
      };
      fetchCertificates();
   }, [token]);

   const handleChange = (e) => {
      const { name, value, files } = e.target;
      if (name === "certificateFile") {
         setFormData((prev) => ({
            ...prev,
            certificateFile: files[0] || null,
         }));
      } else {
         setFormData((prev) => ({ ...prev, [name]: value }));
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const url = isEditing
         ? `http://localhost:8000/api/v1/certificates/${formData._id}`
         : "http://localhost:8000/api/v1/certificates";

      const form = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
         if (key !== "_id" && val !== null) form.append(key, val);
      });

      try {
         const config = {
            headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "multipart/form-data",
            },
         };

         if (isEditing) {
            await axios.put(url, form, config);
            alert("Certificate updated!");
         } else {
            await axios.post(url, form, config);
            alert("Certificate added!");
         }

         // Refresh certificates list after add/update
         const updatedCertificates = await axios.get(
            `http://localhost:8000/api/v1/certificates/`,
            { headers: { Authorization: `Bearer ${token}` } }
         );
         setCertificates(updatedCertificates.data.data || []);
         setFormData({
            certificateName: "",
            certificateCode: "",
            certificateIssuedBy: "",
            certificateDuration: "",
            certificatePoints: "",
            certificateLink: "",
            certificateFile: null,
            _id: "",
         });
         setIsEditing(false);
         setIsModalOpen(false);
      } catch (error) {
         console.error("Error saving certificate:", error);
         alert("Error saving certificate.");
      }
   };

   const handleEdit = (certificate) => {
      setFormData({ ...certificate, certificateFile: null });
      setIsEditing(true);
      setIsModalOpen(true);
   };

   const handleDelete = async (certificateId) => {
      const confirmDelete = window.confirm(
         "Are you sure you want to delete this certificate?"
      );
      if (!confirmDelete) return;

      try {
         await axios.delete(
            `http://localhost:8000/api/v1/certificates/${certificateId}`,
            {
               headers: { Authorization: `Bearer ${token}` },
            }
         );
         setCertificates((prev) =>
            prev.filter((certificate) => certificate._id !== certificateId)
         );
         alert("Certificate deleted successfully.");
      } catch (error) {
         console.error("Error deleting certificate:", error);
         alert("Failed to delete the certificate.");
      }
   };

   const handleAddNew = () => {
      setFormData({
         certificateName: "",
         certificateCode: "",
         certificateIssuedBy: "",
         certificateDuration: "",
         certificatePoints: "",
         certificateLink: "",
         certificateFile: null,
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
               <h1 className="text-3xl font-bold">My Certificates</h1>
               <button
                  onClick={handleAddNew}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
               >
                  + Add Certificate
               </button>
            </header>

            {certificates.length === 0 ? (
               <p className="text-center text-gray-600 dark:text-gray-400">
                  You haven't added any certificates yet.
               </p>
            ) : (
               <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                     <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                           <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Name
                           </th>
                           <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Platform
                           </th>
                           <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Duration
                           </th>
                           <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Points
                           </th>
                           <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                              Link
                           </th>
                           <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                              Actions
                           </th>
                        </tr>
                     </thead>
                     <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {certificates.map((certificate) => (
                           <tr key={certificate._id}>
                              <td className="px-6 py-4 text-sm font-medium">
                                 {certificate.certificateName}
                              </td>
                              <td className="px-6 py-4 text-sm">
                                 {certificate.certificateIssuedBy || "N/A"}
                              </td>
                              <td className="px-6 py-4 text-sm">
                                 {certificate.certificateDuration || "N/A"}
                              </td>
                              <td className="px-6 py-4 text-sm">
                                 {certificate.certificatePoints || "N/A"}
                              </td>
                              <td className="px-6 py-4 text-sm">
                                 {certificate.certificateLink ? (
                                    <a
                                       href={certificate.certificateLink}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="text-blue-600 hover:underline"
                                    >
                                       View
                                    </a>
                                 ) : (
                                    "N/A"
                                 )}
                              </td>
                              <td className="px-6 py-4 text-sm flex justify-center gap-3">
                                 <button
                                    onClick={() => handleEdit(certificate)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                                 >
                                    Edit
                                 </button>
                                 <button
                                    onClick={() =>
                                       handleDelete(certificate._id)
                                    }
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
                        {isEditing ? "Edit Certificate" : "Add New Certificate"}
                     </h2>
                     <form onSubmit={handleSubmit} className="space-y-4">
                        {[
                           {
                              id: "certificateName",
                              label: "Certificate Name",
                              required: true,
                           },
                           { id: "certificateCode", label: "Certificate Code" },
                           {
                              id: "certificateIssuedBy",
                              label: "Issued By",
                              required: true,
                           },
                           { id: "certificateDuration", label: "Duration" },
                           { id: "certificatePoints", label: "Points" },
                           {
                              id: "certificateLink",
                              label: "Certificate Link",
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
                              htmlFor="certificateFile"
                              className="block font-medium mb-1"
                           >
                              Upload Certificate File
                           </label>
                           <input
                              id="certificateFile"
                              type="file"
                              name="certificateFile"
                              accept="image/*,application/pdf"
                              onChange={handleChange}
                              className="w-full"
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
                                 ? "Update Certificate"
                                 : "Add Certificate"}
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

export default S_Certificate;
