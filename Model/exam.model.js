import mongoose from "mongoose";

const qst = new mongoose.Schema({
    question: { type: String, required: true },
    option: { 
        type: [String], 
        required: true, 
        validate: {
            validator: function(v) {
                return v.length === 4; // Ensure exactly 4 options are provided
            },
            message: 'Each question must have exactly 4 options'
        }
    },
    answer: { type: String, required: true },
    marks: { type: Number, default: 1 } // Default mark per question is 1
});

const examSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        question: [qst],
        negativeMarking: { type: Number, default: 0 },
        score: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
                score: { type: Number, required: true },
                timestamp: { type: Date, default: Date.now },
            },
        ],
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

export const Exam = mongoose.model("Exam", examSchema);
