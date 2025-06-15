import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Recipe() {
  const [meal, setMeal] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getrecipe = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      setMeal(data.meals[0]);
    };

    getrecipe();
  }, [id]);

  if (!meal) {
    return <p className="text-white text-center mt-10 text-xl">Please Enter a different dish</p>;
  }

    else{
      return(
        <div className="text-white flex flex-col justify-center items-center p-6 bg-slate-950 min-h-screen">
      <h1 className="text-yellow-400 text-4xl font-extrabold mb-6 underline">
        {meal.strMeal}
      </h1>

      <img
        className="rounded-2xl border-4 border-yellow-500 w-[450px] h-[450px] object-cover mb-6 shadow-lg"
        src={meal.strMealThumb}
        alt={meal.strMeal}
      />

      <div className="max-w-4xl bg-slate-900 p-6 rounded-2xl border-2 border-amber-400 shadow-xl hover:scale-105 transition-transform duration-300 ease-in">
        <p
          className="text-lg leading-relaxed"
          style={{ wordSpacing: "6px", lineHeight: "2" }}
        >
          {meal.strInstructions}
        </p>
      </div>
    </div>
      )
    }
  
}

export default Recipe;
