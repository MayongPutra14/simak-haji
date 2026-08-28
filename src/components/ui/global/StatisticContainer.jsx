export const StatisticContainer = ({
  label,
  value,
  icon: Icon,
  size = 'md',
  bgClass = 'bg-white',
  shadowColorClass = 'hover:shadow-slate-200',
  textColorClass = 'text-slate-900',
  labelColorClass = 'text-slate-500',
  iconColorClass = 'text-slate-700',
  iconBgClass = 'bg-slate-100',
  className = '',
}) => {
  const sizeStyles = {
    sm: {
      padding: 'p-3',
      label: 'text-[10px]',
      value: 'text-lg',
      iconContainer: 'p-1.5',
      iconSize: 'w-4 h-4',
    },
    md: {
      padding: 'p-4',
      label: 'text-xs',
      value: 'text-2xl',
      iconContainer: 'p-2',
      iconSize: 'w-5 h-5',
    },
    lg: {
      padding: 'p-6',
      label: 'text-sm',
      value: 'text-3xl',
      iconContainer: 'p-2.5',
      iconSize: 'w-6 h-6',
    },
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;

  return (
    <div
      className={`
        rounded-xl border border-slate-200/80 space-y-2
        transition-all duration-300 ease-in-out
        shadow-xs hover:shadow-xl
        ${currentSize.padding}
        ${bgClass}
        ${shadowColorClass}
        ${className}
      `}
    >
      {/* HEADER: LABEL & ICON */}
      <div className="flex items-center justify-between gap-2">
        <span
          className={`font-semibold uppercase ${labelColorClass} ${currentSize.label}`}
        >
          {label}
        </span>

        {Icon && (
          <div
            className={`rounded-lg flex items-center justify-center shrink-0 ${currentSize.iconContainer} ${iconBgClass}`}
          >
            {typeof Icon === 'function' || typeof Icon === 'object' ? (
              <Icon className={`${iconColorClass} ${currentSize.iconSize}`} />
            ) : (
              Icon
            )}
          </div>
        )}
      </div>

      {/* VALUE */}
      <p
        className={`font-semibold tracking-tight ${textColorClass} ${currentSize.value}`}
      >
        {value}
      </p>
    </div>
  );
};

export default StatisticContainer;
