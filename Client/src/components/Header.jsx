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
  const [allowed, setAllowed] = useState(false);

  // State variables for toggling submenus in mobile
  const [mobileDropdowns, setMobileDropdowns] = useState({
    academic: false,
    studentConnect: false,
    resources: false,
    updates: false,
    manage: false,
  });

  useEffect(() => {
    const allowedRoles = ["admin", "professor", "studentmanagemod", "modhead"];
    if (allowedRoles.includes(data?.role)) {
      setAllowed(true);
    }
  }, [data]);

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
    await api.post("https://airosphere-ggits.vercel.app/authenticate/logout");
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

  const toggleMobileDropdown = (section) => {
    setMobileDropdowns((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
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

        {/* Desktop Menu */}
        {!isLoggedIn ? null : (
          <>
            <ul className="hidden lg:flex space-x-6">
              {renderNavItems(
                handleMouseEnter,
                handleMouseLeave,
                dropdownOpen,
                false,
                data,
                allowed
              )}
            </ul>

            {/* Hamburger Menu Icon for mobile */}
            <div className="lg:hidden">
              <button onClick={toggleMenu} className="text-gray-800">
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </>
        )}

        {!isLoggedIn ? (
          <div>
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Login
            </button>
          </div>
        ) : (
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

        {/* Mobile Menu */}
        {isMenuOpen && isLoggedIn && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md lg:hidden z-50">
            <ul className="space-y-4 py-4 px-6">
              {renderNavItems(
                handleMouseEnter,
                handleMouseLeave,
                dropdownOpen,
                true, // Now handling mobile version
                data,
                allowed,
                toggleMobileDropdown, // Pass the toggle function for mobile submenus
                mobileDropdowns // Pass the mobile dropdown state
              )}
            </ul>
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
  data,
  allowed,
  toggleMobileDropdown = () => {}, // New prop for toggling mobile submenus
  mobileDropdowns = {} // New prop for mobile dropdown state
) => {
  return (
    <>
      {/* Academic */}
      <li
        className="relative z-50"
        onMouseEnter={!isMobile ? () => handleMouseEnter("academic") : null}
        onMouseLeave={!isMobile ? handleMouseLeave : null}
        onClick={isMobile ? () => toggleMobileDropdown("academic") : null}
      >
        <h1 className="hover:text-indigo-500 transition">Academic</h1>
        {(dropdownOpen === "academic" ||
          (isMobile && mobileDropdowns.academic)) && (
          <Dropdown
            items={["Notes", "PYQ", "Important Questions", "Add Academic"]}
            url={[
              "/academic/notes",
              "/academic/pyq",
              "/academic/important",
              "/addacademic",
            ]}
            isMobile={isMobile}
          />
        )}
      </li>

      {/* Student Connect */}
      <li
        className="relative z-50"
        onMouseEnter={
          !isMobile ? () => handleMouseEnter("studentConnect") : null
        }
        onMouseLeave={!isMobile ? handleMouseLeave : null}
        onClick={isMobile ? () => toggleMobileDropdown("studentConnect") : null}
      >
        <h1 className="hover:text-indigo-500 transition">Student Connect</h1>
        {(dropdownOpen === "studentConnect" ||
          (isMobile && mobileDropdowns.studentConnect)) && (
          <Dropdown
            items={["Find Teammates", "Ask Doubts", "Peer Programming"]}
            url={[
              "/studentconnect/findteammates",
              "/studentconnect/askdoubt",
              "/studentconnect/findpeer",
            ]}
            isMobile={isMobile}
          />
        )}
      </li>

      {/* Clubs */}
      <Link to="/club">
        <li>
          <h1 className="hover:text-indigo-500 transition">Clubs</h1>
        </li>
      </Link>
      

      {/* Resources */}
      <li
        className="relative z-50"
        onMouseEnter={!isMobile ? () => handleMouseEnter("resources") : null}
        onMouseLeave={!isMobile ? handleMouseLeave : null}
        onClick={isMobile ? () => toggleMobileDropdown("resources") : null}
      >
        <h1 className="hover:text-indigo-500 transition">Resources</h1>
        {(dropdownOpen === "resources" ||
          (isMobile && mobileDropdowns.resources)) && (
          <Dropdown
            items={["Web Development", "App Development", "AI", "DSA"]}
            url={[
              "/resources/webdev",
              "/resources/appdev",
              "/resources/ai",
              "/resources/dsa",
            ]}
            isMobile={isMobile}
          />
        )}
      </li>

      {/* Updates */}
      <li
        className="relative z-50"
        onMouseEnter={!isMobile ? () => handleMouseEnter("updates") : null}
        onMouseLeave={!isMobile ? handleMouseLeave : null}
        onClick={isMobile ? () => toggleMobileDropdown("updates") : null}
      >
        <h1 className="hover:text-indigo-500 transition">Updates</h1>
        {(dropdownOpen === "updates" ||
          (isMobile && mobileDropdowns.updates)) && (
          <Dropdown
            items={["Branch Updates", "Website Updates", "Add Updates"]}
            url={["/updates/branch", "/updates/website", "/addupdates"]}
            isMobile={isMobile}
          />
        )}
      </li>

      <Link to="https://discord.gg/hrDdYVcyb4" target="_blank">
        {/* Mentor Connect */}
        <li>
          <h1 className="hover:text-blue-500 transition">Mentor Connect</h1>
        </li>
      </Link>

        {/* Important Links */}
      <Link to="/important links">
        <li>
          <h1 className="hover:text-indigo-500 transition">Quick Links</h1>
        </li>
      </Link>

      {/* Manage student section */}
      {allowed && (
        <li
          className="relative z-50"
          onMouseEnter={!isMobile ? () => handleMouseEnter("manage") : null}
          onMouseLeave={!isMobile ? handleMouseLeave : null}
          onClick={isMobile ? () => toggleMobileDropdown("manage") : null}
        >
          <h1 className="hover:text-blue-500 transition">Manage</h1>
          {(dropdownOpen === "manage" ||
            (isMobile && mobileDropdowns.manage)) && (
            <Dropdown
              items={["Manage Student", "Add Student", "Request"]}
              url={[
                "/manage/students",
                "/manage/addstudent",
                "/manage/viewrequest",
              ]}
              isMobile={isMobile}
            />
          )}
        </li>
      )}
    </>
  );
};

// Dropdown Component
const Dropdown = ({ items, url, isMobile }) => {
  const data = useSelector((store) => store?.user);
  const [academicAllowed, setAcademicAllowed] = useState(false);
  const [updateAllowed, setUpdateAllowed] = useState(false);

  useEffect(() => {
    const academicAlloweds = ["admin", "professor", "academicmod"];
    const updateAlloweds = ["admin", "professor", "updatemod"];
    if (academicAlloweds.includes(data?.role)) {
      setAcademicAllowed(true);
    }
    if (updateAlloweds.includes(data?.role)) {
      setUpdateAllowed(true);
    }
  }, [data?.role]);

  return (
    <ul
      className={`${
        isMobile ? "py-2" : "absolute left-0 mt-2"
      } w-48 bg-white shadow-lg rounded-md transition`}
    >
      {items.map((item, index) => (
        <Link to={url[index]} key={index}>
          {item === "Add Updates" || item === "Add Academic" ? (
            (item === "Add Updates" && updateAllowed && (
              <li key={index}>
                <p className="block px-4 py-2 hover:bg-blue-100 transition">
                  {item}
                </p>
              </li>
            )) ||
            (item === "Add Academic" && academicAllowed && (
              <li key={index}>
                <p className="block px-4 py-2 hover:bg-blue-100 transition">
                  {item}
                </p>
              </li>
            ))
          ) : (
            <li key={index}>
              <p className="block px-4 py-2 hover:bg-blue-100 transition">
                {item}
              </p>
            </li>
          )}
        </Link>
      ))}
    </ul>
  );
};

export default Header;
