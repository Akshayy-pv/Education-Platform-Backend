import express from "express"
import { createCourseWithExams, getCourseById, getCourses } from "../Controller/examCourseCreationController.js";

const examCourseRoutes = express.Router();


examCourseRoutes.post("/creation", createCourseWithExams)
examCourseRoutes.get("/courses/:id", getCourseById);
examCourseRoutes.get("/courses", getCourses);




export default examCourseRoutes