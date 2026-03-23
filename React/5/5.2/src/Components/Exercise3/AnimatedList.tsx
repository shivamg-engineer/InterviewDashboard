import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AnimatedList() {
  const [items, setItems] = useState(["Apple", "Banana", "Orange"]);

  const addItem = () => {
    setItems((prev) => [...prev, `Item ${prev.length + 1}`]);
  };

  const removeItem = (item:string) => {
    setItems((prev) => prev.filter((i) => i !== item));
  };

  const containerStyle = {
  maxWidth: "400px",
  margin: "50px auto",
  textAlign: "center",
};

const addBtnStyle = {
  padding: "8px 16px",
  marginBottom: "16px",
  cursor: "pointer",
};

const listStyle = {
  listStyle: "none",
  padding: 0,
};

const itemStyle = {
  padding: "12px",
  marginBottom: "8px",
  background: "#6366f1",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer",
};


  return (
    <div style={containerStyle}>
      <button onClick={addItem} style={addBtnStyle}>
        ➕ Add Item
      </button>

      <ul style={listStyle}>
        <AnimatePresence>
          {items.map((item) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              style={itemStyle}
              onClick={() => removeItem(item)}
            >
              {item}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <p style={{ marginTop: "12px", color: "#555" }}>
        Click an item to remove it
      </p>
    </div>
  );
}

export default AnimatedList;
