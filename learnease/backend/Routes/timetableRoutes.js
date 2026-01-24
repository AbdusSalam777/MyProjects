import express from "express";
import TimeTableModel from "../Models/TimeTableModel.js";

const router = express.Router();

// 🔹 GET entries for specific user
router.get("/getall/:userId", async (req, res) => {
  try {
    const data = await TimeTableModel.find({ userId: req.params.userId });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 ADD new entry
router.post("/addnew", async (req, res) => {
  try {
    const { subject, day, time, userId } = req.body;

    const newEntry = await TimeTableModel.create({
      subject,
      day,
      time,
      userId,
    });

    res.json(newEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔹 UPDATE entry
router.put("/update/:id", async (req, res) => {
  try {
    const { subject, day, time, userId } = req.body;

    const updated = await TimeTableModel.findByIdAndUpdate(
      req.params.id,
      { subject, day, time, userId },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔹 DELETE entry
router.delete("/delete/:id", async (req, res) => {
  try {
    await TimeTableModel.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
