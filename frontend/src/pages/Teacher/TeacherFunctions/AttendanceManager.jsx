import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import TeacherHeader from "../HomePage/TeacherHeader";

const API_BASE = "http://localhost:8000/api/v1";

function AttendanceManager() {
   const token = localStorage.getItem("token");

   // State
   const [departments, setDepartments] = useState([]);
   const [subjects, setSubjects] = useState([]);
   const [students, setStudents] = useState([]);
   const [attendance, setAttendance] = useState({});
   const [semesterNo, setSemesterNo] = useState("");
   const [departmentId, setDepartmentId] = useState("");
   const [subjectId, setSubjectId] = useState("");
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");
   const [dates, setDates] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   // Fetch departments on mount
   useEffect(() => {
      axios
         .get(`${API_BASE}/departments`, {
            headers: { Authorization: `Bearer ${token}` },
         })
         .then((res) => setDepartments(res.data))
         .catch(() => setError("Failed to load departments"));
   }, []);

   // Fetch subjects when department/semester changes
   useEffect(() => {
      if (departmentId && semesterNo) {
         axios
            .get(
               `${API_BASE}/subjects?department=${departmentId}&semesterNo=${semesterNo}`,
               {
                  headers: { Authorization: `Bearer ${token}` },
               }
            )
            .then((res) => setSubjects(res.data))
            .catch(() => setSubjects([]));
      } else {
         setSubjects([]);
      }
   }, [departmentId, semesterNo]);

   // Fetch students when department/semester changes
   useEffect(() => {
      if (departmentId && semesterNo) {
         axios
            .get(
               `${API_BASE}/students?department=${departmentId}&semester=${semesterNo}`,
               {
                  headers: { Authorization: `Bearer ${token}` },
               }
            )
            .then((res) => setStudents(res.data))
            .catch(() => setStudents([]));
      } else {
         setStudents([]);
      }
   }, [departmentId, semesterNo]);

   // Generate dates between start and end
   useEffect(() => {
      if (startDate && endDate) {
         let arr = [];
         let cur = dayjs(startDate);
         const last = dayjs(endDate);
         while (cur.isBefore(last) || cur.isSame(last, "day")) {
            arr.push(cur.format("YYYY-MM-DD"));
            cur = cur.add(1, "day");
         }
         setDates(arr);
      } else {
         setDates([]);
      }
   }, [startDate, endDate]);

   // Fetch attendance when subject changes
   //    useEffect(() => {
   //       if (subjectId && students.length > 0) {
   //          setLoading(true);
   //          // Assume API returns attendance records for all students for this subject
   //          axios
   //             .get(`${API_BASE}/attendances?subject=${subjectId}`, {
   //                headers: { Authorization: `Bearer ${token}` },
   //             })
   //             .then((res) => {
   //                // Map attendance: { studentId: { date: status } }
   //                const attMap = {};
   //                res.data.forEach((record) => {
   //                   attMap[record.student._id] = {};
   //                   record.attendanceRecords.forEach((ar) => {
   //                      attMap[record.student._id][ar.date.slice(0, 10)] =
   //                         ar.status;
   //                   });
   //                });
   //                setAttendance(attMap);
   //             })
   //             .catch(() => setAttendance({}))
   //             .finally(() => setLoading(false));
   //       } else {
   //          setAttendance({});
   //       }
   //    }, [subjectId, students]);

   useEffect(() => {
      if (subjectId && students.length > 0) {
         setLoading(true);
         axios
            .get(`${API_BASE}/attendances?subject=${subjectId}`, {
               headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
               const data = res.data;
               if (data.length === 0) {
                  // No attendance records yet, initialize empty attendance map
                  setAttendance({});
               } else {
                  const attMap = {};
                  data.forEach((record) => {
                     attMap[record.student._id] = {};
                     record.attendanceRecords.forEach((ar) => {
                        attMap[record.student._id][ar.date.slice(0, 10)] =
                           ar.status;
                     });
                  });
                  setAttendance(attMap);
               }
            })
            .catch(() => setAttendance({}))
            .finally(() => setLoading(false));
      } else {
         setAttendance({});
      }
   }, [subjectId, students]);

   // Handle attendance change
   const handleAttendanceChange = (studentId, date, status) => {
      setAttendance((prev) => ({
         ...prev,
         [studentId]: { ...prev[studentId], [date]: status },
      }));
   };

   // Save attendance
   //    const handleSave = async () => {
   //       setLoading(true);
   //       setError("");
   //       try {
   //          for (const student of students) {
   //             const records = dates
   //                .filter((date) => attendance[student._id]?.[date])
   //                .map((date) => ({
   //                   date,
   //                   status: attendance[student._id][date],
   //                }));

   //             await axios
   //                .post(
   //                   `${API_BASE}/attendance`,
   //                   {
   //                      student: student._id,
   //                      subject: subjectId,
   //                      semesterNo: Number(semesterNo),
   //                      department: departmentId,
   //                      attendanceRecords: records,
   //                   },
   //                   { headers: { Authorization: `Bearer ${token}` } }
   //                )
   //                .catch((err) => {
   //                   console.error(
   //                      "Attendance save error:",
   //                      err.response?.data || err.message
   //                   );
   //                   setError(
   //                      err.response?.data?.error || "Failed to save attendance."
   //                   );
   //                });
   //          }
   //          alert("Attendance saved successfully!");
   //       } catch (err) {
   //          setError("Failed to save attendance.");
   //       }
   //       setLoading(false);
   //    };
   const handleSave = async () => {
      setLoading(true);
      setError("");
      let errorOccurred = false;

      try {
         for (const student of students) {
            const records = dates
               .filter((date) => attendance[student._id]?.[date])
               .map((date) => ({
                  date,
                  status: attendance[student._id][date],
               }));

            // Skip saving if no attendance marked for this student
            if (records.length === 0) continue;

            try {
               await axios.post(
                  `${API_BASE}/attendances`,
                  {
                     student: student._id,
                     subject: subjectId,
                     currentSemester: Number(semesterNo), // Use currentSemester for consistency
                     department: departmentId,
                     attendanceRecords: records,
                  },
                  { headers: { Authorization: `Bearer ${token}` } }
               );
            } catch (err) {
               // Log and show error for this student, then stop further saves
               console.error(
                  `Attendance save error for ${student.studentName}:`,
                  err.response?.data || err.message
               );
               setError(
                  `Failed to save attendance for ${student.studentName}: ${err.response?.data?.error || err.message}`
               );
               errorOccurred = true;
               break; // Stop further requests on first error (optional)
            }
         }

         if (!errorOccurred) {
            alert("Attendance saved successfully!");
         }
      } catch (err) {
         setError("Unexpected error occurred while saving attendance.");
         console.error("Unexpected attendance save error:", err);
      }
      setLoading(false);
   };

   return (
      <main className="min-h-screen">
         <TeacherHeader />

         {error && (
            <div className="bg-red-100 text-red-700 p-2 mb-2">{error}</div>
         )}

         {/* Department, Semester, Subject selection */}
         <div className="flex justify-center items-center gap-8  mb-4 flex-wrap mt-12">
            <select
               value={departmentId}
               onChange={(e) => setDepartmentId(e.target.value)}
               className="border p-2 rounded"
            >
               <option value="">Select Department</option>
               {departments.map((d) => (
                  <option key={d._id} value={d._id}>
                     {d.departmentName}
                  </option>
               ))}
            </select>

            <select
               value={semesterNo}
               onChange={(e) => setSemesterNo(e.target.value)}
               className="border p-2 rounded"
            >
               <option value="">Select Semester</option>
               {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                     {s}
                  </option>
               ))}
            </select>

            <select
               value={subjectId}
               onChange={(e) => setSubjectId(e.target.value)}
               className="border p-2 rounded"
               disabled={!subjects.length}
            >
               <option value="">Select Subject</option>
               {subjects.map((s) => (
                  <option key={s._id} value={s._id}>
                     {s.subjectName}
                  </option>
               ))}
            </select>
         </div>

         {/* Semester duration */}
         <div className="flex  items-center justify-center gap-8 mb-4 flex-wrap">
            <label>
               Start Date:
               <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="ml-2 border p-2 rounded"
               />
            </label>

            <label>
               End Date:
               <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="ml-2 border p-2 rounded"
                  min={startDate}
               />
            </label>
         </div>

         {/* Attendance Table */}
         {loading ? (
            <div>Loading...</div>
         ) : students.length === 0 ? (
            <p className="flex justify-center mt-24 text-xl font-bold text-red-600">
               No Students Found for Selected Department and Semester.
            </p>
         ) : dates.length === 0 ? (
            <p className="flex justify-center mt-24 text-xl font-bold text-red-600">
               Please Select a Semester Duration to Mark Attendance.
            </p>
         ) : (
            <div className="overflow-x-auto">
               <table className="min-w-full border border-collapse border-gray-300">
                  {/* <thead>
                     <tr className="bg-gray-100">
                        <th className="border p-2 sticky left-0 bg-gray-100 z-10">
                           Roll Number
                        </th>
                        <th className="border p-2 sticky left-0 bg-gray-100 z-10">
                           Student Name
                        </th>
                        {dates.map((date) => (
                           <th key={date} className="border p-2">
                              {dayjs(date).format("MMM D")}
                           </th>
                        ))}
                     </tr>
                  </thead> 
                  <tbody>
                     {students.map((student) => (
                        <tr key={student._id}>
                           <td className="border p-2 sticky left-0 bg-white z-0">
                              {student.rollNumber}
                           </td>
                           <td className="border p-2 sticky left-0 bg-white z-0">
                              {student.studentName}
                           </td>
                           {dates.map((date) => (
                              <td key={date} className="border p-1 text-center">
                                 <select
                                    value={
                                       attendance[student._id]?.[date] || ""
                                    }
                                    onChange={(e) =>
                                       handleAttendanceChange(
                                          student._id,
                                          date,
                                          e.target.value
                                       )
                                    }
                                    className="border rounded p-1 w-full"
                                 >
                                    <option value="">-</option>
                                    <option value="present">P</option>
                                    <option value="absent">A</option>
                                    <option value="leave">L</option>
                                 </select>
                              </td>
                           ))}
                        </tr>
                     ))}
                  </tbody>*/}
                  <thead>
                     <tr className="bg-lightBackground dark:bg-darkBackground pt-12">
                        <th
                           className="border p-2 sticky left-0 text-primaryBlack dark:text-primaryWhite z-20"
                           style={{ minWidth: 120, left: 0 }}
                        >
                           Roll Number
                        </th>
                        <th
                           className="border p-2 sticky left-[120px] bg-gray-100 z-20"
                           style={{ minWidth: 200, left: 120 }}
                        >
                           Student Name
                        </th>
                        {dates.map((date) => (
                           <th key={date} className="border p-2">
                              {dayjs(date).format("MMM D")}
                           </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                     {students.map((student) => (
                        <tr key={student._id}>
                           <td
                              className="border p-2 sticky left-0 bg-white z-10"
                              style={{ minWidth: 120, left: 0 }}
                           >
                              {student.rollNumber}
                           </td>
                           <td
                              className="border p-2 sticky left-[120px] bg-white z-10"
                              style={{ minWidth: 200, left: 120 }}
                           >
                              {student.studentName}
                           </td>
                           {dates.map((date) => (
                              <td key={date} className="border p-1 text-center">
                                 <select
                                    value={
                                       attendance[student._id]?.[date] || ""
                                    }
                                    onChange={(e) =>
                                       handleAttendanceChange(
                                          student._id,
                                          date,
                                          e.target.value
                                       )
                                    }
                                    className="border rounded p-1 w-full"
                                 >
                                    <option value="">-</option>
                                    <option value="present">P</option>
                                    <option value="absent">A</option>
                                    <option value="leave">L</option>
                                 </select>
                              </td>
                           ))}
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         )}
         {/* 
         <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            onClick={handleSave}
            disabled={
               loading ||
               !subjectId ||
               !startDate ||
               !endDate ||
               students.length === 0
            }
         >
            Save Attendance
         </button> */}

         {!loading &&
            subjectId &&
            startDate &&
            endDate &&
            students.length > 0 && (
               <button
                  className="border-red-900 border-4 mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={handleSave}
               >
                  Save Attendance
               </button>
            )}
      </main>
   );
}

export default AttendanceManager;
