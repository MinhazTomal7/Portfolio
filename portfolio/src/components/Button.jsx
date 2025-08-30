// src/components/Button.jsx
import React from "react";

const Button = ({ children, onClick, href, type = "button", className = "" }) => {
    const baseClasses =
        "px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700";

    if (href) {
        return (
            <a
                href={href}
                className={`${baseClasses} ${className}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        );
    }

    return (
        <button type={type} onClick={onClick} className={`${baseClasses} ${className}`}>
            {children}
        </button>
    );
};

export default Button;
