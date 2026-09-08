import { Outlet } from 'react-router';
import Header from '../components/ui/global/Header';
import Navigation from '../components/ui/global/Navigation';

export default function UserLayout() {
  return (
    <article className="flex flex-col min-h-screen md:flex-row">
      <Navigation role="user" />

      <div className="flex flex-col flex-1 transition-all duration-300 md:pl-55">
        <Header />

        <div className="w-full flex-1 pt-0 pb-20  min-h-screen bg-sea-green-50">
          <Outlet />
        </div>
      </div>
    </article>
  );
}
