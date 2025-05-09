import express from "express"
import { createCourseWithExams, getCourseById, getCourses, updateCourseWithExams } from "../Controller/examCourseCreationController.js";
import parser from "../meddileWare/multerUpload.js";

const examCourseRoutes = express.Router();


examCourseRoutes.post("/creation",createCourseWithExams);

examCourseRoutes.post('/upload-image', parser.single('image'), (req, res) => {
    try {
        const imageUrl = req.file.path;
        const fullImageUrl = req.file.path.replace(/\\/g, '/');  // Ensure correct URL format
        res.json({ imageUrl: fullImageUrl });
    } catch (err) {
        console.error("Image upload error:", err);
        res.status(500).json({ error: 'Image upload failed' });
    }
});


examCourseRoutes.get("/courses/:id", getCourseById);
examCourseRoutes.get("/courses", getCourses);
examCourseRoutes.put("/courses/:id", updateCourseWithExams  );




export default examCourseRoutes