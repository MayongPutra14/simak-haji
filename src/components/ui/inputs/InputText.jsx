import React from 'react';

const InputText = React.forwardRef(
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
      ...props
    },
    ref,
  ) => {
    const errorMessage = typeof error === 'string' ? error : error?.message;

    // Base Style untuk Input
    const baseInputStyles =
      'w-full text-sm md:text-base focus:outline-none transition-colors duration-200';

    // Pilihan Variasi Input
    const variantStyles = {
      outlined: `px-3 py-2 border rounded-md ${
        errorMessage
          ? 'border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500'
          : 'border-gray-300 focus:border-sea-green-600 focus:ring-1 focus:ring-sea-green-600'
      }`,
      underlined: `px-1 py-2 border-b-2 focus:bg-white ${
        errorMessage
          ? 'border-red-500 focus:border-red-600'
          : 'border-gray-300 focus:border-sea-green-600'
      }`,
    };

    // Container Wrapper (Dengan atau Tanpa Card)
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
            placeholder={placeholder}
            autoComplete="off"
            readOnly={readOnly}
            className={`${baseInputStyles} ${variantStyles[variant]} ${className}`}
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

export default InputText;
