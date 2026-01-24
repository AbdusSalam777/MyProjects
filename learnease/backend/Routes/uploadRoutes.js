import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import UploadModel from "../Models/UploadModel.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => ({
    folder: "uploads",
    resource_type: "auto",
    access_mode: "public",          // 🔥 MOST IMPORTANT LINE
    public_id: `${file.originalname.split(".")[0]}-${Date.now()}`,
  }),
});


const parser = multer({ storage });

// 🔹 Upload a file (requires userId in body)
router.post("/upload", parser.single("file"), async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "userId missing" });
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const { originalname, mimetype, path, filename } = req.file;

    // Save file info in MongoDB
    const newFile = await UploadModel.create({
      name: originalname,
      url: path,
      type: mimetype,
      public_id: filename || path,
      userId,
    });

    res.json(newFile);
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

// 🔹 Get all files for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const files = await UploadModel.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch files", error: err.message });
  }
});

// 🔹 Delete a file
router.delete("/delete/:id", async (req, res) => {
  try {
    const file = await UploadModel.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    await cloudinary.uploader.destroy(file.public_id);
    await file.deleteOne();

    res.json({ success: true, message: "File deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

export default router;
