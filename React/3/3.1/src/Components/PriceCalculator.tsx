import { useState } from "react";

export function PriceCalculator() {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(100);

  // Derived state (NOT stored in useState)
  const totalCost = quantity * price;
  return (
    <div style={{ maxWidth: 300 }}>
      <h3>Price Calculator: </h3>
      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        Price per Item:
        <input
          type="number"
          value={price}
          min="0"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </label>

      <hr />

      <h4>Total Cost: ₹{totalCost}</h4>
    </div>
  );
}
