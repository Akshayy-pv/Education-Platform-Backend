import mongoose from "mongoose";

const examResultSchema= new mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true},
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", require: true},
    score: { type: Number, require: true},

})

export const ExamResult = mongoose.model("ExamResult", examResultSchema)