import { useState } from "react";
import Comment from "./Comment.jsx";

function Comments() {
  const [input, setinput] = useState("");
  const [reload, setReload] = useState(false); 

  async function sendComment() {
    try {
      const response = await fetch("https://blogapp-tev0.onrender.com/sendcomment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: "2 days ago", 
          desc: input,
        }),
      });

      const result = await response.json();
      setinput("");
      setReload(!reload); // 🔁 flip trigger
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-6 mt-8 lg:w-3/5">
        <div>
          <h1 className="text-2xl font-bold underline">Comments</h1>
        </div>

        <div className="flex gap-4">
          <textarea
            value={input}
            onChange={(e) => setinput(e.target.value)}
            placeholder="Enter a comment ..."
            className="w-full resize-none text-gray-800 font-semibold rounded-xl h-[50px] px-2 py-2 shadow-md shadow-gray-700"
          ></textarea>
          <button
            onClick={sendComment}
            className="bg-blue-600 rounded-2xl p-2 px-4 text-white active:scale-95 transition-transform ease-in duration-200"
          >
            Send
          </button>
        </div>

        <Comment reload={reload} />
      </div>
    </>
  );
}

export default Comments;
