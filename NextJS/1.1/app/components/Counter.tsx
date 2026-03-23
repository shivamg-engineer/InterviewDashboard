'use client';

import { useState } from "react";

function Counter(){
const [count, setCount] = useState(0);
console.log("Counter rendered");


    return (
        <div>
            <h1 className="text-3xl font-bold">Counter : {count}</h1>
            <button onClick={()=>setCount(count+1)} className="outline-1 rounded-2xl px-6 py-2 my-2">Increment</button>
        </div>
    );
}

export default Counter;