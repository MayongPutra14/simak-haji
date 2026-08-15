import { NavLink } from 'react-router';
import { getNavItems } from '../../utils/navbar.js';

export default function  BottomNav({ role = 'user' }) {
  const navItems = getNavItems(role);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-sea-green-800 border-t border-sea-green-700/30 px-3 pb-safe pt-4 shadow-2xl"
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
  );
};

/**
 * COMPONENT NAVBAR STANDARD
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
 * COMPONENT MAIN NAVBAR SCNA QR
 */
function PrimaryNavItem({ item }) {
  const { path, label, IconOutline, IconFill } = item;

  return (
    <NavLink
      to={path}
      end
      className={`
        group relative flex flex-col items-center justify-center -top-5
        transition-transform duration-200 ease-in-out cursor-pointer active:scale-95
      `}
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


