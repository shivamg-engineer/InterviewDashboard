import { motion } from "framer-motion";

const Spinner =()=>{
    const spinnerStyle={
     width:"50px",
     height:"50px",
     border:"8px solid #f3f3f3",
      borderTop: "4px solid #6366f1",
      borderRadius: "50%",
        /* 🔥 Performance optimization */
  willChange: "transform",
    }

    return (
        <motion.div
        className="spinner"
        animate={{rotate:360}}
        transition={{repeat:Infinity, duration:1, ease:"linear"}}
        style={spinnerStyle}
        >

        </motion.div>
    )
}
export default Spinner;