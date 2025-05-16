// controllers/marks.controller.js
import Marks from "../models/marks.model.js"; // ✅ Corrected import

// POST /api/marks — Student saves/updates marks for a semester
export async function saveOrUpdateMarks(req, res) {
   try {
      const { semesterNo, subjects } = req.body;
      const { _id: studentId, rollNumber, department } = req.user;

      let marks = await Marks.findOne({ rollNumber }); // ✅ use the model method directly

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
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
}

// GET /api/marks/me — Authenticated student views own marks
export async function getStudentMarks(req, res) {
   try {
      const { rollNumber } = req.user;
      const marks = await Marks.findOne({ rollNumber }); // ✅

      if (!marks) return res.status(404).json({ error: "No marks found." });

      res.status(200).json(marks);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
}

// GET /api/marks/:rollNumber — Teacher views any student marks by roll number
export async function getMarksByRoll(req, res) {
   try {
      const { rollNumber } = req.params;
      const marks = await Marks.findOne({ rollNumber }); // ✅

      if (!marks) return res.status(404).json({ error: "No marks found." });

      res.status(200).json(marks);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
}
