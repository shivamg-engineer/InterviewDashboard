'use client';

import { useState } from "react";

export default function FeedbackPage() {

    const [name, setName] = useState("");
    const [feedback, setFeedback] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const res = await fetch("/api/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, feedback })
        });

        const data = await res.json();
        setMessage(data.message);
    }

    return (
        <div>
            <h1>Feedback Form</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea
                    placeholder="Feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    )

}