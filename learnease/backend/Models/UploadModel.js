import mongoose from "mongoose";

const UploadSchema = new mongoose.Schema({
  name: { type: String },
  url: { type: String },
  type: { type: String },
  public_id: { type: String }, 
  userId: { type: String }
});

export default mongoose.model("Upload", UploadSchema);