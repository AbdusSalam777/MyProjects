import React, { useEffect, useState } from "react";

const Recommendations = ({ currentUserId }) => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const resDefault = await fetch(
        "https://learneasebackend-79bj.onrender.com/recommendations/getData"
      );
      const defaultData = (await resDefault.json()).map(r => ({
        ...r,
        isDeletable: false,
      }));

      const resUser = await fetch(
        "https://learneasebackend-79bj.onrender.com/userRecommendations/getAll"
      );
      const userData = (await resUser.json()).map(r => ({
        ...r,
        isDeletable: r.userId === currentUserId,
      }));

      setData([...defaultData, ...userData]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUserId) getData();
  }, [currentUserId]);

  const handleDelete = async (id) => {
    try {
      await fetch(
        `https://learneasebackend-79bj.onrender.com/userRecommendations/delete/${id}/${currentUserId}`,
        { method: "DELETE" }
      );
      setData(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <div className="space-y-4 max-w-2xl mx-auto">
        {data.map(item => (
          <div
            key={item._id}
            className="flex items-start gap-4 bg-white p-5 rounded-xl shadow relative"
          >
            {/* User Icon */}
            <img
              src="/userimage.png"
              alt="user"
              className="w-14 h-14 rounded-full object-cover"
            />

            {/* Content */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-blue-700">
                {item.subject}
              </h2>
              <p className="mt-1 text-gray-700 whitespace-pre-line">
                {item.comment}
              </p>
            </div>

            {/* Delete Button */}
            {item.isDeletable && (
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
