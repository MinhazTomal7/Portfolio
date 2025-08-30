// src/sections/Hero.jsx
import React, { useEffect, useState, useRef } from "react";
import AnimatedText from "../components/AnimatedText";
import Button from "../components/Button";

const Hero = () => {
    const canvasRef = useRef(null);
    const [particles, setParticles] = useState([]);

    // Particle setup
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const width = canvas.width = window.innerWidth;
        const height = canvas.height = window.innerHeight;

        const particleCount = 120;
        const tempParticles = [];
        for (let i = 0; i < particleCount; i++) {
            tempParticles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                color: ["#3B82F6", "#8B5CF6", "#EC4899", "#FACC15"][Math.floor(Math.random() * 4)],
            });
        }
        setParticles(tempParticles);

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            // Draw lines
            for (let i = 0; i < particleCount; i++) {
                for (let j = i + 1; j < particleCount; j++) {
                    const dx = tempParticles[i].x - tempParticles[j].x;
                    const dy = tempParticles[i].y - tempParticles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.strokeStyle = `rgba(255,255,255,${1 - dist / 120})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(tempParticles[i].x, tempParticles[i].y);
                        ctx.lineTo(tempParticles[j].x, tempParticles[j].y);
                        ctx.stroke();
                    }
                }
            }
            // Draw particles
            tempParticles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 10;
                ctx.fill();
            });
            requestAnimationFrame(animate);
        };

        animate();
        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-gray-900 dark:bg-black">
            {/* Particle Canvas */}
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />

            {/* Floating 3D Shapes */}
            <div className="absolute w-full h-full pointer-events-none">
                <div className="absolute top-10 left-20 w-72 h-72 bg-purple-500 opacity-20 rounded-full animate-bounce-slow blur-3xl"></div>
                <div className="absolute bottom-10 right-32 w-60 h-60 bg-blue-500 opacity-20 rounded-full animate-bounce-slow blur-2xl"></div>
                <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-pink-500 opacity-20 rounded-full animate-bounce-slow blur-xl"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x drop-shadow-lg">
                    <AnimatedText text="Hi, I’m Minhazul Amin Tomal" speed={80} />
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl animate-fade-in-up delay-300 drop-shadow-md">
                    I build modern, responsive websites with cutting-edge UI, animations, and dark/light mode.
                </p>

                {/* Buttons */}
                <div className="mt-10 flex gap-4 justify-center animate-fade-in-up delay-500">
                    <Button href="/Resume.pdf" className="rounded-xl shadow-xl hover:scale-105 transform transition-all duration-300">
                        Download CV
                    </Button>
                    <Button href="#projects" className="rounded-xl shadow-xl bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 hover:scale-105 transform transition-all duration-300">
                        See Projects
                    </Button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 w-full flex justify-center">
                <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-1 animate-bounce">
                    <div className="w-2 h-2 bg-white rounded-full mb-1 animate-bounce"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
