import Navbar from "./navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SinglePost() {
  const { slug } = useParams();
  const [data, setdata] = useState(null);
  //  console.log("slug",slug);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`https://blogapp-tev0.onrender.com/getSinglepost/${slug}`);
        const result = await res.json();
        setdata(result);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [slug]);

  //  console.log(data);

  return (
    <>
      <Navbar />
      {data && (
        <div className="flex flex-col gap-8 mt-3">
          {/* Div 1 */}
          <div className="">
            <h1 className="font-bold text-xl md:text-2xl lg:text-4xl">
              {data.title}
            </h1>
            <div className="mt-4 flex gap-4">
              <span>Written by</span>
              <span className="text-blue-700">John Doe</span>
              <span>2 days ago</span>
            </div>
            <div className="mt-4">
              <p className="text-sm md:text-lg text-gray-800">{data.descr}</p>
            </div>
          </div>

          {/* Div 2 */}
          <div className="w-full flex justify-center">
            <img
            src={data.img}
             className="w-[700px] h-[200px] md:w-[850px] md:h-[350px] rounded-2xl">
            </img>
          </div>

          {/* Div 3 */}
          <div>
            <p className="text-xl">{data.content}</p>
          </div>
        </div>
      )}
    </>
  );
}
export default SinglePost;
