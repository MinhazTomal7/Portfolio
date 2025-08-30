// src/components/Footer.jsx
import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="relative bg-gray-900 text-white py-12 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
                <div className="text-center md:text-left font-semibold">
                    &copy; {year} Minhazul Amin Tomal. All rights reserved.
                </div>
                <div className="flex gap-6 text-2xl">
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition transform hover:scale-125 hover:rotate-12">
                        <FaGithub />
                    </a>
                    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition transform hover:scale-125 hover:rotate-12">
                        <FaLinkedin />
                    </a>
                    <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition transform hover:scale-125 hover:rotate-12">
                        <FaTwitter />
                    </a>
                </div>
            </div>

            {/* Neon shapes for footer */}
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-400 rounded-full opacity-20 blur-3xl animate-pulse mix-blend-screen"></div>
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse mix-blend-screen"></div>
        </footer>
    );
};

export default Footer;
