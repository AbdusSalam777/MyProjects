import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ Required

function PostitemsList() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://blogapp-tev0.onrender.com/getdata");
        const result = await res.json();
        console.log("Fetched data:", result); // ✅ Debug line
        setdata(result);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    getData();
  }, []);

  if (data.length === 0) return <p className="text-center">Loading...</p>;

  return (
    <div className="flex flex-col gap-6 px-4 md:px-10 max-w-7xl mx-auto">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-start gap-6 bg-white shadow-md p-6 rounded-2xl transition-all hover:shadow-lg hover:shadow-gray-700 hover:scale-105 ease-in duration-300"
        >
          <div className="w-full md:w-[40%]">
            <img
              src={item.img}
              alt={item.title}
              className="rounded-2xl w-full max-w-[500px] md:max-w-full mx-auto object-cover border-2 border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-3 w-full">
            <Link
              to={`/singlepost/${item._id}`}
              className="font-bold text-2xl lg:text-3xl hover:text-blue-600 transition-colors duration-300"
            >
              {item.title}
            </Link>

            <p className="text-gray-600">
              Written by <span className="text-blue-600">John Doe</span> on{" "}
              <span className="italic">{item.category || "Web Design"}</span>
            </p>

            <p className="text-lg text-gray-700">{item.descr}</p>
            <Link to={`/singlepost/${item._id}`}>
            <p className="text-blue-600 text-lg underline">Read more</p>
            </Link> 
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostitemsList;
