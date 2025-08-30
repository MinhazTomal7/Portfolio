import React from "react";
import Tilt from "react-parallax-tilt";

const ProjectCard = ({ title, description, image, link }) => {
    return (
        <Tilt
            className="w-full"
            options={{ max: 15, scale: 1.05, speed: 400 }}
        >
            <div className="relative bg-gradient-to-r from-blue-400 to-purple-500 p-[2px] rounded-2xl">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition hover:shadow-2xl cursor-pointer">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{title}</h3>
                        <p className="text-gray-700 dark:text-gray-300">{description}</p>
                        {link && (
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                                View Project
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </Tilt>
    );
};

export default ProjectCard;
