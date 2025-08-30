// src/sections/About.jsx
import React from "react";
import { motion } from "framer-motion";
import profilePic from "../assets/rsz_pic.jpg"; // replace with your image

const About = () => {
    return (
        <section
            id="about"
            className="relative py-24 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden"
        >
            {/* Background neon shapes */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400 rounded-full opacity-20 blur-4xl animate-pulse mix-blend-screen"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-4xl animate-pulse mix-blend-screen"></div>
            <div className="absolute top-1/2 left-10 w-64 h-64 bg-pink-400 rounded-full opacity-15 blur-3xl animate-float mix-blend-screen"></div>

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-4 relative z-10">
                {/* Image */}
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
                        {/* Subtle neon glow */}
                        <div className="absolute inset-0 rounded-3xl border border-blue-400/30 dark:border-purple-400/30 shadow-[0_0_30px_#3B82F6] dark:shadow-[0_0_30px_#8B5CF6] pointer-events-none"></div>
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
                    <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse">
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
                        className="inline-block mt-2 px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl hover:scale-105 transition-transform shadow-lg"
                    >
                        Download CV
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
