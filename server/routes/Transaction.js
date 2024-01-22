import express from "express";
import Transaction from "../models/Transaction.js";
const router = express.Router();
router.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find().limit(50);
    res.status(200).json(transactions);
  } catch (err) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
