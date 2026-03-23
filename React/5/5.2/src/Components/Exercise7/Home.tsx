import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "./pageAnimation";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      style={pageStyle}
    >
      <h1>Home Page</h1>
      <Link to="/about">Go to About</Link>
    </motion.div>
  );
}

const pageStyle = {
  padding: "40px",
};
