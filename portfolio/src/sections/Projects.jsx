// src/sections/Projects.jsx
import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import { motion } from "framer-motion";

// Generate neon particles
const generateParticles = (count) => {
    const colors = ["#3B82F6", "#8B5CF6", "#EC4899", "#FACC15"];
    return Array.from({ length: count }, () => ({
        size: Math.random() * 6 + 3,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        direction: Math.random() > 0.5 ? 1 : -1,
    }));
};

// Self-contained projects array
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
    // Add more projects as needed
];

const Projects = () => {
    const [particles, setParticles] = useState(generateParticles(50));
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    // Mouse position for neon trail
    useEffect(() => {
        const handleMouseMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Animate particles oscillation
    useEffect(() => {
        const interval = setInterval(() => {
            setParticles((prev) =>
                prev.map((p) => ({
                    ...p,
                    x: (p.x + Math.random() * 0.5 * p.direction) % 100,
                    y: (p.y + Math.random() * 0.5 * p.direction) % 100,
                }))
            );
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id="projects"
            className="relative py-32 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden"
        >
            {/* Neon particles */}
            {particles.map((p, i) => (
                <div
                    key={i}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        top: `${p.y}%`,
                        left: `${p.x}%`,
                        backgroundColor: p.color,
                        opacity: 0.4,
                        filter: "blur(4px)",
                        transform: `translate(-50%, -50%)`,
                        mixBlendMode: "screen",
                    }}
                />
            ))}



            <h2 className="text-5xl md:text-6xl font-bold text-center mb-20 relative z-10 animate-fade-in-up text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                My Projects
            </h2>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 100, rotate: 10 }}
                        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                            delay: index * 0.3,
                            type: "spring",
                            stiffness: 100,
                        }}
                        className="group perspective-1000"
                    >
                        <ProjectCard {...project} />
                    </motion.div>
                ))}
            </div>

            {/* Ultra blurred shapes */}
            <div className="absolute -bottom-60 -left-40 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-4xl animate-pulse mix-blend-screen"></div>
            <div className="absolute -top-60 -right-40 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-4xl animate-pulse mix-blend-screen"></div>
            <div className="absolute top-1/2 left-20 w-64 h-64 bg-pink-500 rounded-full opacity-15 blur-3xl animate-float mix-blend-screen"></div>
        </section>
    );
};

export default Projects;
