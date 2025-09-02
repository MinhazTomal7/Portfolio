// src/sections/Contact.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Button from "../components/Button";

const Contact = () => {
    const canvasRef = useRef(null);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);

    // Particle canvas
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
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x <= 0 || p.x >= width) p.vx *= -1;
                if (p.y <= 0 || p.y >= height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

                const colors = [
                    "rgba(59, 130, 246, 0.6)",
                    "rgba(139, 92, 246, 0.6)",
                    "rgba(236, 72, 153, 0.6)"
                ];
                const color = colors[Math.floor(Math.random() * colors.length)];

                ctx.fillStyle = color;
                ctx.shadowColor = color;
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

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("http://localhost:5000/contact", formData);
            alert("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            alert("Failed to send message. Try again.");
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <section
            className="relative w-full min-h-screen overflow-hidden
               bg-gradient-to-b from-blue-300 to-blue-400
               dark:from-gray-950 dark:to-black
               flex items-center justify-center"
        >
            <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />

            <motion.div
                className="relative z-10 w-full max-w-3xl px-6 md:px-0"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                    Contact Me
                </h2>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="p-4 rounded-xl border border-gray-300 dark:border-purple-500 bg-white dark:bg-gray-900 placeholder-gray-600 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-4 rounded-xl border border-gray-300 dark:border-purple-500 bg-white dark:bg-gray-900 placeholder-gray-600 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition"
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="p-4 rounded-xl border border-gray-300 dark:border-purple-500 bg-white dark:bg-gray-900 placeholder-gray-600 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition resize-none"
                        required
                    />
                    <Button
                        type="submit"
                        className={`self-start px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform duration-300 shadow-lg text-white font-medium ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </Button>
                </form>
            </motion.div>
        </section>
    );
};

export default Contact;
