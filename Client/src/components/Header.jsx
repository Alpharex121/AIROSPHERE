import React, { useEffect, useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa"; // For hamburger and profile menu
import { Link, useNavigate } from "react-router-dom";
import getUser from "../utils/getUser";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../utils/constant";
import { removeUser } from "../store/userSlice";

const Header = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const user = getUser();
  const data = useSelector((store) => store?.user);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState(null);

  const handleMouseEnter = (section) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
    }
    setDropdownOpen(section);
  };

  const handleLogin = () => {
    Navigate("/authenticate");
  };

  const handleLogout = async () => {
    await api.post("http://localhost:3000/authenticate/logout");
    dispatch(removeUser());
    Navigate("/");
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

  const toggleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

  useEffect(() => {
    if (data && data.username) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [data]);

  return (
    <header className="bg-white shadow-md z-50">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">
            <h6>AIROSPHERE</h6>
          </Link>
        </div>

        {!isLoggedIn ? null : (
          <>
            {/* Desktop Menu */}
            <ul className="hidden lg:flex space-x-6">
              {renderNavItems(
                handleMouseEnter,
                handleMouseLeave,
                dropdownOpen,
                false,
                data
              )}
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
                  true,
                  data
                )}
              </ul>
            )}
          </>
        )}

        {!isLoggedIn ? (
          // If not logged in, show Login button
          <div>
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Login
            </button>
          </div>
        ) : (
          // If logged in, show profile button with dropdown
          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="focus:outline-none"
            >
              <FaUserCircle size={36} className="text-gray-800 rounded-full" />
            </button>
            {profileDropdown && (
              <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                <li>
                  <Link to="/profile">
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-red-100 transition"
                      onClick={toggleProfileDropdown}
                    >
                      Profile
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-red-100 transition"
                      onClick={toggleProfileDropdown}
                    >
                      Dashboard
                    </button>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      toggleProfileDropdown();
                      handleLogout();
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-red-100 transition"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
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
  isMobile = false,
  data
) => {
  return (
    <>
      {/* Academic */}
      <li
        className="relative z-50"
        onMouseEnter={() => handleMouseEnter("academic")}
        onMouseLeave={handleMouseLeave}
      >
        <h1 href="#" className="hover:text-indigo-500 transition">
          Academic
        </h1>
        {dropdownOpen === "academic" && !isMobile && (
          <Dropdown
            items={["Notes", "PYQ", "Important Questions"]}
            url={["/academic/notes", "/academic/pyq", "/academic/important"]}
          />
        )}
      </li>

      {/* Student Connect */}
      <li
        className="relative z-50"
        onMouseEnter={() => handleMouseEnter("studentConnect")}
        onMouseLeave={handleMouseLeave}
      >
        <h1 href="#" className="hover:text-indigo-500 transition">
          Student Connect
        </h1>
        {dropdownOpen === "studentConnect" && !isMobile && (
          <Dropdown
            items={["Find Teammates", "Ask Doubts", "Peer Programming"]}
            url={[
              "/studentconnect/findteammates",
              "/studentconnect/askdoubt",
              "/studentconnect/findpeer",
            ]}
          />
        )}
      </li>

      {/* Clubs */}
      <Link to="/club">
        <li>
          <h1 href="#" className="hover:text-indigo-500 transition">
            Clubs
          </h1>
        </li>
      </Link>

      {/* Resources */}
      <li
        className="relative z-50"
        onMouseEnter={() => handleMouseEnter("resources")}
        onMouseLeave={handleMouseLeave}
      >
        <h1 href="#" className="hover:text-indigo-500 transition">
          Resources
        </h1>
        {dropdownOpen === "resources" && !isMobile && (
          <Dropdown
            items={["Web Development", "App Development", "AI", "DSA"]}
            url={[
              "/resources/webdev",
              "/resources/appdev",
              "/resources/ai",
              "/resources/dsa",
            ]}
          />
        )}
      </li>

      {/* Updates */}
      <li
        className="relative z-50"
        onMouseEnter={() => handleMouseEnter("updates")}
        onMouseLeave={handleMouseLeave}
      >
        <h1 href="#" className="hover:text-indigo-500 transition">
          Updates
        </h1>
        {dropdownOpen === "updates" && !isMobile && (
          <Dropdown
            items={["Branch Updates", "Website Updates"]}
            url={["/updates/branch", "/updates/website"]}
          />
        )}
      </li>

      <Link to="https://discord.gg/hrDdYVcyb4" target="_blank">
        {/* Mentor Connect */}
        <li>
          <h1 href="#" className="hover:text-blue-500 transition">
            Mentor Connect
          </h1>
        </li>
      </Link>

      {/* Manage sudent section */}

      {data?.role === "admin" && (
        <li
          className="relative z-50"
          onMouseEnter={() => handleMouseEnter("manage")}
          onMouseLeave={handleMouseLeave}
        >
          <h1 href="#" className="hover:text-blue-500 transition">
            Manage
          </h1>
          {dropdownOpen === "manage" && !isMobile && (
            <Dropdown
              items={["Manage Student", "Add Student", "Request"]}
              url={[
                "/manage/students",
                "/manage/addstudent",
                "/manage/viewrequest",
              ]}
            />
          )}
        </li>
      )}
    </>
  );
};

// Dropdown Component
const Dropdown = ({ items, url }) => {
  return (
    <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md transition">
      {items.map((item, index) => (
        <Link to={url[index]} key={index}>
          <li>
            <p className="block px-4 py-2 hover:bg-blue-100 transition">
              {item}
            </p>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default Header;
