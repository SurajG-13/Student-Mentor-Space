// // import React, { useEffect, useState } from "react";
// // import { motion } from "framer-motion";
// // import axios from "axios";

// // const initialMarksTemplate = {
// //    ca1: "",
// //    ca2: "",
// //    ca3: "",
// //    ca4: "",
// //    pca1: "",
// //    pca2: "",
// //    final: "",
// // };

// // export default function S_Academics() {
// //    const [student, setStudent] = useState(null);
// //    const [semesterNo, setSemesterNo] = useState("");
// //    const [subjects, setSubjects] = useState([]);
// //    const [marksData, setMarksData] = useState({});
// //    const [loading, setLoading] = useState(true);
// //    const [loadingSubjects, setLoadingSubjects] = useState(false);
// //    const [loadingMarks, setLoadingMarks] = useState(false);
// //    const [error, setError] = useState(null);
// //    const [message, setMessage] = useState(null);

// //    const rollNumber = localStorage.getItem("inputValue");
// //    const token = localStorage.getItem("token");

// //    useEffect(() => {
// //       const fetchStudentData = async () => {
// //          try {
// //             const response = await axios.get(
// //                `http://localhost:8000/api/v1/marks/${rollNumber}`,
// //                {
// //                   headers: { Authorization: `Bearer ${token}` },
// //                }
// //             );
// //             setStudent(response.data);
// //          } catch (error) {
// //             console.error("Error fetching student data:", error);
// //             setError("Failed to fetch student information.");
// //          } finally {
// //             setLoading(false);
// //          }
// //       };

// //       fetchStudentData();
// //    }, [rollNumber, token]);

// //    useEffect(() => {
// //       const deptId = student?.department?._id;

// //       if (!semesterNo || !deptId) {
// //          setSubjects([]);
// //          setMarksData({});
// //          return;
// //       }

// //       const fetchSubjectsAndMarks = async () => {
// //          setLoadingSubjects(true);
// //          setError(null);
// //          setMessage(null);

// //          try {
// //             const res = await fetch(
// //                `http://localhost:8000/api/v1/subjects?department=${deptId}&semesterNo=${semesterNo}`,
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

// //             const marksTemplate = {};
// //             data.forEach((sub) => {
// //                marksTemplate[sub.subjectCode] = { ...initialMarksTemplate };
// //             });

// //             setMarksData(marksTemplate);

// //             await fetchStudentMarks(marksTemplate);
// //          } catch (err) {
// //             setError(err.message);
// //          } finally {
// //             setLoadingSubjects(false);
// //          }
// //       };

// //       const fetchStudentMarks = async (template) => {
// //          setLoadingMarks(true);
// //          try {
// //             const res = await fetch(
// //                `http://localhost:8000/api/v1/marks/${rollNumber}`,
// //                {
// //                   headers: { Authorization: `Bearer ${token}` },
// //                }
// //             );

// //             if (!res.ok) throw new Error("Failed to fetch marks.");

// //             const data = await res.json();
// //             const semester = data.semesters?.find(
// //                (s) => s.semesterNo === Number(semesterNo)
// //             );

// //             if (semester) {
// //                const marksMap = { ...template };
// //                semester.subjects.forEach((sub) => {
// //                   const code = sub.subjectCode;
// //                   marksMap[code] = {
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
// //                setMarksData(template); // just empty if no marks
// //             }
// //          } catch (err) {
// //             setError(err.message);
// //          } finally {
// //             setLoadingMarks(false);
// //          }
// //       };

// //       fetchSubjectsAndMarks();
// //    }, [semesterNo, student?.department?._id, rollNumber, token]);

// //    const handleInputChange = (subjectCode, field, value) => {
// //       setMarksData((prev) => ({
// //          ...prev,
// //          [subjectCode]: {
// //             ...prev[subjectCode],
// //             [field]: value,
// //          },
// //       }));
// //    };

// //    if (loading) {
// //       return (
// //          <p className="text-center mt-10 text-gray-600">
// //             Loading student info...      {" "}
// //          </p>
// //       );
// //    }

// //    if (error && !student) {
// //       return <p className="text-center mt-10 text-red-600">{error}</p>;
// //    }

// //    if (!student) {
// //       return (
// //          <p className="text-center mt-10 text-gray-600">
// //             No student information available.      {" "}
// //          </p>
// //       );
// //    }

