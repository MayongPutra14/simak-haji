import React from 'react';

const InputSelect = React.forwardRef(
  (
    {
      label,
      description,
      required = false,
      options = [],
      placeholder = 'Pilih salah satu...',
      error,
      variant = 'outlined',
      withCard = false,
      containerClassName = '',
      className = '',
      ...props
    },
    ref,
  ) => {
    const errorMessage = typeof error === 'string' ? error : error?.message;

    // BASE STYLE
    const baseSelectStyles =
      'w-full text-sm md:text-base text-slate-700 cursor-pointer focus:outline-none transition-colors duration-200';

    // VARIANT
    const variantStyles = {
      outlined: `px-3 py-2 border rounded-md bg-white ${
        errorMessage
          ? 'border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500'
          : 'border-gray-300 focus:border-sea-green-600 focus:ring-1 focus:ring-sea-green-600'
      }`,
      underlined: `px-3 py-2 border-b-2 bg-gray-50 focus:bg-white rounded-t-md ${
        errorMessage
          ? 'border-red-500 focus:border-red-600'
          : 'border-gray-300 focus:border-sea-green-600'
      }`,
    };

    // Container Wrapper (with or without card)
    const wrapperStyles = withCard
      ? 'w-full bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-2'
      : 'w-full flex flex-col gap-1.5';

    return (
      <div className={`${wrapperStyles} ${containerClassName}`}>
        {/* HEADER QUESTION: LABEL + REQUIRED(*) */}
        {label && (
          <label className="text-sm md:text-base font-semibold text-slate-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* DESCRIPTION QUESTION */}
        {description && (
          <p className="text-xs md:text-sm text-slate-500 -mt-1">
            {description}
          </p>
        )}

        {/* SELECT: DROPDOWN */}
        <div className={withCard ? 'mt-1' : ''}>
          <select
            ref={ref}
            defaultValue=""
            className={`${baseSelectStyles} ${variantStyles[variant]} ${className}`}
            {...props}
          >
            {/* PLACEHOLDER / DEFAULT OPTION */}
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}

            {/* OPTION DYNAMIC */}
            {options.map((opt, idx) => {
              const labelText = typeof opt === 'string' ? opt : opt.label;
              const valueText =
                typeof opt === 'string' ? opt : (opt.value ?? opt.label);

              return (
                <option key={idx} value={valueText}>
                  {labelText}
                </option>
              );
            })}
          </select>

          {/* ERROR MESSAGE VALIDATION */}
          {errorMessage && (
            <p className="mt-1.5 text-xs text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
    );
  },
);

InputSelect.displayName = 'InputSelect';

export default InputSelect;
