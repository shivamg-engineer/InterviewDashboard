import type { JSX } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  isAuthenticated: boolean;
  children: JSX.Element;
};

export default function ProtectedRoute({
  isAuthenticated,
  children,
}: ProtectedRouteProps) {
  // ❌ Not logged in → go home
  if (!isAuthenticated) {
    return <Navigate to="/" replace></Navigate>;
  }
  // ✅ Logged in → show protected page
  return children;
}
