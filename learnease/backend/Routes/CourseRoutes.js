import express from "express";
import CourseModel from "../Models/coursemodel.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const courses = await CourseModel.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // URL se id nikal lo
    const course = await CourseModel.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error });
  }
});

export default router;