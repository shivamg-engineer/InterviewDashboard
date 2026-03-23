'use client'

import { useFormState } from "react-dom";
import { submitContact, FormState } from "./actions";

const initialState: FormState = {
  errors: {},
  success: ""
}

export default function ContactPage() {

    
    const [state, formAction] = useFormState(submitContact, initialState); //for message only no redirect

    return (
        <div style={{ padding: "20px" }}>
            <h1>Contact Form</h1>

            <form action={formAction}>  {/* //for message only no redirect */}
                {/* <form action={submitContact}> */}
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                    // required
                    />
                    {state?.errors?.name && (
                        <p style={{ color: "red" }}>{state.errors.name}</p>
                    )}
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                    // required
                    />
                    {state?.errors?.email && (
                        <p style={{ color: "red" }}>{state.errors.email}</p>
                    )}
                </div>

                <button type="submit">Submit</button>
            </form>

            {state?.success && (
                <p style={{ color: "green" }}>{state.success}</p>
            )}
            {/* {state.message && <p>{state.message}</p>}   //for message only no redirect */}
        </div>
    );
}