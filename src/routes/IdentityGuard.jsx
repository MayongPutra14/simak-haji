import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../features/auth/useAuth';

export const RequiredCompletedIdentity = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to={'/login'} replace />;

  const isProfileComplete =
    user.isCompleted === 0 || user.isCompleted === false;

  if (user.role === 'user' && isProfileComplete) {
    return <Navigate to={'/user/form'} replace />;
  }

  return <Outlet />;
};

export const RequiredInCompletedIdentity = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to={'/login'} replace />;

  const isProfileComplete = user.isCompleted === 1 || user.isCompleted === true;

  if (user.role === 'user' && isProfileComplete) {
    return <Navigate to={'/user/home'} replace />;
  }

  return <Outlet />;
};
