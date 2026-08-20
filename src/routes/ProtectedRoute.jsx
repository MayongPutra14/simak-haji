import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../features/auth/useAuth';
const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const fallbackPath =
      user.role === 'admin' ? '/admin-dashboard' : '/user/home';
    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
