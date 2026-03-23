import { useRef } from "react";

const UncontrolledForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);

  console.log("🔄 Uncontrolled form rendered");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Name: ${nameRef.current?.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} placeholder="Enter name" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
