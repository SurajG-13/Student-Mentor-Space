// // import React from "react";
// // import { Link } from "react-router-dom";
// // import S_Sidebar from "../S_Sidebar";
// // import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

// // const S_Academics = () => {
// //    return (
// //       <>
// //          <main className="w-full h-screen flex flex-row relative">
// //             <S_Sidebar />
// //             <section className="ml-[5rem] w-full h-screen">
// //                <div className="mt-6 flex justify-center text-4xl">
// //                   Academic Performance
// //                </div>

// //                <section className="m-2 pb-8 grid grid-cols-4 gap-6">
// //                   <div className=" mt-12 ml-6 w-[275px] p-4 h-fit rounded-md border">
// //                      <Link to="/sem1">
// //                         <h1 className="inline-flex items-center text-lg">
// //                            Semester - 1{" "}
// //                            <ArrowUpRightIcon className="ml-4 h-4 w-4" />
// //                         </h1>
// //                         <p className="mt-6 pb-6 text-sm text-gray-600">
// //                            Track your Academic Performance <br />
// //                            Throughout the Semester.
// //                         </p>
// //                         <button
// //                            type="button"
// //                            className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
// //                         >
// //                            Details
// //                         </button>
// //                      </Link>
// //                   </div>

// //                   <div className=" mt-12 ml-6 w-[275px] p-4 h-fit rounded-md border">
// //                      <h1 className="inline-flex items-center text-lg">
// //                         Semester - 2{" "}
// //                         <ArrowUpRightIcon className="ml-4 h-4 w-4" />
// //                      </h1>
// //                      <p className="mt-6 pb-6 text-sm text-gray-600">
// //                         Track your Academic Performance <br />
// //                         Throughout the Semester.
// //                      </p>
// //                      <button
// //                         type="button"
// //                         className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
// //                      >
// //                         Details
// //                      </button>
// //                   </div>

// //                   <div className=" mt-12 ml-6 w-[275px] p-4 h-fit rounded-md border">
// //                      <h1 className="inline-flex items-center text-lg">
// //                         Semester - 3{" "}
// //                         <ArrowUpRightIcon className="ml-4 h-4 w-4" />
// //                      </h1>
// //                      <p className="mt-6 pb-6 text-sm text-gray-600">
// //                         Track your Academic Performance <br />
// //                         Throughout the Semester.
// //                      </p>
// //                      <button
// //                         type="button"
// //                         className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
// //                      >
// //                         Details
// //                      </button>
// //                   </div>

// //                   <div className=" mt-12 ml-6 w-[275px] p-4 h-fit rounded-md border">
// //                      <h1 className="inline-flex items-center text-lg">
// //                         Semester - 4{" "}
// //                         <ArrowUpRightIcon className="ml-4 h-4 w-4" />
// //                      </h1>
// //                      <p className="mt-6 pb-6 text-sm text-gray-600">
// //                         Track your Academic Performance <br />
// //                         Throughout the Semester.
// //                      </p>
// //                      <button
// //                         type="button"
// //                         className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
// //                      >
// //                         Details
// //                      </button>
// //                   </div>

// //                   <div className=" mt-12 ml-6 w-[275px] p-4 h-fit rounded-md border">
// //                      <h1 className="inline-flex items-center text-lg">
// //                         Semester - 5{" "}
// //                         <ArrowUpRightIcon className="ml-4 h-4 w-4" />
// //                      </h1>
// //                      <p className="mt-6 pb-6 text-sm text-gray-600">
// //                         Track your Academic Performance <br />
// //                         Throughout the Semester.
// //                      </p>
// //                      <button
// //                         type="button"
// //                         className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
// //                      >
// //                         Details
// //                      </button>
// //                   </div>

// //                   <div className=" mt-12 ml-6 w-[275px] p-4 h-fit rounded-md border">
// //                      <h1 className="inline-flex items-center text-lg">
// //                         Semester - 6{" "}
// //                         <ArrowUpRightIcon className="ml-4 h-4 w-4" />
// //                      </h1>
// //                      <p className="mt-6 pb-6 text-sm text-gray-600">
// //                         Track your Academic Performance <br />
// //                         Throughout the Semester.
// //                      </p>
// //                      <button
// //                         type="button"
// //                         className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
// //                      >
// //                         Details
// //                      </button>
// //                   </div>

