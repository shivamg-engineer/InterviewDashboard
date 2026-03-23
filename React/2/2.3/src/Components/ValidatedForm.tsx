import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof formSchema>;

export default function ValidatedForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: FormData) {
    console.log("Valid Data:", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name Field */}
      <div>
        <label>Name</label>
        <input {...register("name")} />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>

      {/* Email Field */}
      <div>
        <label>Email</label>
        <input {...register("email")} />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
