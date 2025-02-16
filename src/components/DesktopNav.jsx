import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const DesktopNav = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const dropdownContent = {
    services: [
      { label: "Core Strength", path: "/core-strengths" },
      { label: "PPP", path: "/PPP" }
    ],
    investor: [
      "NSDL eVoting System",
      "Annual Reports",
      "Annual Return",
      "Buyback 2023",
      "Buyback 2024",
      "Financial Results",
      "Corporate Details",
      "Shareholding Pattern",
      "Unclaimed Dividends",
      "Stock Exchange Compliance",
      "Share Capital Audit Reports",
      "Investor Complaints",
      "Investor Awareness",
      "Corporate Governance",
      "Corporate Announcements",
      "Corporate Communication",
      "Compliance Certificate",
      "PCS Certificate",
      "DP Regulations",
      "Policy",
      "Notice",
      "AGM",
      "AGM Inspection Documents 2023-24",
      "EGM",
      "KYC",
      "Code of Conduct",
      "Fair Practices Code",
      "Subsidiary Companies",
      "Grievance Redressal Mechanism",
      "Intimation of Loss of share certificates",
      "Secretarial-Compliance-Report",
      "Corporate Social Responsibility (CSR)",
    ],
    compliance: [
      "Compliance Certificate",
      "PCS Certificate",
      "DP Regulations",
      "Policy",
      "Notice",
      "AGM",
      "AGM Inspection Documents 2022-23",
    ],
  };

  const NavDropdown = ({ items, columns = 1, width = "200px" }) => {
    const gridClass = columns > 1 ? `grid grid-cols-${columns} gap-2` : "";
    
    return (
      <div 
        className={`absolute top-full z-50 left-0 bg-white shadow-md rounded-b-md ${gridClass}`}
        style={{ width }}
      >
        <div className="p-4">
          {Array.isArray(items) && items[0]?.hasOwnProperty('label') ? (
            // For services dropdown with path and label
            items.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="block p-2 text-gray-700 hover:text-red-700 text-sm transition-colors duration-200"
              >
                <span className="text-red-700 mr-1">›</span> {item.label}
              </Link>
            ))
          ) : (
            // For investor and compliance dropdowns
            items.map((item, index) => (
              <a
                key={index}
                href="#"
                className="block p-2 text-gray-700 hover:text-red-700 text-sm transition-colors duration-200"
              >
                <span className="text-red-700 mr-1">›</span> {item}
              </a>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <nav className="hidden md:block ml-[200px] bg-transparent">
      <ul className="flex items-center justify-end space-x-6">
        <li>
          <Link to="/Overview" className="text-white text-sm font-medium hover:text-gray-200 py-5 inline-block whitespace-nowrap transition-colors duration-200">
            Brand Owner
          </Link>
        </li>
        <li>
          <Link to="/brandManagerDashboard" className="text-white text-sm font-medium hover:text-gray-200 py-5 inline-block whitespace-nowrap transition-colors duration-200">
            Brand Manager
          </Link>
        </li>
        <li
          className="relative"
          onMouseEnter={() => setHoveredItem("services")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <button 
            className="text-white text-sm font-medium hover:text-gray-200 py-5 inline-flex items-center whitespace-nowrap transition-colors duration-200"
            aria-expanded={hoveredItem === "services"}
          >
            Services <FaChevronDown className="text-xs ml-1" />
          </button>
          {hoveredItem === "services" && (
            <NavDropdown items={dropdownContent.services} width="220px" />
          )}
        </li>
        <li>
          <Link to="/management" className="text-white text-sm font-medium hover:text-gray-200 py-5 inline-block whitespace-nowrap transition-colors duration-200">
            Management
          </Link>
        </li>
        <li
          className="relative"
          onMouseEnter={() => setHoveredItem("investor")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <button 
            className="text-white text-sm font-medium hover:text-gray-200 py-5 inline-flex items-center whitespace-nowrap transition-colors duration-200"
            aria-expanded={hoveredItem === "investor"}
          >
            Investor Relation <FaChevronDown className="text-xs ml-1" />
          </button>
          {hoveredItem === "investor" && (
            <NavDropdown items={dropdownContent.investor} columns={2} width="500px" />
          )}
        </li>
        <li>
          <Link
            to="/proprietary"
            className="text-white text-sm font-medium hover:text-gray-200 py-5 inline-block whitespace-nowrap transition-colors duration-200"
          >
            Proprietary Investment
          </Link>
        </li>
        <li
          className="relative"
          onMouseEnter={() => setHoveredItem("compliance")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <button 
            className="text-white text-sm font-medium hover:text-gray-200 py-5 inline-flex items-center whitespace-nowrap transition-colors duration-200"
            aria-expanded={hoveredItem === "compliance"}
          >
            Stock Broker Compliance <FaChevronDown className="text-xs ml-1" />
          </button>
          {hoveredItem === "compliance" && (
            <NavDropdown items={dropdownContent.compliance} width="280px" />
          )}
        </li>
        <li>
          <Link to="/contact" className="text-white text-sm font-medium hover:text-gray-200 py-5 inline-block whitespace-nowrap transition-colors duration-200">
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNav;