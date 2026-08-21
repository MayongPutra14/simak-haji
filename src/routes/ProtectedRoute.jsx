import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../features/auth/useAuth';

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const currentRole = String(user.role || '')
    .toLowerCase()
    .trim();

  if (allowedRoles && !allowedRoles.includes(currentRole)) {
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
