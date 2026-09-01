import React from 'react';

const InputNumber = React.forwardRef(
  (
    {
      label,
      description,
      required = false,
      placeholder = 'Jawaban Anda',
      error,
      variant = 'outlined',
      withCard = false,
      readOnly = false,
      containerClassName = '',
      className = '',
      maxLength, // limit the max digits (e.g., 10 for porsi, 13 for phone)
      onChange,
      ...props
    },
    ref,
  ) => {
    const errorMessage = typeof error === 'string' ? error : error?.message;

    // BASE INPUT STYLES
    const baseInputStyles =
      'w-full text-sm md:text-base focus:outline-none transition-colors duration-200';

    // INPUT VARIANT OPTIONS
    const variantStyles = {
      outlined: `px-3 py-2 border rounded-md placeholder:text-slate-400 ${
        errorMessage
          ? 'border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500'
          : 'border-gray-300 focus:border-sea-green-600 focus:ring-1 focus:ring-sea-green-600'
      }`,
      underlined: `px-1 py-2 border-b-2 focus:bg-white placeholder:text-slate-400 ${
        errorMessage
          ? 'border-red-500 focus:border-red-600'
          : 'border-gray-300 focus:border-sea-green-600'
      }`,
    };

    const readOnlyStyles = readOnly
      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
      : '';

    const wrapperStyles = withCard
      ? 'w-full bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-2'
      : 'w-full flex flex-col gap-1.5';

    // HANDLER TO ALLOW ONLY 0-9 NUMERIC DIGITS
    const handleChange = (e) => {
      // remove all non-numeric characters
      const onlyNums = e.target.value.replace(/[^0-9]/g, '');

      // update event value synthetically
      e.target.value = onlyNums;

      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className={`${wrapperStyles} ${containerClassName}`}>
        {/* HEADER QUESTION: LABEL + REQUIRED(*) */}
        {label && (
          <label className="text-sm font-semibold md:text-base text-slate-700">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        {/* DESCRIPTION QUESTION */}
        {description && (
          <p className="-mt-1 text-xs md:text-sm text-slate-500">
            {description}
          </p>
        )}

        {/* INPUT FIELD */}
        <div className={withCard ? 'mt-1' : ''}>
          <input
            ref={ref}
            type="text"
            inputMode="numeric" // trigger numeric keypad on mobile devices
            pattern="[0-9]*" // ensure mobile keyboard compatibility for iOS/Android
            maxLength={maxLength}
            placeholder={placeholder}
            autoComplete="off"
            readOnly={readOnly}
            onChange={handleChange}
            className={`${baseInputStyles} ${variantStyles[variant]} ${readOnlyStyles} ${className}`}
            {...props}
          />
          {errorMessage && (
            <p className="mt-1.5 text-xs text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
    );
  },
);

InputNumber.displayName = 'InputNumber';

export default InputNumber;
