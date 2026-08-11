export const Button = ({
  children,
  type = 'button',
  icon: Icon,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  ...props
}) => {
  // STYLE VARIANT
  const baseStyle =
    'w-full py-2.5 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-sea-green-600 hover:bg-sea-green-700 text-white disabled:bg-gray-400',
    secondary:
      'bg-slate-900 hover:bg-slate-800 text-white disabled:bg-gray-400',
    outline:
      'border border-sea-green-600 text-sea-green-600 hover:bg-sea-green-50 disabled:border-gray-300 disabled:text-gray-400',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* SPINNER LOADING... */}
      {isLoading && (
        <svg
          className="animate-spin h-5 w-5 text-current"
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

      {/* TEXT CONTENT BUTTON */}
      {isLoading ? 'Memproses...' : children}
      {Icon && Icon}
    </button>
  );
};
