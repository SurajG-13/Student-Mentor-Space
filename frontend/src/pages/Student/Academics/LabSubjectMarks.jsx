import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StudentHeader from "../HeaderLinks/StudentHeader.jsx";
import { useSelector } from "react-redux";

const initialMarksTemplate = {
   pca1: "",
   pca2: "",
   final: "",
};

export default function LabSubjectMarks() {
   const [student, setStudent] = useState(null);
   const [semesterNo, setSemesterNo] = useState("");
   const [subjects, setSubjects] = useState([]);
   const [marksData, setMarksData] = useState({});
   const [loadingStudent, setLoadingStudent] = useState(true);
   const [loadingSubjects, setLoadingSubjects] = useState(false);
   const [loadingMarks, setLoadingMarks] = useState(false);
   const [saving, setSaving] = useState(false);
   const [message, setMessage] = useState(null);
   const [error, setError] = useState(null);
   const rollNumber = useSelector((state) => state.user.studentInfo.roll);
   const token = useSelector((state) => state.auth.token);

   // Fetch logged-in student profile
   useEffect(() => {
      if (!token) {
         setError("Authentication token is missing.");
         setLoadingStudent(false);
         return;
      }

      async function fetchStudentProfile() {
         setLoadingStudent(true);
         setError(null);
         try {
            const res = await fetch(
               `http://localhost:8000/api/v1/students/me`,
               {
                  headers: { Authorization: `Bearer ${token}` },
               }
            );

            if (!res.ok) {
               const errorText = await res.text();
               throw new Error(
                  `Failed to fetch student profile: ${res.status} ${errorText}`
               );
            }

            const data = await res.json();
            setStudent(data);
         } catch (err) {
            setError(err.message);
         } finally {
            setLoadingStudent(false);
         }
      }

      fetchStudentProfile();
   }, [token]);

   // Fetch subjects and marks when semester or department changes
   useEffect(() => {
      if (!semesterNo || !student?.department?._id) {
         setSubjects([]);
         setMarksData({});
         return;
      }

      async function fetchSubjects() {
         setLoadingSubjects(true);
         setError(null);
         setMessage(null);
         try {
            const res = await fetch(
               `http://localhost:8000/api/v1/labSubjects?department=${student.department._id}&semesterNo=${semesterNo}`,
               {
                  headers: { Authorization: `Bearer ${token}` },
               }
            );

            if (!res.ok) {
               if (res.status === 404) {
                  setSubjects([]);
                  setMarksData({});
                  setMessage("No subjects found for this semester.");
                  return;
               }
               throw new Error("Failed to fetch subjects.");
            }

            const data = await res.json();
            setSubjects(data);

            // Initialize marksData keyed by subject ObjectId
            setMarksData((prev) => {
               const newData = { ...prev };
               data.forEach((sub) => {
                  if (!newData[sub._id]) {
                     newData[sub._id] = { ...initialMarksTemplate };
                  }
               });
               return newData;
            });

            await fetchStudentMarks();
         } catch (err) {
            setError(err.message);
         } finally {
            setLoadingSubjects(false);
         }
      }

      async function fetchStudentMarks() {
         setLoadingMarks(true);
         setError(null);
         try {
            const res = await fetch(
               `http://localhost:8000/api/v1/labMarks/me`,
               {
                  headers: { Authorization: `Bearer ${token}` },
               }
            );

            if (!res.ok) throw new Error("Failed to fetch marks.");

            const data = await res.json();

            const semester = data.semesters.find(
               (s) => s.semesterNo === Number(semesterNo)
            );

            if (semester) {
               const marksMap = {};
               semester.labSubjects.forEach((sub) => {
                  const subjectId = sub.labSubject?._id;
                  if (subjectId) {
                     marksMap[subjectId] = {
                        pca1: sub.pca1 ?? "",
                        pca2: sub.pca2 ?? "",
                        final: sub.final ?? "",
                     };
                  }
               });
               setMarksData(marksMap);
            } else {
               setMarksData({});
            }
         } catch (err) {
            setError(err.message);
         } finally {
            setLoadingMarks(false);
         }
      }

      fetchSubjects();
   }, [semesterNo, student?.department?._id, token]);

   // Handle input change for marks
   function handleInputChange(subjectId, field, value) {
      setMarksData((prev) => ({
         ...prev,
         [subjectId]: {
            ...prev[subjectId],
            [field]: value,
         },
      }));
   }

   // Submit marks to backend
   async function handleSubmit(e) {
      e.preventDefault();
      setSaving(true);
      setError(null);
      setMessage(null);

      const subjectsPayload = subjects.map((sub) => ({
         subject: sub._id, // send subject ObjectId reference

         pca1: parseFloat(marksData[sub._id]?.pca1) || 0,
         pca2: parseFloat(marksData[sub._id]?.pca2) || 0,
         // final: parseFloat(marksData[sub._id]?.final) || 0,
         final: marksData[sub._id]?.final || "",
      }));

      try {
         const res = await fetch(`http://localhost:8000/api/v1/marks`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
               semesterNo: Number(semesterNo),
               subjects: subjectsPayload,
            }),
         });

         if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || "Failed to save marks.");
         }

         setMessage("Marks saved successfully!");
      } catch (err) {
         setError(err.message);
      } finally {
         setSaving(false);
      }
   }

   if (loadingStudent) {
      return (
         <p className="text-center mt-10 text-gray-600">
            Loading student info...
         </p>
      );
   }

   if (error && !student) {
      return <p className="text-center mt-10 text-red-600">{error}</p>;
   }

   if (!student) {
      return (
         <p className="text-center mt-10 text-gray-600">
            No student information available.
         </p>
      );
   }

   return (
      <main className="min-w-screen min-h-screen">
         {" "}
         <StudentHeader />
         <div className="max-w-5xl mx-auto p-6">
            <motion.h1
               className="text-3xl font-bold mb-6 text-center"
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
            >
               Lab Marks Management
            </motion.h1>

            {/* Semester Selector */}
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

            {(loadingSubjects || loadingMarks) && (
               <p className="text-center text-gray-600">Loading data...</p>
            )}

            {message && (
               <p className="text-center text-green-600 mb-4">{message}</p>
            )}
            {error && <p className="text-center text-red-600 mb-4">{error}</p>}

            {semesterNo && subjects.length > 0 && (
               <form onSubmit={handleSubmit} className="overflow-x-auto">
                  <table className=" border border-gray-300 rounded">
                     <thead className="bg-gray-100">
                        <tr>
                           <th className="border px-4 py-2 text-left">
                              Subject
                           </th>

                           <th className="border px-4 py-2">PCA1</th>
                           <th className="border px-4 py-2">PCA2</th>
                           <th className="border px-4 py-2">Final</th>
                        </tr>
                     </thead>
                     <tbody>
                        {subjects.map((subject) => (
                           <tr key={subject._id} className="hover:bg-gray-50">
                              <td className="border px-4 py-2 font-semibold">
                                 {subject.labSubjectName}
                              </td>
                              {Object.keys(initialMarksTemplate).map(
                                 (field) => (
                                    <td
                                       key={field}
                                       className="border px-2 py-1 text-center"
                                    >
                                       <input
                                          // type="number"
                                          min="0"
                                          max="25"
                                          className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                          value={
                                             marksData[subject._id]?.[field] ??
                                             ""
                                          }
                                          onChange={(e) =>
                                             handleInputChange(
                                                subject._id,
                                                field,
                                                e.target.value
                                             )
                                          }
                                          placeholder="0"
                                       />
                                    </td>
                                 )
                              )}
                           </tr>
                        ))}
                     </tbody>
                  </table>

                  <div className="flex justify-center mt-6">
                     <button
                        type="submit"
                        disabled={saving}
                        className={`px-6 py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
                           saving ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                     >
                        {saving ? "Saving..." : "Save Marks"}
                     </button>
                  </div>
               </form>
            )}

            {semesterNo && !loadingSubjects && subjects.length === 0 && (
               <p className="text-center text-gray-600">
                  No subjects found for this semester.
               </p>
            )}
         </div>
      </main>
   );
}
