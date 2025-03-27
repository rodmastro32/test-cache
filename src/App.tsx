import { useState } from "react";
import "./styles/test.css";
import { addTestElement } from "./utils/test.ts";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React + TS</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={addTestElement}>Add Test Element</button>
      </div>
    </>
  );
}

export default App;
