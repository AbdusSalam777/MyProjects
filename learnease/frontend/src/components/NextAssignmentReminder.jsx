import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

const NextAssignmentReminder = () => {
  const { user } = useUser();
  const [upcoming, setUpcoming] = useState([]);
  const [timers, setTimers] = useState({});

  const API = "https://learneasebackend-79bj.onrender.com/assignments";

  // Convert 24-hour string ("22:00") to 12-hour with AM/PM
  function format12Hour(timeStr) {
    let [hour, minute] = timeStr.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert 0 to 12
    return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  }

  // Convert "2025-12-08" → "December 8, 2025"
function formatReadableDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

  // Convert date + time string to JS Date object
  function parseDateTime(dateStr, timeStr) {
    const [hour, minute] = timeStr.split(":").map(Number);
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day, hour, minute, 0);
  }

  // Fetch assignments
  useEffect(() => {
    if (!user) return;

    fetch(`${API}/getall/${user.id}`)
      .then(res => res.json())
      .then(data => {
        const sorted = data
          .map(item => ({
            ...item,
            fullDate: parseDateTime(item.deadlineDate, item.deadlineTime),
          }))
          .sort((a, b) => a.fullDate - b.fullDate);
        setUpcoming(sorted.slice(0, 3));
      });
  }, [user]);

useEffect(() => {
  if (upcoming.length === 0) return;

  const interval = setInterval(() => {
    const updatedTimers = {};
    upcoming.forEach(item => {
      const diff = item.fullDate - new Date();
      if (diff <= 0) updatedTimers[item._id] = "Deadline passed";
      else {
        let remaining = diff;

        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        remaining -= days * (1000 * 60 * 60 * 24);

        const hrs = Math.floor(remaining / (1000 * 60 * 60));
        remaining -= hrs * (1000 * 60 * 60);

        const mins = Math.floor(remaining / (1000 * 60));
        remaining -= mins * (1000 * 60);

        const secs = Math.floor(remaining / 1000);

        let display = "";
        if (days > 0) display += `${days}d `;
        if (hrs > 0 || days > 0) display += `${hrs}h `;
        if (mins > 0 || hrs > 0 || days > 0) display += `${mins}m `;
        display += `${secs}s`;

        updatedTimers[item._id] = display;
      }
    });

    setTimers(updatedTimers);
  }, 1000);

  return () => clearInterval(interval);
}, [upcoming]);

  if (upcoming.length === 0) return null;

  return (
    <div className="mt-10 mx-5 p-6 bg-gray-900 border border-gray-700 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
        📝 Upcoming Assignments
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {upcoming.map(item => (
          <div
            key={item._id}
            className="p-5 bg-gray-800 rounded-xl border border-gray-700 shadow-lg hover:shadow-yellow-500/20 transition"
          >
            <h3 className="text-xl font-bold text-pink-400">{item.assignmentName}</h3>
            <p className="text-gray-300 mt-2">
  📆 {formatReadableDate(item.deadlineDate)}
</p>

            <p className="text-gray-300">⏰ {format12Hour(item.deadlineTime)}</p>
            <p className="text-lg font-semibold mt-4">
              ⏳ <span className="text-green-400">{timers[item._id]}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextAssignmentReminder;
