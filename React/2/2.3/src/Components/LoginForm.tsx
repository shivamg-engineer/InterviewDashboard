import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  function onSubmit(data: LoginFormData) {
    console.log("Login data:", data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {/* Email */}
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit">Login</button>
      </div>
    </form>
  );
}
