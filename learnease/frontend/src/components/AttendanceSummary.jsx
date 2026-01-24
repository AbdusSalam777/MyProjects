import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

const AttendanceSummary = () => {
  const { user } = useUser();
  const [summary, setSummary] = useState([]);

  const API = "https://learneasebackend-79bj.onrender.com/attendance";

  useEffect(() => {
    if (!user) return;

    fetch(`${API}/summary/${user.id}`)
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(err => console.log(err));
  }, [user]);

  if (summary.length === 0) return null;

  return (
    <div className="mt-16 p-6 bg-gray-900 border border-gray-700 rounded-2xl shadow-xl mx-5">
      <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">
        📊 Attendance Summary (Course-wise)
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {summary.map((course, i) => (
          <div key={i} className="p-5 bg-gray-800 border border-gray-700 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-yellow-400">{course.subject}</h3>

            <p className="text-gray-300 mt-2">Present: {course.present}</p>
            <p className="text-gray-300">Absent: {course.absent}</p>

            <p className="mt-3 text-lg font-bold text-blue-400">
              Attendance: {course.percentage}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceSummary;
