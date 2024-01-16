import { useState } from "react";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import Dashboard from "./Dashboard.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home.jsx";
import PrivateWrapper from "./PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateWrapper />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/admin" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
