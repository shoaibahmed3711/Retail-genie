import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, DollarSign, Package, Settings, Menu, X, ShieldHalf, UserPlus, ChartBarDecreasing, History } from "lucide-react";

const navLinks = [
    { name: "Brands", path: "/BuyerBrands", icon: <DollarSign size={20} /> },
    { name: "Products", path: "/BuyerProducts", icon: <Package size={20} /> },
    { name: "Meeting", path: "/BuyerMeetings", icon: <ChartBarDecreasing size={20} /> },
    { name: "Settings", path: "/BuyerSettings", icon: <Settings size={20} /> },
];

const BuyerSidebar = () => {
    const [showNav, setShowNav] = useState(false);
    const location = useLocation();

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div
                className={`fixed lg:relative w-[250px] bg-gradient-to-b from-blue-900 to-blue-800 text-white h-full transition-all duration-300 ease-in-out ${showNav ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 lg:flex lg:flex-col shadow-xl z-50`}
            >
                {/* Logo and Toggle */}
                <div className="flex items-center justify-between p-6 border-b border-blue-700/50">
                    <button
                        className="lg:hidden text-blue-200 hover:text-white transition-colors"
                        onClick={() => setShowNav(false)}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className=" px-4 flex-1">
                    <ul className="space-y-2">
                        {navLinks.map(({ name, path, icon }) => (
                            <li key={path}>
                                <Link
                                    to={path}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${location.pathname === path
                                            ? "bg-blue-400 text-white shadow-md"
                                            : "text-blue-100 hover:bg-blue-500/50 hover:text-white"
                                        }`}
                                >
                                    <span className={`${location.pathname === path
                                            ? "text-white"
                                            : "text-blue-300"
                                        }`}>
                                        {icon}
                                    </span>
                                    <span className="text-sm font-medium">{name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

            </div>

            {/* Mobile Toggle Button */}
            <button
                className={`lg:hidden fixed top-6 left-6 z-50 bg-blue-900 text-white p-3 rounded-lg shadow-lg hover:bg-blue-800 transition-colors ${showNav ? "hidden" : "block"
                    }`}
                onClick={() => setShowNav(true)}
            >
                <Menu size={24} />
            </button>

            {/* Overlay for mobile */}
            {showNav && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setShowNav(false)}
                />
            )}
        </div>
    )
}

export default BuyerSidebar
