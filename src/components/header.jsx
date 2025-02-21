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

      <div className={`bg-white md:bg-gradient-to-r from-blue-600 to-indigo-600 transition-colors duration-300`}>
        <div className="container-fluid mx-auto relative">
          <AnimatePresence>
            {!isMobileMenuOpen && (
              <div
              >
                <Link to="/">
                  <img
                    src=""
                    alt="VLS Finance Logo"
                  />
                </Link>
              </div>
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

