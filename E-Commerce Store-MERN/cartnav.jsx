import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function NavCart({ cartCount, setcartCount }) {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/count", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setcartCount(data.count);
      });
  }, []);

  return (
    <nav className="mt-5 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            onClick={() => navigate("/")}
            className="h-[50px] brightness-125 cursor-pointer"
            src="/logo.png"
            alt="Logo"
          />
        </div>

        {/* Heading */}
        <div className="text-center">
          <p className="text-white font-semibold text-3xl sm:text-4xl md:text-5xl underline">
            My Cart
          </p>
        </div>

        {/* Cart Icon */}
        <div className="relative flex-shrink-0">
          <img
            onClick={() => navigate("/cart")}
            className="h-[50px] brightness-125 cursor-pointer"
            src="/cart.png"
            alt="Cart"
          />
          <p className="text-white absolute -top-2 -right-2 font-semibold bg-red-500 rounded-full px-2 text-sm">
            {cartCount}
          </p>
        </div>
      </div>
    </nav>
  );
}

export default NavCart;
