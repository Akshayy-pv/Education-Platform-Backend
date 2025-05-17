import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
});

// Helper to list available models
export async function listModels() {
    try {
        const models = await genAI.listModels();
        console.log("Available models:", models);
        return models;
    } catch (err) {
        console.error("Error listing models:", err);
        throw err;
    }
}

// Updated course generator function with model as param
export async function getGeminiGeneratedCourse(pdfText, modelName = "gemini-pro") {
  try {
    const model = genAI.getGenerativeModel({ model: modelName });

    const prompt = `
    Given the following extracted text from a PDF, extract:
    - Course title
    - Description (optional)
    - Prerequisites (comma separated list)
    - Exams: Each exam should contain:
        - sectionTitle
        - duration (in minutes)
        - negativeMarking
        - questions: each question should have:
            - question
            - option (exactly 4 options)
            - answer
            - marks

    Return the result strictly as a JSON object like this:
    {
      title: "string",
      description: "string",
      price: number,
      prerequisites: ["string", ...],
      exams: [
        {
          sectionTitle: "string",
          duration: number,
          negativeMarking: number,
          questions: [
            {
              question: "string",
              option: ["A", "B", "C", "D"],
              answer: "string",
              marks: number
            }
          ]
        }
      ]
    }

    ---- PDF Text Below ----
    ${pdfText}
    `;

    const result = await model.generateContent([prompt]); // ✅ fix here
    const text = await result.response.text();

    return JSON.parse(text);
  } catch (err) {
    console.error("Error calling Gemini API or parsing output:", err);
    throw err;
  }
}




// test-gemini.mjs
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";

// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// async function test() {
//   const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//   const result = await model.generateContent(["Say hello in 3 languages"]);
//   const response = await result.response.text();
//   console.log(response);
// }

// test().catch(console.error);



