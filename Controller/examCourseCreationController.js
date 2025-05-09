

import { ExamCourse } from "../Model/examCourse.model.js";

export const createCourseWithExams = async (req, res) => {
    try {
        const { title, description, price, prerequisites} = req.body;

        const exams = typeof req.body.exams === "string" ? JSON.parse(req.body.exams) : req.body.exams;

      
        if (!Array.isArray(exams) || exams.length === 0) {
            return res.status(400).json({ success: false, message: "Exams must be a non-empty array" });
        }

        const formattedExams = exams.map((exam) => ({
            sectionTitle: exam.sectionTitle,
            negativeMarking: exam.negativeMarking || 0,
            duration: exam.duration || 90,
            questions: exam.questions.map((q) => ({
                question: q.question || "Untitled",
                image: q.image || null,
                option: Array.isArray(q.option) && q.option.length === 4 ? q.option : ["", "", "", ""],
                answer: q.answer || "",
                marks: q.marks || 1
            }))
        }));

        const course = new ExamCourse({
            title,
            description,
            price,
            prerequisites,
            exams: formattedExams,
            createdBy: req.userId // from auth middleware
        });

        await course.save();
        return res.status(201).json({ success: true, message: "Course created successfully", course });

    } catch (error) {
        console.error("Error creating course with exams:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


export const getCourses = async (req, res ) => {


        try {
            const courses = await ExamCourse.find({}, "title description");
            res.status(200).json({ success: true, courses });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error fetching courses", error: error.message });
        }
}


export const getCourseById = async (req, res) => {
    try {
        const course = await ExamCourse.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        res.status(200).json({ success: true, course });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching course details", error: error.message });
    }
};

export const updateCourseWithExams = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, price, prerequisites, exams } = req.body;
  
      if (!Array.isArray(exams) || exams.length === 0) {
        return res.status(400).json({ success: false, message: "Exams must be a non-empty array" });
      }
  
      const formattedExams = exams.map((exam) => ({
        sectionTitle: exam.sectionTitle,
        negativeMarking: exam.negativeMarking || 0,
        duration: exam.duration || 90,
        questions: exam.questions.map((q) => ({
          question: q.question || "Untitled",
          image: q.image || null,
          option: Array.isArray(q.option) && q.option.length === 4 ? q.option : ["", "", "", ""],
          answer: q.answer || "",
          marks: q.marks || 1
        }))
      }));
  
      const updatedCourse = await ExamCourse.findByIdAndUpdate(
        id,
        { title, description, price, prerequisites, exams: formattedExams },
        { new: true }
      );
  
      if (!updatedCourse) {
        return res.status(404).json({ success: false, message: "Course not found" });
      }
  
      res.status(200).json({ success: true, message: "Course updated successfully", course: updatedCourse });
    } catch (error) {
      console.error("Error updating course:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };