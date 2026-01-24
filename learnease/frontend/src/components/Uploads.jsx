import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { FiUploadCloud, FiFileText, FiFile } from "react-icons/fi";

const UploadComponent = ({ apiBase }) => {
  const { user } = useUser();
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load files for logged-in user
  useEffect(() => {
    if (!user) return;

    fetch(`${apiBase}/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((err) => console.log(err));
  }, [user]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile || !user) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", user.id); // associate file with user

    try {
      const res = await fetch(`${apiBase}/upload`, {
        method: "POST",
        body: formData,
      });
      const newFile = await res.json();
      setFiles((prev) => [newFile, ...prev]);
      setSelectedFile(null);
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      await fetch(`${apiBase}/delete/${id}`, { method: "DELETE" });
      setFiles((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  const getFileIcon = (url) => {
    if (url.match(/\.(pdf)$/i))
      return <FiFileText className="text-5xl text-red-500 mb-2" />;
    return <FiFile className="text-5xl text-gray-400 mb-2" />;
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleUpload} className="flex flex-col items-center">
        <input
          type="file"
          id="fileInput"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="hidden"
        />
        <div
          onClick={() => document.getElementById("fileInput").click()}
          className="w-full max-w-md h-36 bg-white rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-indigo-500 transition relative shadow-sm"
        >
          <FiUploadCloud className="text-6xl text-indigo-500 mb-3" />
          <p className="text-gray-700 font-medium text-center">
            {selectedFile
              ? selectedFile.name
              : "Click here or drag file to upload"}
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !selectedFile}
          className="mt-4 px-8 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {files.map((file) => (
          <div
            key={file._id}
            className="bg-gray-900 p-4 rounded-xl shadow-lg flex flex-col items-center transition hover:scale-105"
          >
            <div className="w-full h-32 flex items-center justify-center mb-3">
              {file.url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  {getFileIcon(file.url)}
                  <span className="text-gray-300 text-sm wrap-break-word">
                    {file.name}
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <a
                href={
                  file.url.match(/\.pdf$/i)
                    ? file.url
                    : `https://docs.google.com/viewer?url=${encodeURIComponent(
                        file.url
                      )}&embedded=true`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm font-medium transition"
              >
                Preview
              </a>

              <button
                onClick={() => handleDelete(file._id)}
                className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm font-medium transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadComponent;
