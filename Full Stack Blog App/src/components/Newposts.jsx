import { useState, useEffect } from "react";
function Newposts() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://blogapp-tev0.onrender.com/getnewposts");
        const result = await res.json();
        setdata(result);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  return (
    <>
      {data && data.map((item, index) => (
        <div key={index} className="flex flex-col md:flex-row items-start">
          <div className="w-full lg:w-[40%]">
            <img
              className="rounded-2xl w-full max-w-[500px] lg:max-w-[450px] mx-auto"
              src={item.img}
              alt="Post"
              onError={(e) => (e.target.src = "/fallback.jpg")} // optional fallback
            />
          </div>
          {/* rounded-2xl w-full max-w-[500px] lg:max-w-[450px] mx-auto */}
          <div className="flex flex-col gap-2 mt-4 md:mt-0 px-3">
            <a
              href={`/singlepost/${item._id}`}
              className="font-bold text-xl md:text-2xl lg:text-3xl"
            >
              {item.title}
            </a>

            <p>
              Written by <span className="text-blue-600">John Doe</span> on Web
              Design
            </p>

            <p className="text-xl">{item.descr}</p>
          </div>
        </div>
      ))}
    </>
  );
}
export default Newposts;
