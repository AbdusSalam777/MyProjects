import { useState } from "react";

export default function App() {
  const [longUrl, setLongUrl] = useState("");
  const [customWord, setCustomWord] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!longUrl.trim()) {
      alert("Please enter a URL");
      return;
    }

    try {
      const res = await fetch("https://urlshortener-53fm.onrender.com/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl, customWord }),
      });

      const data = await res.json();
      if (data.shortUrl) {
        setShortUrl(data.shortUrl);
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg border border-gray-100">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-800">
          🚀 URL Shortener
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Paste your long link & create a short, shareable one.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Long URL
            </label>
            <input
              type="url"
              placeholder="https://example.com/very/long/link"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Custom short word (optional)
            </label>
            <input
              type="text"
              placeholder="e.g., mylink123"
              value={customWord}
              onChange={(e) => setCustomWord(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg hover:opacity-90 transition font-semibold shadow-md"
          >
            Shorten URL
          </button>
        </form>

        {/* Short URL Output */}
        {shortUrl && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center animate-fadeIn">
            <p className="text-gray-700 font-medium">Your short link:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 font-semibold hover:underline break-all"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
