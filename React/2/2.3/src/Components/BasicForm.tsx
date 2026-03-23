import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
};

export default function BasicForm() {
  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    console.log("Form Data :", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input {...register("name")} />
      </div>
      <div>
        <label>Email:</label>
        <input {...register("email")} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
