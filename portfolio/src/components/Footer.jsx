// src/components/Footer.jsx
import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

const generateStars = (count) => {
    const colors = ["#ffffff", "#f0f0ff", "#ffd6f0", "#fffacd"];
    return Array.from({ length: count }, () => ({
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.2 + 0.05,
        direction: Math.random() > 0.5 ? 1 : -1,
    }));
};

const Footer = () => {
    const [stars, setStars] = useState(generateStars(30));
    const year = new Date().getFullYear();

    // Animate stars
    useEffect(() => {
        const interval = setInterval(() => {
            setStars((prev) =>
                prev.map((s) => ({
                    ...s,
                    x: (s.x + s.speed * s.direction) % 100,
                    y: (s.y + s.speed * s.direction) % 100,
                }))
            );
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="relative bg-gray-900 text-white py-12 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
                <div className="text-center md:text-left font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                    &copy; {year} Minhazul Amin Tomal. All rights reserved.
                </div>

                <div className="flex gap-6 text-2xl">
                    <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition transform hover:scale-125 hover:rotate-12"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://linkedin.com/in/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition transform hover:scale-125 hover:rotate-12"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="https://facebook.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition transform hover:scale-125 hover:rotate-12"
                    >
                        <FaFacebook />
                    </a>
                </div>
            </div>

            {/* Starry background */}
            {stars.map((s, i) => (
                <div
                    key={i}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        top: `${s.y}%`,
                        left: `${s.x}%`,
                        backgroundColor: s.color,
                        opacity: 0.25,
                        filter: "blur(1.5px)",
                        transform: "translate(-50%, -50%)",
                        mixBlendMode: "screen",
                    }}
                />
            ))}
        </footer>
    );
};

export default Footer;
