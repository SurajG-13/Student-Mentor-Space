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

import userRouter from "./routes/user.routes.js";
import teacherRouter from "./routes/teacher.routes.js";
import studentRouter from "./routes/student.routes.js";

import projectRouter from "./routes/project.routes.js";
import marksRoutes from "./routes/marks.routes.js";
// import departmentRoutes from "./routes/department.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import certificateRoutes from "./routes/certificate.routes.js";
// import externalAssessmentRoutes from "./routes/externalAssessment.routes.js";

// Route Declaration

app.use("/api/v1/users", userRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/students", studentRouter);

app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/marks", marksRoutes);
// app.use("/api/v1/departments", departmentRoutes);
app.use("/api/v1/subjects", subjectRoutes);
app.use("/api/v1/certificates", certificateRoutes);
// app.use("/api/v1/externalAssessments", externalAssessmentRoutes);

// Default Route

app.get("/", (req, res) => {
   res.status(200).json({ message: "Welcome to the API" });
});

export { app };
