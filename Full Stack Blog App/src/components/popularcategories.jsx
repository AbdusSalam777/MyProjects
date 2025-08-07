import { FaCode, FaPaintBrush, FaMobileAlt, FaRobot, FaLock, FaCloud } from "react-icons/fa";

function PopularCategories() {
  const categories = [
    {
      title: "Web Development",
      icon: <FaCode className="text-4xl text-blue-600" />,
    },
    {
      title: "UI/UX Design",
      icon: <FaPaintBrush className="text-4xl text-pink-500" />,
    },
    {
      title: "Mobile Apps",
      icon: <FaMobileAlt className="text-4xl text-green-500" />,
    },
    {
      title: "AI & ML",
      icon: <FaRobot className="text-4xl text-purple-500" />,
    },
    {
      title: "Cybersecurity",
      icon: <FaLock className="text-4xl text-red-500" />,
    },
    {
      title: "Cloud Computing",
      icon: <FaCloud className="text-4xl text-cyan-600" />,
    },
  ];

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300 bg-white"
          >
            <div className="p-4 bg-gray-100 rounded-full">
              {cat.icon}
            </div>
            <h3 className="text-lg font-semibold">{cat.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularCategories;
