import { useState, useEffect } from "react";

const QuizForm = ({ API, userId, editData, onSuccess }) => {
  const [quizName, setQuizName] = useState("");
  const [quizDate, setQuizDate] = useState("");
  const [quizTime, setQuizTime] = useState("");

  useEffect(() => {
    if (editData) {
      setQuizName(editData.quizName);
      setQuizDate(editData.quizDate);
      setQuizTime(editData.quizTime);
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;
      if (editData) {
        // Update
        res = await fetch(`${API}/update/${editData._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quizName, quizDate, quizTime, userId }),
        });
      } else {
        // Add new
        res = await fetch(`${API}/addnew`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quizName, quizDate, quizTime, userId }),
        });
      }

      const data = await res.json();
      onSuccess(data);
      setQuizName("");
      setQuizDate("");
      setQuizTime("");
    } catch (err) {
      console.error("Error submitting quiz:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto bg-gray-900 p-6 rounded-xl shadow-xl">
      <input
        type="text"
        placeholder="Quiz Name"
        value={quizName}
        onChange={(e) => setQuizName(e.target.value)}
        required
        className="p-2 rounded bg-gray-800 text-white"
      />
      <input
        type="date"
        value={quizDate}
        onChange={(e) => setQuizDate(e.target.value)}
        required
        className="p-2 rounded bg-gray-800 text-white"
      />
      <input
        type="time"
        value={quizTime}
        onChange={(e) => setQuizTime(e.target.value)}
        required
        className="p-2 rounded bg-gray-800 text-white"
      />
      <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 rounded">
        {editData ? "Update" : "Add"} Quiz
      </button>
    </form>
  );
};

export default QuizForm;
