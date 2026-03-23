import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  age: string;
};

export const MulInputForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    age: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  // ✅ check if all fields are filled
  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.age.trim() !== "";

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={!isFormValid}
        style={{
          backgroundColor: isFormValid ? "#4caf50" : "#ccc",
          cursor: isFormValid ? "pointer" : "not-allowed",
        }}
      >
        Submit
      </button>
    </form>
  );
};
