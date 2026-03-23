// ThemeToggle.tsx
import useDarkMode from "../hooks/useDarkMode";

const ThemeToggle: React.FC = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <div style={{ padding: "20px" }}>
      <h2>{darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}</h2>

      <button onClick={toggleDarkMode}>
        Switch to {darkMode ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
};

export default ThemeToggle;
