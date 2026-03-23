'use server'

type FormState = {
  error?: string
  success?: string
}



export async function submitForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {

  const name = formData.get("name")?.toString().trim()

  if (!name) {
    return {
      error: "Name is required",
      success: ""
    }
  }

  console.log("Name:", name)

  return {
    error: "",
    success: "Form submitted successfully!"
  }
}