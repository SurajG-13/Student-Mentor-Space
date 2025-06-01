// import Marks from "../models/marks.model.js";

// export async function saveOrUpdateMarks(req, res) {
//    try {
//       const { semesterNo, subjects } = req.body;
//       const { _id: studentId, rollNumber, department } = req.user;

//       let marks = await Marks.findOne({ rollNumber });

//       if (!marks) {
//          marks = new Marks({
//             studentId,
//             rollNumber,
//             department,
//             semesters: [{ semesterNo, subjects }],
//          });
//       } else {
//          const semesterIndex = marks.semesters.findIndex(
//             (s) => s.semesterNo === semesterNo
//          );

//          if (semesterIndex !== -1) {
//             marks.semesters[semesterIndex].subjects = subjects;
//          } else {
//             marks.semesters.push({ semesterNo, subjects });
//          }
//       }

//       await marks.save();
//       res.status(200).json({ message: "Marks saved successfully." });
//    } catch (err) {
//       res.status(500).json({ error: err.message });
//    }
// }

// export async function getStudentMarks(req, res) {
//    try {
//       const { rollNumber } = req.user;
//       // const marks = await Marks.findOne({ rollNumber });
//       const marks = await Marks.findOne({ rollNumber }).populate("department");

//       if (!marks) return res.status(404).json({ error: "No marks found." });

//       res.status(200).json(marks);
//    } catch (err) {
//       res.status(500).json({ error: err.message });
//    }
// }

// export async function getMarksByRoll(req, res) {
//    try {
//       const { rollNumber } = req.params;
//       // const marks = await Marks.findOne({ rollNumber });
//       const marks = await Marks.findOne({ rollNumber }).populate("department");

//       if (!marks) return res.status(404).json({ error: "No marks found." });

//       res.status(200).json(marks);
//    } catch (err) {
//       res.status(500).json({ error: err.message });
//    }
// }

// import Marks from "../models/marks.model.js";
// import { asyncHandler } from "../utils/asyncHandler.js"; // optional async wrapper

// // Save or update marks for a student's semester
// export const saveOrUpdateMarks = asyncHandler(async (req, res) => {
//    const { semesterNo, subjects } = req.body;
//    const { _id: studentId, rollNumber, department } = req.user;

//    // Validate that subjects array contains subjectName strings + marks fields
//    if (!Array.isArray(subjects) || subjects.length === 0) {
//       return res.status(400).json({ error: "Subjects array is required" });
//    }

//    // Find existing marks document for this student
//    let marks = await Marks.findOne({ rollNumber });

//    if (!marks) {
//       // Create new marks document if not exists
//       marks = new Marks({
//          studentId,
//          rollNumber,
//          department,
//          semesters: [{ semesterNo, subjects }],
//       });
//    } else {
//       // Find if this semester already exists
//       const semesterIndex = marks.semesters.findIndex(
//          (s) => s.semesterNo === semesterNo
//       );

//       if (semesterIndex !== -1) {
//          // Replace subjects array for this semester
//          marks.semesters[semesterIndex].subjects = subjects;
//       } else {
//          // Add new semester with subjects
//          marks.semesters.push({ semesterNo, subjects });
//       }
//    }

//    await marks.save();

//    res.status(200).json({ message: "Marks saved successfully." });
// });

// // Get marks for logged-in student
// export const getStudentMarks = asyncHandler(async (req, res) => {
//    const { rollNumber } = req.user;
//    const marks = await Marks.findOne({ rollNumber }).populate("department");

//    if (!marks) {
//       return res.status(404).json({ error: "No marks found." });
//    }

//    res.status(200).json(marks);
// });

// // Get marks by roll number (admin or similar)
// export const getMarksByRoll = asyncHandler(async (req, res) => {
//    const { rollNumber } = req.params;
//    const marks = await Marks.findOne({ rollNumber }).populate("department");

//    if (!marks) {
//       return res.status(404).json({ error: "No marks found." });
//    }

//    res.status(200).json(marks);
// });

// import Marks from "../models/marks.model.js";
// import { asyncHandler } from "../utils/asyncHandler.js";

