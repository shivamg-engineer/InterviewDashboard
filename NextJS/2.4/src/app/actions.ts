"use server";

export async function submitForm(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");

  console.log("Form Submitted:");
  console.log("Name:", name);
  console.log("Email:", email);

  // Here you could:
  // save to DB
  // send email
  // call external API
}