// //                   <div className=" mt-12 ml-6 w-[275px] p-4 h-fit rounded-md border">
// //                      <h1 className="inline-flex items-center text-lg">
// //                         Semester - 7{" "}
// //                         <ArrowUpRightIcon className="ml-4 h-4 w-4" />
// //                      </h1>
// //                      <p className="mt-6 pb-6 text-sm text-gray-600">
// //                         Track your Academic Performance <br />
// //                         Throughout the Semester.
// //                      </p>
// //                      <button
// //                         type="button"
// //                         className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
// //                      >
// //                         Details
// //                      </button>
// //                   </div>

// //                   <div className=" mt-12 ml-6 w-[275px] p-4 h-fit rounded-md border">
// //                      <h1 className="inline-flex items-center text-lg">
// //                         Semester - 8{" "}
// //                         <ArrowUpRightIcon className="ml-4 h-4 w-4" />
// //                      </h1>
// //                      <p className="mt-6 pb-6 text-sm text-gray-600">
// //                         Track your Academic Performance <br />
// //                         Throughout the Semester.
// //                      </p>
// //                      <button
// //                         type="button"
// //                         className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
// //                      >
// //                         Details
// //                      </button>
// //                   </div>
// //                </section>
// //             </section>
// //          </main>
// //       </>
// //    );
// // };

// // export default S_Academics;

// // src/components/S_Marks.jsx

// // import React, { useEffect, useState } from "react";
// // import { motion } from "framer-motion";

// // const initialMarksTemplate = {
// //    ca1: "",
// //    ca2: "",
// //    ca3: "",
// //    ca4: "",
// //    pca1: "",
// //    pca2: "",
// //    final: "",
// // };

// // export default function S_Academics({ token }) {
// //    const [student, setStudent] = useState(null);
// //    const [semesterNo, setSemesterNo] = useState("");
// //    const [subjects, setSubjects] = useState([]);
// //    const [marksData, setMarksData] = useState({});
// //    const [loadingStudent, setLoadingStudent] = useState(true);
// //    const [loadingSubjects, setLoadingSubjects] = useState(false);
// //    const [loadingMarks, setLoadingMarks] = useState(false);
// //    const [saving, setSaving] = useState(false);
// //    const [message, setMessage] = useState(null);
// //    const [error, setError] = useState(null);

// //    // Fetch logged-in student profile on mount or when token changes
// //    useEffect(() => {
// //       if (!token) {
// //          setError("Authentication token is missing.");
// //          setLoadingStudent(false);
// //          return;
// //       }

// //       async function fetchStudentProfile() {
// //          setLoadingStudent(true);
// //          setError(null);
// //          try {
// //             const res = await fetch(
// //                `http://localhost:8000/api/v1/students/me`,
// //                {
// //                   headers: { Authorization: `Bearer ${token}` },
// //                }
// //             );

// //             if (!res.ok) {
// //                const errorText = await res.text();
// //                console.error(
// //                   "Failed to fetch student profile:",
// //                   res.status,
// //                   errorText
// //                );
// //                throw new Error(
// //                   `Failed to fetch student profile: ${res.status}`
// //                );
// //             }

// //             const data = await res.json();
// //             setStudent(data);
// //          } catch (err) {
// //             console.error("Error fetching student profile:", err);
// //             setError(err.message);
// //          } finally {
// //             setLoadingStudent(false);
// //          }
// //       }

// //       fetchStudentProfile();
// //    }, [token]);

// //    // Fetch subjects when semester or student.department changes
// //    useEffect(() => {
// //       if (!semesterNo || !student?.department?.departmentName) {
// //          setSubjects([]);
// //          setMarksData({});
// //          return;
// //       }

// //       async function fetchSubjects() {
// //          setLoadingSubjects(true);
// //          setError(null);
// //          setMessage(null);
// //          try {
// //             // const res = await fetch(
// //             //    `http://localhost:8000/api/v1/subjects?department=${encodeURIComponent(
// //             //       student.department.departmentName
// //             //    )}&semesterNo=${semesterNo}`,
// //             //    {
// //             //       headers: { Authorization: `Bearer ${token}` },
// //             //    }
// //             // );

// //             const res = await fetch(
// //                `http://localhost:8000/api/v1/subjects?department=${student.department._id}&semesterNo=${semesterNo}`,
// //                {
// //                   headers: { Authorization: `Bearer ${token}` },
// //                }
// //             );

