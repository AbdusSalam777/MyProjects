import { useState } from "react";
import Card from "./card.jsx";
import ThemeToggle from "./toggle.jsx"

function Nav() {
  const [search, setSearch] = useState("");
  const [moviedata, setmoviedata] = useState([]);

  const handleInput = (event) => {
  setSearch(event.target.value);
  };
  

  const fetchData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=d947e28c28d7b1bf640853894b4bae44&query=${search}`
    );
    const data = await response.json();
    setmoviedata(data.results);  
  };

  return (
    <>
      <div className="text-center mt-4">
        <nav>
          <input
            type="text"
            onChange={handleInput}
            placeholder="Search a movie"
            className="border-2 border-amber-50 rounded-2xl text-white text-center p-2.5 w-[500px]"
          ></input>
          <button
            onClick={fetchData}
            className="p-2.5 bg-blue-400 rounded-2xl mx-2
         active:scale-95 px-5 py-3 active:bg-blue-500 transition-transform duration-200 ease-in"
          >
            Search
          </button>
          <div className="absolute right-3 top-3">
            <ThemeToggle/>
          </div>
          
        </nav>
      </div>

      <div>
        <Card data={moviedata} />
      </div>
    </>
  );
}
export default Nav;
