import React from "react";

const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <button
            onClick={toggleTheme}
            className="ml-4 px-3 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
    );
};

export default ThemeToggle;
