"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Router from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken =
      typeof window !== "undefined" && localStorage.getItem("token");
    const storedEmail =
      typeof window !== "undefined" && localStorage.getItem("email");
    if (storedToken) {
      setToken(storedToken);
      setUserEmail(storedEmail);
    }
    setLoading(false);
  }, []);

  const login = (token, email) => {
    setToken(token);
    setUserEmail(email);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };

  const logout = () => {
    setToken(null);
    setUserEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    Router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ token, userEmail, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
