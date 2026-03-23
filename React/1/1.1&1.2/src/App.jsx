import { useState } from 'react';
import './App.css'
import Welcome from './component/Welcome.jsx'
import Counter from './component/Counter.jsx';
import Element from './component/Element.js';
import UserProfile from './component/UserProfile.jsx';
import ParentComponent from './component/ParentComponent.jsx';
import LifecycleDemo from './component/LifecycleDemo.jsx';
import { Greeting, Greetings } from './component/Greeting.jsx';
import Card from "./component/Card.jsx";
import ThemeContext from './component/ThemeContext.jsx';
import ThemedButton from "./component/ThemeButton.jsx";


function App() {
  const [theme, setTheme] = useState("dark"); // or "light"

  return (

    <>
      <Greeting />
      <Greetings />
      <Welcome name="shivam" age="20"/>
      <Counter />
      <Element />
      {Element}
      exercise 2
      <UserProfile name="shivam" email="s@gmail.com" age="33" />

      <ParentComponent name="sandeep" />
       //exercise 4
      <LifecycleDemo />
      task 2
      <Welcome name="Alice" age={25} />
      This will cause a console warning (type mismatch):
      <Welcome name={123} />
      Task: Learn how to build reusable components using composition instead of inheritance.
      <Card>
        <h2>Title</h2>
        <p>Description goes here.</p>
      </Card>

    //exercise 6

      <div>
        <Card title="Profile">
          <p>Name: Alice Johnson</p>
          <p>Email: alice@example.com</p>
        </Card>

        <Card title="Settings">
          <button>Change Password</button>
          <button>Enable Notifications</button>
        </Card>

        <Card title="About">
          <p>This is a reusable card component using composition.</p>
        </Card>
      </div>
      
      <ThemeContext.Provider value={theme}>
        <div>
          <h1>Current Theme: {theme}</h1>
          <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            Toggle Theme
          </button>
          <ThemedButton />
        </div>

      </ThemeContext.Provider>
    </>
  )
}

export default App
