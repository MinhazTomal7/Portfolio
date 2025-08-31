// src/sections/About.jsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import profilePic from "../assets/about.jpg"; // replace with your image

const About = () => {
    const canvasRef = useRef(null);

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
                ctx.fillStyle = isDark
                    ? "rgba(255,255,255,0.6)"
                    : "rgba(50,50,50,0.4)";
                ctx.shadowColor = isDark
                    ? "rgba(255,255,255,0.8)"
                    : "rgba(50,50,50,0.3)";
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

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <section
            id="about"
            className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black py-24"
        >
            {/* Starry Canvas */}
            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-full z-0"
            />

            {/* Floating accent shapes */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400 rounded-full opacity-15 blur-4xl animate-pulse mix-blend-screen"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500 rounded-full opacity-15 blur-4xl animate-pulse mix-blend-screen"></div>
            <div className="absolute top-1/2 left-10 w-64 h-64 bg-pink-400 rounded-full opacity-10 blur-3xl animate-float mix-blend-screen"></div>

            <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
                {/* Profile Image */}
                <motion.div
                    className="flex-shrink-0 w-full md:w-1/3"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, type: "spring", stiffness: 80 }}
                >
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-300">
                        <img
                            src={profilePic}
                            alt="Profile"
                            className="w-full h-auto object-cover"
                        />
                        {/* Neon glow border */}
                        <div className="absolute inset-0 rounded-3xl border border-blue-400/20 dark:border-purple-400/20 shadow-[0_0_30px_#3B82F6] dark:shadow-[0_0_30px_#8B5CF6] pointer-events-none"></div>
                    </div>
                </motion.div>

                {/* Text */}
                <motion.div
                    className="md:w-2/3 space-y-6"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, type: "spring", stiffness: 80 }}
                >
                    <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                        About Me
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Hello! I'm Minhazul Amin Tomal, a passionate full-stack developer specializing
                        in modern web technologies. I love building interactive, responsive, and
                        visually stunning web applications that make an impact.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Over the years, I've created multiple projects including e-commerce
                        platforms, AI chatbots, and dynamic portfolio websites. I enjoy learning
                        new technologies and pushing the boundaries of both front-end and back-end
                        development.
                    </p>
                    <a
                        href="/Resume.pdf"
                        download
                        className="inline-block mt-2 px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl hover:scale-110 transition-transform shadow-lg"
                    >
                        Download CV
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
