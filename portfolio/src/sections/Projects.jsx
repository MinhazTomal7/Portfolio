// src/sections/Projects.jsx
import React, { useEffect, useRef } from "react";
import ProjectCard from "../components/ProjectCard";
import { motion } from "framer-motion";

const projects = [
    {
        title: "PlantNest E-commerce",
        description: "Full-stack plant store with React, Node.js, and MongoDB.",
        image: "/assets/project1.jpg",
        link: "#",
    },
    {
        title: "Portfolio Website",
        description:
            "Modern, responsive portfolio with dark/light mode and animations.",
        image: "/assets/project2.jpg",
        link: "#",
    },
    {
        title: "AI Chatbot",
        description: "Product recommendation chatbot using OpenAI embeddings.",
        image: "/assets/project3.jpg",
        link: "#",
    },
    {
        title: "Extra Crazy Project",
        description: "Just to show multiple projects auto-rotating.",
        image: "/assets/project4.jpg",
        link: "#",
    },
];

const Projects = () => {
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
                    : "rgba(50,50,50,0.5)";
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
            id="projects"
            className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black"
        >
            {/* Starry Canvas */}
            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-full z-0"
            />

            <div className="relative z-10 max-w-7xl mx-auto py-32 px-4">
                {/* Section Heading */}
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                    My Projects
                </h2>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50, rotate: 5 }}
                            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.2,
                                type: "spring",
                                stiffness: 100,
                            }}
                        >
                            <ProjectCard {...project} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
