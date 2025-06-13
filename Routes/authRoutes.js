import express from  "express"
import { login, logout, profile, register } from "../Controller/auth.controle.js";
import { protect } from "../meddileWare/authMiddleware.js";


const authRoutes = express.Router();

authRoutes.post('/register',register)
authRoutes.post('/login',login)
authRoutes.post('/logout', logout);
authRoutes.put('/update',profile);




export default authRoutes;