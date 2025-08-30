import React, { useState, useEffect } from "react";

const AnimatedText = ({
                          text,
                          speed = 100,
                          loop = false,
                          className = "",
                          gradient = "from-blue-400 via-purple-500 to-pink-500",
                          shadow = true,
                      }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        let typingInterval = setInterval(() => {
            setDisplayedText(text.slice(0, index + 1));
            setIndex((prev) => prev + 1);
        }, speed);

        if (index === text.length) {
            clearInterval(typingInterval);
            if (loop) {
                setTimeout(() => {
                    setDisplayedText("");
                    setIndex(0);
                }, 1500);
            }
        }

        return () => clearInterval(typingInterval);
    }, [index, text, speed, loop]);

    // Blinking cursor effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <span
            className={`bg-clip-text text-transparent font-bold text-3xl md:text-5xl lg:text-6xl 
        bg-gradient-to-r ${gradient} 
        ${shadow ? "drop-shadow-lg" : ""} 
        ${className} transition-all duration-500 ease-in-out`}
        >
      {displayedText}
            <span className={`inline-block ${showCursor ? "opacity-100" : "opacity-0"} animate-pulse`}>|</span>
    </span>
    );
};

export default AnimatedText;
