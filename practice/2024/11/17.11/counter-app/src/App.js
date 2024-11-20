import "./App.css";
import { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const increaseCount = () => {
    setCounter(counter + 1);
  };

  const reduceCount = () => {
    setCounter(counter - 1);
  };

  return (
    <div className="App">
      <h1>counter app</h1>
      <div className="counter-container">
        <button onClick={reduceCount}>-</button>
        <p>{counter}</p>
        <button onClick={increaseCount}>+</button>
      </div>
    </div>
  );
}

export default App;
