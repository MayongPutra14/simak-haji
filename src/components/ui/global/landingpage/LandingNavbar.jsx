import { NavLink } from 'react-router';
import { SECTIONS_LANDING_PAGE } from '../../../../utils/helpers/constant';

export function LandingPageNav() {
  return (
    <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md pt-2 pb-3 mb-6 border-b border-gray-100 transition-all">
      <nav
        className="flex space-x-2 overflow-x-auto scrollbar-none py-1 px-1 -mx-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {SECTIONS_LANDING_PAGE.map((section) => (
          <NavLink
            key={section.key}
            to={`/admin/landing-page/edit/${section.key}`}
            className={({ isActive }) =>
              `px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200 shrink-0 ${
                isActive
                  ? 'bg-sea-green-50 text-sea-green-700 shadow-sm border border-sea-green-200 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent'
              }`
            }
          >
            {section.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
