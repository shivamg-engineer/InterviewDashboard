import { useRef } from "react";

export const UnControlledForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Name: ${nameRef.current?.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={nameRef} placeholder="Enter your name" />
      <button type="submit">Submit</button>
    </form>
  );
};
