"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  adminUser: AdminUser | null;
  token: string | null;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_TOKEN_KEY = "rapiddefend_admin_token_v1";
const ADMIN_USER_KEY = "rapiddefend_admin_user_v1";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_API_URL ||
  "http://localhost:5000/api";

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore session on initial load
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem(ADMIN_TOKEN_KEY);
      const savedUser = localStorage.getItem(ADMIN_USER_KEY);

      if (savedToken && savedUser) {
        setToken(savedToken);
        setAdminUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.warn("Failed to restore admin session:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (identifier: string, password: string): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    const cleanId = identifier.trim();

    try {
      // Strictly verify with Backend Auth API (which validates against backend .env variables)
      const res = await fetch(`${API_BASE_URL}/admin/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanId, id: cleanId, password }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.token) {
        const userObj: AdminUser = data.admin || {
          id: cleanId,
          email: cleanId.includes("@") ? cleanId : "admin@antivirus.com",
          name: "Master Administrator",
          role: "ADMIN",
        };

        localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
        localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(userObj));
        setToken(data.token);
        setAdminUser(userObj);
        setIsAuthenticated(true);
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, message: data.message || "Invalid Admin credentials configured in .env" };
      }
    } catch (err: any) {
      setIsLoading(false);
      return {
        success: false,
        message: "Could not connect to Backend API. Please ensure the backend server is running.",
      };
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      localStorage.removeItem(ADMIN_USER_KEY);
    } catch (e) {
      console.warn("Failed to clear admin session:", e);
    }
    setToken(null);
    setAdminUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        adminUser,
        token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
