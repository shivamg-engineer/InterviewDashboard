import "./App.css";
import { Counter } from "./counter/Counter";
import { ChangeBgColor } from "./forms/ChangeBgColor";
import { Form } from "./forms/Form";
import { LoginForm } from "./forms/LoginForm";
import { MulInputForm } from "./forms/MulInputForm";
import { UnControlledForm } from "./forms/UnControlledForm";

function App() {
  return (
    <>
      <Counter />
      <Form></Form>
      <LoginForm></LoginForm>
      <UnControlledForm></UnControlledForm>
      <ChangeBgColor />
      <MulInputForm />
    </>
  );
}

export default App;
