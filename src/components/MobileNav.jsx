import React, { useState } from "react"
import { Link } from "react-router-dom"
import { FaPlus, FaMinus } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"

const MobileNav = () => {
  const [expandedItems, setExpandedItems] = useState([])
  const [activeItem, setActiveItem] = useState(null)

  const toggleItem = (item) => {
    setExpandedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
    setActiveItem(item)
  }

  const dropdownContent = {
    services: ["Core Strengths", "PPP"],
    investor: [
      "NSDL eVoting System",
      "Annual Reports",
      "Annual Return",
      "Buyback 2023",
      "Buyback 2024",
      "Financial Results",
      "Corporate Details",
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
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-x-0 top-16 bg-black z-50 md:hidden"
    >
      <nav className="w-full">
        <ul className="space-y-0">
          <li className="border-b border-gray-800">
            <Link to="/" className="block py-4 px-4 text-[#99141E] text-base">
              Home
            </Link>
          </li>
          <li className="border-b border-gray-800">
            <Link to="/about" className="block py-4 px-4 text-white text-base">
              About Us
            </Link>
          </li>
          <li className="border-b border-gray-800">
            <div
              className="flex items-center justify-between py-4 px-4 cursor-pointer"
              onClick={() => toggleItem("services")}
            >
              <span className={`text-base ${activeItem === "services" ? "text-[#99141E]" : "text-white"}`}>
                Services
              </span>
              <button className="text-[#99141E]">
                {expandedItems.includes("services") ? <FaMinus /> : <FaPlus />}
              </button>
            </div>

            <AnimatePresence>
              {expandedItems.includes("services") && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden bg-black"
                >
                  <Link to="/core-strengths" className="block py-3 px-8 text-white text-base border-l-2 border-[#99141E] ml-4">
                    Core Strengths
                  </Link>
                  <Link to="/PPP" className="block py-3 px-8 text-white text-base border-l-2 border-[#99141E] ml-4">
                    PPP
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li className="border-b border-gray-800">
            <Link to="/management" className="block py-4 px-4 text-white text-base">
              Management
            </Link>
          </li>
          <li className="border-b border-gray-800">
            <div
              className="flex items-center justify-between py-4 px-4 cursor-pointer"
              onClick={() => toggleItem("investor")}
            >
              <span className={`text-base ${activeItem === "investor" ? "text-[#99141E]" : "text-white"}`}>
                Investor Relation
              </span>
              <button className={activeItem === "investor" ? "text-[#99141E]" : "text-white"}>
                {expandedItems.includes("investor") ? <FaMinus /> : <FaPlus />}
              </button>
            </div>
            <AnimatePresence>
              {expandedItems.includes("investor") && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden bg-black"
                >
                  {dropdownContent.investor.map((item, index) => (
                    <Link
                      key={index}
                      to="#"
                      className="block py-3 px-8 text-white text-base border-l-2 border-[#99141E] ml-4"
                    >
                      {item}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          <li className="border-b border-gray-800">
            <Link to="/proprietary" className="block py-4 px-4 text-white text-base">
              Proprietary Investment
            </Link>
          </li>
          <li className="border-b border-gray-800">
            <div
              className="flex items-center justify-between py-4 px-4 cursor-pointer"
              onClick={() => toggleItem("compliance")}
            >
              <span className={`text-base ${activeItem === "compliance" ? "text-[#99141E]" : "text-white"}`}>
                Stock Broker Compliance
              </span>
              <button className={activeItem === "compliance" ? "text-[#99141E]" : "text-white"}>
                {expandedItems.includes("compliance") ? <FaMinus /> : <FaPlus />}
              </button>
            </div>
            <AnimatePresence>
              {expandedItems.includes("compliance") && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden bg-black"
                >
                  {dropdownContent.compliance.map((item, index) => (
                    <Link
                      key={index}
                      to="#"
                      className="block py-3 px-8 text-white text-base border-l-2 border-[#99141E] ml-4"
                    >
                      {item}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          <li className="border-b border-gray-800">
            <Link to="/contact" className="block py-4 px-4 text-[#99141E] text-base">
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </motion.div>
  )
}

export default MobileNav

