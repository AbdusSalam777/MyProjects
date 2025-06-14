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
        className="w-1/2 h-[30px] border-2 border-amber-50 border-solid outline-none text-xl text-black text-center bg-amber-50 rounded-xl p-4"
      ></input>
      <button
        onClick={() => getData()}
        className="bg-amber-400 p-1.5 rounded-xl mx-3 px-4 active:scale-95"
      >
        Search
      </button>
    </div>
  );
}
export default Nav;
