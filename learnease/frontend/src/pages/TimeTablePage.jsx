import { useState, useEffect } from "react";
import SubjectForm from "../components/SubjectForm";
import TimeTable from "../components/TimeTable";
import { useUser } from "@clerk/clerk-react";

const TimeTablePage = () => {
  const { user } = useUser();
  const [subjects, setSubjects] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const API = "https://learneasebackend-79bj.onrender.com/timetable";

  // 🔹 Load only logged-in user's data
  useEffect(() => {
    if (!user) return;

    fetch(`${API}/getall/${user.id}`)
      .then(res => res.json())
      .then(data => setSubjects(data))
      .catch(err => console.log(err));
  }, [user]);


  // 🔹 Add or Update
  const addSubject = async (entry) => {
    if (editIndex !== null) {
      // UPDATE
      const id = subjects[editIndex]._id;

      const res = await fetch(`${API}/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: entry.subject,
          day: entry.day,
          time: entry.time,
          userId: user.id,
        }),
      });

      const updatedRecord = await res.json();

      const updatedList = [...subjects];
      updatedList[editIndex] = updatedRecord;
      setSubjects(updatedList);

      setEditIndex(null);
    } else {
      // ADD NEW
      const res = await fetch(`${API}/addnew`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: entry.subject,
          day: entry.day,
          time: entry.time,
          userId: user.id,
        }),
      });

      const newRecord = await res.json();
      setSubjects(prev => [...prev, newRecord]);
    }
  };


  // 🔹 Delete
  const handleDelete = async (index) => {
    const id = subjects[index]._id;

    await fetch(`${API}/delete/${id}`, {
      method: "DELETE",
    });

    setSubjects(prev => prev.filter((_, i) => i !== index));
  };


  const handleEdit = (index) => setEditIndex(index);


  return (
    <div className="min-h-screen p-10 bg-gray-950 text-white">
      <h1 className="text-4xl font-bold text-center mb-8 mt-10">Your Timetable</h1>

      <SubjectForm
        onAdd={addSubject}
        editData={editIndex !== null ? subjects[editIndex] : null}
      />

      <TimeTable
        data={subjects}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TimeTablePage;
