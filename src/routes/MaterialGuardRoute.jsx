import { Navigate, Outlet } from 'react-router';
import { useMaterialAccess } from '../hooks/global/useMaterialAccess';
import { useAuth } from '../features/auth/useAuth';

// FALLBACK SKELETON COMPONENT
const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-50">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 rounded-full animate-spin border-sea-green-600 border-t-transparent" />
      <p className="text-sm font-medium text-slate-600">
        Memeriksa hak akses materi...
      </p>
    </div>
  </div>
);

/**
 * route guard component to protect event material pages
 * @param {object} props - component props containing fetchEventDetailApi
 */
export const MaterialGuardRoute = () => {
  const { user } = useAuth();
  const { isLoading, isAllowed, errorMessage } = useMaterialAccess(user?.id);

  // SHOW LOADING SCREEN WHILE VALIDATING
  if (isLoading) {
    return <LoadingScreen />;
  }

  // REDIRECT TO DASHBOARD IF ACCESS IS DENIED
  if (!isAllowed) {
    // log access violation attempt silently
    console.warn('Access denied to material page:', errorMessage);
    return <Navigate to="/user/home" replace />;
  }

  // RENDER PROTECTED CHILD ROUTES
  return <Outlet />;
};
