import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/Untitled_design.pdf_page-0001-removebg-preview (1).png";
import cart_icon from "../../assets/cart_icon.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Retrieve user details from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="w-full">
      <header className="top-0 left-0 w-full bg-green-100 shadow-md z-50 static">
        <div className="container mx-auto py-2 flex justify-between items-center">
          {/* Logo */}
          <img src={logo} alt="Logo" className="w-35 h-20 object-contain" />

          {/* Mobile Right-Side: Cart Icon & Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <Link to="/cart" className="block">
              <img src={cart_icon} alt="Cart" className="w-6 h-6" />
            </Link>
            <button
              className="p-2 rounded-md"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              style={{ textDecoration: "none", color: "#14532d" }}
              className="text-2xl font-semibold"
              to="/"
            >
              Home
            </Link>
            {user && (
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
            <Link className="text-2xl font-semibold" to="/cart">
              <img src={cart_icon} alt="Cart" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden flex justify-end">
          <div className="w-64 h-full bg-green-100 shadow-lg transform transition-transform duration-300 ease-in-out">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-700 text-2xl p-4 hover:text-red-500 transition"
            >
              ✖
            </button>
            <ul className="mt-5 space-y-4 px-6">
              <li className="border-b border-gray-300 pb-2">
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-gray-700 text-lg block p-2 rounded-lg hover:bg-green-200 transition"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="border-b border-gray-300 pb-2">
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-gray-700 text-lg block p-2 rounded-lg hover:bg-green-200 transition"
                  to="/cart"
                >
                  Cart
                </Link>
              </li>
              {user && (
                <li className="border-b border-gray-300 pb-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
