import { useEffect, useState } from "react";
import "./App.css";
import Exercise1 from "./Exercise1/Exercise1";
import Button from "./Exercise2/Exercise2";
import StyledButton from "./Exercise3/StyledButton";
import Navbar from "./Exercise4/NavBar";
import Card from "./Exercise5/Card";
import ThemeToggle from "./Exercise6/ThemeToggle";

function App() {
 const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };


  return (
    <>
      <Exercise1 />
      {/* exercise 2 */}
      <div>
        <Button label="Primary Button" />
        <br />
        <br />
        <Button label="Secondary Button" variant="secondary" />
      </div>

      {/* Exercise 3 */}
      <div>
        <h2>Styled Components – Dynamic Styling</h2>

        <StyledButton>Primary Button</StyledButton>

        <StyledButton variant="secondary">Secondary Button</StyledButton>

        <StyledButton disabled>Disabled Button</StyledButton>

        {/* Exercise 4 */}
        <div>
          <Navbar />
          <main style={{ padding: "24px" }}>
            <h1>Responsive Layout Demo</h1>
          </main>
        </div>

        {/* Exercise 5 */}
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <Card />
        </div>

        {/* Exercise 6 */}
         <div style={{ padding: "24px" }}>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      <div className="card" style={{ marginTop: "20px" }}>
        <h2>Dark Mode Example</h2>
        <p>
          Your theme preference is saved in localStorage and restored on reload.
        </p>
      </div>
    </div>
      </div>
    </>
  );
}

export default App;
