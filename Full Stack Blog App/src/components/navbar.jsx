import { useState } from "react";
import { IKImage } from "imagekitio-react";
import { Link } from "react-router-dom";
import { SignOutButton } from "@clerk/clerk-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center w-full h-16 md:h-20 px-4 md:px-8">
        {/* Logo & Title */}
        <div className="flex items-center">
          <IKImage
            urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
            className="h-12 md:h-14"
            path="logo.png"
          />
          <Link to="/">
            <p className="font-bold text-xl md:text-2xl lg:text-4xl px-4 md:px-6">
              lamalog.
            </p>
          </Link>
        </div>

        {/* Hamburger menu (mobile) */}
        <div className="md:hidden">
          <button
            className="text-3xl font-bold"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "≡"}
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex font-medium gap-8 xl:gap-12 xl:text-[18px] items-center">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/write" onClick={() => setOpen(false)}>
            Write
          </Link>
          <SignOutButton>
            <button className="bg-red-500 text-white px-4 py-1 rounded active:scale-95 transition-all duration-200 ease-in">
              Logout
            </button>
          </SignOutButton>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-6 py-3 bg-gray-50 shadow-md text-base font-medium rounded-2xl">
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link to="/write" onClick={() => setOpen(false)}>
            Write
          </Link>
          <SignOutButton>
            <button
              onClick={() => setOpen(false)}
              className="bg-red-500 text-white px-4 py-1 rounded active:scale-95 transition-all duration-200 ease-in"
            >
              Logout
            </button>
          </SignOutButton>
        </div>
      )}
    </>
  );
}

export default Navbar;
