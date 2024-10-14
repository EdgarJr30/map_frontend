/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AppContextType {
  roleId: string | null;
  login: (token: string, role: string,) => void;
  logout: () => void;
  search: (value: string) => string;
  searchData: string;
  setSearchData: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [roleId, setRoleId] = useState<string | null>(localStorage.getItem("roleId"));
  const [searchData, setSearchData] = useState<string>("");
  const navigate = useNavigate();
  const login = (token: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("roleId", role);
    setRoleId(role);
    navigate("/home");
    window.location.reload()
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roleId");
    setRoleId(null);
    navigate("/login");
    window.location.reload()
  };

  const search = (frase: string) => {
    setSearchData(frase)
    return frase
  }

  return (
    <AppContext.Provider value={{ roleId, login, logout, search, searchData, setSearchData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

