import { useTheme } from "./UseTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>Current theme: {theme}</button>;
}

// Theme Provider passes-> ThemeContext ->useTheme (gets context) -> ThemeToggle (gets theme, toggleTheme)

//useTheme gets context -> themeContext
// ThemeToggle gets theme, toggleTheme from-> useTheme
