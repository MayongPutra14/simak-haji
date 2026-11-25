import { Outlet } from 'react-router';
import Header from '../components/ui/global/Header';
import Navigation from '../components/ui/global/Navigation';
import { useAuth } from '../features/auth/useAuth';

/**
 * Shared shell for admin and leader attendance pages.
 * Only admin/leader reach this layout (enforced by ProtectedRoute).
 */
export default function AttendanceLayout() {
  const { user } = useAuth();
  const role = String(user?.role ?? '').toLowerCase();
  const navigationRole = role === 'admin' ? 'admin' : 'leader';

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Navigation role={navigationRole} />

      <div className="flex min-w-0 flex-1 flex-col transition-all duration-300 md:pl-55">
        <Header />

        <main className="mx-auto w-full min-w-0 flex-1 bg-slate-50 pt-0 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
