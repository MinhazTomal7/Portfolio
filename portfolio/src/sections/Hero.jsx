import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import HeroImage from "../assets/hero-image.jpg";

const Hero = () => {
    const canvasRef = useRef(null);
    const [theme, setTheme] = useState(
        document.documentElement.classList.contains("dark") ? "dark" : "light"
    );

    // Typing effect state
    const nameWords = ["Minhazul", "Amin", "Tomal"];
    const [typedName, setTypedName] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        if (wordIndex < nameWords.length) {
            if (charIndex < nameWords[wordIndex].length) {
                const timeout = setTimeout(() => {
                    setTypedName((prev) => prev + nameWords[wordIndex][charIndex] + (charIndex === nameWords[wordIndex].length - 1 && wordIndex !== nameWords.length - 1 ? " " : ""));
                    setCharIndex((prev) => prev + 1);
                }, 150);
                return () => clearTimeout(timeout);
            } else {
                // Move to next word
                setWordIndex((prev) => prev + 1);
                setCharIndex(0);
            }
        }
    }, [charIndex, wordIndex]);

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
            ctx.clearRect(0, 0, width, height);
            const isDark = document.documentElement.classList.contains("dark");

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x <= 0 || p.x >= width) p.vx *= -1;
                if (p.y <= 0 || p.y >= height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

                ctx.fillStyle = isDark
                    ? "rgba(255,255,255,0.7)"
                    : "rgba(0,150,255,0.6)";

                ctx.shadowColor = isDark
                    ? "rgba(200,150,255,0.5)"
                    : "rgba(0,0,0,0.3)";
                ctx.shadowBlur = 8;

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

        const observer = new MutationObserver(() => {
            setTheme(
                document.documentElement.classList.contains("dark")
                    ? "dark"
                    : "light"
            );
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
            observer.disconnect();
        };
    }, []);

    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black">
            {/* Particle Canvas */}
            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-full z-0"
            />

            {/* Navbar */}
            <div className="relative z-20">
                <Navbar />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-12 md:gap-24 pt-24 md:pt-32 px-6 md:px-4">
                {/* Left Text */}
                <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                        <span className="block text-gray-600 dark:text-gray-300 text-lg mb-2">
                            Hi, I’m
                        </span>
                        <motion.span
                            className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {typedName}
                        </motion.span>
                    </h1>
                    <motion.p
                        className="text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl max-w-md md:max-w-xl"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        I build modern, responsive websites with cutting-edge UI, smooth animations, and professional dark/light mode.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4"
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8, delay: 0.5}}
                    >
                        <Button
                            href="/Resume.pdf"
                            className="rounded-lg shadow-lg px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90 transition"
                        >
                            Download CV
                        </Button>
                        <button className="
                                          px-6 py-3 rounded-lg font-medium transition-colors
                                          bg-black text-white hover:bg-gray-800
                                          dark:bg-white dark:text-black dark:hover:bg-gray-200
                                        ">
                            See Projects
                        </button>
                    </motion.div>
                </div>

                {/* Right Image */}
                <div className="flex-1 flex justify-center md:justify-end">
                    <motion.img
                        src={HeroImage}
                        alt="Hero"
                        className="w-64 sm:w-72 md:w-96 rounded-xl shadow-2xl"
                        initial={{ opacity: 1, y: 10 }}
                        animate={{ opacity: 1, y: [0, -8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
