import { Link } from 'react-router';

export const Button = ({
  children,
  type = 'button',
  icon: Icon,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  isActive = false,
  className = '',
  onClick,
  to,
  ...props
}) => {
  // STYLE VARIANT
  const baseStyle =
    'rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary:
      'py-2.5 px-4 bg-sea-green-600 hover:bg-sea-green-700 text-white disabled:bg-gray-400',
    secondary:
      'py-2.5 px-4bg-slate-900 hover:bg-slate-800 text-white disabled:bg-gray-400',
    outline:
      'py-2.5 px-4 border border-sea-green-600 text-sea-green-600 hover:bg-sea-green-50 disabled:border-gray-300 disabled:text-gray-400',
    navigation: isActive
      ? 'bg-sea-green-700 text-white border border-sea-green-700'
      : 'border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed',
  };
  // CONTENT IN BUTTON/LINK
  const content = (
    <>
      {isLoading && (
        <svg
          className="w-5 h-5 text-current animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {Icon && Icon}
      {isLoading ? 'Memproses...' : children}
    </>
  );

  const combinedClasses = `${baseStyle} ${variants[variant]} ${className}`;

  // IF THERE IS PROP "to" RENDER BUTTON AS LINK
  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  // IF THER IS NOT PROP 'to' RENDER AS NORMAL BUTTON
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
};
