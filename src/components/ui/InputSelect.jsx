import React from 'react';

export const InputSelect = React.forwardRef(
  (
    {
      label,
      description,
      required = false,
      options = [],
      placeholder = 'Pilih salah satu...',
      error,
      ...props
    },
    ref,
  ) => {
    const errorMessage = typeof error === 'string' ? error : error?.message;

    return (
      <div className="w-full bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-2">
        {/* HEADER QUESTION: LABEL + REQUIRED(*) */}
        {label && (
          <label className="text-sm md:text-base font-semibold text-gray-800">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* DESCRIPTION QUESTION */}
        {description && (
          <p className="text-xs md:text-sm text-gray-500 -mt-1">
            {description}
          </p>
        )}

        {/* SELECT: DROPDOWN */}
        <div className="mt-1">
          <select
            ref={ref}
            className={`w-full px-3 py-2 border-b-2 bg-gray-50 focus:bg-white focus:outline-none transition-colors duration-200 text-sm md:text-base text-gray-700 cursor-pointer rounded-t-md ${
              errorMessage
                ? 'border-red-500 focus:border-red-600'
                : 'border-gray-300 focus:border-sea-green-600'
            }`}
            {...props}
          >
            {/* PLACE HOLDER / DEFAULT */}
            <option value="" disabled hidden>
              {placeholder}
            </option>

            {/* OPTION DYNAMIC */}
            {options.map((opt, idx) => (
              <option key={idx} value={opt.value ?? opt.label}>
                {opt.label}
              </option>
            ))}
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
