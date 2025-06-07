import express from "express"
import { createCourseWithExams, examDelete, getCourseById, getCourses, marks, updateCourseWithExams } from "../Controller/examCourseCreationController.js";
import parser from "../meddileWare/multerUpload.js";
import multer from "multer";
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import { getGeminiGeneratedCourse } from "../utils/gemini.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fetch from "node-fetch";
import { GoogleAuth } from "google-auth-library";



// ESM workaround to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const examCourseRoutes = express.Router();
const upload = multer();
const pdfPath = path.join(__dirname, "uploads", "your-actual-file.pdf");




examCourseRoutes.post('/marks/:examId',marks );

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
examCourseRoutes.delete('/courses/:id', examDelete)



examCourseRoutes.post("/generate-from-pdf", upload.single("pdf"), async (req, res) => {
  try {
    const pdfBuffer = req.file.buffer;
    const data = await pdfParse(pdfBuffer); // ✅ this is good
    const rawText = data.text;

    const courseData = await getGeminiGeneratedCourse(rawText);
    res.json({ courseData });
  } catch (err) {
    console.error("PDF upload error:", err);
    res.status(500).json({ error: "Failed to process PDF" });
  }
});






export default examCourseRoutes