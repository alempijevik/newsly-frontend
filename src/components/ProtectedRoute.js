import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

const AuthenticatedRoute = ({ children, negate = false }) => {
  const { isAuthenticated } = useAuth();

  // If negate is true, only allow non-authenticated users to access this route
  if (negate && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If negate is false (or not provided), only allow authenticated users to access this route
  if (!negate && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export { ProtectedRoute, AuthenticatedRoute };
