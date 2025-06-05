import { Exam } from "../Model/exam.model.js"
import { ExamResult } from "../Model/examRanking.model.js";
import { User } from "../Model/user.model.js";



export const exam = async (req, res) => {
    try {
        const { title, questions, negativeMarking, duration } = req.body;

        if (!Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ success: false, message: "Questions must be an array" });
        }

      const formattedQuestions = questions.map((q) => ({
    question: q.question || "Untitled Question",
    option: Array.isArray(q.option) && q.option.length === 4 ? q.option : ["", "", "", ""],
    answer: q.answer || "",
    marks: q.marks || 1,
}));


        const newExam = new Exam({
            title,
            question: formattedQuestions,
            negativeMarking,
            duration
            // createdBy: req.user.id, 
        });

        await newExam.save();
        return res.status(201).json({ success: true, message: "Exam created successfully!" });
    } catch (error) {
        console.error("Error in exam creation:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


export const examAll = async (req, res) => {
    try{
        const exams = await Exam.find({}).select("title _id");
        res.status(200).json({ success: true, exams });
    } catch (error) {
        console.error("Error fetching exams:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export const marks = async (req, res) => {
  try {
    const { examId } = req.params;
    const { answers, userId } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ success: false, message: "Invalid answers format" });
    }

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ success: false, message: "Exam not found" });
    }

    let totalScore = 0;
    const correctAnswers = exam.question.map((q, index) => {
      const correctAnswer = q.answer.trim().toLowerCase();
      const submittedAnswer = answers[index]?.trim().toLowerCase() || "";

      if (submittedAnswer === correctAnswer) {
        totalScore += q.marks;
      } else if (submittedAnswer !== "") {
        totalScore -= exam.negativeMarking;
      }

      return {
        question: q.question,
        correctAnswer: q.answer,
        submittedAnswer: answers[index] || "Not Answered",
        isCorrect: submittedAnswer === correctAnswer
      };
    });

    // Allow score to go negative
    const result = {
      user: userId,
      exam: examId,
      score: totalScore
    };

    await new ExamResult(result).save();
    exam.score.push({ user: userId, score: totalScore });
    await exam.save();

    return res.status(200).json({
      success: true,
      totalMarks: totalScore,
      correctAnswers
    });

  } catch (error) {
    console.error("Error submitting exam:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};



export const getSingleExam = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.examId).populate("question");  // Ensure questions are populated
        if (!exam) return res.status(404).json({ success: false, message: "Exam not found" });

        res.status(200).json({ success: true, exam });
    } catch (error) {
        console.error("Error fetching exam:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const examRanking = async (req, res) => {
    try {
        const { examId } = req.params;

        const rankings = await ExamResult.find({ exam: examId })
            .populate("user", "name email") 
            .sort({ score: -1 }) 
            .limit(100); 
            
        res.status(200).json({ success: true, rankings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};