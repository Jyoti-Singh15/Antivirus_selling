"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (emailOrPhone: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, phone: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithOtp: (phoneOrEmail: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "rapiddefend_user_session_v1";

const DEMO_USER: User = {
  id: "user-demo-01",
  name: "Rahul Sharma",
  email: "rahul.sharma@gmail.com",
  phone: "+91 98765 43210",
  isPlusMember: true,
  createdAt: "2026-01-15"
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from local storage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Failed to restore auth session:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUserSession = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  const login = async (emailOrPhone: string, _password?: string) => {
    const trimmed = emailOrPhone.trim();
    if (!trimmed) {
      return { success: false, error: "Please enter your email or mobile number." };
    }

    // If demo or standard email
    let matchedUser: User;
    if (trimmed.toLowerCase().includes("rahul") || trimmed === "9876543210") {
      matchedUser = DEMO_USER;
    } else {
      const nameGuess = trimmed.includes("@") ? trimmed.split("@")[0] : "Verified User";
      const formattedName = nameGuess.charAt(0).toUpperCase() + nameGuess.slice(1);
      matchedUser = {
        id: `user-${Date.now()}`,
        name: formattedName,
        email: trimmed.includes("@") ? trimmed.toLowerCase() : `${trimmed}@gmail.com`,
        phone: trimmed.includes("@") ? "+91 98000 12345" : trimmed,
        isPlusMember: true,
        createdAt: new Date().toISOString()
      };
    }

    saveUserSession(matchedUser);
    return { success: true };
  };

  const signup = async (name: string, email: string, phone: string, _password?: string) => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      return { success: false, error: "Please fill in all mandatory fields." };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      isPlusMember: true,
      createdAt: new Date().toISOString()
    };

    saveUserSession(newUser);
    return { success: true };
  };

  const loginWithOtp = async (phoneOrEmail: string, otp: string) => {
    if (!otp || otp.trim().length !== 6) {
      return { success: false, error: "Please enter a valid 6-digit OTP code." };
    }
    return login(phoneOrEmail);
  };

  const logout = () => {
    saveUserSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        loginWithOtp,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
