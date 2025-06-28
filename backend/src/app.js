import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
   cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
   })
);

app.use(
   express.json({
      limit: "16kb",
   })
);

app.use(
   express.urlencoded({
      extended: true,
      limit: "16kb",
   })
);

app.use(express.static("public"));

app.use(cookieParser());

// Import Routes

import teacherRouter from "./routes/teacher.routes.js";
import studentRouter from "./routes/student.routes.js";

import projectRouter from "./routes/project.routes.js";
import marksRouter from "./routes/marks.routes.js";
import labMarksRouter from "./routes/labMarks.routes.js";
import departmentRouter from "./routes/department.routes.js";
import subjectRouter from "./routes/subject.routes.js";
import labSubjectRouter from "./routes/labSubject.routes.js";
import certificateRouter from "./routes/certificate.routes.js";
import internshipRouter from "./routes/internship.routes.js";
import attendanceRouter from "./routes/attendance.routes.js";

// Route Declaration

app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/students", studentRouter);

app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/marks", marksRouter);
app.use("/api/v1/labMarks", labMarksRouter);
app.use("/api/v1/departments", departmentRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/labSubjects", labSubjectRouter);
app.use("/api/v1/certificates", certificateRouter);
app.use("/api/v1/internships", internshipRouter);
app.use("/api/v1/attendances", attendanceRouter);

// Default Route

app.get("/", (req, res) => {
   res.status(200).json({ message: "Welcome to the API" });
});

export { app };
