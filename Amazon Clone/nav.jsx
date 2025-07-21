import { NavLink } from "react-router-dom";

function Nav({ cartCount }) {
  return (
    <div>
      <nav className="bg-black flex justify-between items-center h-[60px]">
        <div>
          <NavLink to="/">
            <img className="h-[30px] ml-3" src="/logo-amazon.png" alt="Logo" />
          </NavLink>
        </div>

        <div className="relative mr-4">
          <NavLink to="/cart">
            <img className="h-[35px]" src="/cart.png" alt="Cart" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
