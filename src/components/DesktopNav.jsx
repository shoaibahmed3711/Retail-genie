import React, { useState } from "react";
import { Link } from "react-router-dom";

const DesktopNav = () => {
  const [hoveblueItem, setHoveblueItem] = useState(null);

  // Enhanced Dropdown Component
  const NavDropdown = ({ items, columns = 1, width = "240px" }) => {
    const gridClass = columns > 1 ? `grid grid-cols-${columns} gap-4` : "";

    return (
      <div
        className={`absolute top-full left-0 mt-2 z-50 bg-white shadow-lg rounded-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out ${gridClass}`}
        style={{ width, transform: "translateY(-10px)" }}
        onMouseEnter={() => setHoveblueItem(true)}
        onMouseLeave={() => setHoveblueItem(null)}
      >
        <div className="p-4">
          {Array.isArray(items) && items[0]?.hasOwnProperty('label') ? (
            items.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center p-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md text-sm font-medium transition-all duration-200 ease-in-out group"
              >
                <span className="text-blue-600 mr-2 transform group-hover:translate-x-1 transition-transform duration-200">›</span>
                {item.label}
              </Link>
            ))
          ) : (
            items.map((item, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center p-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md text-sm font-medium transition-all duration-200 ease-in-out group"
              >
                <span className="text-blue-600 mr-2 transform group-hover:translate-x-1 transition-transform duration-200">›</span>
                {item}
              </a>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <nav className="hidden md:block bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container-fluid mx-auto ">
        <header className="flex items-center justify-between">
          {/* Logo Area */}
          <div className="ml-4">
            <Link to="/">
              <img src="/logo.svg" className="w-[100px]" alt="" />
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className="flex items-center space-x-1">
            {[
              { to: "/BrandOwner", label: "Brand Owner" },
              { to: "/BrandManager", label: "Brand Manager" },
              { to: "/Buyer", label: "Buyer Overview" },
              { to: "/pricing", label: "Pricing" },
              { to: "/contact", label: "Contact Us" },
            ].map((item, index) => (
              <li key={index} className="relative group">
                <Link
                  to={item.to}
                  className="text-black text-sm font-medium px-4 py-3 rounded-md hover:bg-blue-500 hover:text-black transition-all duration-300 ease-in-out flex items-center"
                  onMouseEnter={() => setHoveblueItem(item.label)}
                  onMouseLeave={() => setHoveblueItem(null)}
                >
                  {item.label}
                  {/* Uncomment and add dropdown items if needed */}
                  {/* <FaChevronDown className="ml-2 h-3 w-3" /> */}
                </Link>
                {/* Add NavDropdown here if needed for specific items */}
                {/* {hoveblueItem === item.label && (
                  <NavDropdown items={dropdownItems[item.label] || []} />
                )} */}
              </li>
            ))}
          </ul>

          {/* Sign In Button */}
          <div className="flex flex-row gap-3 items-center">
            <Link
              to="/login"
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Login
            </Link>
            <Link
              to="/Signup"
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Sign up
            </Link>
          </div>
        </header>
      </div>
    </nav>
  );
};

export default DesktopNav;