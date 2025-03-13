const mongoose = require("mongoose");


const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    
    pickupLocation: {
      type: String,
      required: true,
    },
    dropLocation: {
      type: String,
      required: true,
    },
    movingDate: {
      type: Date,
      required: true,
    },
    packageDetails: {
      items: { type: Number, required: true }, // Number of items
      weight: { type: Number, required: true }, // Weight in KG
      description: { type: String },
    },
    price: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "in-progress", "completed", "canceled"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
