import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../features/auth/useAuth';

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const { user } = useAuth();

  // Redirect unauthenticated users to landing page
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Normalize user role to lowercase string
  const currentRole = String(user.role || '')
    .toLowerCase()
    .trim();

  // Normalize allowedRoles array to lowercase
  const normalizedAllowedRoles = allowedRoles?.map((role) =>
    String(role).toLowerCase().trim(),
  );

  // Check if current role is authorized
  if (normalizedAllowedRoles && !normalizedAllowedRoles.includes(currentRole)) {
    if (currentRole === 'admin') {
      return <Navigate to="/admin/home" replace />;
    }
    if (currentRole === 'user') {
      return <Navigate to="/user/home" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