// //             if (!res.ok) {
// //                if (res.status === 404) {
// //                   setSubjects([]);
// //                   setMarksData({});
// //                   setMessage("No subjects found for this semester.");
// //                   return;
// //                }
// //                throw new Error("Failed to fetch subjects.");
// //             }

// //             const data = await res.json();
// //             setSubjects(data);

// //             // Initialize marksData for subjects if not already present
// //             setMarksData((prev) => {
// //                const newData = { ...prev };
// //                data.forEach((sub) => {
// //                   if (!newData[sub.subjectName]) {
// //                      newData[sub.subjectName] = { ...initialMarksTemplate };
// //                   }
// //                });
// //                return newData;
// //             });

// //             // Fetch saved marks for this semester
// //             fetchStudentMarks();
// //          } catch (err) {
// //             setError(err.message);
// //          } finally {
// //             setLoadingSubjects(false);
// //          }
// //       }

// //       async function fetchStudentMarks() {
// //          setLoadingMarks(true);
// //          setError(null);
// //          try {
// //             const res = await fetch(`http://localhost:8000/api/v1/marks/me`, {
// //                headers: { Authorization: `Bearer ${token}` },
// //             });

// //             if (!res.ok) throw new Error("Failed to fetch marks.");

// //             const data = await res.json();

// //             // Find marks for selected semester
// //             const semester = data.semesters.find(
// //                (s) => s.semesterNo === Number(semesterNo)
// //             );

// //             if (semester) {
// //                const marksMap = {};
// //                semester.subjects.forEach((sub) => {
// //                   marksMap[sub.subjectName] = {
// //                      ca1: sub.ca1 ?? "",
// //                      ca2: sub.ca2 ?? "",
// //                      ca3: sub.ca3 ?? "",
// //                      ca4: sub.ca4 ?? "",
// //                      pca1: sub.pca1 ?? "",
// //                      pca2: sub.pca2 ?? "",
// //                      final: sub.final ?? "",
// //                   };
// //                });
// //                setMarksData(marksMap);
// //             } else {
// //                setMarksData({});
// //             }
// //          } catch (err) {
// //             setError(err.message);
// //          } finally {
// //             setLoadingMarks(false);
// //          }
// //       }

// //       fetchSubjects();
// //    }, [semesterNo, student, token]);

// //    // Handle input change for marks
// //    function handleInputChange(subjectName, field, value) {
// //       setMarksData((prev) => ({
// //          ...prev,
// //          [subjectName]: {
// //             ...prev[subjectName],
// //             [field]: value,
// //          },
// //       }));
// //    }

// //    // Submit marks to backend
// //    async function handleSubmit(e) {
// //       e.preventDefault();
// //       setSaving(true);
// //       setError(null);
// //       setMessage(null);

// //       // Prepare payload with numeric values
// //       const subjectsPayload = subjects.map((sub) => ({
// //          subjectName: sub.subjectName,
// //          ca1: parseFloat(marksData[sub.subjectName]?.ca1) || 0,
// //          ca2: parseFloat(marksData[sub.subjectName]?.ca2) || 0,
// //          ca3: parseFloat(marksData[sub.subjectName]?.ca3) || 0,
// //          ca4: parseFloat(marksData[sub.subjectName]?.ca4) || 0,
// //          pca1: parseFloat(marksData[sub.subjectName]?.pca1) || 0,
// //          pca2: parseFloat(marksData[sub.subjectName]?.pca2) || 0,
// //          final: parseFloat(marksData[sub.subjectName]?.final) || 0,
// //       }));

// //       try {
// //          const res = await fetch(`http://localhost:8000/api/v1/marks`, {
// //             method: "POST",
// //             headers: {
// //                "Content-Type": "application/json",
// //                Authorization: `Bearer ${token}`,
// //             },
// //             body: JSON.stringify({
// //                semesterNo: Number(semesterNo),
// //                subjects: subjectsPayload,
// //             }),
// //          });

// //          if (!res.ok) {
// //             const errData = await res.json();
// //             throw new Error(errData.error || "Failed to save marks.");
// //          }

// //          setMessage("Marks saved successfully!");
// //       } catch (err) {
// //          setError(err.message);
// //       } finally {
// //          setSaving(false);
// //       }
// //    }

