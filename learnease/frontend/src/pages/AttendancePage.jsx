import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import AttendanceSummary from "../components/AttendanceSummary";

const Attendance = () => {
  const { user } = useUser();
  const [todayClasses, setTodayClasses] = useState([]);

  const API = "https://learneasebackend-79bj.onrender.com/attendance";

  // Fetch today's classes + attendance
  useEffect(() => {
    if (!user) return;

    fetch(`${API}/today/${user.id}`)
      .then(res => res.json())
      .then(data => setTodayClasses(data))
      .catch(err => console.log(err));
  }, [user]);

  const markAttendance = async (classId, status) => {
    const res = await fetch(`${API}/mark`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, classId, status }),
    });

    const updated = await res.json();

    setTodayClasses(prev =>
      prev.map(cls =>
        cls._id === updated.classId ? { ...cls, attendanceStatus: status } : cls
      )
    );
  };

  if (todayClasses.length === 0)
    return (
      <div className="mt-[120px] text-center text-gray-300">
        <h2 className="text-3xl font-bold text-blue-400">No Classes Today 📭</h2>
        <p className="mt-2">Your attendance will be displayed here once classes are scheduled.</p>
        <AttendanceSummary />
      </div>
    );

  return (
    <div className="mt-[100px] mx-5 p-6 bg-gray-900 border border-gray-700 rounded-2xl shadow-xl">

      {/* HEADER SECTION */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-yellow-400 drop-shadow-lg">
          👋 Welcome Back, {user?.firstName}!
        </h1>

        <p className="text-gray-300 mt-3 text-lg">
          Here are today’s classes along with your attendance status.
        </p>

        <p className="text-blue-400 mt-1 font-medium">
          Discipline is the key to success — make sure you mark your attendance today!
        </p>

        <div className="mt-6 w-1/2 mx-auto h-1 bg-blue-700 rounded-full opacity-60"></div>
      </div>

      {/* ATTENDANCE LIST */}
      <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">
        📅 Today's Classes
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {todayClasses.map(cls => (
          <div
            key={cls._id}
            className={`p-5 rounded-xl border shadow-lg transition
              ${
                cls.attendanceStatus === "present"
                  ? "bg-green-800 border-green-500"
                  : cls.attendanceStatus === "absent"
                  ? "bg-red-800 border-red-500"
                  : "bg-gray-800 border-gray-700"
              }`}
          >
            <h3 className="text-xl font-bold text-yellow-400">{cls.subject}</h3>
            <p className="text-gray-300 mt-2">⏰ {cls.time}</p>

            {/* BUTTONS */}
            <div className="mt-4 flex gap-2">

              {/* Present */}
              <button
                disabled={cls.attendanceStatus === "present"}
                onClick={() => markAttendance(cls._id, "present")}
                className={`w-1/2 py-2 rounded text-white font-semibold
                  ${
                    cls.attendanceStatus === "present"
                      ? "bg-green-600 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                Present
              </button>

              {/* Absent */}
              <button
                disabled={cls.attendanceStatus === "absent"}
                onClick={() => markAttendance(cls._id, "absent")}
                className={`w-1/2 py-2 rounded text-white font-semibold
                  ${
                    cls.attendanceStatus === "absent"
                      ? "bg-red-600 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
              >
                Absent
              </button>

            </div>
          </div>
        ))}
      </div>

      <AttendanceSummary />
    </div>
  );
};

export default Attendance;
