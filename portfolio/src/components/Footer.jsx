// src/components/Footer.jsx
import React, { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

const Footer = () => {
    const canvasRef = useRef(null);
    const year = new Date().getFullYear();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const particleCount = 60;
        const particles = Array.from({ length: particleCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            size: Math.random() * 2 + 0.5,
        }));

        let animationId;
        const animate = () => {
            const isDark = document.documentElement.classList.contains("dark");
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x <= 0 || p.x >= width) p.vx *= -1;
                if (p.y <= 0 || p.y >= height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

                // Particle colors
                const colors = isDark
                    ? ["rgba(255,255,255,0.6)"]
                    : ["rgba(100,150,255,0.4)"]; // single tone for light theme
                const color = colors[Math.floor(Math.random() * colors.length)];

                ctx.fillStyle = color;
                ctx.shadowColor = color;
                ctx.shadowBlur = 6;
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        };
        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <footer className="relative pt-0 pb-12 overflow-hidden bg-blue-300 dark:bg-black">
            {/* Starry Canvas */}
            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-full z-0"
            />

            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
                <div className="text-center md:text-left font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                    &copy; {year} Minhazul Amin Tomal. All rights reserved.
                </div>

                <div className="flex gap-6 text-2xl">
                    <a
                        href="https://github.com/MinhazTomal7"
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
        </footer>
    );
};

export default Footer;
