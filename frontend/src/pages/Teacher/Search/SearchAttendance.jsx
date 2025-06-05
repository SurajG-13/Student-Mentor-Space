import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const API_BASE = "http://localhost:8000/api/v1";

function SearchAttendance() {
   const token = localStorage.getItem("token");

   // State
   const [studentId, setStudentId] = useState("");
   const [semesters, setSemesters] = useState([]);
   const [subjects, setSubjects] = useState([]);
   const [semesterNo, setSemesterNo] = useState("");
   const [subjectId, setSubjectId] = useState("");
   const [studentName, setStudentName] = useState("");
   const [attendanceData, setAttendanceData] = useState({
      attendanceRecords: [],
      attendancePercentage: "0.00",
   });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const rollNumber = localStorage.getItem("inputValue");

   // Fetch student profile on mount to get studentId and currentSemester
   useEffect(() => {
      async function fetchProfile() {
         try {
            const res = await axios.get(
               `http://localhost:8000/api/v1/students/profile/${rollNumber}`,
               {
                  headers: { Authorization: `Bearer ${token}` },
               }
            );
            setStudentId(res.data._id);
            setStudentName(res.data.studentName);
            const currentSem = res.data.currentSemester || 1;
            setSemesters(Array.from({ length: currentSem }, (_, i) => i + 1));
         } catch {
            setError("Failed to load student profile.");
         }
      }
      fetchProfile();
   }, [token]);

   // Fetch subjects when semester changes
   useEffect(() => {
      if (!semesterNo) {
         setSubjects([]);
         setSubjectId("");
         return;
      }
      async function fetchSubjects() {
         try {
            setLoading(true);
            setError("");
            const profileRes = await axios.get(
               `${API_BASE}/students/profile/${rollNumber}`,
               {
                  headers: { Authorization: `Bearer ${token}` },
               }
            );
            const departmentId = profileRes.data.department._id;

            const res = await axios.get(
               `${API_BASE}/subjects?department=${departmentId}&semesterNo=${semesterNo}`,
               { headers: { Authorization: `Bearer ${token}` } }
            );
            setSubjects(res.data);
            setSubjectId("");
         } catch {
            setError("Failed to load subjects.");
            setSubjects([]);
         } finally {
            setLoading(false);
         }
      }
      fetchSubjects();
   }, [semesterNo, token]);

   useEffect(() => {
      if (!subjectId || !studentId || !semesterNo) {
         setAttendanceData({
            attendanceRecords: [],
            attendancePercentage: "0.00",
         });
         return;
      }
      async function fetchAttendance() {
         try {
            setLoading(true);
            setError("");
            const res = await axios.get(
               `${API_BASE}/attendances?student=${studentId}&subject=${subjectId}&currentSemester=${semesterNo}`,
               { headers: { Authorization: `Bearer ${token}` } }
            );

            const dataArray = res.data; // This is an array

            if (!Array.isArray(dataArray) || dataArray.length === 0) {
               setAttendanceData({
                  attendanceRecords: [],
                  attendancePercentage: "0.00",
               });
               setLoading(false);
               return;
            }

            // Combine attendanceRecords from all docs
            let allRecords = [];
            dataArray.forEach((doc) => {
               if (Array.isArray(doc.attendanceRecords)) {
                  allRecords = allRecords.concat(doc.attendanceRecords);
               }
            });

            // Remove duplicates by date (keep latest status)
            const recordMap = new Map();
            allRecords.forEach((rec) => {
               const dateKey = rec.date.slice(0, 10);
               recordMap.set(dateKey, rec.status);
            });

            const uniqueRecords = Array.from(recordMap.entries()).map(
               ([date, status]) => ({
                  date,
                  status,
               })
            );

            // Calculate attendance percentage
            const totalClasses = uniqueRecords.length;
            const attendedClasses = uniqueRecords.filter(
               (r) => r.status === "present"
            ).length;
            const attendancePercentage =
               totalClasses === 0
                  ? "0.00"
                  : ((attendedClasses / totalClasses) * 100).toFixed(2);

            setAttendanceData({
               attendanceRecords: uniqueRecords,
               attendancePercentage,
            });
         } catch (err) {
            setError("Failed to load attendance.");
            setAttendanceData({
               attendanceRecords: [],
               attendancePercentage: "0.00",
            });
         } finally {
            setLoading(false);
         }
      }
      fetchAttendance();
   }, [subjectId, studentId, semesterNo, token]);

   return (
      <main className="min-h-screen min-w-screen">
         <div className="p-6 min-h-screen max-w-5xl mx-auto">
            {error && (
               <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
                  {error}
               </div>
            )}

            <div className="flex justify-center items-center gap-4">
               <div className="mb-4">
                  <label className="mr-2 font-semibold">Student</label>
                  <input
                     value={studentName}
                     className=" p-2 rounded-lg border"
                     disabled
                  />
               </div>
               {/* Semester selection */}
               <div className="mb-4">
                  <label className="mr-2 font-semibold">Select Semester:</label>
                  <select
                     value={semesterNo}
                     onChange={(e) => setSemesterNo(e.target.value)}
                     className="border p-2 rounded"
                  >
                     <option value="">-- Select Semester --</option>
                     {semesters.map((sem) => (
                        <option key={sem} value={sem}>
                           Semester {sem}
                        </option>
                     ))}
                  </select>
               </div>

               {/* Subject selection */}
               {semesterNo && (
                  <div className="mb-4">
                     <label className="mr-2 font-semibold">
                        Select Subject:
                     </label>
                     <select
                        value={subjectId}
                        onChange={(e) => setSubjectId(e.target.value)}
                        className="border p-2 rounded"
                        disabled={loading || subjects.length === 0}
                     >
                        <option value="">-- Select Subject --</option>
                        {subjects.map((subj) => (
                           <option key={subj._id} value={subj._id}>
                              {subj.subjectName}
                           </option>
                        ))}
                     </select>
                  </div>
               )}
            </div>
            {/* Attendance Percentage */}
            <div className="mb-4 font-semibold text-lg flex justify-center items-center p-8">
               <span
                  className={`flex items-center gap-1 ${
                     attendanceData.attendancePercentage < 75
                        ? "text-red-600"
                        : "text-green-600"
                  }`}
               >
                  Attendance Percentage : {attendanceData.attendancePercentage}%
               </span>
            </div>
            {/* Attendance Table */}
            {loading ? (
               <div>Loading attendance...</div>
            ) : attendanceData.attendanceRecords.length === 0 ? (
               <div>No attendance records found.</div>
            ) : (
               <div className="overflow-x-auto border rounded">
                  <table className="min-w-full border-collapse border border-gray-300">
                     <thead>
                        <tr className="bg-gray-100">
                           <th className="border p-2 sticky left-0 bg-gray-100 z-10">
                              Date
                           </th>
                           <th className="border p-2">Status</th>
                        </tr>
                     </thead>
                     <tbody>
                        {attendanceData.attendanceRecords.map(
                           ({ date, status }) => (
                              <tr key={date}>
                                 <td className="border p-2 sticky left-0 bg-white z-0">
                                    {dayjs(date).format("MMM D, YYYY")}
                                 </td>
                                 <td className="border p-2 text-center">
                                    {status === "present"
                                       ? "Present"
                                       : status === "absent"
                                         ? "Absent"
                                         : status === "leave"
                                           ? "Leave"
                                           : "-"}
                                 </td>
                              </tr>
                           )
                        )}
                     </tbody>
                  </table>
               </div>
            )}
         </div>
      </main>
   );
}

export default SearchAttendance;
