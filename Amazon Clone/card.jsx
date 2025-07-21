function Card({ data, cartCount, setcartCount, cartdata, setcartdata }) {
  const userId = localStorage.getItem("userId");
  function sendId(image, name, price) {
    fetch("https://amazon-backend-1up3.onrender.com/send-cart-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image, name, price , userId }),
    })
      .then((res) => res.json())
      .then(() => {
        console.log("✅ Data sent successfully to backend");
        setcartdata([...cartdata, { image, name, price }]);
      })
      .catch((err) => {
        console.error("❌ Error sending data to backend:", err);
      });
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 sm:gap-6 sm:p-6">
      {data.map((item, index) => (
        <div
          key={item._id || index}
          className="bg-white rounded-xl shadow-md p-2 sm:p-4 text-center transition-transform transform hover:scale-105 hover:shadow-xl duration-300 border-2 border-amber-200"
        >
          <img
            className="w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] object-cover rounded-xl mx-auto"
            src={item.image}
            alt={item.name}
          />
          <h3 className="mt-2 sm:mt-4 text-sm sm:text-lg font-semibold text-gray-800">
            {item.name}
          </h3>
          <p className="mt-1 text-sm sm:text-xl text-green-600 font-bold">
            Rs {item.price}
          </p>
          <button
            onClick={() => {
              setcartCount(cartCount + 1);
              sendId(item.image, item.name, item.price);
            }}
            className="mt-2 sm:mt-4 px-2 py-1 sm:px-4 sm:py-2 bg-yellow-400 text-white rounded-full hover:bg-gray-800 transition duration-300 active:scale-95 text-xs sm:text-base"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Card;
