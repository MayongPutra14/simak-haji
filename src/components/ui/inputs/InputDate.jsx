import React from 'react';

const InputDate = React.forwardRef(
  (
    {
      label,
      description,
      required = false,
      error,
      variant = 'outlined',
      withCard = false,
      containerClassName = '',
      className = '',
      ...props
    },
    ref,
  ) => {
    // ERROR MESSAGE CHECKING
    const errorMessage = typeof error === 'string' ? error : error?.message;

    // BASE STYLES FOR INPUT DATE
    const baseInputStyles =
      'w-full text-sm md:text-base text-slate-700 cursor-pointer accent-sea-green-600 focus:outline-none transition-colors duration-200 scheme-light [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:hover:opacity-100';

    // VARIANT STYLES SELECTION
    const variantStyles = {
      outlined: `px-3 py-2.5 border rounded-md bg-white ${
        errorMessage
          ? 'border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500'
          : 'border-gray-300 focus:border-sea-green-600 focus:ring-1 focus:ring-sea-green-600'
      }`,
      underlined: `px-3 py-3 border-b-2 bg-transparent focus:bg-white rounded-t-md ${
        errorMessage
          ? 'border-red-500 focus:border-red-600'
          : 'border-gray-300 focus:border-sea-green-600'
      }`,
    };

    // CONTAINER WRAPPER STYLES (WITH OR WITHOUT CARD)
    const wrapperStyles = withCard
      ? 'w-full bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-2'
      : 'w-full flex flex-col gap-1.5';

    return (
      <div className={`${wrapperStyles} ${containerClassName}`}>
        {/* HEADER QUESTION: LABEL + REQUIRED(*) */}
        {label && (
          <label className="text-sm font-semibold md:text-base text-slate-700">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        {/* QUESTION DESCRIPTION */}
        {description && (
          <p className="-mt-1 text-xs md:text-sm text-slate-500">
            {description}
          </p>
        )}

        {/* INPUT DATE FIELD */}
        <div className={withCard ? 'mt-1 relative' : 'relative'}>
          <input
            ref={ref}
            type="date"
            className={`${baseInputStyles} ${variantStyles[variant]} ${className}`}
            {...props}
          />

          {/* ERROR MESSAGE VALIDATION */}
          {errorMessage && (
            <p className="mt-1.5 text-xs text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
    );
  },
);

InputDate.displayName = 'InputDate';

export default InputDate;
