import express from "express";
import { createOrder, verifyPayment } from "../Controller/payment.controle.js";

const paymentRouters = express.Router();

paymentRouters.post("/create-order", createOrder);
paymentRouters.post("/verify-payment", verifyPayment);

export default paymentRouters;
