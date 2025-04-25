import jwt from "jsonwebtoken"
import { User } from "../Model/user.model.js";

export const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Token is invalid or expired' });
    }
};

export const adminOnly = (req, res, next) => {
    if (!req.user.isAdmin) return res.status(403).json({ message: 'Admins only' });
    next();
};
