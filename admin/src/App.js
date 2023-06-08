import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Forms/Login";
import { Notice } from "./pages/Forms/Notice";
import { RegisterStudent } from "./pages/Forms/Register";
import { Home } from "./pages/Home/Home";
import { Resource } from "./pages/Forms/Resource";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterStudent />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/resource" element={<Resource />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
