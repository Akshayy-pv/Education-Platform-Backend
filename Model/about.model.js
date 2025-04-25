import mongoose from "mongoose";


const advisorSchema = new mongoose.Schema({
  name: String,
  role: String,
  description: String,
  imageUrl: String,
});

export const About = mongoose.model("About", advisorSchema)