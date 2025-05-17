import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import { User } from "../Model/user.model.js";

dotenv.config();

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a new Razorpay order
export const createOrder = async (req, res) => {
    try {
        let { amount, currency } = req.body;

        if (!amount || isNaN(amount)) {
            return res.status(400).json({ success: false, message: "Invalid or missing amount" });
        }

        amount = parseInt(amount);

        const options = {
            amount: amount * 100, // Razorpay uses paise
            currency: currency || "INR",
            receipt: `receipt_${Math.floor(Math.random() * 100000)}`,
        };

        console.log("Creating Razorpay order with:", options);

        const order = await razorpay.orders.create(options);
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Error creating Razorpay order:", error?.response || error);
        res.status(500).json({ success: false, message: "Payment failed" });
    }
};


// Verify the payment signature from Razorpay
export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, courseId } = req.body;

        console.log("Payment response",req.body)

        const hmac = crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET );
        hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const generatedSignature = hmac.digest("hex");

        console.log("generatedSignature",generatedSignature)

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }

        // Update user's enrolled courses
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        if (!user.enrolledCourses.includes(courseId)) {
            user.enrolledCourses.push(courseId);
            await user.save();
        }

        res.status(200).json({ success: true, message: "Payment verified, course enrolled" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error verifying payment", error: error.message });
    }
};