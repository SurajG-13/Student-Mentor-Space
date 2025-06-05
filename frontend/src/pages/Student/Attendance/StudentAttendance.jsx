// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import dayjs from "dayjs";

// const API_BASE = "http://localhost:8000/api/v1";

// function StudentAttendance() {
//    const token = localStorage.getItem("token");

//    // State
//    const [studentId, setStudentId] = useState(""); // You may get this from auth token or profile API
//    const [semesters, setSemesters] = useState([]); // List of semesters student attended
//    const [subjects, setSubjects] = useState([]);
//    const [semesterNo, setSemesterNo] = useState("");
//    const [subjectId, setSubjectId] = useState("");
//    const [attendanceRecords, setAttendanceRecords] = useState([]);
//    const [dates, setDates] = useState([]);
//    const [loading, setLoading] = useState(false);
//    const [error, setError] = useState("");

//    // Fetch student info on mount (to get studentId and semesters)
//    useEffect(() => {
//       async function fetchStudentProfile() {
//          try {
//             const res = await axios.get(`${API_BASE}/students/me`, {
//                headers: { Authorization: `Bearer ${token}` },
//             });
//             setStudentId(res.data._id);

//             // Assuming student profile has currentSemester or semesters attended
//             // For demo, we create semesters 1 to currentSemester
//             const currentSem = res.data.currentSemester || 1;
//             const sems = [];
//             for (let i = 1; i <= currentSem; i++) sems.push(i);
//             setSemesters(sems);
//          } catch (err) {
//             setError("Failed to load student profile.");
//          }
//       }
//       fetchStudentProfile();
//    }, [token]);

//    // Fetch subjects when semester changes
//    useEffect(() => {
//       if (!semesterNo) {
//          setSubjects([]);
//          setSubjectId("");
//          return;
//       }
//       async function fetchSubjects() {
//          try {
//             setLoading(true);
//             // Assuming API to get subjects for student's department and semester
//             // First get student profile to get department
//             const profileRes = await axios.get(`${API_BASE}/students/me`, {
//                headers: { Authorization: `Bearer ${token}` },
//             });
//             const departmentId = profileRes.data.department._id;

//             const res = await axios.get(
//                `${API_BASE}/subjects?department=${departmentId}&semesterNo=${semesterNo}`,
//                { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setSubjects(res.data);
//             setSubjectId("");
//          } catch (err) {
//             setError("Failed to load subjects.");
//          } finally {
//             setLoading(false);
//          }
//       }
//       fetchSubjects();
//    }, [semesterNo, token]);

//    // Fetch attendance when subject changes
//    useEffect(() => {
//       if (!subjectId || !studentId) {
//          setAttendanceRecords([]);
//          setDates([]);
//          return;
//       }
//       async function fetchAttendance() {
//          try {
//             setLoading(true);
//             const res = await axios.get(
//                `${API_BASE}/attendances?student=${studentId}&subject=${subjectId}`,
//                { headers: { Authorization: `Bearer ${token}` } }
//             );

//             const attendanceData = res.data;

//             if (!Array.isArray(attendanceData) || attendanceData.length === 0) {
//                setAttendanceRecords([]);
//                setDates([]);
//                return;
//             }

//             // Assuming attendanceData is an array with one or more attendance docs
//             // We'll merge all attendanceRecords from all docs
//             let allRecords = [];
//             attendanceData.forEach((doc) => {
//                allRecords = allRecords.concat(doc.attendanceRecords);
//             });

//             // Remove duplicates by date and sort
//             const uniqueDatesMap = {};
//             allRecords.forEach((rec) => {
//                uniqueDatesMap[rec.date.slice(0, 10)] = rec.status;
//             });

//             const sortedDates = Object.keys(uniqueDatesMap).sort();

//             setDates(sortedDates);
//             setAttendanceRecords(uniqueDatesMap);
//          } catch (err) {
//             setError("Failed to load attendance.");
//          } finally {
//             setLoading(false);
//          }
//       }
//       fetchAttendance();
//    }, [subjectId, studentId, token]);

//    return (
//       <div className="p-6 min-h-screen max-w-5xl mx-auto">
//          <h2 className="text-2xl font-bold mb-4">My Attendance</h2>
//          {error && (
//             <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
//                {error}
//             </div>
//          )}

//          {/* Semester selection */}
//          <div className="mb-4">
//             <label className="mr-2 font-semibold">Select Semester:</label>
//             <select
//                value={semesterNo}
//                onChange={(e) => setSemesterNo(e.target.value)}
//                className="border p-2 rounded"
//             >
//                <option value="">-- Select Semester --</option>
//                {semesters.map((sem) => (
//                   <option key={sem} value={sem}>
//                      Semester {sem}
//                   </option>
//                ))}
//             </select>
//          </div>

//          {/* Subject selection */}
//          {semesterNo && (
//             <div className="mb-4">
//                <label className="mr-2 font-semibold">Select Subject:</label>
//                <select
//                   value={subjectId}
//                   onChange={(e) => setSubjectId(e.target.value)}
//                   className="border p-2 rounded"
//                   disabled={loading || subjects.length === 0}
//                >
//                   <option value="">-- Select Subject --</option>
//                   {subjects.map((subj) => (
//                      <option key={subj._id} value={subj._id}>
//                         {subj.subjectName}
//                      </option>
//                   ))}
//                </select>
//             </div>
//          )}

