// src/sections/Contact.jsx
import React, { useState, useEffect, useRef } from "react";
import Button from "../components/Button";

const Contact = () => {
    const canvasRef = useRef(null);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

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
                ctx.fillStyle = "rgba(255,255,255,0.6)";
                ctx.shadowColor = "rgba(255,255,255,0.8)";
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
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message sent! (Backend integration pending)");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black flex items-center justify-center">
            {/* Particle Canvas */}
            <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />

            <div className="relative z-10 w-full max-w-3xl px-6 md:px-0">
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
                        className="self-start px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform duration-300 shadow-lg text-white font-medium"
                    >
                        Send Message
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
