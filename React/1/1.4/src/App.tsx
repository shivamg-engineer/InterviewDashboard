import { Suspense, useState } from "react";
import "./App.css";
import ExpensiveCalc from "./Components/ExpensiveCalc";
import Parent from "./Components/Parent";
import ImmediateComponent from "./Components/LazyLoadingModule/ImmediateComponent";
import LazyComponent from "./Components/LazyLoadingModule/LazyComponent";
import SearchWithDebounce from "./Components/searchWithDebounce";
import ScrollWithThrottle from "./Components/ScrollWithThrottle";

function App() {
  const [showLazy, setShowLazy] = useState<boolean>(false);

  return (
    <>
      <Parent />
      <ExpensiveCalc />

      <div>
        <ImmediateComponent />

        <button onClick={() => setShowLazy(true)}>Load Lazy Component</button>

        {showLazy && (
          <Suspense fallback={<h3>Loading lazy component...</h3>}>
            <LazyComponent />
          </Suspense>
        )}
        <SearchWithDebounce />
        <ScrollWithThrottle />
      </div>
    </>
  );
}

export default App;
