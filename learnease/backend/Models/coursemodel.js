import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({}, { collection: "courses", strict: false });

const CourseModel = mongoose.model("Course", courseSchema);

export default CourseModel;