import "./App.css";
import BasicForm from "./Components/BasicForm";
import LoginForm from "./Components/LoginForm";
import MultiStepForm from "./Components/MultiStepForm";
import OptimizedForm from "./Components/OptimizedForm";
import SignupForm from "./Components/SignupForm";
import UncontrolledForm from "./Components/UncontrolledForm";
import ValidatedForm from "./Components/ValidatedForm";

function App() {
  return (
    <>
      <div>
        <h1>React Hook Form Example</h1>
        <BasicForm />
      </div>
      <div>
        <h1>Form Validation with Zod</h1>
        <ValidatedForm />
      </div>
      <div>
        <h1>Login</h1>
        <LoginForm />
      </div>
      <div>
        <h1>Multi-Step</h1>
        <MultiStepForm />
      </div>
      <div>
        <h1>5. Optimized Form performance</h1>
        <OptimizedForm />
      </div>
      <div>
        <h1>6. </h1>
        <UncontrolledForm />
      </div>
      <div>
        <h1>
          7.
          <SignupForm />
        </h1>
      </div>
    </>
  );
}

export default App;