// //    if (loadingStudent) {
// //       return (
// //          <p className="text-center mt-10 text-gray-600">
// //             Loading student info...
// //          </p>
// //       );
// //    }

// //    if (error && !student) {
// //       return <p className="text-center mt-10 text-red-600">{error}</p>;
// //    }

// //    if (!student) {
// //       return (
// //          <p className="text-center mt-10 text-gray-600">
// //             No student information available.
// //          </p>
// //       );
// //    }

// //    return (
// //       <div className="max-w-5xl mx-auto p-6">
// //          <motion.h1
// //             className="text-3xl font-bold mb-6 text-center"
// //             initial={{ opacity: 0, y: -20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //          >
// //             Academic Marks Management
// //          </motion.h1>

// //          {/* Semester Selector */}
// //          <div className="mb-6 flex justify-center">
// //             <label
// //                htmlFor="semester"
// //                className="mr-3 font-semibold self-center"
// //             >
// //                Select Semester:
// //             </label>
// //             <select
// //                id="semester"
// //                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                value={semesterNo}
// //                onChange={(e) => setSemesterNo(e.target.value)}
// //             >
// //                <option value="">-- Select --</option>
// //                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
// //                   <option key={sem} value={sem}>
// //                      Semester {sem}
// //                   </option>
// //                ))}
// //             </select>
// //          </div>

// //          {(loadingSubjects || loadingMarks) && (
// //             <p className="text-center text-gray-600">Loading data...</p>
// //          )}

// //          {message && (
// //             <p className="text-center text-green-600 mb-4">{message}</p>
// //          )}
// //          {error && <p className="text-center text-red-600 mb-4">{error}</p>}

// //          {semesterNo && subjects.length > 0 && (
// //             <form onSubmit={handleSubmit} className="space-y-6">
// //                {subjects.map((subject) => (
// //                   <motion.div
// //                      key={subject.subjectCode}
// //                      className="border rounded p-4 shadow-sm"
// //                      initial={{ opacity: 0, y: 10 }}
// //                      animate={{ opacity: 1, y: 0 }}
// //                      transition={{ delay: 0.1 * subjects.indexOf(subject) }}
// //                   >
// //                      <h2 className="text-xl font-semibold mb-3">
// //                         {subject.subjectName}
// //                      </h2>
// //                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //                         {[
// //                            { label: "CA1", field: "ca1" },
// //                            { label: "CA2", field: "ca2" },
// //                            { label: "CA3", field: "ca3" },
// //                            { label: "CA4", field: "ca4" },
// //                            { label: "PCA1", field: "pca1" },
// //                            { label: "PCA2", field: "pca2" },
// //                            { label: "Final", field: "final" },
// //                         ].map(({ label, field }) => (
// //                            <div key={field} className="flex flex-col">
// //                               <label
// //                                  htmlFor={`${subject.subjectCode}-${field}`}
// //                                  className="mb-1 font-medium"
// //                               >
// //                                  {label}
// //                               </label>
// //                               <input
// //                                  id={`${subject.subjectCode}-${field}`}
// //                                  type="number"
// //                                  min="0"
// //                                  max="100"
// //                                  step="0.01"
// //                                  className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
// //                                  value={
// //                                     marksData[subject.subjectName]?.[field] ??
// //                                     ""
// //                                  }
// //                                  onChange={(e) =>
// //                                     handleInputChange(
// //                                        subject.subjectName,
// //                                        field,
// //                                        e.target.value
// //                                     )
// //                                  }
// //                                  placeholder="0"
// //                               />
// //                            </div>
// //                         ))}
// //                      </div>
// //                   </motion.div>
// //                ))}

// //                <div className="flex justify-center">
// //                   <button
// //                      type="submit"
// //                      disabled={saving}
// //                      className={`px-6 py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
// //                         saving ? "opacity-50 cursor-not-allowed" : ""
// //                      }`}
// //                   >
// //                      {saving ? "Saving..." : "Save Marks"}
// //                   </button>
// //                </div>
// //             </form>
// //          )}

// //          {semesterNo && !loadingSubjects && subjects.length === 0 && (
// //             <p className="text-center text-gray-600">
// //                No subjects found for this semester.
// //             </p>
// //          )}
// //       </div>
// //    );
// // }

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// const initialMarksTemplate = {
//    ca1: "",
//    ca2: "",
//    ca3: "",
//    ca4: "",
//    pca1: "",
//    pca2: "",
//    final: "",
// };

