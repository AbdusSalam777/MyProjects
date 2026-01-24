import express from "express";
import QuizModel from "../Models/QuizzesModel.js";

const router = express.Router();

// 🔹 GET all quizzes for specific user
router.get("/getall/:userId", async (req, res) => {
  try {
    const data = await QuizModel.find({ userId: req.params.userId });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 ADD new quiz
router.post("/addnew", async (req, res) => {
  try {
    const { quizName, quizDate, quizTime, userId } = req.body;

    const newQuiz = await QuizModel.create({
      quizName,
      quizDate,
      quizTime,
      userId,
    });

    res.json(newQuiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 UPDATE quiz
router.put("/update/:id", async (req, res) => {
  try {
    const { quizName, quizDate, quizTime, userId } = req.body;

    const updatedQuiz = await QuizModel.findByIdAndUpdate(
      req.params.id,
      { quizName, quizDate, quizTime, userId },
      { new: true }
    );

    res.json(updatedQuiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 DELETE quiz
router.delete("/delete/:id", async (req, res) => {
  try {
    await QuizModel.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
