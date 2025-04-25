import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,  
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    isAdmin: {
        type: Boolean,
        default: false
    },
    

    

},{timestamps: true})


export const User = mongoose.model("User",userSchema);