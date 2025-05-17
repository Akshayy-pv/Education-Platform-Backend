import express from  "express"
import { login, logout, register } from "../Controller/auth.controle.js";
import { protect } from "../meddileWare/authMiddleware.js";


const authRoutes = express.Router();

authRoutes.post('/register',register)
authRoutes.post('/login',login)
authRoutes.post('/logout', logout);




export default authRoutes;