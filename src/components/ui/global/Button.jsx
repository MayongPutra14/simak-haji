import { Link } from 'react-router';
import { IconLoading } from '../../../utils/helpers/decorations';

export default function Button({
  children,
  type = 'button',
  icon: Icon,
  fontColor = 'text-white',
  variant = 'primary',
  isLoading = false,
  disabled = false,
  isActive = false,
  className = '',
  onClick,
  to,
  ...props
}) {
  // STYLE VARIANT
  const baseStyle =
    'rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary: `py-2.5 px-4 bg-sea-green-600 hover:bg-sea-green-700 ${fontColor} disabled:bg-gray-400`,
    secondary:
      'py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white disabled:bg-gray-400',
    outline:
      'py-2.5 px-4 border border-sea-green-600 text-sea-green-600 hover:bg-sea-green-50 disabled:border-gray-300 disabled:text-gray-400',
    backButton: `fixed top-20 left-4 md:top-24 md:left-58 z-50 flex items-center gap-2 bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-100 shadow-md hover:shadow-lg rounded-full px-3 py-2 md:px-4 md:py-2.5 text-sm md:text-base font-medium border border-gray-200 cursor-pointer
        transition-all duration-300 ease-in-out`,
    navigation: isActive
      ? 'bg-sea-green-700 text-white border border-sea-green-700'
      : 'border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed',
  };
  // CONTENT IN BUTTON/LINK
  const content = (
    <>
      {isLoading && (
        <IconLoading className='w-5 h-5 text-current animate-spin"' />
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
}
