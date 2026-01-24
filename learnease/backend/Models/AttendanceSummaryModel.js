import mongoose from "mongoose";

const summarySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  subject: { type: String, required: true },
  percentage: { type: Number, default: 0 },
  emailSent: { type: Boolean, default: false }
});

const AttendanceummaryModel=mongoose.model("AttendanceSummary", summarySchema);
export default AttendanceummaryModel;