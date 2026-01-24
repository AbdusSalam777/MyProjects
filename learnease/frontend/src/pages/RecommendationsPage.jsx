import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Recommendations from "../components/recommendations";
import { Lightbulb, BookOpen, Sparkles, Plus, X } from "lucide-react";

const RecommendationsPage = () => {
  const { user, isLoaded } = useUser();

  const [showPopup, setShowPopup] = useState(false);
  const [newRecommendation, setNewRecommendation] = useState({
    subject: "",
    comment: "",
  });
  
  if (!isLoaded) return null;
  const currentUserId = user.id;

  const handleChange = (e) => {
    setNewRecommendation({
      ...newRecommendation,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newRecommendation.subject || !newRecommendation.comment) return;

    try {
      const res = await fetch(
        "https://learneasebackend-79bj.onrender.com/userRecommendations/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject: newRecommendation.subject,
            comment: newRecommendation.comment,
            userId: currentUserId,
          }),
        }
      );
      if (!res.ok) throw new Error("Failed to add");
      setNewRecommendation({ subject: "", comment: "" });
      setShowPopup(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen mt-20 py-10 px-6">
      {/* Hero */}
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-3 text-blue-500">
          <Lightbulb size={30} />
          <BookOpen size={30} />
          <Sparkles size={30} />
        </div>
        <h1 className="text-4xl font-bold text-amber-50 mb-4">
          Personalized Study Recommendations
        </h1>
        <p className="text-lg text-amber-50/90">
          Student-tested tips to improve learning efficiency
        </p>
      </div>

      {/* Add Button */}
      <div className="max-w-3xl mx-auto mb-6">
        <button
          onClick={() => setShowPopup(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl"
        >
          <Plus size={18} /> Add Recommendation
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/40">
          <div className="bg-gray-900 text-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-gray-700 relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4 text-amber-400">
              Add Recommendation
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={newRecommendation.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">
                  Comment
                </label>
                <textarea
                  name="comment"
                  value={newRecommendation.comment}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-400 text-gray-900 hover:bg-amber-500 transition"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List */}
      <Recommendations currentUserId={currentUserId} />
    </div>
  );
};

export default RecommendationsPage;
