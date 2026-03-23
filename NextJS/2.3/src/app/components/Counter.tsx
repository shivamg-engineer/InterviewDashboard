'use client';

import { useRef, useState } from "react"

export default function Counter() {
    const [count, setCount] = useState<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startIncrement = () => {
        intervalRef.current = setInterval(() => {
            setCount((prev) => prev + 1);

        }, 100);
    }

    const startDecrement = () => {
        intervalRef.current = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 100);
    }

    const stopCounter = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }

    return (
        <div>
            <h1>Counter Page</h1>
            <p>Count: {count}</p>
            <button
                onMouseDown={startIncrement}
                onMouseUp={stopCounter}
                onMouseLeave={stopCounter}
                className="px-4 py-2 bg-green-500 text-white rounded-2xl cursor-pointer">
                Increment
            </button>
            <button
                onMouseDown={startDecrement}
                onMouseUp={stopCounter}
                onMouseLeave={stopCounter}
                className="px-4 py-2 bg-red-500 text-white rounded-2xl cursor-pointer ml-4">
                Decrement
            </button>
        </div>
    )
}