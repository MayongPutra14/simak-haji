import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../features/auth/useAuth';

export default function PublicRoute() {
  const { user } = useAuth();

  if (user) {
    const currentRole = String(user.role || '')
      .toLowerCase()
      .trim();
    if (currentRole === 'admin') {
      return <Navigate to="/admin/home" replace />;
    }

    if (currentRole === 'user') {
      return <Navigate to="/user/home" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
