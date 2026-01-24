import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import timetableRoutes from "./Routes/timetableRoutes.js";
import uploadRoutes from "./Routes/uploadRoutes.js";
import recommendationsRoutes from "./Routes/recommendationsRoutes.js";
import assignmentroutes from "./Routes/AssignmentsRoutes.js";
import quizzesroutes from "./Routes/QuizzesRoutes.js";
import attendanceRoutes from "./Routes/attendanceRoutes.js";
import UserRecommendationRoutes from "./Routes/userRecommendationsRoutes.js";
import CourseRoutes from "./Routes/CourseRoutes.js";
dotenv.config();
const app = express();

// Middleware

app.use(cors());
app.use(express.json());

// MongoDB connection

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Server check

app.get("/", (req, res) => res.send("Server running..."));

//routes

app.use("/timetable", timetableRoutes);
app.use("/uploads", uploadRoutes);
app.use("/recommendations/",recommendationsRoutes);
app.use("/assignments", assignmentroutes);
app.use("/quizzes", quizzesroutes);
app.use("/attendance", attendanceRoutes);
app.use("/userRecommendations", UserRecommendationRoutes);
app.use("/courses", CourseRoutes);
// Start server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
