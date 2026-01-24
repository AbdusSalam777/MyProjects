import express from "express";
import AssignmentModel from "../Models/AssignmentsModel.js";

const router = express.Router();

// 🔹 GET all assignments for specific user
router.get("/getall/:userId", async (req, res) => {
  try {
    const data = await AssignmentModel.find({ userId: req.params.userId });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 ADD new assignment
router.post("/addnew", async (req, res) => {
  try {
    const { assignmentName, deadlineDate, deadlineTime, userId } = req.body;

    const newAssignment = await AssignmentModel.create({
      assignmentName,
      deadlineDate,
      deadlineTime,
      userId,
    });

    res.json(newAssignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 UPDATE assignment
router.put("/update/:id", async (req, res) => {
  try {
    const { assignmentName, deadlineDate, deadlineTime, userId } = req.body;

    const updatedAssignment = await AssignmentModel.findByIdAndUpdate(
      req.params.id,
      { assignmentName, deadlineDate, deadlineTime, userId },
      { new: true }
    );

    res.json(updatedAssignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 DELETE assignment
router.delete("/delete/:id", async (req, res) => {
  try {
    await AssignmentModel.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
