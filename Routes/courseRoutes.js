import express from  "express"

import { createCourse, getCourseById, getCourses } from "../Controller/course.controle.js"
import { upload } from "../meddileWare/upload.js";
import multer from "multer";

const courseRoutes = express.Router()



courseRoutes.post("/create",(req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json({
                    success: false,
                    message: "File size exceeds the 50MB limit!"
                });
            }
        } else if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        createCourse(req, res);
    });
})
courseRoutes.get("/courses/:id", getCourseById);
courseRoutes.get("/courses", getCourses);


export default courseRoutes;