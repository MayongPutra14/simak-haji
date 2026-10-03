import { Outlet } from 'react-router';
import Header from '../components/ui/global/Header';
import Navigation from '../components/ui/global/Navigation';

export default function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <Navigation role="admin" />

      <div className="flex flex-col flex-1 min-w-0 transition-all duration-300 md:pl-55">
        <Header />

        <main className="flex-1 w-full min-w-0 pt-0 pb-20 mx-auto bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