// export default function S_Academics({ token }) {
//    const [student, setStudent] = useState(null);
//    const [semesterNo, setSemesterNo] = useState("");
//    const [subjects, setSubjects] = useState([]);
//    const [marksData, setMarksData] = useState({});
//    const [loadingStudent, setLoadingStudent] = useState(true);
//    const [loadingSubjects, setLoadingSubjects] = useState(false);
//    const [loadingMarks, setLoadingMarks] = useState(false);
//    const [saving, setSaving] = useState(false);
//    const [message, setMessage] = useState(null);
//    const [error, setError] = useState(null);

//    // Fetch logged-in student profile
//    useEffect(() => {
//       if (!token) {
//          setError("Authentication token is missing.");
//          setLoadingStudent(false);
//          return;
//       }

//       async function fetchStudentProfile() {
//          setLoadingStudent(true);
//          setError(null);
//          try {
//             const res = await fetch(
//                `http://localhost:8000/api/v1/students/me`,
//                {
//                   headers: { Authorization: `Bearer ${token}` },
//                }
//             );

//             if (!res.ok) {
//                const errorText = await res.text();
//                console.error(
//                   "Failed to fetch student profile:",
//                   res.status,
//                   errorText
//                );
//                throw new Error(
//                   `Failed to fetch student profile: ${res.status}`
//                );
//             }

//             const data = await res.json();
//             setStudent(data);
//          } catch (err) {
//             console.error("Error fetching student profile:", err);
//             setError(err.message);
//          } finally {
//             setLoadingStudent(false);
//          }
//       }

//       fetchStudentProfile();
//    }, [token]);

//    // Fetch subjects and marks when semester or department changes
//    useEffect(() => {
//       if (!semesterNo || !student?.department?._id) {
//          setSubjects([]);
//          setMarksData({});
//          return;
//       }

//       async function fetchSubjects() {
//          setLoadingSubjects(true);
//          setError(null);
//          setMessage(null);
//          try {
//             const res = await fetch(
//                `http://localhost:8000/api/v1/subjects?department=${student.department._id}&semesterNo=${semesterNo}`,
//                {
//                   headers: { Authorization: `Bearer ${token}` },
//                }
//             );

//             if (!res.ok) {
//                if (res.status === 404) {
//                   setSubjects([]);
//                   setMarksData({});
//                   setMessage("No subjects found for this semester.");
//                   return;
//                }
//                throw new Error("Failed to fetch subjects.");
//             }

//             const data = await res.json();
//             console.log("Fetched subjects:", data);
//             setSubjects(data);

//             // Initialize marksData for new subjects if not present
//             setMarksData((prev) => {
//                const newData = { ...prev };
//                data.forEach((sub) => {
//                   if (!newData[sub.subjectName]) {
//                      newData[sub.subjectName] = { ...initialMarksTemplate };
//                   }
//                });
//                return newData;
//             });

//             fetchStudentMarks();
//          } catch (err) {
//             setError(err.message);
//          } finally {
//             setLoadingSubjects(false);
//          }
//       }

//       async function fetchStudentMarks() {
//          setLoadingMarks(true);
//          setError(null);
//          try {
//             const res = await fetch(`http://localhost:8000/api/v1/marks/me`, {
//                headers: { Authorization: `Bearer ${token}` },
//             });

//             if (!res.ok) throw new Error("Failed to fetch marks.");

//             const data = await res.json();

//             const semester = data.semesters.find(
//                (s) => s.semesterNo === Number(semesterNo)
//             );

//             if (semester) {
//                const marksMap = {};
//                semester.subjects.forEach((sub) => {
//                   marksMap[sub.subjectName] = {
//                      ca1: sub.ca1 ?? "",
//                      ca2: sub.ca2 ?? "",
//                      ca3: sub.ca3 ?? "",
//                      ca4: sub.ca4 ?? "",
//                      pca1: sub.pca1 ?? "",
//                      pca2: sub.pca2 ?? "",
//                      final: sub.final ?? "",
//                   };
//                });
//                setMarksData(marksMap);
//             } else {
//                setMarksData({});
//             }
//          } catch (err) {
//             setError(err.message);
//          } finally {
//             setLoadingMarks(false);
//          }
//       }

