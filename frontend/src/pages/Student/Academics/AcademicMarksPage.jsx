import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import StudentHeader from "../HeaderLinks/StudentHeader.jsx";
import LabSubjectsMarksTable from "./LabSubjectsMarksTable.jsx";
import SubjectsMarksTable from "./SubjectsMarksTable.jsx";

// Default structure for regular subjects
const initialMarksTemplate = {
   ca1: "",
   ca2: "",
   ca3: "",
   ca4: "",
   final: "",
};

// Default structure for lab subjects
const initialLabMarksTemplate = {
   pca1: "",
   pca2: "",
   final: "",
};

export default function AcademicMarksPage() {
   const token = useSelector((state) => state.auth.token);

   const [student, setStudent] = useState(null);
   const [semesterNo, setSemesterNo] = useState("");
   const [subjects, setSubjects] = useState([]);
   const [labSubjects, setLabSubjects] = useState([]);
   const [marksData, setMarksData] = useState({});
   const [labMarksData, setLabMarksData] = useState({});
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [message, setMessage] = useState(null);
   const [saving, setSaving] = useState(false);

   useEffect(() => {
      if (!token) return;

      async function fetchStudent() {
         try {
            const res = await fetch(
               "http://localhost:8000/api/v1/students/me",
               {
                  headers: { Authorization: `Bearer ${token}` },
               }
            );
            if (!res.ok) throw new Error("Failed to fetch student profile");
            const data = await res.json();
            setStudent(data);
         } catch (err) {
            setError(err.message);
         }
      }

      fetchStudent();
   }, [token]);

   useEffect(() => {
      if (!semesterNo || !student?.department?._id) {
         setSubjects([]);
         setLabSubjects([]);
         setMarksData({});
         setLabMarksData({});
         return;
      }

      async function fetchData() {
         setLoading(true);
         setError(null);
         setMessage(null);
         let labMarksJson = null;

         try {
            const depId = student.department._id;

            // Fetch subjects
            const resSub = await fetch(
               `http://localhost:8000/api/v1/subjects?department=${depId}&semesterNo=${semesterNo}`,
               { headers: { Authorization: `Bearer ${token}` } }
            );
            const subjectsData = resSub.ok ? await resSub.json() : [];
            setSubjects(subjectsData);

            // Fetch lab subjects
            const resLab = await fetch(
               `http://localhost:8000/api/v1/labSubjects?department=${depId}&semesterNo=${semesterNo}`,
               { headers: { Authorization: `Bearer ${token}` } }
            );
            const labSubjectsData = resLab.ok ? await resLab.json() : [];
            setLabSubjects(labSubjectsData);

            // Fetch regular subject marks
            const resMarks = await fetch(
               `http://localhost:8000/api/v1/marks/me`,
               {
                  headers: { Authorization: `Bearer ${token}` },
               }
            );
            const marksDataJson = await resMarks.json();
            const semesterMarks = marksDataJson.semesters?.find(
               (s) => s.semesterNo === Number(semesterNo)
            );

            const marksMap = {};
            (semesterMarks?.subjects || []).forEach((sub) => {
               const id = sub.subject?._id;
               if (id) {
                  marksMap[id] = {
                     ca1: sub.ca1 ?? "",
                     ca2: sub.ca2 ?? "",
                     ca3: sub.ca3 ?? "",
                     ca4: sub.ca4 ?? "",
                     final: sub.final ?? "",
                  };
               }
            });

            // Ensure all subject entries exist
            const filledMarks = {};
            subjectsData.forEach((sub) => {
               filledMarks[sub._id] = marksMap[sub._id] || {
                  ...initialMarksTemplate,
               };
            });
            setMarksData(filledMarks);

            // Fetch lab marks
            // const resLabMarks = await fetch(
            //    `http://localhost:8000/api/v1/labMarks/me`,
            //    {
            //       headers: { Authorization: `Bearer ${token}` },
            //    }
            // );
            // const labMarksJson = await resLabMarks.json();
            try {
               const resLabMarks = await fetch(
                  "http://localhost:8000/api/v1/labMarks/me",
                  {
                     headers: { Authorization: `Bearer ${token}` },
                  }
               );

               if (!resLabMarks.ok) {
                  throw new Error(`HTTP error! status: ${resLabMarks.status}`);
               }

               labMarksJson = await resLabMarks.json();

               console.log(labMarksJson);
            } catch (error) {
               console.error("Fetch error:", error);
            }

            // const semesterLabMarks = labMarksJson.semesters?.find(
            //    (s) => s.semesterNo === Number(semesterNo)
            // );

            const semesterLabMarks =
               labMarksJson && labMarksJson.semesters
                  ? labMarksJson.semesters.find(
                       (s) => s.semesterNo === Number(semesterNo)
                    )
                  : null;

            // const labMarksMap = {};
            // (semesterLabMarks?.labSubjects || []).forEach((sub) => {
            //    const id = sub.labSubject?._id;
            //    if (id) {
            //       labMarksMap[id] = {
            //          pca1: sub.pca1 ?? "",
            //          pca2: sub.pca2 ?? "",
            //          final: sub.final ?? "",
            //       };
            //    }
            // });
            const labMarksMap = {};
            (semesterLabMarks?.subjects || []).forEach((sub) => {
               const id = sub.labSubject?._id;
               if (id) {
                  labMarksMap[id] = {
                     pca1: sub.pca1 ?? "",
                     pca2: sub.pca2 ?? "",
                     final: sub.final ?? "",
                  };
               }
            });

            // Ensure all lab subject entries exist
            const filledLabMarks = {};
            labSubjectsData.forEach((sub) => {
               filledLabMarks[sub._id] = labMarksMap[sub._id] || {
                  ...initialLabMarksTemplate,
               };
            });
            setLabMarksData(filledLabMarks);
         } catch (err) {
            setError(err.message);
         } finally {
            setLoading(false);
         }
      }

      fetchData();
   }, [semesterNo, student, token]);

   const handleSubjectMarksChange = (subjectId, field, value) => {
      setMarksData((prev) => ({
         ...prev,
         [subjectId]: {
            ...prev[subjectId],
            [field]: value,
         },
      }));
   };

   const handleLabMarksChange = (subjectId, field, value) => {
      setLabMarksData((prev) => ({
         ...prev,
         [subjectId]: {
            ...prev[subjectId],
            [field]: value,
         },
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setSaving(true);
      setError(null);
      setMessage(null);

      const subjectsPayload = subjects.map((sub) => ({
         subject: sub._id,
         ca1: parseFloat(marksData[sub._id]?.ca1) || 0,
         ca2: parseFloat(marksData[sub._id]?.ca2) || 0,
         ca3: parseFloat(marksData[sub._id]?.ca3) || 0,
         ca4: parseFloat(marksData[sub._id]?.ca4) || 0,
         final: marksData[sub._id]?.final || "",
      }));

      const labSubjectsPayload = labSubjects.map((sub) => ({
         labSubject: sub._id,
         pca1: parseFloat(labMarksData[sub._id]?.pca1) || 0,
         pca2: parseFloat(labMarksData[sub._id]?.pca2) || 0,
         final: labMarksData[sub._id]?.final || "",
      }));

      try {
         const resMarks = await fetch(`http://localhost:8000/api/v1/marks`, {
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

         if (!resMarks.ok) {
            const errData = await resMarks.json();
            throw new Error(errData.error || "Failed to save regular marks.");
         }

         const resLabMarks = await fetch(
            `http://localhost:8000/api/v1/labMarks`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
               },
               body: JSON.stringify({
                  semesterNo: Number(semesterNo),
                  labSubjects: labSubjectsPayload,
               }),
            }
         );

         if (!resLabMarks.ok) {
            const errData = await resLabMarks.json();
            throw new Error(errData.error || "Failed to save lab marks.");
         }

         setMessage("Marks saved successfully!");
      } catch (err) {
         setError(err.message);
      } finally {
         setSaving(false);
      }
   };

   if (!token)
      return (
         <p className="text-center mt-10 text-red-600">
            Authentication required. Please log in.
         </p>
      );

   if (!student)
      return (
         <p className="text-center mt-10 text-gray-600">
            Loading student info...
         </p>
      );

   return (
      <main className="min-w-screen min-h-screen">
         <StudentHeader />
         <div className="max-w-5xl mx-auto p-6">
            <motion.h1
               className="text-3xl font-bold mb-6 text-center"
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
            >
               Academic & Lab Marks Management
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

            {loading && (
               <p className="text-center text-gray-600">Loading data...</p>
            )}
            {error && <p className="text-center text-red-600 mb-4">{error}</p>}
            {message && (
               <p className="text-center text-green-600 mb-4">{message}</p>
            )}

            {semesterNo && (
               <form
                  onSubmit={handleSubmit}
                  className="overflow-x-auto space-y-10"
               >
                  {subjects.length > 0 ? (
                     <SubjectsMarksTable
                        subjects={subjects}
                        marksData={marksData}
                        onMarksChange={handleSubjectMarksChange}
                     />
                  ) : (
                     !loading && (
                        <p className="text-center text-gray-600">
                           No subjects found for this semester.
                        </p>
                     )
                  )}

                  {labSubjects.length > 0 ? (
                     <LabSubjectsMarksTable
                        labSubjects={labSubjects}
                        marksData={labMarksData}
                        onMarksChange={handleLabMarksChange}
                     />
                  ) : (
                     !loading && (
                        <p className="text-center text-gray-600">
                           No lab subjects found for this semester.
                        </p>
                     )
                  )}

                  {(subjects.length > 0 || labSubjects.length > 0) && (
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
                  )}
               </form>
            )}
         </div>
      </main>
   );
}
