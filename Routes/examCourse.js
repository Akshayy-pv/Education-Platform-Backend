import express from "express"
import { examCourseCreation } from "../Controller/examCourseCreationController";

const examCourseRoutes = express.Router();


examCourseRoutes.post("/creation", examCourseCreation)