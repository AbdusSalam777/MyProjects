import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  userId: { type: String, required: true },   
  classId: { type: String, required: true },   
  date: { type: String, required: true },     
  status: { type: String, enum: ["present", "absent"], default: "present" } // Present or absent
}); 

const AttendanceModel = mongoose.model("Attendance", attendanceSchema);
export default AttendanceModel;
