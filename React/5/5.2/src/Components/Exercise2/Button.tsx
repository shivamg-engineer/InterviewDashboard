// import { motion } from "motion/react"
import { motion } from "framer-motion";
import { useState } from "react";

const Button = () => {

    const [clicked, setClicked] = useState(false);

    const containerStyle = {
        // height: "100vh",
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
    };

    const buttonStyle = {
        padding: "12px 24px",
        fontSize: "18px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#6366f1",
        color: "#fff",
        cursor: "pointer",
    };


    return (
        <div style={containerStyle}>
            {!clicked && (
                <motion.button
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: clicked ? 0 : 1 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setClicked(true)}
                    style={buttonStyle}
                >
                    Click me
                </motion.button>
            )}
        </div>
    )
}

export default Button;