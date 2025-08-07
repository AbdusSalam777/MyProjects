import Navbar from "../components/navbar";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useState } from "react";

function Write() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // ✅ Fix: Define handleFileChange (you forgot this part)
  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }

  function stripHtmlTags(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  }

  async function handleSubmit() {
    if (!title || !description || !content || !file) {
      return alert("Please fill all fields and upload a file");
    }

    const plainTextContent = stripHtmlTags(content); // ✅ Strip HTML to plain text

    const formData = new FormData();
    formData.append("title", title);
    formData.append("descr", description);
    formData.append("content", plainTextContent); // use plain text
    formData.append("file", file);

    try {
      const res = await fetch("https://blogapp-tev0.onrender.com/create-post", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      alert("Post created successfully");
      console.log(data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-6 mt-4 px-4 md:px-8 lg:px-16">
        <h1 className="text-xl font-semibold">Create a New Post</h1>

        <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer w-fit text-sm">
          Choose File
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>

        {file && <span className="text-sm text-gray-700">{file.name}</span>}
        {preview && <img src={preview} alt="preview" className="w-40" />}

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-semibold w-full bg-transparent rounded-lg py-2 outline-none"
          placeholder="Enter a Title"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A Short Description ..."
          className="w-full resize-none text-gray-800 font-semibold rounded-xl h-[70px] px-2 py-2 shadow-md shadow-gray-700 outline-none"
        ></textarea>

        <ReactQuill
          value={content}
          onChange={setContent}
          className="bg-white rounded-3xl h-[400px] border-none"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-700 text-white w-fit p-3 px-6 rounded-xl active:scale-95 transition-transform"
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default Write;
