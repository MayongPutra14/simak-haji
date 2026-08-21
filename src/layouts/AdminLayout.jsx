import { Outlet } from 'react-router';
import Header from '../components/ui/global/Header';
import Navigation from '../components/ui/global/Navigation';

export default function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 md:flex-row">
      <Navigation role="admin" />

      <div className="flex flex-col flex-1 transition-all duration-300 md:pl-64">
        <Header />

        <main className="container flex-1 pt-0 pb-20 mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
