import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "./pageAnimation";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      style={pageStyle}
    >
      <h1>About Page</h1>
      <Link to="/">Go to Home</Link>
    </motion.div>
  );
}

const pageStyle = {
  padding: "40px",
};
