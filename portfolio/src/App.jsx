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
    const [theme, toggleTheme] = useTheme(); // <-- Now this works

    return (
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <main className="pt-20">
                <Hero />
                <Skills />
                <Projects />
                <About/>
                <Contact/>
                <Footer/>

            </main>
        </div>
    );
};

export default App;
