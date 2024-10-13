import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  roleId: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [roleId, setRoleId] = useState<string | null>(localStorage.getItem("roleId"));

  const login = (token: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("roleId", role);
    setRoleId(role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roleId");
    setRoleId(null);
  };

  return (
    <AuthContext.Provider value={{ roleId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

