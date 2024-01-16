import { Navigate, Outlet } from "react-router-dom";

const PrivateWrapper = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateWrapper;
