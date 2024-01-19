import { createContext, useContext, useState } from "react";

/**
 * Context for managing authentication.
 * @type {React.Context}
 */
const AuthContext = createContext();

/**
 * AuthProvider is a context provider component that manages the authentication process.
 * It provides the authentication token, login, and logout functions to its children components.
 * @component
 * @param {Object} props - The properties of the AuthProvider component.
 * @param {React.ReactNode} props.children - The child components that need access to the authentication context.
 * @returns {React.ReactNode} The AuthProvider component.
 */
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  /**
   * Function to set the authentication token and save it to local storage.
   * @function
   * @param {string} newToken - The new authentication token.
   * @returns {void}
   */
  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  /**
   * Function to remove the authentication token and remove it from local storage.
   * @function
   * @returns {void}
   */
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to accessing the AuthContext values.
 * @function
 * @returns {Object} An object containing the authentication token, login, and logout functions.
 */
export const useAuth = () => {
  return useContext(AuthContext);
};
