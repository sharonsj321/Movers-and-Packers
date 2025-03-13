const mongoose=require('mongoose')
const masterSchema=require('./mastermodel')

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Service description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      enum: ["Local Shifting", "Interstate Moving", "Office Relocation", "Vehicle Transport"],
      required: true,
    },
    images: {
      type: [String], // Array of image URLs
      default: [],
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the seller (mover)
      required: true,
    },
    availability: {
      type: Boolean,
      default: true, // Service is available by default
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: String,
        rating: { type: Number, min: 1, max: 5 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", ServiceSchema);
