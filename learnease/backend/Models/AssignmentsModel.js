import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  assignmentName: { type: String, required: true },
  deadlineDate: { type: String, required: true },   // e.g. "2025-02-10"
  deadlineTime: { type: String, required: true },   // e.g. "10:30 AM"
  userId: { type: String, required: true },
});

const AssignmentModel = mongoose.model("Assignment", assignmentSchema);

export default AssignmentModel;
