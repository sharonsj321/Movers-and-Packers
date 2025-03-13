const Booking = require("../models/bookingmodel");
const mongoose = require("mongoose");

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        // Ensure `req.user` is available
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No user attached" });
        }

        // Check if all required fields are present
        const { packageType, movingFrom, movingTo, movingDate, totalPrice } = req.body;

        if (!packageType || !movingFrom || !movingTo || !movingDate || !totalPrice) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new booking with user ID from `req.user`
        const booking = new Booking({
            user: req.user._id,  // ✅ Automatically attach logged-in user
            packageType,
            movingFrom,
            movingTo,
            movingDate,
            totalPrice
        });

        await booking.save();
        res.status(201).json({ message: "Booking created successfully", booking });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all bookings (Admin only)
exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate("user", "name email");
        res.status(200).json({ message: "Success", bookings });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const bookingId = req.params.id;

        // Validate MongoDB ID
        if (!mongoose.Types.ObjectId.isValid(bookingId)) {
            return res.status(400).json({ message: "Invalid booking ID" });
        }

        const booking = await Booking.findById(bookingId).populate("user", "name email");

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: "Success", booking });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update booking status (Admin only)
exports.updateBookingStatus = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const { status } = req.body;

        if (!["Pending", "Confirmed", "Completed", "Cancelled"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const booking = await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: "Booking status updated successfully", booking });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete a booking (User or Admin)
exports.deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;

        const booking = await Booking.findByIdAndDelete(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: "Booking deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
