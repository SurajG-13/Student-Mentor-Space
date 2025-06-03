import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import TeacherHeader from "../HomePage/TeacherHeader";

const DEPT_API_BASE = "http://localhost:8000/api/v1/departments";

function DepartmentManager() {
   const token = localStorage.getItem("token");

   const [departments, setDepartments] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const [form, setForm] = useState({
      departmentName: "",
      departmentSymbol: "",
   });

   const [editingId, setEditingId] = useState(null);

   useEffect(() => {
      fetchDepartments();
   }, []);

   const fetchDepartments = async () => {
      setLoading(true);
      setError(null);
      try {
         const res = await axios.get(DEPT_API_BASE);
         setDepartments(res.data);
      } catch (err) {
         console.error("Failed to fetch departments", err);
         setError("Failed to load departments.");
      } finally {
         setLoading(false);
      }
   };

   const handleChange = (e) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);

      const { departmentName, departmentSymbol } = form;

      if (!departmentName || !departmentSymbol) {
         setError("Please fill all fields.");
         return;
      }

      const payload = {
         departmentName,
         departmentSymbol,
      };

      try {
         if (editingId) {
            const res = await axios.put(
               `${DEPT_API_BASE}/${editingId}`,
               payload,
               {
                  headers: { Authorization: `Bearer ${token}` },
               }
            );
            setDepartments((prev) =>
               prev.map((d) => (d._id === editingId ? res.data : d))
            );
            setEditingId(null);
         } else {
            const res = await axios.post(DEPT_API_BASE, payload, {
               headers: { Authorization: `Bearer ${token}` },
            });
            setDepartments((prev) => [...prev, res.data]);
         }

         setForm({
            departmentName: "",
            departmentSymbol: "",
         });
      } catch (err) {
         setError(err.response?.data?.error || "Operation failed.");
      }
   };

   const handleEdit = (department) => {
      setEditingId(department._id);
      setForm({
         departmentName: department.departmentName,
         departmentSymbol: department.departmentSymbol,
      });
   };

   const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this department?"))
         return;

      try {
         await axios.delete(`${DEPT_API_BASE}/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
         });
         setDepartments((prev) => prev.filter((d) => d._id !== id));
      } catch (err) {
         alert(err.response?.data?.error || "Failed to delete department.");
      }
   };

   return (
      <main className="w-screen min-h-screen border-4 border-blue-500">
         <TeacherHeader />
         <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Department</h1>

            {error && (
               <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
                  {error}
               </div>
            )}

            {/* Form */}
            <motion.form
               onSubmit={handleSubmit}
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white p-6 rounded shadow mb-10"
            >
               <h2 className="text-xl font-semibold mb-4">
                  {editingId ? "Edit Department" : "Add New Department"}
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                     name="departmentName"
                     value={form.departmentName}
                     onChange={handleChange}
                     placeholder="Department Name"
                     className="border p-2 rounded"
                  />
                  <input
                     name="departmentSymbol"
                     value={form.departmentSymbol}
                     onChange={handleChange}
                     placeholder="Department Symbol"
                     className="border p-2 rounded"
                  />
               </div>
               <div className="mt-4 flex gap-2">
                  <button
                     type="submit"
                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                     {editingId ? "Update" : "Add"} Department
                  </button>
                  {editingId && (
                     <button
                        type="button"
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                        onClick={() => {
                           setEditingId(null);
                           setForm({
                              departmentName: "",
                              departmentSymbol: "",
                           });
                        }}
                     >
                        Cancel
                     </button>
                  )}
               </div>
            </motion.form>

            {/* Department Table */}
            {loading ? (
               <p className="text-center">Loading departments...</p>
            ) : departments.length === 0 ? (
               <p className="text-center text-gray-500">
                  No departments found.
               </p>
            ) : (
               <div className="overflow-x-auto">
                  <table className="min-w-full border rounded shadow">
                     <thead className="bg-gray-100">
                        <tr>
                           <th className="p-2 border">Department Name</th>
                           <th className="p-2 border">Department Symbol</th>
                           <th className="p-2 border">Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {departments.map((d) => (
                           <tr key={d._id} className="text-center">
                              <td className="p-2 border">{d.departmentName}</td>
                              <td className="p-2 border">
                                 {d.departmentSymbol}
                              </td>
                              <td className="p-2 border flex gap-4 justify-center">
                                 <button
                                    className="text-blue-600 hover:underline"
                                    onClick={() => handleEdit(d)}
                                 >
                                    Edit
                                 </button>
                                 <button
                                    className="text-red-600 hover:underline"
                                    onClick={() => handleDelete(d._id)}
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
         </div>
      </main>
   );
}

export default DepartmentManager;
