import mongoose from "mongoose";
import { type } from "os";

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    image:{ type: String},
    option: {
        type: [String],
        required: true,
        validate: {
            validator: (v) => v.length === 4,
            message: "Each question must have exactly 4 options"
        }
    },
    answer: { type: String },
    marks: { type: Number, default: 1 }
});

const examSchema = new mongoose.Schema({
    sectionTitle: { type: String, required: true },
    duration: { type: Number, required: true },
    questions: [questionSchema],
    negativeMarking: { type: Number, default: 0 }
});

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number},
    prerequisites: { type: [String]},
    exams: [examSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export const ExamCourse = mongoose.model("ExamCourse", courseSchema);
