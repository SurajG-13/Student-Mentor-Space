import express from "express";
import {
   createExternalAssessment,
   getExternalAssessmentBySubject,
   getExternalAssessmentById,
   addExternalAssessmentMarks,
} from "../controllers/externalAssessment.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/").post(createExternalAssessment);
router.route("/:UPID").get(getExternalAssessmentBySubject);
router.route("/:id").get(getExternalAssessmentById);
router.route("/marks").post(addExternalAssessmentMarks);

export default router;
