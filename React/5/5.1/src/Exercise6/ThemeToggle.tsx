interface ThemeToggleProps {
    theme: string;
    toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
    return (
        <button onClick={toggleTheme}>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
    );
};

export default ThemeToggle;
