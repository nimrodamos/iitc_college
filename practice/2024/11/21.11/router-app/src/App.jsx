import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

//Pages imports
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Articles from "./Pages/Articles/Articles";

//components imports
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/articles" element={<Articles />}>
            <Route path="news" element={<h2>this is news section</h2>} />
            <Route
              path="politics"
              element={<h2>this is politics section</h2>}
            />
            <Route path="tech" element={<h2>this is tech section</h2>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
