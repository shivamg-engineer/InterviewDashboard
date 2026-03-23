import "./App.css";
import BadCounter from "./Components/BadCounter";
import Counter from "./Components/Counter";
import CounterReducer from "./Components/CounterReducer";
import Parent2 from "./Components/exercise10/Parent2";
import { Parent3 } from "./Components/exercise10/Parent3";
import Parent from "./Components/exercise6/Parent";
import DebouncedSearch from "./Components/exercise7/DebouncedSearch";
import ExpensiveCalculator from "./Components/exercise8/ExpensiveCalculator";
import UseReducerCount from "./Components/exercise9/UseReducerCounter";
import GoodCounter from "./Components/GoodCounter";
import { PriceCalculator } from "./Components/PriceCalculator";
import UsersList from "./Components/UsersList";

function App() {
  return (
    <>
      {/* first */}
      <Counter />
      <CounterReducer />
      {/* second */}
      <BadCounter />
      {/* third */}
      <GoodCounter />
      {/* fourth */}
      <PriceCalculator />
      {/* fifth */}
      <UsersList />
      {/* sixth */}
      <Parent />
      {/* seventh */}
      <DebouncedSearch />
      {/* 8th */}
      <ExpensiveCalculator />
      {/* 9th */}
      <UseReducerCount />
      {/* 10th  */}
      <Parent2 />
      parent 3
      <Parent3 />
    </>
  );
}

export default App;
