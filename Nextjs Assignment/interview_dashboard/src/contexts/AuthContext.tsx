"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { AuthUser, UserRole } from "@/types";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: Omit<AuthUser, "role">, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const SESSION_KEY = "imd_session";

function getStoredSession(): AuthUser | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);

    if (!parsed.id || !parsed.token || !parsed.role) return null;

    return parsed;
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // ✅ NO useEffect, NO warning
  const [user, setUser] = useState<AuthUser | null>(() => {
    return getStoredSession();
  });

  const login = useCallback(
    (userData: Omit<AuthUser, "role">, role: UserRole) => {
      const fullUser: AuthUser = { ...userData, role };
      setUser(fullUser);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(fullUser));
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}