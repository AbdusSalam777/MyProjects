import { useEffect } from "react";

function Cart({ cartdata, setcartdata, setcartCount }) {
  const userId = localStorage.getItem("userId");

  // ✅ Fetch user-specific cart data
  useEffect(() => {
    fetch(`https://amazon-backend-1up3.onrender.com/get-cart-data?userId=${userId}`)
      .then((res) => res.json())
      .then((result) => {
        setcartdata(result.data || []);
        setcartCount(result.data?.length || 0);
      })
      .catch((error) => {
        console.log("Error getting cart data from MongoDB", error);
      });
  }, []);

  // ✅ Delete a single item
  function deleteitem(id) {
    fetch("https://amazon-backend-1up3.onrender.com/delete-item", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setcartdata((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // ✅ Clear full user cart
  function clearCart() {
    fetch("https://amazon-backend-1up3.onrender.com/clear-cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const total = cartdata.reduce((acc, item) => acc + Number(item.price), 0);

  return (
    <div className="flex flex-row gap-4 p-3 flex-wrap sm:flex-nowrap">
      {/* Cart Items */}
      <div className="flex flex-col gap-3 w-full sm:w-[65%]">
        {cartdata.map((item, index) => (
          <div
            key={index}
            className="border-2 border-amber-200 w-full p-3 sm:p-4 rounded-xl shadow-md flex items-center gap-4"
          >
            <img
              className="w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] object-cover rounded-md"
              src={item.image}
              alt={item.name}
            />
            <div className="flex flex-col gap-1 text-xs sm:text-sm md:text-base">
              <p className="font-semibold text-gray-800">{item.name}</p>
              <p className="text-gray-600">Rs {item.price}</p>
              <button
                onClick={() => deleteitem(item._id)}
                className="mt-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs sm:text-sm active:scale-95 transition-all duration-300 w-fit"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="w-full sm:w-[35%]">
        <div className="border-2 border-gray-300 rounded-xl p-4 sm:p-5 shadow-md text-sm sm:text-base">
          <h2 className="text-lg sm:text-2xl font-bold mb-3 text-gray-800">
            Order Summary
          </h2>
          <div className="flex justify-between mb-2">
            <span className="text-gray-700">Items:</span>
            <span className="text-gray-700">{cartdata.length}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-700">Total:</span>
            <span className="text-green-700 font-semibold">Rs {total}</span>
          </div>
          <button
            onClick={() => {
              setcartdata([]);
              clearCart();
            }}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl font-semibold active:scale-95 transition-all duration-300 text-sm sm:text-lg"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
