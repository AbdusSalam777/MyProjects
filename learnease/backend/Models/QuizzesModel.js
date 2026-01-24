import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  quizName: { type: String, required: true },
  quizDate: { type: String, required: true },   // e.g. "2025-02-12"
  quizTime: { type: String, required: true },   // e.g. "02:00 PM"
  userId: { type: String, required: true },
});

const QuizModel = mongoose.model("Quiz", quizSchema);

export default QuizModel;
