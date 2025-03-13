// const Payment = require("../models/paymentmodel");
// const Order = require("../models/bookingmodel");
// const Razorpay = require("razorpay");
// require("dotenv").config();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export const createPayment = async (req, res) => {
//     try {
//       const payment = new Payment(req.body);
//       await payment.save();
//       res.status(201).json({ message: 'Payment created successfully', payment });
//     } catch (error) {
//       res.status(500).json({ message: 'Error creating payment', error });
//     }
//   };

// // 1. Initiate Payment
// exports.initiatePayment = async (req, res) => {
//   try {
//     const { orderId, amount, paymentMethod } = req.body;
    
//     if (!orderId || !amount || !paymentMethod) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     const order = await Order.findById(orderId);
//     if (!order) return res.status(404).json({ success: false, message: "Order not found" });

//     const options = {
//       amount: amount * 100, // Convert to paisa
//       currency: "INR",
//       receipt: `receipt_${orderId}`,
//       payment_capture: 1,
//     };

//     const response = await razorpay.orders.create(options);

//     const newPayment = new Payment({
//       userId: req.user.id,
//       orderId,
//       amount,
//       paymentMethod,
//       paymentGateway: "Razorpay",
//       paymentStatus: "pending",
//       transactionId: response.id,
//     });

//     await newPayment.save();

//     res.status(201).json({ success: true, payment: response });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // 2. Verify Payment
// exports.verifyPayment = async (req, res) => {
//   try {
//     const { paymentId, orderId, signature } = req.body;
    
//     const payment = await Payment.findOne({ transactionId: orderId });
//     if (!payment) return res.status(404).json({ success: false, message: "Payment not found" });

//     payment.paymentStatus = "successful";
//     await payment.save();

//     res.json({ success: true, message: "Payment verified successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // 3. Get All Payments (Admin)
// exports.getPayments = async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Access denied" });
//     }

//     const payments = await Payment.find().populate("userId orderId");
//     res.json({ success: true, payments });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
