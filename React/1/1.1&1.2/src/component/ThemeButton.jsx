import { useContext } from "react";
import ThemeContext from "./ThemeContext";

const ThemedButton = () => {

    const theme = useContext(ThemeContext);
    const style = {
        backgroundColor: theme === "dark" ? "#333" : "#eee",
        color: theme === "dark" ? "#eee" : "#333",
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px",

    }
    return <button style={style}>I am styled by theme!</button>;
}

export default ThemedButton;