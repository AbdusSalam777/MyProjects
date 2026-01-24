import express from "express";
import AttendanceModel from "../Models/AttendanceModel.js";
import TimeTableModel from "../Models/TimeTableModel.js";

const router = express.Router();

// 🔹 Get today's classes with attendance info
router.get("/today/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Get today's day name
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const today = days[new Date().getDay()];

    // Get user's classes for today
    const classes = await TimeTableModel.find({ userId, day: today });

    // Get attendance records for today
    const todayDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const attendanceRecords = await AttendanceModel.find({ userId, date: todayDate });

    // Merge attendance info
    const result = classes.map(cls => {
      const record = attendanceRecords.find(r => r.classId === cls._id.toString());
      return {
        ...cls._doc,
        attendanceStatus: record ? record.status : "absent"
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Course-wise Attendance Summary
router.get("/summary/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const classes = await TimeTableModel.find({ userId });
    const attendance = await AttendanceModel.find({ userId });

    const result = classes.map(cls => {
      const records = attendance.filter(a => a.classId === cls._id.toString());

      const present = records.filter(r => r.status === "present").length;
      const absent = records.filter(r => r.status === "absent").length;
      const total = present + absent;

      const percentage = total === 0 ? 0 : Math.round((present / total) * 100);

      return {
        subject: cls.subject,
        present,
        absent,
        percentage
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔹 Mark attendance
router.post("/mark", async (req, res) => {
  try {
    const { userId, classId, status } = req.body;
    const date = new Date().toISOString().split("T")[0];

    const existing = await AttendanceModel.findOne({ userId, classId, date });

    if (existing) {
      existing.status = status;
      await existing.save();
      return res.json(existing);
    }

    const newRecord = await AttendanceModel.create({ userId, classId, date, status });
    res.json(newRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
