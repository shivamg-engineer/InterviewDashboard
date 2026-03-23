import { motion } from "framer-motion";
import { useEffect, useState } from "react";


const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    // Load preference on first render
    useEffect(() => {
        const stored = localStorage.getItem("darkMode");
        if (stored) {
            setDarkMode(stored === "true");
        }
    }, []);

    // Save preference on change
    useEffect(() => {
        localStorage.setItem("darkMode", darkMode.toString());
    }, [darkMode]);
    const containerStyle = {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    };

    const buttonStyle = {
        marginTop: "20px",
        padding: "10px 24px",
        fontSize: "16px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
    };


    return (
        <motion.div
            animate={{
                backgroundColor: darkMode ? "#121212" : "#f0f0f0",
                color: darkMode ? "#f0f0f0" : "#121212",
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={containerStyle}
        >
            <h1>{darkMode ? "Dark Mode 🌙" : "Light Mode ☀️"}</h1>
            <button
                onClick={() => setDarkMode((prev) => !prev)}
                style={buttonStyle}
            >Toggle Mode</button>
        </motion.div>
    );
}

export default DarkModeToggle;