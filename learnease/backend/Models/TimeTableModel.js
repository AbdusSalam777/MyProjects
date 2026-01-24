import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  day: { type: String, required: true },
  time: { type: String, required: true },
  userId: { type: String, required: true }, // 🔥 REQUIRED
});

const model = mongoose.model("Timetable", timetableSchema);

export default model;