// //    return (
// //       <div className="max-w-5xl mx-auto p-6">
// //          {" "}
// //          <motion.h1
// //             className="text-3xl font-bold mb-6 text-center"
// //             initial={{ opacity: 0, y: -20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //          >
// //             Academic Marks Management      {" "}
// //          </motion.h1>{" "}
// //          <div className="mb-6 flex justify-center">
// //             {" "}
// //             <label
// //                htmlFor="semester"
// //                className="mr-3 font-semibold self-center"
// //             >
// //                Select Semester:        {" "}
// //             </label>{" "}
// //             <select
// //                id="semester"
// //                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                value={semesterNo}
// //                onChange={(e) => setSemesterNo(e.target.value)}
// //             >
// //                <option value="">-- Select --</option>         {" "}
// //                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
// //                   <option key={sem} value={sem}>
// //                      Semester {sem}           {" "}
// //                   </option>
// //                ))}{" "}
// //             </select>{" "}
// //          </div>{" "}
// //          {(loadingSubjects || loadingMarks) && (
// //             <p className="text-center text-gray-600">Loading data...</p>
// //          )}{" "}
// //          {message && (
// //             <p className="text-center text-green-600 mb-4">{message}</p>
// //          )}{" "}
// //          {error && <p className="text-center text-red-600 mb-4">{error}</p>}{" "}
// //          {semesterNo && subjects.length > 0 && (
// //             <form className="overflow-x-auto">
// //                {" "}
// //                <table className="min-w-full border border-gray-300 rounded">
// //                   {" "}
// //                   <thead className="bg-gray-100">
// //                      {" "}
// //                      <tr>
// //                         {" "}
// //                         <th className="border px-4 py-2 text-left">Subject</th>
// //                         <th className="border px-4 py-2">CA1</th>
// //                         <th className="border px-4 py-2">CA2</th>
// //                         <th className="border px-4 py-2">CA3</th>
// //                         <th className="border px-4 py-2">CA4</th>
// //                         <th className="border px-4 py-2">PCA1</th>{" "}
// //                         <th className="border px-4 py-2">PCA2</th>
// //                         <th className="border px-4 py-2">Final</th>{" "}
// //                      </tr>{" "}
// //                   </thead>{" "}
// //                   <tbody>
// //                      {" "}
// //                      {subjects.map((subject) => (
// //                         <tr key={subject._id} className="hover:bg-gray-50">
// //                            {" "}
// //                            <td className="border px-4 py-2 font-semibold">
// //                               {subject.subjectName}{" "}
// //                            </td>{" "}
// //                            {Object.keys(initialMarksTemplate).map((field) => (
// //                               <td
// //                                  key={field}
// //                                  className="border px-2 py-1 text-center"
// //                               >
// //                                  {" "}
// //                                  <input
// //                                     type="number"
// //                                     min="0"
// //                                     max="100"
// //                                     step="0.01"
// //                                     className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
// //                                     value={
// //                                        marksData[subject.subjectCode]?.[
// //                                           field
// //                                        ] ?? ""
// //                                     }
// //                                     onChange={(e) =>
// //                                        handleInputChange(
// //                                           subject.subjectCode,
// //                                           field,
// //                                           e.target.value
// //                                        )
// //                                     }
// //                                     placeholder="0"
// //                                  />{" "}
// //                               </td>
// //                            ))}{" "}
// //                         </tr>
// //                      ))}{" "}
// //                   </tbody>{" "}
// //                </table>{" "}
// //             </form>
// //          )}{" "}
// //          {semesterNo && !loadingSubjects && subjects.length === 0 && (
// //             <p className="text-center text-gray-600">
// //                No subjects found for this semester.        {" "}
// //             </p>
// //          )}{" "}
// //       </div>
// //    );
// // }

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// const initialMarksTemplate = {
//    ca1: "",
//    ca2: "",
//    ca3: "",
//    ca4: "",
//    pca1: "",
//    pca2: "",
//    final: "",
// };

// export default function SearchAcademics() {
//    const [student, setStudent] = useState(null);
//    const [semesterNo, setSemesterNo] = useState("");
//    const [subjects, setSubjects] = useState([]);
//    const [marksData, setMarksData] = useState({});
//    const [loading, setLoading] = useState(true);
//    const [loadingSubjects, setLoadingSubjects] = useState(false);
//    const [loadingMarks, setLoadingMarks] = useState(false);
//    const [error, setError] = useState(null);
//    const [message, setMessage] = useState(null);

//    const rollNumber = localStorage.getItem("inputValue");
//    const token = localStorage.getItem("token");

//    useEffect(() => {
//       console.log("Student data:", student);
//       console.log("roll:", rollNumber);
//       console.log("Semester:", semesterNo);
//       console.log("Department ID used:", student?.department?._id);
//    }, [student, semesterNo]);

//    useEffect(() => {
//       const fetchStudentData = async () => {
//          try {
//             const response = await axios.get(
//                `http://localhost:8000/api/v1/marks/${rollNumber}`,
//                {
//                   headers: { Authorization: `Bearer ${token}` },
//                }
//             );
//             setStudent(response.data);
//          } catch (error) {
//             console.error("Error fetching student data:", error);
//             setError("Failed to fetch student information.");
//          } finally {
//             setLoading(false);
//          }
//       };

//       fetchStudentData();
//    }, [rollNumber, token]);

//    useEffect(() => {
//       const deptId = student?.department?._id;

//       if (!semesterNo || !deptId) {
//          setSubjects([]);
//          setMarksData({});
//          return;
//       }

//       const fetchSubjectsAndMarks = async () => {
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
//             setSubjects(data);

