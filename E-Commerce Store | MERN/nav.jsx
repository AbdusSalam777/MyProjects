import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Nav({ cart, setquery }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-5 px-4 w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div>
          <img
            onClick={() => navigate("/")}
            className="h-[50px] brightness-125 cursor-pointer"
            src="/logo.png"
            alt="Logo"
          />
        </div>

        {/* Search Box */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            onChange={(e) => setquery(e.target.value)}
            type="text"
            placeholder="Search a product"
            className="bg-white h-[45px] w-full sm:w-[350px] md:w-[450px] rounded-xl text-center text-base sm:text-lg border-2 border-red-500 focus:border-green-500 outline-none px-4 transition-all duration-200"
          />
          <button className="bg-amber-400 hover:bg-amber-500 text-black font-semibold px-5 py-2 rounded-xl active:scale-95 transition-all duration-300">
            Search
          </button>
        </div>

        {/* Cart Icon */}
        <div className="relative">
          <img
            onClick={() => navigate("/cart")}
            className="h-[45px] brightness-125 cursor-pointer"
            src="/cart.png"
            alt="Cart"
          />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-[2px] rounded-full">
            {cart}
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
