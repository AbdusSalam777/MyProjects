import { useState, useEffect } from "react";

function Card({ data }) {
  const [trend, setTrend] = useState([]);

  useEffect(() => {
    if (!data || data.length === 0) {
      async function getPopularmovies() {
        try {
          const trending = await fetch(
            `https://api.themoviedb.org/3/trending/movie/week?api_key=d947e28c28d7b1bf640853894b4bae44`
          );
          const trendingData = await trending.json();
          setTrend(trendingData.results || []);
        } catch {
          setTrend([]);
        }
      }

      getPopularmovies();
    }
  }, []);

  if (data && data.length > 0) {
    return (
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 place-items-center">
        {data.map((item, index) => (
          <div
            key={index}
            className=" w-[300px] flex flex-col items-center hover:scale-105 transition-all duration-300 ease-in bg-gray-900 rounded-3xl p-4"
          >
            <div className="h-[400px] w-full relative group rounded-2xl overflow-hidden">
              <img
                className="h-full w-full object-cover border-2 border-amber-300 rounded-2xl"
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title || item.name}
              />
              <div className="absolute inset-0 bg-white bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300  backdrop-blur-sm flex items-center justify-center p-4 rounded-2xl">
                <p className="text-center  text-black text-xl font-semibold overflow-hidden">
                  {item.overview || "No description available."}
                </p>
              </div>
            </div>
            <p className="mt-4 text-2xl font-semibold text-amber-50 text-center">
              {item.title || item.name}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className=" mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 place-items-center">
      {trend.map((movie, index) => (
        <div
          key={index}
          className=" w-[300px] flex flex-col items-center hover:scale-105 transition-all duration-300 ease-in bg-gray-900 rounded-3xl p-4"
        >
          <div className="h-[400px] w-full relative group rounded-2xl overflow-hidden">
            <img
              className="h-full w-full object-cover border-2 border-amber-300 rounded-2xl"
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title || movie.name}
            />
            <div className="absolute inset-0 bg-white bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm flex items-center justify-center p-4 rounded-2xl">
              <p className="text-center text-black text-xl font-semibold overflow-hidden">
                {movie.overview || "No description available."}
              </p>
            </div>
          </div>
          <p className="mt-4 text-2xl font-semibold text-amber-50 text-center">
            {movie.title || movie.name}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Card;
