import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AuthenticatedRoute = ({ children, negate = false }) => {
  const { isAuthenticated } = useAuth();

  if (negate && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!negate && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export { ProtectedRoute, AuthenticatedRoute };
