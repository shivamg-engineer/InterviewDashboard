'use client'

import { useActionState } from "react"
import { submitForm } from "./actions"

type FormState = {
  error?: string
  success?: string
}

const initialState: FormState = {
  error: "",
  success: ""
}

export default function ContactPage() {

  const [state, formAction] = useActionState(
    submitForm,
    initialState
  )

  return (
    <div style={{ padding: "20px" }}>
      <h1>Contact Form</h1>

      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input name="name" placeholder="Enter name" style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }} />
        <button type="submit" style={{ padding: "10px", background: "#171717", color: "#ffffff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Submit</button>
      </form>

      {state.error && (
        <p style={{ color: "red", marginTop: "10px" }}>{state.error}</p>
      )}

      {state.success && (
        <p style={{ color: "green", marginTop: "10px" }}>{state.success}</p>
      )}
    </div>
  )
}

