'use server';

import { redirect } from "next/navigation";

export interface FormState {
  errors?: {
    name?: string;
    email?: string;
  };
  success?: string;
}

export async function submitContact(prevState: FormState, formData: FormData): Promise<FormState> { //for message only no redirect
// export async function submitContact(formData: FormData) {

    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();

     const errors: { name?: string; email?: string } = {}

     if(!name){
        errors.name = "Name is required";
     }

     if(!email){
        errors.email = "Email is required";
     }

     if(Object.keys(errors).length > 0){
        return { errors }; //for message only no redirect
     }
    
    // Here you can handle the form data, e.g., save it to a database or send an email
    console.log('Contact Form Submitted:', { name, email });

    // redirect after submission
//   redirect("/contact/success");

return { success: "Form submitted successfully!" }; //for message only no redirect

}
