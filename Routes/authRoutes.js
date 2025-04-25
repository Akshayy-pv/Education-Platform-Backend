import express from  "express"
import { login, register } from "../Controller/auth.controle.js";
import { protect } from "../meddileWare/authMiddleware.js";


const authRoutes = express.Router();

authRoutes.post('/register',register)
authRoutes.post('/login',login)



export default authRoutes;