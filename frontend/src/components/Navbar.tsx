import { Link, useLocation } from "react-router-dom";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/bikes", label: "Bikes" },
    { to: "/bookings", label: "Bookings" },
    { to: "/register-client", label: "Register Client" },
    { to: "/register-rider", label: "Register Rider" },
    { to: "/login", label: "Login" },
];

export default function Navbar() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <NavigationMenu.Root className="bg-white shadow-md px-6 py-3 flex items-center justify-between w-full sticky top-0 z-50">
            {/* Brand / Logo */}
            <div className="text-2xl font-bold text-emerald-500">E-Bike Platform</div>

            {/* Mobile Hamburger Toggle */}
            <button
                className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Toggle navigation menu"
                onClick={() => setMenuOpen((prev) => !prev)}
            >
                {menuOpen ? (
                    <X className="w-6 h-6 text-emerald-500" />
                ) : (
                    <Menu className="w-6 h-6 text-emerald-500" />
                )}
            </button>

            {/* Desktop Navigation */}
            <NavigationMenu.List className="hidden md:flex gap-6">
                {navLinks.map((link) => (
                    <NavigationMenu.Item key={link.to}>
                        <NavigationMenu.Link asChild>
                            <Link
                                to={link.to}
                                className={`text-gray-700 hover:text-emerald-500 font-medium transition-colors duration-150 px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${location.pathname === link.to ? "bg-emerald-50" : ""
                                    }`}
                            >
                                {link.label}
                            </Link>
                        </NavigationMenu.Link>
                    </NavigationMenu.Item>
                ))}
            </NavigationMenu.List>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden flex flex-col px-6 py-4 z-50"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`text-gray-700 hover:text-emerald-500 font-medium transition-colors duration-150 px-2 py-2 rounded ${location.pathname === link.to ? "bg-emerald-50" : ""
                                    }`}
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </NavigationMenu.Root>
    );
}
