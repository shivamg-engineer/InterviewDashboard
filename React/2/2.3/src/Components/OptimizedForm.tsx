import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";

interface FormValues {
  firstName: string;
  lastName: string;
}

const OptimizedForm = () => {
  console.log("🔄 Form component re-rendered");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    shouldUnregister: true,
  });

  useEffect(() => {
    console.log("✏️ First Name field mounted");
  }, []);

  useEffect(() => {
    console.log("✏️ Last Name field mounted");
  }, []);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("✅ Submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="First Name"
        {...register("firstName", { required: "First name is required" })}
      />

      <input
        placeholder="Last Name"
        {...register("lastName", { required: "Last name is required" })}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default OptimizedForm;
