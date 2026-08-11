import { Navigate, Outlet, useLocation } from 'react-router';

export const ProtectedRoute = ({ isAuthenticated }) => {
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return <Outlet />;
};
