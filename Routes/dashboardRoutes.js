import express from "express";
import { getUserEnrolledCourses } from "../Controller/dashboard.controle.js"

const dashboardRouter = express.Router();

dashboardRouter.get("/user-courses/:userId", getUserEnrolledCourses);

export default dashboardRouter;
