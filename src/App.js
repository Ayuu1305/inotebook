import "./App.css";
import React ,{useState}from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import About from "./components/About";
import Home from "./components/home";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [alert, setAlert] = useState(null);

  const showalert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  };
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
<div className="container">
          <Routes>
            {/* Your routes go here */}
            <Route exact path="/" element={<Home showalert={showalert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showalert={showalert} />} />
            <Route exact path="/signup" element={<Signup showalert={showalert} />} />
          </Routes>
          </div>
        </Router>

      </NoteState>
    </>
  );
}

export default App;
