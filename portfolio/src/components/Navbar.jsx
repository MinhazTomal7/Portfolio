import React, { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"; // Install heroicons
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [theme, setTheme] = useState("light");
    const [scrollY, setScrollY] = useState(0);
    const [isMobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
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

    // Theme toggle
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
        <nav
            className={`fixed top-0 w-full z-50 backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 border-b border-white/20 dark:border-gray-700 transition-all duration-500 ${
                scrollY > 20 ? "shadow-2xl" : "shadow-md"
            }`}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <motion.div
                    className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-text-glow cursor-pointer"
                    whileHover={{ scale: 1.1, rotate: [0, 3, -3, 0] }}
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
                                    : "text-gray-800 dark:text-gray-200"
                            }`}
                        >
                            {link.name}
                            <span className="absolute left-0 -bottom-1 w-0 h-1 rounded bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-all group-hover:w-full"></span>
                        </a>
                    ))}

                    {/* CV Button */}
                    <motion.a
                        href="/Resume.pdf"
                        download
                        className="px-5 py-2 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-105 transition transform"
                        whileHover={{ scale: 1.1, y: -2 }}
                    >
                        Download CV
                    </motion.a>

                    {/* Theme Button */}
                    <motion.button
                        onClick={toggleTheme}
                        className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-yellow-400 dark:text-yellow-300 shadow-lg hover:scale-110 transition transform"
                        whileTap={{ scale: 0.9 }}
                    >
                        {theme === "light" ? (
                            <MoonIcon className="w-6 h-6" />
                        ) : (
                            <SunIcon className="w-6 h-6" />
                        )}
                    </motion.button>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden flex items-center gap-2">
                    <motion.button
                        onClick={() => setMobileOpen(!isMobileOpen)}
                        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <div className="w-6 h-0.5 bg-gray-900 dark:bg-white mb-1 transition-all transform origin-center" />
                        <div className="w-6 h-0.5 bg-gray-900 dark:bg-white mb-1 transition-all transform origin-center" />
                        <div className="w-6 h-0.5 bg-gray-900 dark:bg-white transition-all transform origin-center" />
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        className="md:hidden flex flex-col items-center gap-4 py-4 bg-white dark:bg-gray-900 shadow-xl"
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
                                        : "text-gray-800 dark:text-gray-200"
                                }`}
                            >
                                {link.name}
                            </a>
                        ))}

                        {/* Mobile CV */}
                        <motion.a
                            href="/Resume.pdf"
                            download
                            className="px-6 py-2 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-105 transition transform"
                            whileHover={{ scale: 1.05 }}
                        >
                            Download CV
                        </motion.a>

                        {/* Mobile Theme */}
                        <motion.button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-yellow-400 dark:text-yellow-300 shadow-lg hover:scale-110 transition transform"
                            whileTap={{ scale: 0.9 }}
                        >
                            {theme === "light" ? (
                                <MoonIcon className="w-6 h-6" />
                            ) : (
                                <SunIcon className="w-6 h-6" />
                            )}
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
