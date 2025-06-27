import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import TeacherHeader from "../HomePage/TeacherHeader";

const SUBJECT_API_BASE = "http://localhost:8000/api/v1/labSubjects";
const DEPT_API_BASE = "http://localhost:8000/api/v1/departments";

function LabSubjectManager() {
   const token = localStorage.getItem("token");

   const [departments, setDepartments] = useState([]);
   const [subjects, setSubjects] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const [form, setForm] = useState({
      labSubjectName: "",
      labSubjectCode: "",
      labSubjectCredit: "",
      semesterNo: "",
      department: "",
   });

   const [editingId, setEditingId] = useState(null);
   // Store original subject data for dirty checking
   const originalSubject = useRef(null);

   const [selectedDept, setSelectedDept] = useState("");
   const [selectedSemester, setSelectedSemester] = useState("");

   useEffect(() => {
      fetchDepartments();
   }, []);

   useEffect(() => {
      if (selectedDept && selectedSemester) {
         fetchSubjectsByFilter();
      } else {
         setSubjects([]);
      }
   }, [selectedDept, selectedSemester]);

   const fetchDepartments = async () => {
      try {
         const res = await axios.get(DEPT_API_BASE);
         setDepartments(res.data);
      } catch (err) {
         console.error("Failed to fetch departments", err);
         setError("Failed to load departments.");
      }
   };

   const fetchSubjectsByFilter = async () => {
      setLoading(true);
      setError(null);
      try {
         const res = await axios.get(SUBJECT_API_BASE, {
            headers: { Authorization: `Bearer ${token}` },
            params: {
               department: selectedDept,
               semesterNo: selectedSemester,
            },
         });
         setSubjects(res.data);
      } catch (err) {
         setError(err.response?.data?.error || "Failed to fetch subjects.");
         setSubjects([]);
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

      const {
         labSubjectName,
         labSubjectCode,
         labSubjectCredit,
         semesterNo,
         department,
      } = form;

      // Create mode: require all fields
      if (!editingId) {
         if (
            !labSubjectName ||
            !labSubjectCode ||
            !semesterNo ||
            !department ||
            labSubjectCredit === ""
         ) {
            setError("Please fill all fields.");
            return;
         }
      }

      // Prepare payload for partial update or full create
      const payload = {};

      // In edit mode, only send changed fields
      if (editingId && originalSubject.current) {
         if (labSubjectName !== originalSubject.current.labSubjectName)
            payload.labSubjectName = labSubjectName;
         if (labSubjectCode !== originalSubject.current.labSubjectCode)
            payload.labSubjectCode = labSubjectCode;
         if (
            Number(labSubjectCredit) !==
            originalSubject.current.labSubjectCredit
         )
            payload.labSubjectCredit = Number(labSubjectCredit);
         if (Number(semesterNo) !== originalSubject.current.semesterNo)
            payload.semesterNo = Number(semesterNo);
         if (department !== originalSubject.current.department?._id)
            payload.department = department;
      } else {
         // Create mode: send all fields
         if (labSubjectName) payload.labSubjectName = labSubjectName;
         if (labSubjectCode) payload.labSubjectCode = labSubjectCode;
         if (labSubjectCredit !== "")
            payload.labSubjectCredit = Number(labSubjectCredit);
         if (semesterNo !== "") payload.semesterNo = Number(semesterNo);
         if (department) payload.department = department;
      }

      // If no changes detected in edit mode, don't submit
      if (editingId && Object.keys(payload).length === 0) {
         setError("No changes detected to update.");
         return;
      }

      try {
         if (editingId) {
            const res = await axios.put(
               `${SUBJECT_API_BASE}/${editingId}`,
               payload,
               {
                  headers: { Authorization: `Bearer ${token}` },
               }
            );
            setSubjects((prev) =>
               prev.map((s) => (s._id === editingId ? res.data : s))
            );
            setEditingId(null);
            originalSubject.current = null;
         } else {
            const res = await axios.post(SUBJECT_API_BASE, payload, {
               headers: { Authorization: `Bearer ${token}` },
            });
            setSubjects((prev) => [...prev, res.data]);
         }

         setForm({
            labSubjectName: "",
            labSubjectCode: "",
            labSubjectCredit: "",
            semesterNo: "",
            department: "",
         });

         if (selectedDept && selectedSemester) fetchSubjectsByFilter();
      } catch (err) {
         setError(err.response?.data?.error || "Operation failed.");
      }
   };

   const handleEdit = (subject) => {
      setEditingId(subject._id);
      originalSubject.current = subject;
      setForm({
         labSubjectName: subject.labSubjectName,
         labSubjectCode: subject.labSubjectCode,
         labSubjectCredit: subject.labSubjectCredit.toString(),
         semesterNo: subject.semesterNo.toString(),
         department: subject.department?._id || subject.department,
      });
   };

   const handleCancelEdit = () => {
      setEditingId(null);
      originalSubject.current = null;
      setForm({
         labSubjectName: "",
         labSubjectCode: "",
         labSubjectCredit: "",
         semesterNo: "",
         department: "",
      });
      setError(null);
   };

   const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this subject?"))
         return;

      try {
         await axios.delete(`${SUBJECT_API_BASE}/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
         });
         setSubjects((prev) => prev.filter((s) => s._id !== id));
      } catch (err) {
         alert(err.response?.data?.error || "Failed to delete subject.");
      }
   };

   // Helper to highlight changed fields when editing
   const isDirty = (fieldName) => {
      if (!editingId || !originalSubject.current) return false;
      const originalValue = originalSubject.current[fieldName];
      const currentValue = form[fieldName];

      // Convert to string for safe comparison
      if (fieldName === "labSubjectCredit" || fieldName === "semesterNo") {
         return String(originalValue) !== String(currentValue);
      }

      if (fieldName === "department") {
         return originalValue?._id !== currentValue;
      }

      return originalValue !== currentValue;
   };

   return (
      <main className="w-screen min-h-screen bg-lightBackground dark:bg-darkBackground">
         <TeacherHeader />
         <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-primaryBlack dark:text-primaryWhite">
               Subject Manager
            </h1>

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
               className="bg-lightBackground dark:bg-darkBackground border p-6 rounded shadow mb-10"
            >
               <h2 className="text-xl font-semibold mb-4  text-primaryBlack dark:text-primaryWhite">
                  {editingId ? "Edit Subject" : "Add New Subject"}
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                     name="labSubjectName"
                     value={form.labSubjectName}
                     onChange={handleChange}
                     placeholder="Subject Name"
                     className={`border p-2 rounded ${
                        isDirty("labSubjectName") ? "border-yellow-500" : ""
                     }`}
                  />
                  <input
                     name="labSubjectCode"
                     value={form.labSubjectCode}
                     onChange={handleChange}
                     placeholder="Subject UPID"
                     className={`border p-2 rounded ${
                        isDirty("labSubjectCode") ? "border-yellow-500" : ""
                     }`}
                  />
                  <input
                     name="labSubjectCredit"
                     type="number"
                     value={form.labSubjectCredit}
                     onChange={handleChange}
                     placeholder="Total Credit Points"
                     className={`border p-2 rounded ${
                        isDirty("labSubjectCredit") ? "border-yellow-500" : ""
                     }`}
                  />
                  <input
                     name="semesterNo"
                     type="number"
                     value={form.semesterNo}
                     onChange={handleChange}
                     placeholder="Semester Number"
                     className={`border p-2 rounded ${
                        isDirty("semesterNo") ? "border-yellow-500" : ""
                     }`}
                  />
                  <select
                     name="department"
                     value={form.department}
                     onChange={handleChange}
                     className={`border p-2 rounded ${
                        isDirty("department") ? "border-yellow-500" : ""
                     }`}
                  >
                     <option value="">Select Department</option>
                     {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                           {dept.departmentName}
                        </option>
                     ))}
                  </select>
               </div>
               <div className="mt-4 flex gap-2">
                  <button
                     type="submit"
                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                     {editingId ? "Update" : "Add"} Subject
                  </button>
                  {editingId && (
                     <button
                        type="button"
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                        onClick={handleCancelEdit}
                     >
                        Cancel
                     </button>
                  )}
               </div>
            </motion.form>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
               <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="border p-2 rounded w-full md:w-1/2"
               >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                     <option key={dept._id} value={dept._id}>
                        {dept.departmentName}
                     </option>
                  ))}
               </select>
               <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="border p-2 rounded w-full md:w-1/4"
               >
                  <option value="">Select Semester</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                     <option key={sem} value={sem}>
                        Semester {sem}
                     </option>
                  ))}
               </select>
            </div>

            {/* Subject Table */}
            {loading ? (
               <p className="text-center">Loading subjects...</p>
            ) : subjects.length === 0 && selectedDept && selectedSemester ? (
               <p className="text-center text-gray-500">
                  No subjects found for selected department and semester.
               </p>
            ) : (
               <div className="overflow-x-auto">
                  <table className="min-w-full border rounded shadow">
                     <thead className="bg-lightBackground dark:bg-darkBackground">
                        <tr>
                           <th className="text-primaryBlack dark:text-primaryWhite p-2 border">
                              Name
                           </th>
                           <th className="text-primaryBlack dark:text-primaryWhite p-2 border">
                              UPID
                           </th>
                           <th className="text-primaryBlack dark:text-primaryWhite p-2 border">
                              Credit Points
                           </th>
                           <th className="text-primaryBlack dark:text-primaryWhite p-2 border">
                              Semester
                           </th>
                           <th className="text-primaryBlack dark:text-primaryWhite p-2 border">
                              Actions
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {subjects.map((s) => (
                           <tr
                              key={s._id}
                              className="text-center text-primaryBlack dark:text-primaryWhite"
                           >
                              <td className="p-2 border">{s.labSubjectName}</td>
                              <td className="p-2 border">{s.labSubjectCode}</td>
                              <td className="p-2 border">
                                 {s.labSubjectCredit}
                              </td>
                              <td className="p-2 border">{s.semesterNo}</td>
                              <td className="p-2 border flex gap-4 justify-center">
                                 <button
                                    className="text-blue-600 hover:underline"
                                    onClick={() => handleEdit(s)}
                                 >
                                    Edit
                                 </button>
                                 <button
                                    className="text-red-600 hover:underline"
                                    onClick={() => handleDelete(s._id)}
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

export default LabSubjectManager;
