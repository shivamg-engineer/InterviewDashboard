import { useLocalStorage } from "../hooks/useLocalStorage";

type Theme = "light" | "dark";

export function ThemeSwitcher() {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={theme}>
      <h2>Current Theme: {theme}</h2>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
