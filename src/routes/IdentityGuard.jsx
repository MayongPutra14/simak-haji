import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../features/auth/useAuth';

export const RequiredCompletedIdentity = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to={'/login'} replace />;

  const isProfileComplete =
    user.is_completed === 0 || user.is_completed === false;

  if (user.role === 'user' && isProfileComplete) {
    return <Navigate to={'/user/form'} replace />;
  }

  return <Outlet />;
};

export const RequiredInCompletedIdentity = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to={'/login'} replace />;

  const isProfileComplete =
    user.is_completed === 1 || user.is_completed === true;

  if (user.role === 'user' && isProfileComplete) {
    return <Navigate to={'/user/home'} replace />;
  }

  return <Outlet />;
};