//       fetchSubjects();
//    }, [semesterNo, student?.department?._id, token]);

//    // Handle input change for marks
//    function handleInputChange(subjectName, field, value) {
//       setMarksData((prev) => ({
//          ...prev,
//          [subjectName]: {
//             ...prev[subjectName],
//             [field]: value,
//          },
//       }));
//    }

//    // Submit marks to backend
//    async function handleSubmit(e) {
//       e.preventDefault();
//       setSaving(true);
//       setError(null);
//       setMessage(null);

//       const subjectsPayload = subjects.map((sub) => ({
//          subjectName: sub.subjectName,
//          ca1: parseFloat(marksData[sub.subjectName]?.ca1) || 0,
//          ca2: parseFloat(marksData[sub.subjectName]?.ca2) || 0,
//          ca3: parseFloat(marksData[sub.subjectName]?.ca3) || 0,
//          ca4: parseFloat(marksData[sub.subjectName]?.ca4) || 0,
//          pca1: parseFloat(marksData[sub.subjectName]?.pca1) || 0,
//          pca2: parseFloat(marksData[sub.subjectName]?.pca2) || 0,
//          final: parseFloat(marksData[sub.subjectName]?.final) || 0,
//       }));

//       try {
//          const res = await fetch(`http://localhost:8000/api/v1/marks`, {
//             method: "POST",
//             headers: {
//                "Content-Type": "application/json",
//                Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({
//                semesterNo: Number(semesterNo),
//                subjects: subjectsPayload,
//             }),
//          });

//          if (!res.ok) {
//             const errData = await res.json();
//             throw new Error(errData.error || "Failed to save marks.");
//          }

//          setMessage("Marks saved successfully!");
//       } catch (err) {
//          setError(err.message);
//       } finally {
//          setSaving(false);
//       }
//    }

//    if (loadingStudent) {
//       return (
//          <p className="text-center mt-10 text-gray-600">
//             Loading student info...
//          </p>
//       );
//    }

//    if (error && !student) {
//       return <p className="text-center mt-10 text-red-600">{error}</p>;
//    }

//    if (!student) {
//       return (
//          <p className="text-center mt-10 text-gray-600">
//             No student information available.
//          </p>
//       );
//    }

//    return (
//       <div className="max-w-5xl mx-auto p-6">
//          <motion.h1
//             className="text-3xl font-bold mb-6 text-center"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//          >
//             Academic Marks Management
//          </motion.h1>

//          {/* Semester Selector */}
//          <div className="mb-6 flex justify-center">
//             <label
//                htmlFor="semester"
//                className="mr-3 font-semibold self-center"
//             >
//                Select Semester:
//             </label>
//             <select
//                id="semester"
//                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                value={semesterNo}
//                onChange={(e) => setSemesterNo(e.target.value)}
//             >
//                <option value="">-- Select --</option>
//                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
//                   <option key={sem} value={sem}>
//                      Semester {sem}
//                   </option>
//                ))}
//             </select>
//          </div>

//          {(loadingSubjects || loadingMarks) && (
//             <p className="text-center text-gray-600">Loading data...</p>
//          )}

//          {message && (
//             <p className="text-center text-green-600 mb-4">{message}</p>
//          )}
//          {error && <p className="text-center text-red-600 mb-4">{error}</p>}

//          {semesterNo && subjects.length > 0 && (
//             <form onSubmit={handleSubmit} className="overflow-x-auto">
//                <table className="min-w-full border border-gray-300 rounded">
//                   <thead className="bg-gray-100">
//                      <tr>
//                         <th className="border px-4 py-2 text-left">Subject</th>
//                         <th className="border px-4 py-2">CA1</th>
//                         <th className="border px-4 py-2">CA2</th>
//                         <th className="border px-4 py-2">CA3</th>
//                         <th className="border px-4 py-2">CA4</th>
//                         <th className="border px-4 py-2">PCA1</th>
//                         <th className="border px-4 py-2">PCA2</th>
//                         <th className="border px-4 py-2">Final</th>
//                      </tr>
//                   </thead>
//                   <tbody>
//                      {subjects.map((subject, index) => (
//                         <tr
//                            key={
//                               subject._id || `${subject.subjectCode}-${index}`
//                            }
//                            className="hover:bg-gray-50"
//                         >
//                            <td className="border px-4 py-2 font-semibold">
//                               {subject.subjectName}
//                            </td>
//                            {[
//                               "ca1",
//                               "ca2",
//                               "ca3",
//                               "ca4",
//                               "pca1",
//                               "pca2",
//                               "final",
//                            ].map((field) => (
//                               <td
//                                  key={field}
//                                  className="border px-2 py-1 text-center"
//                               >
//                                  <input
//                                     type="number"
//                                     min="0"
//                                     max="100"
//                                     step="0.01"
//                                     className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                                     value={
//                                        marksData[subject.subjectName]?.[
//                                           field
//                                        ] ?? ""
//                                     }
//                                     onChange={(e) =>
//                                        handleInputChange(
//                                           subject.subjectName,
//                                           field,
//                                           e.target.value
//                                        )
//                                     }
//                                     placeholder="0"
//                                  />
//                               </td>
//                            ))}
//                         </tr>
//                      ))}
//                   </tbody>
//                </table>

