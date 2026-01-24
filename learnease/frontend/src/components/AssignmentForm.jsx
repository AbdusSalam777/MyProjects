import { useState, useEffect } from "react";

const AssignmentForm = ({ onAdd, editData }) => {
  const [assignmentName, setAssignmentName] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");

  useEffect(() => {
    if (editData) {
      setAssignmentName(editData.assignmentName);
      setDeadlineDate(editData.deadlineDate);
      setDeadlineTime(editData.deadlineTime);
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ assignmentName, deadlineDate, deadlineTime });
    setAssignmentName("");
    setDeadlineDate("");
    setDeadlineTime("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto bg-gray-900 p-6 rounded-xl shadow-xl">
      <input
        type="text"
        placeholder="Assignment Name"
        value={assignmentName}
        onChange={(e) => setAssignmentName(e.target.value)}
        required
        className="p-2 rounded bg-gray-800 text-white"
      />
      <input
        type="date"
        value={deadlineDate}
        onChange={(e) => setDeadlineDate(e.target.value)}
        required
        className="p-2 rounded bg-gray-800 text-white"
      />
      <input
        type="time"
        value={deadlineTime}
        onChange={(e) => setDeadlineTime(e.target.value)}
        required
        className="p-2 rounded bg-gray-800 text-white"
      />
      <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 rounded">
        {editData ? "Update" : "Add"} Assignment
      </button>
    </form>
  );
};

export default AssignmentForm;
