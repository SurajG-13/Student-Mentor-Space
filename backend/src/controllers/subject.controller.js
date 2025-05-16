import Subject from "../models/subject.model.js"; // Correct import

export async function getSubjectsByDeptAndSemester(req, res) {
   const { department, semesterNo } = req.query;

   try {
      // Use the Mongoose model's .find() directly
      const subjects = await Subject.find({ department, semesterNo }); // ✅ Direct method call

      // If no subjects found
      if (!subjects || subjects.length === 0) {
         return res.status(404).json({ error: "No subjects found." });
      }

      res.status(200).json(subjects);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
}
