import React, { Component, useState } from "react";

// class Counter extends Component {
//   state = {
//     count: 0,
//   };

//   increment = () => {
//     this.setState({ count: this.state.count + 1 });
//   };

//   decrement = () => {
//     this.setState({ count: this.state.count - 1 });
//   };

//   render() {
//     return (
//       <div>
//         <h2>Count: {this.state.count}</h2>
//         <button onClick={this.increment}>+</button>
//         <button onClick={this.decrement}>-</button>
//       </div>
//     );
//   }
// }

export const Counter = () => {
  const [Count, setCount] = useState(0);

  return (
    <div>
      <h1>{Count}</h1>
      <button onClick={() => setCount(Count + 1)}>+</button>
      <button onClick={() => setCount(Count - 1)}>-</button>
    </div>
  );
};

export default Counter;
