'use server'

export async function submitForm(formData: FormData) {
  const name = formData.get("name")
  const email = formData.get("email")

  console.log("Name:", name)
  console.log("Email:", email)

  // simulate delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if(!name || !email){
    return { success: false }
  }
  return { success: true }
}