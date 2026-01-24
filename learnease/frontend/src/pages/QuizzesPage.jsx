import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import QuizForm from "../components/QuizForm";
import QuizzesTable from "../components/QuizTable";

const QuizzesPage = () => {
  const { user } = useUser();
  const [quizzes, setQuizzes] = useState([]);
  const [editData, setEditData] = useState(null);

  const API = "https://learneasebackend-79bj.onrender.com/quizzes";

  // --- Step 2: Load all quizzes ---
  useEffect(() => {
    if (!user) return;
    fetch(`${API}/getall/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        // Initialize "notified" flag for each quiz
        const withNotified = data.map((q) => ({ ...q, notified: false }));
        setQuizzes(withNotified);
      })
      .catch((err) => console.log(err));
  }, [user]);

  // --- Step 4: Add or Update Quiz ---
  const handleAddOrUpdate = (quiz) => {
    const index = quizzes.findIndex((q) => q._id === quiz._id);
    if (index !== -1) {
      const updatedList = [...quizzes];
      updatedList[index] = { ...quiz, notified: false }; // reset notified if updated
      setQuizzes(updatedList);
    } else {
      setQuizzes((prev) => [...prev, { ...quiz, notified: false }]);
    }
    setEditData(null);
  };

  const handleEdit = (quiz) => setEditData(quiz);

  const handleDeleteSuccess = (id) => {
    setQuizzes((prev) => prev.filter((q) => q._id !== id));
  };

  return (
    <div className="min-h-screen p-10 bg-gray-950 text-white">
      <h1 className="text-4xl font-bold text-center mb-8 mt-10">Your Quizzes</h1>

      <QuizForm
        API={API}
        userId={user?.id}
        editData={editData}
        onSuccess={handleAddOrUpdate}
      />

      <QuizzesTable
        data={quizzes}
        onEdit={handleEdit}
        API={API}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </div>
  );
};

export default QuizzesPage;
