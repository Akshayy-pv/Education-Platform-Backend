import express from "express";
import { authenticateUser, isAdmin } from "../meddileWare/authenticateUser.js";

const adminRoutes = express.Router();

adminRoutes.get("/dashboard", authenticateUser, isAdmin, (req, res) => {
    res.status(200).json({ message: "Welcome to Admin Dashboard", admin: req.user });
});

export default adminRoutes;
