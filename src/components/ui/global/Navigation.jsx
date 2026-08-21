import { NavLink, useNavigate } from 'react-router';
import { IoLogOutOutline } from 'react-icons/io5';
import getNavItems from '../../../utils/navbar';
import SimakLogo from '../../../assets/images/simak-logo.webp';
export default function Navigation({ role = 'user' }) {
  const navItems = getNavItems(role);

  return (
    <>
      {/* DESKTOP SIDEBAR (md size ke atas) */}
      <aside
        className="fixed top-0 bottom-0 left-0 z-40 flex-col justify-between hidden w-64 min-h-screen p-4 border-r shadow-2xl md:flex bg-sea-green-950 border-sea-green-800/80"
        aria-label="Desktop Navigation"
      >
        <div>
          {/* BRAND & LOGO SIDEBAR */}
          <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-sea-green-800/60">
            <img
              src={SimakLogo}
              alt="SIMAK Logo"
              className="object-contain w-10 h-10 shrink-0"
            />
            <div>
              <h1 className="text-base font-bold leading-tight text-white">
                {role === 'admin' ? 'SIMAK Admin' : 'SIMAK Jamaah'}
              </h1>
            </div>
          </div>

          {/* LINKS SIDEBAR MENU */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <SidebarNavItem key={item.id} item={item} />
            ))}
          </nav>
        </div>

        {/* LOGOUT BUTTON (only appear in dekstop) */}
        <div className="pt-4 border-t border-sea-green-800/60">
          <LogoutNavItem />
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVBAR (Kurang dari md size) */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 px-2 border-t shadow-2xl md:hidden bg-sea-green-950/95 backdrop-blur-md border-sea-green-800/80 pb-safe"
        aria-label="Mobile Navigation"
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            if (item.isPrimary) {
              return <PrimaryNavItem key={item.id} item={item} />;
            }
            return <StandardNavItem key={item.id} item={item} />;
          })}
        </div>
      </nav>
    </>
  );
}

/**
 * SIDEBAR NAV ITEM (DESKTOP)
 */
function SidebarNavItem({ item }) {
  const { path, label, IconOutline, IconFill } = item;

  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) => `
        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-base
        ${
    isActive
      ? 'bg-linear-to-r from-sea-green-600 to-sea-green-400 text-white shadow-lg shadow-sea-green-950/50 scale-[1.02]'
      : 'text-sea-green-200/80 hover:text-white hover:bg-sea-green-900/60'
    }
      `}
    >
      {({ isActive }) => {
        const Icon = isActive ? IconFill : IconOutline;
        return (
          <>
            <Icon
              className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-sea-green-300'}`}
            />
            <span>{label}</span>
          </>
        );
      }}
    </NavLink>
  );
}

/**
 * LOGOUT NAV ITEM (DESKTOP ONLY)
 *
 */
function LogoutNavItem() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center w-full gap-3 px-4 py-3 text-sm text-left text-red-400 transition-all duration-200 cursor-pointer font-base rounded-xl hover:bg-red-500/10 hover:text-red-300 active:bg-linear-to-r active:from-red-600 active:to-red-500 active:text-white group"
    >
      <IoLogOutOutline className="w-5 h-5 text-red-400 transition-colors group-active:text-white" />
      <span>Keluar</span>
    </button>
  );
}

/**
 * STANDARD NAV ITEM (MOBILE)
 */
function StandardNavItem({ item }) {
  const { path, label, IconOutline, IconFill } = item;

  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) => `
        group relative flex flex-col items-center justify-center min-w-14 px-2 rounded-xl
        transition-all duration-200 ease-in-out select-none cursor-pointer
        ${isActive ? 'text-white' : 'text-sea-green-300 hover:text-sea-green-100'}
      `}
    >
      {({ isActive }) => {
        const Icon = isActive ? IconFill : IconOutline;
        return (
          <>
            <div
              className={`p-1.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-linear-to-r from-sea-green-600 to-sea-green-400 text-white shadow-md'
                  : ''
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span
              className={`text-[11px] tracking-tight mt-0.5 leading-tight ${
                isActive
                  ? 'font-medium text-white'
                  : 'font-base text-sea-green-300'
              }`}
            >
              {label}
            </span>
          </>
        );
      }}
    </NavLink>
  );
}

/**
 * PRIMARY SCAN QR NAV ITEM (MOBILE FLOATING)
 */
function PrimaryNavItem({ item }) {
  const { path, label, IconOutline, IconFill } = item;

  return (
    <NavLink
      to={path}
      end
      className="relative flex flex-col items-center justify-center transition-transform duration-200 ease-in-out cursor-pointer group -top-6 active:scale-95"
    >
      {({ isActive }) => {
        const Icon = isActive ? IconFill : IconOutline;
        return (
          <>
            <div
              className={`
                p-3.5 rounded-full shadow-xl border-4 border-sea-green-950
                transition-all duration-300 ease-out
                ${
          isActive
            ? 'bg-linear-to-tr from-sea-green-500 via-sea-green-400 to-sea-green-300 text-sea-green-950 scale-110 shadow-sea-green-500/40 ring-2 ring-sea-green-400'
            : 'bg-linear-to-tr from-sea-green-600 to-sea-green-500 text-white hover:scale-105'
          }
              `}
            >
              <Icon className="w-6 h-6 stroke-2" />
            </div>
            <span
              className={`
                text-[10px] font-semibold tracking-tight mt-0.5 leading-tight
                ${isActive ? 'text-sea-green-300 font-bold' : 'text-sea-green-200'}
              `}
            >
              {label}
            </span>
          </>
        );
      }}
    </NavLink>
  );
}
