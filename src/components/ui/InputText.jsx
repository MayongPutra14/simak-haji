import React from 'react';

export const InputText = React.forwardRef(
  (
    {
      label,
      description,
      required = false,
      placeholder = 'Jawaban Anda',
      error,
      ...props
    },
    ref,
  ) => {
    // ERROR MESSAGE CHECKING
    const errorMessage = typeof error === 'string' ? error : error?.message;

    return (
      <div className="w-full bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-2">
        {/* HEADER QUESTION: LABEL + REQUIRED(*) */}
        {label && (
          <label className="text-sm md:text-base font-semibold text-slate-700 ">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {/* DESCRIPTION QUESTION */}
        {description && (
          <p className="text-xs md:text-sm text-slate-500 -mt-1">
            {' '}
            {description}
          </p>
        )}
        {/* INPUT TYPE TEXT */}
        <div className="mt-1">
          <input
            ref={ref}
            type="text"
            placeholder={placeholder}
            autoComplete="off"
            className={`w-full px-1 py-2 border-b-2 focus:bg-white focus:outline-none transition-colors duration-200 text-sm md:text-base ${
              errorMessage
                ? 'border-red-500 focus:border-red-600'
                : 'border-gray-300 focus:border-sea-green-600'
            }`}
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

InputText.displayName = 'InputText';
