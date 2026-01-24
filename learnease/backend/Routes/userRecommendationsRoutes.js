import express from "express";
import UserRecommendationModel from "../Models/UserRecommendationsModel.js";

const router = express.Router();

// Get all user-added recommendations
router.get("/getAll", async (req, res) => {
  try {
    const data = await UserRecommendationModel.find();
    res.json(data);
  } catch (error) {
    console.error("Error fetching user recommendations:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Add a new recommendation
router.post("/add", async (req, res) => {
  try {
    const { subject, comment, userId } = req.body;
    if (!subject || !comment || !userId)
      return res.status(400).json({ message: "All fields required" });

    const newRec = new UserRecommendationModel({ subject, comment, userId });
    const savedRec = await newRec.save();
    res.status(201).json(savedRec);
  } catch (error) {
    console.error("Error adding recommendation:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete a recommendation (only if user added it)
router.delete("/delete/:id/:userId", async (req, res) => {
  try {
    const { id, userId } = req.params;
    const rec = await UserRecommendationModel.findById(id);
    if (!rec) return res.status(404).json({ message: "Recommendation not found" });
    if (rec.userId !== userId)
      return res.status(403).json({ message: "Cannot delete this recommendation" });

    await UserRecommendationModel.findByIdAndDelete(id);
    res.json({ message: "Recommendation deleted successfully" });
  } catch (error) {
    console.error("Error deleting recommendation:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