//                <div className="flex justify-center mt-6">
//                   <button
//                      type="submit"
//                      disabled={saving}
//                      className={`px-6 py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
//                         saving ? "opacity-50 cursor-not-allowed" : ""
//                      }`}
//                   >
//                      {saving ? "Saving..." : "Save Marks"}
//                   </button>
//                </div>
//             </form>
//          )}

//          {semesterNo && !loadingSubjects && subjects.length === 0 && (
//             <p className="text-center text-gray-600">
//                No subjects found for this semester.
//             </p>
//          )}
//       </div>
//    );
// }

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const initialMarksTemplate = {
   ca1: "",
   ca2: "",
   ca3: "",
   ca4: "",
   pca1: "",
   pca2: "",
   final: "",
};

export default function S_Academics({ token }) {
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
               `http://localhost:8000/api/v1/subjects?department=${student.department._id}&semesterNo=${semesterNo}`,
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
            const res = await fetch(`http://localhost:8000/api/v1/marks/me`, {
               headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("Failed to fetch marks.");

            const data = await res.json();

            const semester = data.semesters.find(
               (s) => s.semesterNo === Number(semesterNo)
            );

            if (semester) {
               const marksMap = {};
               semester.subjects.forEach((sub) => {
                  const subjectId = sub.subject?._id;
                  if (subjectId) {
                     marksMap[subjectId] = {
                        ca1: sub.ca1 ?? "",
                        ca2: sub.ca2 ?? "",
                        ca3: sub.ca3 ?? "",
                        ca4: sub.ca4 ?? "",
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
         ca1: parseFloat(marksData[sub._id]?.ca1) || 0,
         ca2: parseFloat(marksData[sub._id]?.ca2) || 0,
         ca3: parseFloat(marksData[sub._id]?.ca3) || 0,
         ca4: parseFloat(marksData[sub._id]?.ca4) || 0,
         pca1: parseFloat(marksData[sub._id]?.pca1) || 0,
         pca2: parseFloat(marksData[sub._id]?.pca2) || 0,
         final: parseFloat(marksData[sub._id]?.final) || 0,
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
      <div className="max-w-5xl mx-auto p-6">
         <motion.h1
            className="text-3xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
         >
            Academic Marks Management
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
               <table className="min-w-full border border-gray-300 rounded">
                  <thead className="bg-gray-100">
                     <tr>
                        <th className="border px-4 py-2 text-left">Subject</th>
                        <th className="border px-4 py-2">CA1</th>
                        <th className="border px-4 py-2">CA2</th>
                        <th className="border px-4 py-2">CA3</th>
                        <th className="border px-4 py-2">CA4</th>
                        <th className="border px-4 py-2">PCA1</th>
                        <th className="border px-4 py-2">PCA2</th>
                        <th className="border px-4 py-2">Final</th>
                     </tr>
                  </thead>
                  <tbody>
                     {subjects.map((subject) => (
                        <tr key={subject._id} className="hover:bg-gray-50">
                           <td className="border px-4 py-2 font-semibold">
                              {subject.subjectName}
                           </td>
                           {Object.keys(initialMarksTemplate).map((field) => (
                              <td
                                 key={field}
                                 className="border px-2 py-1 text-center"
                              >
                                 <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    value={
                                       marksData[subject._id]?.[field] ?? ""
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
                           ))}
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
   );
}
