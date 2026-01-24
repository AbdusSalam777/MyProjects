import { useEffect, useState } from "react";

const SubjectForm = ({ onAdd, editData }) => {
  const [subject, setSubject] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  // Load existing data during edit
  useEffect(() => {
    if (editData) {
      setSubject(editData.subject);
      setDay(editData.day);
      setTime(editData.time);
    }
  }, [editData]);

  const submit = (e) => {
    e.preventDefault();
    if (!subject || !day || !time) return;

    onAdd({ subject, day, time });

    setSubject("");
    setDay("");
    setTime("");
  };

  return (
    <form
      onSubmit={submit}
      className="p-4 bg-gray-800 rounded-xl flex gap-4 flex-wrap"
    >
      <input
        placeholder="Subject"
        className="px-3 py-2 rounded bg-gray-700 text-white"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <select
        className="px-3 py-2 rounded bg-gray-700 text-white"
        value={day}
        onChange={(e) => setDay(e.target.value)}
      >
        <option value="">Day</option>
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>

      <input
        type="time"
        className="px-3 py-2 rounded bg-gray-700 text-white"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <button className="px-4 py-2 bg-indigo-600 rounded text-white">
        {editData ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default SubjectForm;
