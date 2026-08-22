import { useNavigate } from 'react-router';
import getFeatureItems from '../../../utils/featureMenu';

export default function FeatureHubContainer({ role = 'user', onOpenMore }) {
  const navigate = useNavigate();
  const menuItems = getFeatureItems(role);

  const handleMenuClick = (item) => {
    if (item.isAction) {
      if (onOpenMore) onOpenMore();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className="w-[95%] md:w-[98%] mx-auto my-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 transition-colors">
      {/* GRID 4 COLOM FOR MOBILE */}
      <div className="grid grid-cols-4 gap-y-5 gap-x-2">
        {menuItems.map((item) => {
          const IconComponent = item.Icon;

          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item)}
              className="group flex flex-col items-center gap-1.5 focus:outline-none select-none cursor-pointer"
            >
              {/* ICON CONTAINER */}
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 group/icon hover:scale-105 active:scale-95 ${item.bgColor}`}
              >
                <IconComponent
                  width={24}
                  height={24}
                  stroke="currentColor"
                  className="transition-colors group-hover/icon:opacity-80"
                />
              </div>

              <span className="text-[11px] font-medium text-slate-700 text-center leading-tight line-clamp-1 transition-colors group-hover:text-emerald-600">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
