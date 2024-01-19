import { useState } from "react";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import Dashboard from "./Dashboard.jsx";
import AdminDash from "./AdminDash.jsx";
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
        <Route element={<PrivateWrapper />}>
          <Route path="/admin/dashboard" element={<AdminDash />} />
        </Route>
        <Route element={<PrivateWrapper />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
