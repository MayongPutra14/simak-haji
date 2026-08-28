const ButtonsActionTable= ({
  icon: Icon,
  variant = 'default',
  onClick,
  className = '',
  title,
  ...props
}) => {
  const baseStyle =
    'p-1.5 rounded-md transition-colors duration-150 flex items-center justify-center disabled:opacity-50 cursor-pointer';

  const variants = {
    default: 'text-slate-400 hover:text-slate-700 hover:bg-slate-200',
    teal: 'text-slate-400 hover:text-teal-700 hover:bg-teal-100',
    rose: 'text-slate-400 hover:text-rose-600 hover:bg-rose-100',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`${baseStyle} ${variants[variant] || variants.default} ${className}`}
      {...props}
    >
      {Icon}
    </button>
  );
};

export default ButtonsActionTable;