// // Save or update marks for a student's semester
// export const saveOrUpdateMarks = asyncHandler(async (req, res) => {
//    const { semesterNo, subjects } = req.body;
//    const { _id: studentId, rollNumber, department } = req.user;

//    if (!Array.isArray(subjects) || subjects.length === 0) {
//       return res.status(400).json({ error: "Subjects array is required" });
//    }

//    // Ensure each subject includes subjectCode before saving
//    for (const sub of subjects) {
//       if (!sub.subjectCode) {
//          return res
//             .status(400)
//             .json({ error: "Each subject must include subjectCode" });
//       }
//    }

//    let marks = await Marks.findOne({ rollNumber });

//    if (!marks) {
//       marks = new Marks({
//          studentId,
//          rollNumber,
//          department,
//          semesters: [{ semesterNo, subjects }],
//       });
//    } else {
//       const semesterIndex = marks.semesters.findIndex(
//          (s) => s.semesterNo === semesterNo
//       );

//       if (semesterIndex !== -1) {
//          marks.semesters[semesterIndex].subjects = subjects;
//       } else {
//          marks.semesters.push({ semesterNo, subjects });
//       }
//    }

//    await marks.save();

//    res.status(200).json({ message: "Marks saved successfully." });
// });

// // Get marks for logged-in student
// export const getStudentMarks = asyncHandler(async (req, res) => {
//    const { rollNumber } = req.user;
//    const marks = await Marks.findOne({ rollNumber }).populate("department");

//    if (!marks) {
//       return res.status(404).json({ error: "No marks found." });
//    }

//    res.status(200).json(marks);
// });

// // Get marks by roll number (for teacher/admin)
// export const getMarksByRoll = asyncHandler(async (req, res) => {
//    const { rollNumber } = req.params;
//    const marks = await Marks.findOne({ rollNumber }).populate("department");

//    console.log(
//       "Marks data sent for rollNumber",
//       rollNumber,
//       ":",
//       JSON.stringify(marks, null, 2)
//    );

//    if (!marks) {
//       return res.status(404).json({ error: "No marks found." });
//    }

//    res.status(200).json(marks);
// });

import Marks from "../models/marks.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Save or update marks for a student's semester
export const saveOrUpdateMarks = asyncHandler(async (req, res) => {
   const { semesterNo, subjects } = req.body;
   const { _id: studentId, rollNumber, department } = req.user;

   if (!Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({ error: "Subjects array is required" });
   }

   // Validate each subject entry has a subject ObjectId reference
   for (const sub of subjects) {
      if (!sub.subject) {
         return res
            .status(400)
            .json({
               error: "Each subject must include a 'subject' ObjectId reference",
            });
      }
   }

   let marks = await Marks.findOne({ rollNumber });

   if (!marks) {
      marks = new Marks({
         studentId,
         rollNumber,
         department,
         semesters: [{ semesterNo, subjects }],
      });
   } else {
      const semesterIndex = marks.semesters.findIndex(
         (s) => s.semesterNo === semesterNo
      );

      if (semesterIndex !== -1) {
         marks.semesters[semesterIndex].subjects = subjects;
      } else {
         marks.semesters.push({ semesterNo, subjects });
      }
   }

   await marks.save();

   res.status(200).json({ message: "Marks saved successfully." });
});

// Get marks for logged-in student
export const getStudentMarks = asyncHandler(async (req, res) => {
   const { rollNumber } = req.user;
   const marks = await Marks.findOne({ rollNumber })
      .populate("department")
      .populate("semesters.subjects.subject"); // populate nested subject references

   if (!marks) {
      return res.status(404).json({ error: "No marks found." });
   }

   res.status(200).json(marks);
});

// Get marks by roll number (for teacher/admin)
export const getMarksByRoll = asyncHandler(async (req, res) => {
   const { rollNumber } = req.params;
   const marks = await Marks.findOne({ rollNumber })
      .populate("department")
      .populate("semesters.subjects.subject"); // populate nested subject references

   if (!marks) {
      return res.status(404).json({ error: "No marks found." });
   }

   res.status(200).json(marks);
});
