import express from "express";
import { checkPaymentStatus, createOrder, enrollCourseManually, verifyPayment } from "../Controller/payment.controle.js";

const paymentRouters = express.Router();

paymentRouters.post("/create-order", createOrder);
paymentRouters.post("/verify-payment", verifyPayment);
paymentRouters.get("/check-status/:orderId", checkPaymentStatus);
paymentRouters.post("/enroll-course", enrollCourseManually);

export default paymentRouters;
