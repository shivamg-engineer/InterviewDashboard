import React, { createContext, useContext, useState, useCallback } from 'react';
import type { AuthUser, UserRole } from '@/types';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: Omit<AuthUser, 'role'>, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const SESSION_KEY = 'imd_session';

function getStoredSession(): AuthUser | null {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    // Basic validation
    if (!parsed.id || !parsed.token || !parsed.role) return null;
    return parsed;
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredSession());

  const login = useCallback((userData: Omit<AuthUser, 'role'>, role: UserRole) => {
    const fullUser: AuthUser = { ...userData, role };
    setUser(fullUser);
    // Store non-sensitive session data (no password stored)
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(fullUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
  }, []);

  // Clear session on tab close handled by sessionStorage naturally

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
