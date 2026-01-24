function Card({ data, cart, updateCart }) {
  const handleInput = async (item) => {
    updateCart(cart + 1);

    fetch("http://localhost:3000/send-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        src: item.images[0] || item.images[1],
        title: item.title,
        price: item.price,
      }),
    })
      .then(() => {
        console.log("Item added to Cart");
      })
      .catch((error) => {
        console.log("Error sending data to MongoDB", error);
      });
  };

  if (!data || data.length === 0) {
    return (
      <p className="text-center text-3xl text-red-500 mt-20 font-semibold">
        No Products Found
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4 sm:p-6 bg-gray-950">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-gray-900 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-red-400 hover:border-green-400 flex flex-col items-center p-4 brightness-110 hover:scale-[1.02]"
        >
          <img
            src={item.images[0] || item.images[1]}
            alt={item.title}
            className="h-[180px] w-full object-cover rounded-xl mb-4 sm:h-[200px] sm:w-[200px] sm:object-contain"
          />
          <p className="text-white text-lg font-semibold text-center mb-1 line-clamp-2">
            {item.title}
          </p>
          <p className="text-amber-400 font-bold text-md mb-3">${item.price}</p>
          <button
            onClick={() => handleInput(item)}
            className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-green-500 hover:text-amber-50 active:scale-95 transition-all duration-200"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Card;
