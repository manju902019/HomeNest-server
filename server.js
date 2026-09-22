const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Property = require("./Property");
require("dotenv").config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Home Route
app.get("/", (req, res) => {
  res.send("HomeNest Server Running");
});

// Add Property
app.post("/addproperty", async (req, res) => {
  try {
    const property = new Property({
      title: req.body.title,
      location: req.body.location,
      type: req.body.type,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description,
    });

    await property.save();

    res.json({
      success: true,
      message: "Property Added Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// View All Properties
app.get("/properties", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Update Property
app.put("/updateproperty/:id", async (req, res) => {
  try {
    await Property.findByIdAndUpdate(req.params.id, req.body);

    res.json({
      success: true,
      message: "Property Updated Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Delete Property
app.delete("/deleteproperty/:id", async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Property Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Start Server
app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});