import { Outlet } from 'react-router';
import Header from '../components/ui/Header';
import BottomNav from '../components/ui/BottomNavbar';

export default function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 pt-16 pb-20">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}