//          {/* Attendance Table */}
//          {loading ? (
//             <div>Loading attendance...</div>
//          ) : dates.length === 0 ? (
//             <div>No attendance records found.</div>
//          ) : (
//             <div className="overflow-x-auto border rounded">
//                <table className="min-w-full border-collapse border border-gray-300">
//                   <thead>
//                      <tr className="bg-gray-100">
//                         <th className="border p-2 sticky left-0 bg-gray-100 z-10">
//                            Date
//                         </th>
//                         <th className="border p-2">Status</th>
//                      </tr>
//                   </thead>
//                   <tbody>
//                      {dates.map((date) => (
//                         <tr key={date}>
//                            <td className="border p-2 sticky left-0 bg-white z-0">
//                               {dayjs(date).format("MMM D, YYYY")}
//                            </td>
//                            <td className="border p-2 text-center">
//                               {attendanceRecords[date] === "present"
//                                  ? "Present"
//                                  : attendanceRecords[date] === "absent"
//                                    ? "Absent"
//                                    : attendanceRecords[date] === "leave"
//                                      ? "Holiday"
//                                      : "-"}
//                            </td>
//                         </tr>
//                      ))}
//                   </tbody>
//                </table>
//             </div>
//          )}
//       </div>
//    );
// }

// export default StudentAttendance;

import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import StudentHeader from "../HeaderLinks/StudentHeader.jsx";

const API_BASE = "http://localhost:8000/api/v1";

function StudentAttendance() {
   const token = localStorage.getItem("token");

   // State
   const [studentId, setStudentId] = useState("");
   const [semesters, setSemesters] = useState([]);
   const [subjects, setSubjects] = useState([]);
   const [semesterNo, setSemesterNo] = useState("");
   const [subjectId, setSubjectId] = useState("");
   const [attendanceData, setAttendanceData] = useState({
      attendanceRecords: [],
      attendancePercentage: "0.00",
   });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   // Fetch student profile on mount to get studentId and currentSemester
   useEffect(() => {
      async function fetchProfile() {
         try {
            const res = await axios.get(`${API_BASE}/students/me`, {
               headers: { Authorization: `Bearer ${token}` },
            });
            setStudentId(res.data._id);
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
            const profileRes = await axios.get(`${API_BASE}/students/me`, {
               headers: { Authorization: `Bearer ${token}` },
            });
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

   // Fetch attendance + percentage when subject changes
   //    useEffect(() => {
   //       if (!subjectId || !studentId || !semesterNo) {
   //          setAttendanceData({
   //             attendanceRecords: [],
   //             attendancePercentage: "0.00",
   //          });
   //          return;
   //       }
   //       async function fetchAttendance() {
   //          try {
   //             setLoading(true);
   //             setError("");
   //             const res = await axios.get(
   //                `${API_BASE}/attendances?student=${studentId}&subject=${subjectId}&currentSemester=${semesterNo}`,
   //                { headers: { Authorization: `Bearer ${token}` } }
   //             );

   //             // Defensive defaults
   //             const data = res.data || {};
   //             setAttendanceData({
   //                attendanceRecords: Array.isArray(data.attendanceRecords)
   //                   ? data.attendanceRecords
   //                   : [],
   //                attendancePercentage: data.attendancePercentage || "0.00",
   //             });
   //          } catch {
   //             setError("Failed to load attendance.");
   //             setAttendanceData({
   //                attendanceRecords: [],
   //                attendancePercentage: "0.00",
   //             });
   //          } finally {
   //             setLoading(false);
   //          }
   //       }
   //       fetchAttendance();
   //    }, [subjectId, studentId, semesterNo, token]);
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
         <StudentHeader />
         <div className="p-6 min-h-screen max-w-5xl mx-auto">
            <h2 className="text-4xl flex items-center justify-center font-bold mb-4">
               Attendance Viewer
            </h2>
            {error && (
               <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
                  {error}
               </div>
            )}

            <article className="mt-10 flex items-center justify-evenly">
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
            </article>
            {/* Attendance Percentage
            <div className="mb-4 mt-6 flex items-center justify-center font-semibold text-lg">
               Your Attendance Percentage :{" "}
               {attendanceData.attendancePercentage}%
            </div> */}
            <div className="mb-4 mt-6 flex items-center justify-center font-semibold text-lg">
               <span className="mr-2">Your Attendance Percentage :</span>
               <span
                  className={`flex items-center gap-1 ${
                     attendanceData.attendancePercentage < 75
                        ? "text-red-600"
                        : "text-green-600"
                  }`}
               >
                  {attendanceData.attendancePercentage}%
               </span>
            </div>

            {/* Attendance Table */}
            {loading ? (
               <div>Loading attendance...</div>
            ) : attendanceData.attendanceRecords.length === 0 ? (
               <div className="text-3xl text-red-600 flex items-center justify-center mt-24">
                  No Attendance Records Found.
               </div>
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

export default StudentAttendance;
