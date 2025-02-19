import React, { useState } from "react"
import { FaPhone } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import { RxHamburgerMenu } from "react-icons/rx"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import DesktopNav from "./DesktopNav"
import MobileNav from "./MobileNav"
import { CiMail } from "react-icons/ci"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "auto"
  }

  return (
    <header className="w-full top-0 left-0 z-50 bg-white md:bg-transparent">
      <div className="bg-white border-b hidden md:block">
        <div className="container-fluid mx-auto flex items-center ">
          <div className="flex ml-[250px] gap-8">
            <div className="border-r-[1px] border-gray-300 lg:p-5">
              <a href="/enquiry" className="flex items-center gap-2  text-sm hover:text-red-700 transition-colors duration-300">
                <CiMail className="text-lg text-[#AB1621]" /> <span className="font-semibold"> Free enquiry</span>
              </a>
            </div>
            <div className="border-r-[1px] border-gray-300 lg:p-5">
              <a href="tel:+911146656666" className="flex items-center gap-2  text-sm hover:text-red-700 transition-colors duration-300">
                <FaPhone className="text-sm text-[#AB1621]" /> <span className="font-semibold"> + 91 11 46656666</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={`bg-white md:bg-gradient-to-r from-blue-600 to-indigo-600 transition-colors duration-300`}>
        <div className="container-fluid mx-auto relative">
          <AnimatePresence>
            {!isMobileMenuOpen && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute left-1/2 md:left-12 transform -translate-x-1/2 md:translate-x-0 -top-8 bg-white p-4 shadow-md z-20"
              >
                <Link to="/">
                  <img
                    src="https://www.vlsfinance.com/wp-content/uploads/2020/01/vlsf-logo.png"
                    alt="VLS Finance Logo"
                    className="h-[70px] w-auto"
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between items-center h-16 px-4 lg:px-12">
            <button
              className="md:hidden text-black text-2xl p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <IoClose /> : <RxHamburgerMenu />}
            </button>

            <DesktopNav />
            {isMobileMenuOpen && <MobileNav />}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

