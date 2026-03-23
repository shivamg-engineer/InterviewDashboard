import { RecoilRoot } from "recoil";
import "./App.css";
import Counter from "./Components/Counter";
import UsernameForm from "./Components/UsernameForm";

import { UserProfile_Parent } from "./Components/UserProfile_Parent";
import ThemeProvider from "./Context/ThemeContext/ThemeProvider";
import ThemeToggle from "./Context/ThemeContext/ThemeToggle";
import { UserProvider } from "./Context/UserContext/UserProvider";
import UserProfile from "./Components/UserProfile";
// import Test from "./Components/Test";

function App() {
  return (
    <>
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>

      <UserProvider>
        <UserProfile_Parent />
      </UserProvider>

      <div>
        <h1>Zustand Counter</h1>
        <Counter />
      </div>

      <RecoilRoot>
        <div style={{ padding: "20px" }}>
          <h1>Recoil State Management</h1>
          <UserProfile />
          <UsernameForm />
        </div>
      </RecoilRoot>
    </>
  );
}

export default App;
