import { Navigate } from "react-router-dom";

/**
 * Route guard component
 * Checks for valid token and optionally restricts by role
 */
export default function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // No token → redirect to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Role mismatch → redirect to appropriate dashboard
  if (requiredRole && user.role !== requiredRole) {
    const redirectPath = user.role === "admin" ? "/admin" : "/dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}
