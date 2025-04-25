import { User } from "../Model/user.model.js";

export const getUserEnrolledCourses = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate("enrolledCourses");
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        res.status(200).json({ success: true, enrolledCourses: user.enrolledCourses });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching enrolled courses", error: error.message });
    }
};
