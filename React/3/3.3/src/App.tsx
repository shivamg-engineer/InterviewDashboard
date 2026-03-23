import "./App.css";
import OtpTimer from "./Components/OtpTimer";
import { ThemeSwitcher } from "./Components/ThemeSwitcher";
import ThemeToggle from "./Components/ThemeToggle";
import UsersComponent from "./Components/UsersComponent";
import useWindowSize from "./hooks/useWindowSize";

function App() {
  const { width } = useWindowSize();

  return (
    <>
      <div>
        <h1>Exercise 1</h1>
        <UsersComponent />
      </div>
      <div>
        <h1>Exercise 2</h1>
        <ThemeSwitcher />
      </div>
      <div>
        <h1>Exercise 3</h1>
        <OtpTimer />
      </div>
      <div>
        <h1>Exercise 4</h1>
        <ThemeToggle />
      </div>
      <div>
        {/* Window size */}
        <h2>Window Width: {width}px</h2>
      </div>
    </>
  );
}

export default App;
