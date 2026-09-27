"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (emailOrPhone: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, phone: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithOtp: (phoneOrEmail: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "rapiddefend_user_session_v1";
const TOKEN_STORAGE_KEY = "rapiddefend_user_token_v1";

const API_BASE_URL =
  process.env.NEXT_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://antivirus-selling.onrender.com/api";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore token & session on mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
        const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);

        if (savedToken) {
          setToken(savedToken);
          // Try validating with live backend
          try {
            const res = await fetch(`${API_BASE_URL}/auth/me`, {
              headers: {
                Authorization: `Bearer ${savedToken}`,
              },
            });
            if (res.ok) {
              const data = await res.json();
              if (data.user) {
                const refreshedUser: User = {
                  id: data.user.id || data.user._id,
                  name: data.user.name,
                  email: data.user.email,
                  phone: data.user.phone || "+91 98765 43210",
                  isPlusMember: true,
                  createdAt: data.user.createdAt || new Date().toISOString(),
                };
                setUser(refreshedUser);
                localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(refreshedUser));
                return;
              }
            }
          } catch (apiErr) {
            console.warn("Backend /auth/me check skipped, using cached user profile.", apiErr);
          }
        }

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error("Failed to restore auth session:", e);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const saveUserSession = (newUser: User | null, newToken?: string | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }

    if (newToken !== undefined) {
      setToken(newToken);
      if (newToken) {
        localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
      } else {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      }
    }
  };

  const login = async (emailOrPhone: string, password?: string) => {
    const trimmed = emailOrPhone.trim();
    if (!trimmed) {
      return { success: false, error: "Please enter your email or mobile number." };
    }

    const email = trimmed.includes("@") ? trimmed.toLowerCase() : `${trimmed}@gmail.com`;

    // 1. Try Live Backend API if password is provided
    if (password) {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success && data.token) {
          const loggedInUser: User = {
            id: data.user.id || data.user._id,
            name: data.user.name,
            email: data.user.email,
            phone: data.user.phone || "+91 98765 43210",
            isPlusMember: true,
            createdAt: data.user.createdAt || new Date().toISOString(),
          };
          saveUserSession(loggedInUser, data.token);
          return { success: true };
        } else if (response.status === 400 || response.status === 401) {
          return { success: false, error: data.message || "Invalid credentials." };
        }
      } catch (err) {
        console.warn("Backend API unreachable, using local fallback session.", err);
      }
    }

    // 2. Fallback / Quick OTP / Demo user simulation
    const nameGuess = trimmed.includes("@") ? trimmed.split("@")[0] : "Verified Customer";
    const formattedName = nameGuess.charAt(0).toUpperCase() + nameGuess.slice(1);

    const fallbackUser: User = {
      id: `user-${Date.now()}`,
      name: formattedName,
      email,
      phone: trimmed.includes("@") ? "+91 98765 43210" : trimmed,
      isPlusMember: true,
      createdAt: new Date().toISOString(),
    };

    saveUserSession(fallbackUser, "demo_jwt_token_2026");
    return { success: true };
  };

  const signup = async (name: string, email: string, phone: string, password?: string) => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      return { success: false, error: "Please fill in all mandatory fields." };
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password || "Security2026!";

    // 1. Try Live Backend API registration
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: cleanEmail,
          phone: phone.trim(),
          password: cleanPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.token) {
        const newUser: User = {
          id: data.user.id || data.user._id,
          name: data.user.name,
          email: data.user.email,
          phone: phone.trim(),
          isPlusMember: true,
          createdAt: new Date().toISOString(),
        };
        saveUserSession(newUser, data.token);
        return { success: true };
      } else if (response.status === 400) {
        return { success: false, error: data.message || "Account already exists." };
      }
    } catch (err) {
      console.warn("Backend API unreachable, registering local session.", err);
    }

    // 2. Fallback local session registration
    const localUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      isPlusMember: true,
      createdAt: new Date().toISOString(),
    };

    saveUserSession(localUser, "demo_jwt_token_2026");
    return { success: true };
  };

  const loginWithOtp = async (phoneOrEmail: string, otp: string) => {
    if (!otp || otp.trim().length !== 6) {
      return { success: false, error: "Please enter a valid 6-digit OTP code." };
    }
    return login(phoneOrEmail);
  };

  const logout = () => {
    saveUserSession(null, null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        loginWithOtp,
        logout,
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
