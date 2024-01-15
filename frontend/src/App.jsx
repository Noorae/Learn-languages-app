import { useState } from "react";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import Dashboard from "./Dashboard.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
