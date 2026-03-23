'use client'

import { useState } from "react"
import { submitForm } from "./actions1"

export default function ContactPage() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)

    const result = await submitForm(formData)

    if (result.success) {
      setName("")
      setEmail("")
      setMessage("Thank you for your submission!")
    }
    if (!result.success) {
      setName("")
      setEmail("")
      setMessage("fill form first!")
    }
  }

  return (
    <div>
      <h1>Contact Form</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}