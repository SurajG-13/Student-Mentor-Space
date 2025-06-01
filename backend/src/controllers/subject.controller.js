import Subject from "../models/subject.model.js";

export async function getSubjectsByDeptAndSemester(req, res) {
   const { department, semesterNo } = req.query;

   if (!department || !semesterNo) {
      return res
         .status(400)
         .json({ error: "Missing department or semesterNo parameter." });
   }

   try {
      const subjects = await Subject.find({
         department,
         semesterNo: Number(semesterNo),
      });

      if (!subjects || subjects.length === 0) {
         return res.status(404).json({ error: "No subjects found." });
      }

      res.status(200).json(subjects);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
}
// import mongoose from "mongoose";
// import Subject from "../models/subject.model.js";

// export async function getSubjectsByDeptAndSemester(req, res) {
//    try {
//       const { department, semesterNo } = req.query;

//       // Validate department ObjectId
//       if (!mongoose.Types.ObjectId.isValid(department)) {
//          return res.status(400).json({ error: "Invalid department ID." });
//       }

//       // Parse semesterNo and validate
//       const semNo = Number(semesterNo);
//       if (isNaN(semNo)) {
//          return res.status(400).json({ error: "Invalid semester number." });
//       }

//       // Find subjects matching department and semesterNo
//       const subjects = await Subject.find({
//          department: mongoose.Types.ObjectId(department),
//          semesterNo: semNo,
//       });

//       if (!subjects.length) {
//          return res.status(404).json({ error: "No subjects found." });
//       }

//       return res.status(200).json(subjects);
//    } catch (err) {
//       console.error("Error fetching subjects:", err);
//       return res.status(500).json({ error: "Internal server error." });
//    }
// }
