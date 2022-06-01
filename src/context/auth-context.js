import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const localStorageUser = localStorage.getItem("user") || null;

  const [user, setUser] = useState(localStorageUser);
  const [authLoading, setAuthLoading] = useState(false);
  return (
    <AuthContext.Provider
      value={{ user, setUser, authLoading, setAuthLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
