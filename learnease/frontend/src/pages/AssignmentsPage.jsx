import { useState, useEffect } from "react";
import AssignmentForm from "../components/AssignmentForm";
import AssignmentsTable from "../components/AssignmentsTable";
import { useUser } from "@clerk/clerk-react";

const AssignmentsPage = () => {
  const { user } = useUser();
  const [assignments, setAssignments] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const API = "https://learneasebackend-79bj.onrender.com/assignments";

  useEffect(() => {
    if (!user) return;
    fetch(`${API}/getall/${user.id}`)
      .then(res => res.json())
      .then(data => setAssignments(data))
      .catch(err => console.log(err));
  }, [user]);

  const addAssignment = async (entry) => {
    if (editIndex !== null) {
      const id = assignments[editIndex]._id;

      const res = await fetch(`${API}/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignmentName: entry.assignmentName,
          deadlineDate: entry.deadlineDate,
          deadlineTime: entry.deadlineTime,
          userId: user.id,
        }),
      });

      const updated = await res.json();
      const updatedList = [...assignments];
      updatedList[editIndex] = updated;
      setAssignments(updatedList);
      setEditIndex(null);
    } else {
      const res = await fetch(`${API}/addnew`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignmentName: entry.assignmentName,
          deadlineDate: entry.deadlineDate,
          deadlineTime: entry.deadlineTime,
          userId: user.id,
        }),
      });

      const newAssignment = await res.json();
      setAssignments(prev => [...prev, newAssignment]);
    }
  };

  const handleDelete = async (index) => {
    const id = assignments[index]._id;
    await fetch(`${API}/delete/${id}`, { method: "DELETE" });
    setAssignments(prev => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => setEditIndex(index);

  return (
    <div className="min-h-screen p-10 bg-gray-950 text-white">
      <h1 className="text-4xl font-bold text-center mb-8 mt-10">Your Assignments</h1>
      <AssignmentForm
        onAdd={addAssignment}
        editData={editIndex !== null ? assignments[editIndex] : null}
      />
      <AssignmentsTable
        data={assignments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AssignmentsPage;
