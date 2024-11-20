import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

//MUI import
import TextField from "@mui/material/TextField";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </div>
    </>
  );
}

export default App;
