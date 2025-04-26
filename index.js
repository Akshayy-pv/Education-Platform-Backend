import express from "express"
import { connectDB } from "./connectDB/db.js";
import dotenv from "dotenv"
import authRoutes from "./Routes/authRoutes.js";
import examRoutes from "./Routes/examRoutes.js";
import cors from "cors"
import courseRoutes from "./Routes/courseRoutes.js";
import path from "path"
import bodyParser from "body-parser";
import adminRoutes from "./Routes/adminRoutes.js";
import paymentRouters from "./Routes/paymentRoutes.js"
import dashboardRouter from "./Routes/dashboardRoutes.js";
import aboutRoutes from "./Routes/aboutRoutes.js";

const Client_URL = process.env.CLIENT_URL


dotenv.config();
const app = express();
app.use(cors({ origin: `${Client_URL}`, credentials: true}))


app.use(express.json())
app.use(bodyParser.json());


app.use('/api/auth',authRoutes);
app.use('/api/exam', examRoutes);
app.use('/api/course', courseRoutes)
app.use('/api/payment', paymentRouters)
app.use('/api/admin', adminRoutes)
app.use('/api/dashboard',dashboardRouter)
app.use('/api/about',aboutRoutes)

app.use("/uploads", express.static(path.join("uploads")));



app.listen(3000, ()=> {
    connectDB();
    console.log("SERVER IS CONNECTED IN SERVER 3000")
   
})

