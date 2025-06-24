import React, { createContext, useEffect, useState, useContext } from "react";
import API from "../API";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // true enquanto carrega token e role

  const isAuthenticated = !!token && !!role;

  // Função para buscar role do usuário
  async function fetchUserRole(token) {
    try {
      const response = await API.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.role;
    } catch (error) {
      console.error("Erro ao buscar role do usuário:", error);
      return null;
    }
  }

  async function login({ email, password }) {
    try {
      const response = await API.post("/users/authenticate", {
        email,
        password,
      });
      if (response.status !== 200) return false;

      const token = response.data.token;
      const userRole = await fetchUserRole(token);

      if (!userRole) return false;

      setToken(token);
      setRole(userRole);
      localStorage.setItem("token", token);

      return true;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    }
  }

  function logout() {
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
  }

  useEffect(() => {
    async function loadStoredAuth() {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        const userRole = await fetchUserRole(storedToken);
        if (userRole) {
          setToken(storedToken);
          setRole(userRole);
        } else {
          localStorage.removeItem("token");
          setToken(null);
          setRole(null);
        }
      }
      setLoading(false);
    }
    loadStoredAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, role, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
