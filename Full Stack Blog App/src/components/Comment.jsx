import { useEffect, useState } from "react";
import { IKImage } from "imagekitio-react";

function Comment({ reload }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://blogapp-tev0.onrender.com/getcomments");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [reload]); // 🔁 runs whenever reload prop changes

  return (
    <>
      {data.map((item, index) => (
        <div key={index} className="flex flex-col gap-2 bg-white rounded-2xl shadow-md p-2 mb-4">
          <div className="flex gap-4 items-center w-full rounded-2xl h-[50px]">
            <IKImage
              urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
              className="rounded-full h-10 w-10"
              path="userImg.jpeg"
            />
            <div className="font-semibold text-lg">Blog User</div>
            <div className="text-sm text-gray-500 ml-auto">1 day ago</div>
          </div>
          <div className="px-2">
            <p>{item.desc}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Comment;
