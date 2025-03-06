import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Logging middleware for debugging requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Define the Order schema
const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  cartItems: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: String, required: true },
      quantity: { type: Number, required: true }
    },
  ],
});

// Create the Order model
const Order = mongoose.model("Order", OrderSchema);

// POST endpoint to save orders
app.post("/api/orders", async (req, res) => {
  try {
    console.log("Received order data:", req.body);
    const { name, address, contact, cartItems, totalPrice } = req.body;
    if (!name || !address || !contact || !cartItems || totalPrice == null) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newOrder = new Order({ name, address, contact, cartItems, totalPrice });
    await newOrder.save();
    res.status(201).json({ message: "Order saved successfully!" });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Error saving order", details: error.message });
  }
});

// GET endpoint to retrieve all orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ error: "Error retrieving orders" });
  }
});

// Use PORT from environment variables
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
