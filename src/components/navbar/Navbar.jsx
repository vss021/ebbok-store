import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaGripLines } from "react-icons/fa";
import logo from '../../assets/logo.png';

export default function Navbar() {
  

  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
  const role = useSelector((store) => store.auth.role);

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about-us" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
    { title: "Admin Profile", link: "/profile" },
  ];

  if(isLoggedIn == false){
    navLinks.splice(3, 3);
  }

  if(isLoggedIn === true && role === "user"){
    navLinks.splice(5, 1);
  }
  
  if(isLoggedIn === true && role === 'admin'){
      navLinks.splice(3, 2);
  }
  
  const commonLinkClasses = "hover:text-blue-500 transition-all duration-300";

  return (
    <>
      <nav className="relative z-50 bg-zinc-800 text-white px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src={logo}
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">EBookStore</h1>
        </Link>

        {/* Links */}
        <div className="nav-links-ebookstore block md:flex items-center justify-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((items, index) => (
              <Link
                key={index}
                to={items.link}
                className={`${commonLinkClasses} ${items.title === "Profile" ? "border border-blue-500 px-2 py-1 rounded-md" : ""}`}
              >
                {items.title}
              </Link>
            ))}
          </div>

          {isLoggedIn === false && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/login"
                className="border border-blue-500 px-2 py-1 rounded-md hover:bg-slate-300 hover:text-zinc-800 transition-all duration-300"
              >
                Sign-In
              </Link>
              <Link
                to="/sign-up"
                className="border bg-blue-500 px-2 py-1 rounded-md hover:bg-slate-300 hover:text-zinc-800 transition-all duration-300"
              >
                Sign-Up
              </Link>
            </div>
          )}

          <button
            aria-label="Toggle Navigation"
            className="text-white text-3xl hover:text-zinc-400 block md:hidden"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <FaGripLines />
          </button>
        </div>
      </nav>

      <div className={`${isMobileOpen ? "block" : "hidden"} bg-zinc-800 h-screen absolute left-0 top-0 w-full z-40 flex flex-col p-20 justify-start`}>
        {navLinks.map((items, index) => (
          <Link
            key={index}
            to={items.link}
            className="text-white text-2xl font-semibold mb-5 hover:text-blue-500 transition-all duration-300"
            onClick={() => setIsMobileOpen(false)}
          >
            {items.title}
          </Link>
        ))}

        {isLoggedIn === false && (
          <>
            <Link
              to="/login"
              onClick={() => setIsMobileOpen(false)}
              className="border mb-5 border-blue-500 px-2 py-1 w-20 rounded-md hover:bg-slate-300 font-semibold text-white hover:text-zinc-800 transition-all duration-300"
            >
              Sign-In
            </Link>
            <Link
              to="/sign-up"
              onClick={() => setIsMobileOpen(false)}
              className="border mb-5 border-blue-500 px-2 py-1 w-20 rounded-md hover:bg-slate-300 font-semibold text-white hover:text-zinc-800 transition-all duration-300"
            >
              Sign-Up
            </Link>
          </>
        )}
      </div>
    </>
  );
}
