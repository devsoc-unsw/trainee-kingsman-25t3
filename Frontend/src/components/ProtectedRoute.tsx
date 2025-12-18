import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Check for userId in localStorage as a basic authentication indicator
  // The actual authentication is handled by HTTP-only cookies on the backend
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return <Navigate to="/auth/login" replace />;
  }

  // If the cookie is invalid/expired, the axios interceptor will catch 401 and redirect
  return <>{children}</>;
};

export default ProtectedRoute;
