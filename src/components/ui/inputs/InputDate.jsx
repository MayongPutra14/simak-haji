import React from 'react';

export const InputDate = React.forwardRef(
  ({ label, description, required = false, error, ...props }, ref) => {
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

        {/* QUESTION DESCRIPTION(OPTIONAL) */}
        {description && (
          <p className="text-xs md:text-sm text-gray-500 -mt-1">
            {description}
          </p>
        )}

        {/* INPUT DATE */}
        <div className="mt-1 relative">
          <input
            ref={ref}
            type="date"
            className={`w-full px-3 py-3 border-b-2 accent-sea-green-600 focus:bg-white focus:outline-none transition-colors duration-200 text-sm md:text-base text-slate-700 cursor-pointer rounded-t-md
            scheme-light
            [&::-webkit-calendar-picker-indicator]:cursor-pointer
            [&::-webkit-calendar-picker-indicator]:opacity-60 
            [&::-webkit-calendar-picker-indicator]:hover:opacity-100
            ${errorMessage ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-sea-green-600'}
            `}
            {...props}
          />

          {/* 4. Pesan Error Validasi */}
          {errorMessage && (
            <p className="mt-1.5 text-xs text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
    );
  },
);

InputDate.displayName = 'InputDate';
