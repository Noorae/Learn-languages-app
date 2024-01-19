import { Navigate, Outlet } from "react-router-dom";

/**
 * PrivateWrapper wraps private routes. It checks if the user is authenticated
 * based on if token can be found in local storage.
 * If authenticated, it renders the child routes and if not, it redirects the user to the signin page.
 * @component
 * @returns {React.ReactNode} The PrivateWrapper component.
 */
const PrivateWrapper = () => {
  /**
   * Checks if the user is authenticated.
   * @type {boolean}
   */
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateWrapper;
