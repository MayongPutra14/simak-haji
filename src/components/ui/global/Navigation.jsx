import { NavLink } from 'react-router';
import getNavItems from '../../../utils/navbar';

export default function Navigation({ role = 'user' }) {
  const navItems = getNavItems(role);

  return (
    <>
      {/* DESKTOP SIDEBAR APPEAR INI md size */}
      <aside
        className="fixed top-0 bottom-0 left-0 z-40 flex-col hidden w-64 min-h-screen p-4 border-r md:flex bg-sea-green-800 border-sea-green-700/90"
        aria-label="Desktop Navigation"
      >
        {/* BRAND AND LOGO SIDEBAR */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-sea-green-700/40">
          <span className="text-lg font-bold text-white">SIMAK Dashboard</span>
        </div>

        {/* LINKS SIDEBAR MENU */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <SidebarNavItem key={item.id} item={item} />
          ))}
        </nav>
      </aside>

      {/* MOBILE BOTTOM NAVBAR LESS THAN md size */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 px-3 pt-4 border-t shadow-2xl md:hidden bg-sea-green-800 border-sea-green-700/30 pb-safe"
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
 * SIDEBAR COMPONENT NAV ITEM (DESKTOP)
 */
function SidebarNavItem({ item }) {
  const { path, label, IconOutline, IconFill } = item;

  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) => `
        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium
        ${
          isActive
            ? 'text-white bg-sea-green-700 shadow-sm'
            : 'text-white/70 hover:text-white hover:bg-sea-green-700/40'
        }
      `}
    >
      {({ isActive }) => {
        const Icon = isActive ? IconFill : IconOutline;
        return (
          <>
            <Icon className="w-5 h-5 shrink-0" />
            <span>{label}</span>
          </>
        );
      }}
    </NavLink>
  );
}

/**
 * STANDARD NAVBAR COMPONENT (MOBILE)
 */
function StandardNavItem({ item }) {
  const { path, label, IconOutline, IconFill } = item;

  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) => `
        group relative flex flex-col items-center justify-center min-w-16 py-2 px-2 rounded-xl
        transition-all duration-200 ease-in-out select-none cursor-pointer
        ${
          isActive
            ? 'text-white bg-sea-green-700 scale-105 shadow-sm'
            : 'text-white/70 hover:text-white hover:bg-sea-green-700/40 active:scale-95'
        }
      `}
    >
      {({ isActive }) => {
        const Icon = isActive ? IconFill : IconOutline;
        return (
          <>
            <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
            <span className="text-[12px] font-medium tracking-tight mt-1 leading-tight">
              {label}
            </span>
          </>
        );
      }}
    </NavLink>
  );
}

/**
 * COMPONENT MAIN NAVBAR SCAN QR (MOBILE)
 */
function PrimaryNavItem({ item }) {
  const { path, label, IconOutline, IconFill } = item;

  return (
    <NavLink
      to={path}
      end
      className="relative flex flex-col items-center justify-center transition-transform duration-200 ease-in-out cursor-pointer group -top-5 active:scale-95"
    >
      {({ isActive }) => {
        const Icon = isActive ? IconFill : IconOutline;
        return (
          <>
            <div
              className={`
                p-3.5 rounded-full shadow-lg border-4 border-sea-green-800
                transition-all duration-300 ease-out
                ${
                  isActive
                    ? 'bg-sea-green-700 text-white scale-110 ring-2 ring-white/30'
                    : 'bg-sea-green-700 text-white/90 hover:text-white hover:bg-sea-green-700/80 hover:scale-105'
                }
              `}
            >
              <Icon className="w-6 h-6 transition-transform duration-200 group-hover:rotate-6" />
            </div>
            <span
              className={`
                text-[10px] font-semibold tracking-tight mt-1 leading-tight
                ${isActive ? 'text-white' : 'text-white/80 group-hover:text-white'}
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
