'use client';

import { useState, useOptimistic } from "react"
import { addComment } from "./actions"

export default function CommentsPage() {
    const [comments, setComments] = useState<string[]>([])
    const [error, setError] = useState("")
    const [OptimisticComments, addOptimisticComment] = useOptimistic(comments, (state, newComment: string) => [...comments, newComment])

    async function handleSubmit(formData: FormData) {
        const comment = formData.get("comment") as string


        setError("")

        // optimistic update
        addOptimisticComment(comment)

         try {
      await addComment(comment)

      setComments((prev) => [...prev, comment])

    } catch {
      setError("Failed to submit comment")

      // remove optimistic comment
      setComments((prev) => prev.filter((c) => c !== comment))
    }
    }

    return (
        <div>
            <h1> Comments</h1>

            <form action={handleSubmit}>
                <input type="text" name="comment" placeholder="Write a comment..." />
                <button type="submit">Post</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
                {OptimisticComments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        </div>
    )
}