// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [theme, setTheme] = useState("light");
    const [isMobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["skills", "projects", "about", "contact"];
            sections.forEach((id) => {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) setActiveSection(id);
                }
            });
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", newTheme);
    };

    const navLinks = [
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "About", href: "#about" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav className="w-full  top-0 left-0 z-30">
            <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <motion.div
                    className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 cursor-pointer"
                    whileHover={{ scale: 1.05, rotate: [0, 3, -3, 0] }}
                >
                    Minhazul Amin Tomal
                </motion.div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`relative px-3 py-1 font-medium transition-all duration-300 group ${
                                activeSection === link.href.slice(1)
                                    ? "text-blue-500 after:w-full"
                                    : "text-gray-100 dark:text-gray-200"
                            }`}
                        >
                            {link.name}
                            <span className="absolute left-0 -bottom-1 w-0 h-1 rounded bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-all group-hover:w-full"></span>
                        </a>
                    ))}

                    {/* Theme Button */}
                    <motion.button
                        onClick={toggleTheme}
                        className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-yellow-400 dark:text-yellow-300 hover:scale-110 transition transform"
                        whileTap={{ scale: 0.9 }}
                    >
                        {theme === "light" ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
                    </motion.button>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden flex items-center gap-2">
                    <motion.button
                        onClick={() => setMobileOpen(!isMobileOpen)}
                        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <div className="w-6 h-0.5 bg-white mb-1 transition-all" />
                        <div className="w-6 h-0.5 bg-white mb-1 transition-all" />
                        <div className="w-6 h-0.5 bg-white transition-all" />
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        className="md:hidden flex flex-col items-center gap-4 py-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={`text-lg font-medium ${
                                    activeSection === link.href.slice(1)
                                        ? "text-blue-500"
                                        : "text-white dark:text-gray-200"
                                }`}
                            >
                                {link.name}
                            </a>
                        ))}

                        <motion.button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-yellow-400 dark:text-yellow-300 hover:scale-110 transition transform"
                            whileTap={{ scale: 0.9 }}
                        >
                            {theme === "light" ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
