// src/sections/Skills.jsx
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skills = [
    { name: "React", level: 90, color: "from-blue-400 via-purple-500 to-pink-500" },
    { name: "JavaScript", level: 95, color: "from-yellow-400 via-yellow-500 to-yellow-600" },
    { name: "Tailwind CSS", level: 85, color: "from-teal-400 via-teal-500 to-teal-600" },
    { name: "Node.js", level: 80, color: "from-green-400 via-green-500 to-green-600" },
    { name: "MongoDB", level: 75, color: "from-green-300 via-green-500 to-green-700" },
];

const Skills = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.2 });

    useEffect(() => {
        if (inView) controls.start("visible");
    }, [controls, inView]);

    return (
        <section
            id="skills"
            className="relative py-16 sm:py-20 bg-gradient-to-b from-gray-100 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden"
        >
            {/* Floating sparkles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full opacity-10 animate-pulse"
                        style={{
                            width: `${Math.random() * 6 + 2}px`,
                            height: `${Math.random() * 6 + 2}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            background: ["#3B82F6", "#8B5CF6", "#EC4899", "#FACC15"][Math.floor(Math.random() * 4)],
                        }}
                    ></div>
                ))}
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 relative z-10 text-gray-900 dark:text-white">
                My Skills
            </h2>

            <div
                ref={ref}
                className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center px-4"
            >
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={controls}
                        variants={{
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { delay: index * 0.2, duration: 0.8, type: "spring" },
                            },
                        }}
                        className="w-full sm:w-[300px] md:w-full p-6 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition hover:scale-105 hover:shadow-2xl"
                    >
                        <h3 className="text-xl font-semibold mb-4 text-center">{skill.name}</h3>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 rounded-full overflow-hidden">
                            <motion.div
                                className={`h-4 rounded-full bg-gradient-to-r ${skill.color} shadow-lg`}
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            ></motion.div>
                        </div>
                        <span className="text-sm mt-2 block text-center">{skill.level}%</span>
                    </motion.div>
                ))}
            </div>

        </section>
    );
};

export default Skills;
