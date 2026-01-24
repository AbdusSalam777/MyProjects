import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

const NextClassReminder = () => {
  const { user } = useUser();
  const [upcoming, setUpcoming] = useState([]);
  const [timers, setTimers] = useState({});

  const API = "https://learneasebackend-79bj.onrender.com/timetable";

  // Convert 24-hour string ("22:00") to 12-hour with AM/PM
  function format12Hour(timeStr) {
    let [hour, minute] = timeStr.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert 0 → 12
    return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  }

  // Fetch timetable
  useEffect(() => {
    if (!user) return;

    fetch(`${API}/getall/${user.id}`)
      .then(res => res.json())
      .then(data => {
        const sorted = getUpcomingClasses(data);
        setUpcoming(sorted.slice(0, 3)); // Only 3 classes
      });
  }, [user]);

  // Countdown for all 3 classes
  useEffect(() => {
    if (upcoming.length === 0) return;

    const interval = setInterval(() => {
      const updatedTimers = {};
      upcoming.forEach(cls => {
        updatedTimers[cls._id] = calculateTimeLeft(cls.fullDate);
      });
      setTimers(updatedTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [upcoming]);

  // Prepare upcoming sorted classes
  function getUpcomingClasses(list) {
    if (!list || list.length === 0) return [];

    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const now = new Date();
    let result = [];

    list.forEach(item => {
      const classDayIndex = days.indexOf(item.day);
      const [hour, minute] = item.time.split(":").map(Number);

      let classDate = new Date();
      classDate.setHours(hour);
      classDate.setMinutes(minute);
      classDate.setSeconds(0);

      const dayDiff = (classDayIndex - now.getDay() + 7) % 7;
      classDate.setDate(now.getDate() + dayDiff);

      // If today but time passed → next week
      if (dayDiff === 0 && classDate < now) {
        classDate.setDate(classDate.getDate() + 7);
      }

      result.push({ ...item, fullDate: classDate });
    });

    return result.sort((a, b) => a.fullDate - b.fullDate);
  }

  // Countdown formatting
 function calculateTimeLeft(target) {
  const now = new Date();
  let diff = target - now; // milliseconds

  if (diff <= 0) return "Started";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);

  const hrs = Math.floor(diff / (1000 * 60 * 60));
  diff -= hrs * (1000 * 60 * 60);

  const mins = Math.floor(diff / (1000 * 60));
  diff -= mins * (1000 * 60);

  const secs = Math.floor(diff / 1000);

  let result = "";
  if (days > 0) result += `${days}d `;
  if (hrs > 0 || days > 0) result += `${hrs}h `;
  if (mins > 0 || hrs > 0 || days > 0) result += `${mins}m `;
  result += `${secs}s`;

  return result;
}

  if (upcoming.length === 0) return null;

  return (
    <div className="mt-20 mx-5 p-6 bg-gray-900 border border-gray-700 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">
        📅 Your Next Classes
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {upcoming.map(cls => (
          <div
            key={cls._id}
            className="p-5 bg-gray-800 rounded-xl border border-gray-700 shadow-lg hover:shadow-blue-500/20 transition"
          >
            <h3 className="text-xl font-bold text-yellow-400">{cls.subject}</h3>

            <p className="text-gray-300 mt-2">
              📆 {cls.day}
            </p>

            <p className="text-gray-300">
              ⏰ {format12Hour(cls.time)}
            </p>

            <p className="text-lg font-semibold mt-4">
              ⏳ <span className="text-green-400">{timers[cls._id]}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextClassReminder;
