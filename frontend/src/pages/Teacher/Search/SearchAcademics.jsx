import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const initialSubjectMarksTemplate = {
   ca1: "",
   ca2: "",
   ca3: "",
   ca4: "",
   final: "",
};

const initialLabMarksTemplate = {
   pca1: "",
   pca2: "",
   final: "",
};

const API_BASE = `http://localhost:8000`;

export default function SearchAcademics() {
   const [student, setStudent] = useState(null);
   const [semesterNo, setSemesterNo] = useState("");
   const [subjects, setSubjects] = useState([]);
   const [labSubjects, setLabSubjects] = useState([]);
   const [marksData, setMarksData] = useState({});
   const [labMarksData, setLabMarksData] = useState({});
   const [loading, setLoading] = useState(true);
   const [loadingSubjects, setLoadingSubjects] = useState(false);
   const [loadingLabSubjects, setLoadingLabSubjects] = useState(false);
   const [loadingMarks, setLoadingMarks] = useState(false);
   const [error, setError] = useState(null);
   const [message, setMessage] = useState(null);

   const rollNumber = localStorage.getItem("inputValue");
   const token = localStorage.getItem("token");

   useEffect(() => {
      if (!rollNumber || !token) {
         setError("Roll number or token missing.");
         setLoading(false);
         return;
      }

      const fetchStudentData = async () => {
         setLoading(true);
         try {
            const res = await axios.get(
               `${API_BASE}/api/v1/marks/${rollNumber}`,
               {
                  headers: { Authorization: `Bearer ${token}` },
               }
            );
            setStudent(res.data);
         } catch (err) {
            console.error("Error fetching student data:", err);
            setError("Failed to fetch student information.");
         } finally {
            setLoading(false);
         }
      };

      fetchStudentData();
   }, [rollNumber, token]);

   useEffect(() => {
      const deptId = student?.department?._id;

      if (!semesterNo || !deptId) {
         setSubjects([]);
         setLabSubjects([]);
         setMarksData({});
         setLabMarksData({});
         return;
      }

      const fetchAll = async () => {
         setLoadingSubjects(true);
         setLoadingLabSubjects(true);
         setLoadingMarks(true);
         setError(null);

         try {
            // Subjects
            const subjectRes = await fetch(
               `${API_BASE}/api/v1/subjects?department=${deptId}&semesterNo=${semesterNo}`,
               { headers: { Authorization: `Bearer ${token}` } }
            );
            const subjectData = await subjectRes.json();
            setSubjects(subjectData);

            // Lab Subjects
            const labRes = await fetch(
               `${API_BASE}/api/v1/labSubjects?department=${deptId}&semesterNo=${semesterNo}`,
               { headers: { Authorization: `Bearer ${token}` } }
            );
            const labData = await labRes.json();
            setLabSubjects(labData);

            // Subject Marks
            const marksRes = await fetch(
               `${API_BASE}/api/v1/marks/${rollNumber}`,
               { headers: { Authorization: `Bearer ${token}` } }
            );
            const marksJson = await marksRes.json();
            const semesterMarks = marksJson.semesters?.find(
               (s) => s.semesterNo === Number(semesterNo)
            );

            const subjectMarksTemplate = {};
            subjectData.forEach((sub) => {
               subjectMarksTemplate[sub._id] = {
                  ...initialSubjectMarksTemplate,
               };
            });

            semesterMarks?.subjects?.forEach((sub) => {
               const id = sub.subject?._id;
               if (id) {
                  subjectMarksTemplate[id] = {
                     ca1: sub.ca1 ?? "",
                     ca2: sub.ca2 ?? "",
                     ca3: sub.ca3 ?? "",
                     ca4: sub.ca4 ?? "",
                     final: sub.final ?? "",
                  };
               }
            });
            setMarksData(subjectMarksTemplate);

            // Lab Marks
            const labMarksRes = await fetch(
               `${API_BASE}/api/v1/labMarks/${rollNumber}`,
               { headers: { Authorization: `Bearer ${token}` } }
            );
            const labMarksJson = await labMarksRes.json();
            const semesterLabMarks = labMarksJson.semesters?.find(
               (s) => s.semesterNo === Number(semesterNo)
            );

            const labMarksTemplate = {};
            labData.forEach((sub) => {
               labMarksTemplate[sub._id] = { ...initialLabMarksTemplate };
            });

            semesterLabMarks?.subjects?.forEach((sub) => {
               const id = sub.labSubject?._id;
               if (id) {
                  labMarksTemplate[id] = {
                     pca1: sub.pca1 ?? "",
                     pca2: sub.pca2 ?? "",
                     final: sub.final ?? "",
                  };
               }
            });
            setLabMarksData(labMarksTemplate);
         } catch (err) {
            console.error("Fetching Error:", err);
            setError("Error fetching academic data.");
         } finally {
            setLoadingSubjects(false);
            setLoadingLabSubjects(false);
            setLoadingMarks(false);
         }
      };

      fetchAll();
   }, [semesterNo, student]);

   if (loading)
      return (
         <p className="text-center mt-10 text-gray-600">
            Loading student info...
         </p>
      );
   if (error && !student)
      return <p className="text-center mt-10 text-red-600">{error}</p>;
   if (!student)
      return (
         <p className="text-center mt-10 text-gray-600">
            No student information available.
         </p>
      );

   return (
      <main className="max-w-5xl mx-auto p-6">
         <motion.h1
            className="text-3xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
         >
            View Student Marks
         </motion.h1>

         <div className="mb-6 flex justify-center">
            <label
               htmlFor="semester"
               className="mr-3 font-semibold self-center"
            >
               Select Semester:
            </label>
            <select
               id="semester"
               className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
               value={semesterNo}
               onChange={(e) => setSemesterNo(e.target.value)}
            >
               <option value="">-- Select --</option>
               {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>
                     Semester {sem}
                  </option>
               ))}
            </select>
         </div>

         {(loadingSubjects || loadingLabSubjects || loadingMarks) && (
            <p className="text-center text-gray-600">Loading data...</p>
         )}
         {message && (
            <p className="text-center text-green-600 mb-4">{message}</p>
         )}
         {error && <p className="text-center text-red-600 mb-4">{error}</p>}

         {/* Subject Marks Table */}
         {semesterNo && subjects.length > 0 && (
            <section className="mb-10 overflow-x-auto">
               <h2 className="text-xl font-semibold mb-4">Subjects Marks</h2>
               <table className="min-w-full border border-gray-300 rounded">
                  <thead className="bg-gray-100">
                     <tr>
                        <th className="border px-4 py-2 text-left">Subject</th>
                        <th className="border px-4 py-2 text-center">CA1</th>
                        <th className="border px-4 py-2 text-center">CA2</th>
                        <th className="border px-4 py-2 text-center">CA3</th>
                        <th className="border px-4 py-2 text-center">CA4</th>
                        <th className="border px-4 py-2 text-center">Final</th>
                     </tr>
                  </thead>
                  <tbody>
                     {subjects.map((subject) => (
                        <tr key={subject._id} className="hover:bg-gray-50">
                           <td className="border px-4 py-2 font-semibold">
                              {subject.subjectName}
                           </td>
                           {["ca1", "ca2", "ca3", "ca4", "final"].map(
                              (field) => (
                                 <td
                                    key={field}
                                    className="border px-2 py-1 text-center"
                                 >
                                    <input
                                       type={
                                          field === "final" ? "text" : "number"
                                       }
                                       min={field !== "final" ? 0 : undefined}
                                       max={field !== "final" ? 25 : undefined}
                                       className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                       value={
                                          marksData[subject._id]?.[field] ?? ""
                                       }
                                       readOnly
                                    />
                                 </td>
                              )
                           )}
                        </tr>
                     ))}
                  </tbody>
               </table>
            </section>
         )}

         {/* Lab Subject Marks Table */}
         {semesterNo && labSubjects.length > 0 && (
            <section className="overflow-x-auto">
               <h2 className="text-xl font-semibold mb-4">
                  Lab Subjects Marks
               </h2>
               <table className="min-w-full border border-gray-300 rounded">
                  <thead className="bg-gray-100">
                     <tr>
                        <th className="border px-4 py-2 text-left">
                           Lab Subject
                        </th>
                        <th className="border px-4 py-2 text-center">PCA1</th>
                        <th className="border px-4 py-2 text-center">PCA2</th>
                        <th className="border px-4 py-2 text-center">Final</th>
                     </tr>
                  </thead>
                  <tbody>
                     {labSubjects.map((subject) => (
                        <tr key={subject._id} className="hover:bg-gray-50">
                           <td className="border px-4 py-2 font-semibold">
                              {subject.labSubjectName}
                           </td>
                           {["pca1", "pca2", "final"].map((field) => (
                              <td
                                 key={field}
                                 className="border px-2 py-1 text-center"
                              >
                                 <input
                                    type={field === "final" ? "text" : "number"}
                                    className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    value={
                                       labMarksData[subject._id]?.[field] ?? ""
                                    }
                                    readOnly
                                 />
                              </td>
                           ))}
                        </tr>
                     ))}
                  </tbody>
               </table>
            </section>
         )}

         {/* No data messages */}
         {semesterNo && !loadingSubjects && subjects.length === 0 && (
            <p className="text-center text-gray-600">
               No subjects found for this semester.
            </p>
         )}
         {semesterNo && !loadingLabSubjects && labSubjects.length === 0 && (
            <p className="text-center text-gray-600">
               No lab subjects found for this semester.
            </p>
         )}
      </main>
   );
}
