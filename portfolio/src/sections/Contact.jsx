// src/sections/Contact.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";

const generateParticles = (count) => {
    const colors = ["#3B82F6", "#8B5CF6", "#EC4899", "#FACC15"];
    return Array.from({ length: count }, () => ({
        size: Math.random() * 6 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.5 + 0.1,
        direction: Math.random() > 0.5 ? 1 : -1,
    }));
};

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [particles, setParticles] = useState(generateParticles(30));

    useEffect(() => {
        const interval = setInterval(() => {
            setParticles((prev) =>
                prev.map((p) => ({
                    ...p,
                    x: (p.x + Math.random() * 0.3 * p.direction) % 100,
                    y: (p.y + Math.random() * 0.3 * p.direction) % 100,
                }))
            );
        }, 50); // slower to reduce lag
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message sent! (Backend integration pending)");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
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
                        opacity: 0.35,
                        filter: "blur(4px)",
                        transform: "translate(-50%, -50%)",
                        mixBlendMode: "screen",
                    }}
                />
            ))}

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
                className="max-w-3xl mx-auto p-10 bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700 hover:scale-105 transition-transform duration-300"
            >
                <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse text-center">
                    Contact Me
                </h2>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="p-4 rounded-xl border border-purple-500 bg-gray-900/50 placeholder-gray-400 text-white focus:ring-2 focus:ring-purple-500 outline-none transition"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-4 rounded-xl border border-purple-500 bg-gray-900/50 placeholder-gray-400 text-white focus:ring-2 focus:ring-purple-500 outline-none transition"
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="p-4 rounded-xl border border-purple-500 bg-gray-900/50 placeholder-gray-400 text-white focus:ring-2 focus:ring-purple-500 outline-none transition resize-none"
                        required
                    />

                    <Button type="submit" className="self-start px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition-transform duration-300 ease-out hover:scale-105 shadow-lg shadow-purple-500/20 text-white font-medium">
                        Send Message
                    </Button>
                </form>
            </motion.div>
        </section>
    );
};

export default Contact;
