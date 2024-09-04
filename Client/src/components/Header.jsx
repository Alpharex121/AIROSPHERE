import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // For hamburger menu
import { useNavigate } from "react-router-dom";
import getUser from "../utils/getUser";

const Header = () => {
  const Navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState(null);

  const user = getUser();
  const handleMouseEnter = (section) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
    }
    setDropdownOpen(section);
  };

  const handleLogin = () => {
    Navigate("/authenticate");
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setDropdownOpen(null);
    }, 300);
    setCloseTimeout(timeout);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      {/* Toggable Header for Login */}
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <a href="#">CODESPHERE</a>
        </div>

        {/* // If logged in, show this header */}
        {!isLoggedIn ? null : (
          <>
            {/* Desktop Menu */}
            <ul className="hidden lg:flex space-x-6">
              {renderNavItems(handleMouseEnter, handleMouseLeave, dropdownOpen)}
            </ul>

            {/* Hamburger Menu Icon */}
            <div className="lg:hidden">
              <button onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <ul className="lg:hidden space-y-4 mt-4">
                {renderNavItems(
                  handleMouseEnter,
                  handleMouseLeave,
                  dropdownOpen,
                  true
                )}
              </ul>
            )}
          </>
        )}
        {!isLoggedIn ? (
          // If not logged in, show this header
          <div>
            <button
              onClick={handleLogin} // Simulate login
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Login
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setIsLoggedIn(false)} // Simulate logout
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

// Function to render the navigation items with dropdowns
const renderNavItems = (
  handleMouseEnter,
  handleMouseLeave,
  dropdownOpen,
  isMobile = false
) => {
  return (
    <>
      {/* Academic */}
      <li
        className="relative"
        onMouseEnter={() => handleMouseEnter("academic")}
        onMouseLeave={handleMouseLeave}
      >
        <a href="#" className="hover:text-blue-500 transition ">
          Academic
        </a>
        {dropdownOpen === "academic" && !isMobile && (
          <Dropdown items={["Notes", "PYQ", "Important Questions"]} />
        )}
      </li>

      {/* Student Connect */}
      <li
        className="relative"
        onMouseEnter={() => handleMouseEnter("studentConnect")}
        onMouseLeave={handleMouseLeave}
      >
        <a href="#" className="hover:text-blue-500 transition">
          Student Connect
        </a>
        {dropdownOpen === "studentConnect" && !isMobile && (
          <Dropdown
            items={["Find Teammates", "Ask Doubts", "Peer Programming "]}
          />
        )}
      </li>

      {/* Clubs */}
      <li>
        <a href="#" className="hover:text-blue-500 transition">
          Clubs
        </a>
      </li>

      {/* Resources */}
      <li
        className="relative"
        onMouseEnter={() => handleMouseEnter("resources")}
        onMouseLeave={handleMouseLeave}
      >
        <a href="#" className="hover:text-blue-500 transition">
          Resources
        </a>
        {dropdownOpen === "resources" && !isMobile && (
          <Dropdown
            items={["Web Development", "App Development", "AI", "DSA"]}
          />
        )}
      </li>

      {/* Updates */}
      <li
        className="relative"
        onMouseEnter={() => handleMouseEnter("updates")}
        onMouseLeave={handleMouseLeave}
      >
        <a href="#" className="hover:text-blue-500 transition">
          Updates
        </a>
        {dropdownOpen === "updates" && !isMobile && (
          <Dropdown items={["Branch Updates", "Website Updates"]} />
        )}
      </li>

      {/* Mentor Connect */}
      <li>
        <a href="#" className="hover:text-blue-500 transition">
          Mentor Connect
        </a>
      </li>
    </>
  );
};

// Dropdown Component
const Dropdown = ({ items }) => {
  return (
    <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md transition">
      {items.map((item, index) => (
        <li key={index}>
          <a href="#" className="block px-4 py-2 hover:bg-blue-100 transition">
            {item}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Header;
