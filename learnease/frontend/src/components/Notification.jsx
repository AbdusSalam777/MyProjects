import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const ClassNotification = () => {
  const { user } = useUser();

  const API = "https://learneasebackend-79bj.onrender.com/timetable";

  useEffect(() => {
    if (!user) return;

    // Step 1: Ask Permission
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    // Step 2: Fetch Timetable
    fetch(`${API}/getall/${user.id}`)
      .then(res => res.json())
      .then(data => {
        const upcoming = getNextClass(data);
        if (upcoming) scheduleNotification(upcoming);
      });
  }, [user]);


  // Convert class to actual date
  function getNextClass(list) {
    if (!list || list.length === 0) return null;

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const now = new Date();
    let upcomingClasses = [];

    list.forEach(item => {
      const classDayIndex = days.indexOf(item.day);
      const [hour, minute] = item.time.split(":").map(Number);

      let classDate = new Date();
      classDate.setHours(hour);
      classDate.setMinutes(minute);
      classDate.setSeconds(0);

      const dayDiff = (classDayIndex - now.getDay() + 7) % 7;
      classDate.setDate(now.getDate() + dayDiff);

      if (dayDiff === 0 && classDate < now) {
        classDate.setDate(classDate.getDate() + 7);
      }

      upcomingClasses.push({ ...item, fullDate: classDate });
    });

    upcomingClasses.sort((a, b) => a.fullDate - b.fullDate);

    return upcomingClasses[0];
  }


  // Schedule Notification 10 minutes before
  function scheduleNotification(cls) {
    const now = new Date();
    const classTime = cls.fullDate;

    const tenMinutesBefore = new Date(classTime - 10 * 60 * 1000);

    const msUntilNotification = tenMinutesBefore - now;

    if (msUntilNotification < 0) return; // too late

    setTimeout(() => {
      showNotification(cls);
    }, msUntilNotification);
  }


  function showNotification(cls) {
    if (Notification.permission === "granted") {
      new Notification("Class Reminder", {
        body: `${cls.subject} starts in 10 minutes (${cls.day}, ${cls.time})`,
        icon: "/favicon.ico",
      });
    }
  }

  return null;
};

export default ClassNotification;
