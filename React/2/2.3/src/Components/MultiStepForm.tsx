import { useState, type ChangeEvent, type FormEvent } from "react";

interface FormData {
  firstName: string;
  lastName: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
}

const MultiStepForm = () => {
  const [step, setStep] = useState<number>(1);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateStep = (): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1 && !formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (step === 2 && !formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (): void => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = (): void => {
    setErrors({});
    setStep((prev) => prev - 1);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateStep()) {
      alert(`Submitted: ${JSON.stringify(formData)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: 300 }}>
      <h2>Step {step}</h2>

      {step === 1 && (
        <>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <p style={{ color: "red" }}>{errors.firstName}</p>
          )}
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
        </>
      )}

      <div style={{ marginTop: 10 }}>
        {step > 1 && (
          <button type="button" onClick={handleBack}>
            Back
          </button>
        )}

        {step < 2 && (
          <button type="button" onClick={handleNext}>
            Next
          </button>
        )}

        {step === 2 && <button type="submit">Submit</button>}
      </div>
    </form>
  );
};

export default MultiStepForm;
