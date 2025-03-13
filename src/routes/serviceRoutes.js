const express = require("express");
const Service = require("../models/servicemodel");
const router = express.Router();

// ✅ Create a new service
router.post("/add", async (req, res) => {
  try {
    const newService = new Service(req.body);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Get all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find().populate("provider", "name email");
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get a single service by ID
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate("provider", "name email");
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update a service
router.put("/:id", async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Delete a service
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
