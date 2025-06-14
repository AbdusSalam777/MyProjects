function Card({ meals }) {
  console.log("Data from card", meals);
  return (
    <div className="grid grid-cols-4">
      {meals.map((item, index) => (
        <div className=" bg-slate-900 text-center rounded-3xl mx-4 
        w-[350px] my-4 transition-transform duration-200 ease-in hover:scale-105" key={index}>
          <img className=" mt-3 w-[310px] h-[225px] inline-block rounded-2xl
           border-4 border-yellow-400" src={item.strMealThumb} alt={item.strMeal} />
          <p className="text-white m-3 text-xl font-bold bg-slate-950 
           p-1.5 rounded-2xl  border-2">{item.strMeal}</p>
          <button className="bg-amber-500 m-2 text-white p-1.5 w-[175px] rounded-2xl 
           active:scale-95 mb-6 active:bg-amber-400">🍽 View Recipe</button>
        </div>
      ))}
    </div>
  );
}
export default Card;