//             const marksTemplate = {};
//             data.forEach((sub) => {
//                marksTemplate[sub.subjectCode] = { ...initialMarksTemplate };
//             });

//             setMarksData(marksTemplate);

//             await fetchStudentMarks(marksTemplate);
//          } catch (err) {
//             setError(err.message);
//          } finally {
//             setLoadingSubjects(false);
//          }
//       };

//       const fetchStudentMarks = async (template) => {
//          setLoadingMarks(true);
//          try {
//             const res = await fetch(
//                `http://localhost:8000/api/v1/marks/${rollNumber}`,
//                {
//                   headers: { Authorization: `Bearer ${token}` },
//                }
//             );

//             if (!res.ok) throw new Error("Failed to fetch marks.");

//             const data = await res.json();

//             const semester = data.semesters?.find(
//                (s) => s.semesterNo === Number(semesterNo)
//             );

//             if (semester) {
//                const marksMap = { ...template };
//                semester.subjects.forEach((sub) => {
//                   const code = sub.subjectCode; // Now this exists in marks data
//                   marksMap[code] = {
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
//                setMarksData(template);
//             }
//          } catch (err) {
//             setError(err.message);
//          } finally {
//             setLoadingMarks(false);
//          }
//       };

//       fetchSubjectsAndMarks();
//    }, [semesterNo, student?.department?._id, rollNumber, token]);

//    const handleInputChange = (subjectCode, field, value) => {
//       setMarksData((prev) => ({
//          ...prev,
//          [subjectCode]: {
//             ...prev[subjectCode],
//             [field]: value,
//          },
//       }));
//    };

//    if (loading) {
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
//             <form className="overflow-x-auto">
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
//                      {subjects.map((subject) => (
//                         <tr key={subject._id} className="hover:bg-gray-50">
//                            <td className="border px-4 py-2 font-semibold">
//                               {subject.subjectName}
//                            </td>
//                            {Object.keys(initialMarksTemplate).map((field) => (
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
//                                        marksData[subject.subjectCode]?.[
//                                           field
//                                        ] ?? ""
//                                     }
//                                     onChange={(e) =>
//                                        handleInputChange(
//                                           subject.subjectCode,
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
import axios from "axios";

const initialMarksTemplate = {
   ca1: "",
   ca2: "",
   ca3: "",
   ca4: "",
   pca1: "",
   pca2: "",
   final: "",
};

export default function SearchAcademics() {
   const [student, setStudent] = useState(null);

   const [semesterNo, setSemesterNo] = useState("");
   const [subjects, setSubjects] = useState([]);
   const [marksData, setMarksData] = useState({});
   const [loading, setLoading] = useState(true);
   const [loadingSubjects, setLoadingSubjects] = useState(false);
   const [loadingMarks, setLoadingMarks] = useState(false);
   const [error, setError] = useState(null);
   const [message, setMessage] = useState(null);

   const rollNumber = localStorage.getItem("inputValue");
   const token = localStorage.getItem("token");

   useEffect(() => {
      const fetchStudentData = async () => {
         try {
            const response = await axios.get(
               `http://localhost:8000/api/v1/marks/${rollNumber}`,
               {
                  headers: { Authorization: `Bearer ${token}` },
               }
            );
            setStudent(response.data);
         } catch (error) {
            console.error("Error fetching student data:", error);
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
         setMarksData({});
         return;
      }

      const fetchSubjectsAndMarks = async () => {
         setLoadingSubjects(true);
         setError(null);
         setMessage(null);

         try {
            const res = await fetch(
               `http://localhost:8000/api/v1/subjects?department=${deptId}&semesterNo=${semesterNo}`,
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

            // Prepare marks data template keyed by subject ObjectId (string)
            const marksTemplate = {};
            data.forEach((sub) => {
               marksTemplate[sub._id] = { ...initialMarksTemplate };
            });

            setMarksData(marksTemplate);

            await fetchStudentMarks(marksTemplate);
         } catch (err) {
            setError(err.message);
         } finally {
            setLoadingSubjects(false);
         }
      };

      const fetchStudentMarks = async (template) => {
         setLoadingMarks(true);
         try {
            const res = await fetch(
               `http://localhost:8000/api/v1/marks/${rollNumber}`,
               {
                  headers: { Authorization: `Bearer ${token}` },
               }
            );

            if (!res.ok) throw new Error("Failed to fetch marks.");

            const data = await res.json();
            const semester = data.semesters?.find(
               (s) => s.semesterNo === Number(semesterNo)
            );

            if (semester) {
               const marksMap = { ...template };
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
               setMarksData(template);
            }
         } catch (err) {
            setError(err.message);
         } finally {
            setLoadingMarks(false);
         }
      };

      fetchSubjectsAndMarks();
   }, [semesterNo, student?.department?._id, rollNumber, token]);

   const handleInputChange = (subjectId, field, value) => {
      setMarksData((prev) => ({
         ...prev,
         [subjectId]: {
            ...prev[subjectId],
            [field]: value,
         },
      }));
   };

   if (loading) {
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
            <form className="overflow-x-auto">
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
