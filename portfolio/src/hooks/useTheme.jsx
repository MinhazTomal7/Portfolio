import { useState, useEffect } from "react";

const useTheme = () => {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        // Load saved theme from localStorage
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) setTheme(savedTheme);
    }, []);

    useEffect(() => {
        // Apply theme to document
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        // Save preference
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return [theme, toggleTheme];
};

export default useTheme;
