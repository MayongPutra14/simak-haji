import { Navigate, Outlet, useLocation } from 'react-router';

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();

  const userRaw = localStorage.getItem('user');
  const user = userRaw ? JSON.parse(userRaw) : null;
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const fallbackPath =
      user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard';
    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
