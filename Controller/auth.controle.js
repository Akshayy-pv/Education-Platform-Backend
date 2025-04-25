import bcrypt from "bcryptjs"
import { User } from "../Model/user.model.js";
import jwt from "jsonwebtoken"



export const register = async (req,res) => {
    const { name, email, password, isAdmin } = req.body;

    try {
        if (!name || !email || !password) {
            throw new Error("All fields are required");
        }

        const UserAlreadyExist = await User.findOne({ email });

        if (UserAlreadyExist) {
            return res.status(400).json({ success: false, message: "User Already Exists" });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashpassword,
            isAdmin// Only true if explicitly passed
        });

        await newUser.save();
        res.status(201).json({ message: "Registration Successfully" });

    } catch (error) {
        res.status(500).json({ message: `Error in registration: ${error.message}` });
    }
};



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "USER NOT FOUND" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "INVALID CREDENTIALS" });
        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.status(200).json({ user, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error in login" });
    }
};



export const logout = (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" });
        res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error in logout" });
    }
};
