import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AnimatedBox from './Components/Exercise1/AnimatedBox'
import Button from './Components/Exercise2/Button'
import AnimatedList from './Components/Exercise3/AnimatedList'
import ReactSpring from './Components/Exercise4/ReactSpring'
import ButtonWihRippleEffect from './Components/Exercise5/ButtonWIthRippleEffect'
import Spinner from './Components/Exercise6/Spinner'
import AnimatedRoutes from './Components/Exercise7/AnimatePresence'
import DarkModeToggle from './Components/Exercise8/DarkModeToggle'
function App() {

  return (
    <>
      <div>
        <p>Exercise 1</p>
        <AnimatedBox />
      </div>

      <div>
        <p>Exercise 2</p>
        <Button />
      </div>

      <div>
        <p>Exercise 3</p>
        <AnimatedList />
      </div>

      <div>
        <p>Exercise 4</p>
        <ReactSpring />
      </div>

      <div>
        <p>Exercise 5</p>
        <ButtonWihRippleEffect />
      </div>

      <div>
        <p>Exercise 6</p>
        <Spinner />
      </div>
      <div>
        <p>Exercise 7</p>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </div>

      <div>
        <p>Exercise 8</p>
        <DarkModeToggle/>
      </div>
    </>
  )
}

export default App
