import Navbar from "./navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Postlistsnew() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://blogapp-tev0.onrender.com/getnewdata");
        const result = await res.json();
        setdata(result);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  return (
      <div className="flex flex-col gap-6 px-4 md:px-10 max-w-7xl mx-auto">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-start gap-6 bg-white shadow-md p-6 rounded-2xl transition-all hover:shadow-lg hover:scale-105 ease-in duration-300"
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
              to={`/newposts/${item._id}`}
              className="font-bold text-2xl lg:text-3xl hover:text-blue-600 transition-colors duration-300"
            >
              {item.title}
            </Link>

            <p className="text-lg text-gray-700">{item.descr}</p>
            <Link to={`/newposts/${item._id}`}>
            <p className="text-blue-600 text-lg underline">Read more</p>
            </Link>  
          </div>
        </div>
      ))}
    </div>
  );
}

export default Postlistsnew;
