import mongoose from "mongoose";

const RecommendationsSchema = new mongoose.Schema({
  subject: { type: String },
  comment: { type: String },
  //   userId: { type: String, required: false }, 
});

export default mongoose.model("Recommendation", RecommendationsSchema);