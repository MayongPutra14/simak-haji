import React from 'react';

const InputText = React.forwardRef(
  (
    {
      label,
      isLabelGreen = false,
      isLabelFade = false,
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

    // normal Style untuk Input
    const normalInputStyles =
      'w-full text-sm md:text-normal focus:outline-none transition-colors duration-200';

    // Pilihan Variasi Input
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
      green: `w-full mt-1 px-3 py-1.5 text-sm placeholder:text-teal-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 ${errorMessage ? 'border-red-500 focus:border-red-600' : 'bg-teal-950/80 border border-teal-600/40 '}`,
      editProfile: `w-full px-3 py-2 text-sm text-slate-700  placeholder:font-medium placeholder:text-slate-700/30 placeholder:text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sea-green-500 focus:bg-white transition-all ${
        errorMessage
          ? 'border-red-500 focus:border-red-600'
          : 'border-gray-300 focus:border-sea-green-600'
      }`,
    };

    // Variant label green, default adn fade
    const labelSytle = isLabelGreen
      ? 'text-xs text-teal-200 font-medium'
      : isLabelFade
        ? 'text-xs font-semibold text-slate-400 flex items-center gap-1'
        : 'text-sm font-semibold md:text-normal text-slate-700';

    // Container Wrapper (Dengan atau Tanpa Card)
    const wrapperStyles = withCard
      ? 'w-full bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-2'
      : 'w-full flex flex-col gap-1.5';

    return (
      <div className={`${wrapperStyles} ${containerClassName}`}>
        {/* HEADER QUESTION: LABEL + REQUIRED(*) */}
        {label && (
          <label className={labelSytle}>
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
            className={`${normalInputStyles} ${variantStyles[variant]} ${className}`}
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
