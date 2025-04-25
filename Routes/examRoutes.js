import express from  "express"
import { exam, examAll, examRanking, getSingleExam, marks } from "../Controller/exam.controle.js";
import { authenticateUser } from "../meddileWare/authenticateUser.js";


const examRoutes = express.Router();


examRoutes.post('/newexam', exam)

examRoutes.get('/exams',authenticateUser, examAll)

examRoutes.get('/exams/:examId',authenticateUser, getSingleExam)

examRoutes.post('/exams/:examId/submit',authenticateUser, marks)

examRoutes.get("/ranking/:examId", authenticateUser, examRanking);


export default examRoutes