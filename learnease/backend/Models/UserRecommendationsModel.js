import mongoose from "mongoose";

const UserRecommendationSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  comment: { type: String, required: true },
  userId: { type: String, required: true }, // ID of the user who added it
}, { timestamps: true });

const UserRecommendationModel= mongoose.model("UserRecommendation",UserRecommendationSchema);

export default UserRecommendationModel;