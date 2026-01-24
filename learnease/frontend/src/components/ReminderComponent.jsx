import { useEffect, useState, useRef } from "react";
import { useUser } from "@clerk/clerk-react";

const parseDateTime = (date, time) => {
  const [y, m, d] = date.split("-").map(Number);
  const [h, min] = time.split(":").map(Number);
  return new Date(y, m - 1, d, h, min);
};

const UpcomingAlerts = () => {
  const { user } = useUser();
  const [alerts, setAlerts] = useState([]);
  const shownIds = useRef(new Set());

  useEffect(() => {
    if (!user) return;

    shownIds.current = new Set();

    const fetchAll = async () => {
      const [quizzes, assignments] = await Promise.all([
        fetch(`https://learneasebackend-79bj.onrender.com/quizzes/getall/${user.id}`).then(r => r.json()),
        fetch(`https://learneasebackend-79bj.onrender.com/assignments/getall/${user.id}`).then(r => r.json()),
      ]);

      const now = new Date();
      const newAlerts = [];

      quizzes.forEach(q => {
        const t = parseDateTime(q.quizDate, q.quizTime);
        const diff = (t - now) / 60000;
        if (diff > 0 && diff <= 30 && !shownIds.current.has(q._id)) {
          shownIds.current.add(q._id);
          newAlerts.push({ id: q._id, text: `🔔 "${q.quizName}" Quiz in ${Math.ceil(diff)} min` });
        }
      });

      assignments.forEach(a => {
        const t = parseDateTime(a.deadlineDate, a.deadlineTime);
        const diff = (t - now) / 60000;
        if (diff > 0 && diff <= 30 && !shownIds.current.has(a._id)) {
          shownIds.current.add(a._id);
          newAlerts.push({ id: a._id, text: `🔔 "${a.assignmentName}" Assignment due in ${Math.ceil(diff)} min` });
        }
      });

      if (newAlerts.length) setAlerts(newAlerts);
    };

    fetchAll();
    const interval = setInterval(fetchAll, 60000);
    return () => clearInterval(interval);
  }, [user]);

  if (!alerts.length) return null;

  return (
    <div className="fixed top-20 right-5 z-50 md:right-5 md:w-80 sm:top-16 sm:right-2 sm:w-64 w-[90%] mx-auto">
      {alerts.map(a => (
        <div
          key={a.id}
          className="bg-red-600 text-white px-4 py-2 mt-3 rounded-lg shadow-lg animate-bounce text-sm md:text-base"
        >
          {a.text}
        </div>
      ))}
    </div>
  );
};

export default UpcomingAlerts;
