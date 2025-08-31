import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import About from "./sections/About.jsx";
import Contact from "./sections/Contact.jsx";
import useTheme from "./hooks/useTheme";
import "./index.css";
import Footer from "./components/Footer.jsx";

const App = () => {
    const [theme, toggleTheme] = useTheme();

    return (
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">

            {/* Remove pt-20 so Hero touches Navbar */}
            <main className="pt-0">
                <Hero />
                <Skills />
                <Projects />
                <About />
                <Contact />
                <Footer />
            </main>
        </div>
    );
};

export default App;
