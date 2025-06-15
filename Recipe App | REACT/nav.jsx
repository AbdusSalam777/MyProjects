import { useState } from "react";
function Nav({setmeals}) {

    const [input, setinput] = useState("");

  const getData = async () => {

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
    );
    const data = await response.json();
    setmeals(data.meals);
  };

  const handleInput=(event)=>{
     setinput(event.target.value);
  }

  return (
    <div className="h-[50px] w-full flex justify-center items-center mt-3">
        <input
    placeholder="Enter Dish"
    onChange={handleInput}
    className="w-1/2 h-12 border border-amber-300 outline-none text-lg text-black text-center bg-amber-100 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-amber-400 transition duration-200"
  />

  <button
    onClick={() => getData()}
    className="bg-amber-400 text-white font-semibold py-3 px-3 ml-3 rounded-lg shadow-md hover:bg-amber-500 active:scale-95 transition duration-150">Search</button>
    </div>
     );
    }

export default Nav;
