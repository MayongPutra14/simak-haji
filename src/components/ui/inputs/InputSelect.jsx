import React from 'react';

const InputSelect = React.forwardRef(
  (
    {
      label,
      isLabelFade = false,
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

    // normal STYLE
    const normalSelectStyles =
      'w-full text-sm md:text-normal text-slate-700 cursor-pointer focus:outline-none transition-colors duration-200';

    // VARIANT INPUT
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
      editProfile: `w-full px-3 py-2  font-normal text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sea-green-500 focus:bg-white transition-all ${
        errorMessage
          ? 'border-red-500 focus:border-red-600'
          : 'border-gray-300 focus:border-sea-green-600'
      }`,
      // VARIANT BARU: STATUS
      status: `w-full px-2.5 py-1.5 text-xs placeholder:font-normal font-semibold text-slate-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
        errorMessage
          ? 'border-red-500 focus:border-red-600'
          : 'border-slate-300 focus:border-teal-500'
      }`,
    };

    // PENGATURAN LABEL
    // Jika varian 'status', otomatis gunakan label kecil/fade kecuali di-override
    const labelFade =
      isLabelFade || variant === 'status'
        ? 'text-xs font-semibold text-slate-400 flex items-center gap-1'
        : 'text-sm md:text-normal font-semibold text-slate-700';

    // CONTAINER WRAPPER
    // Menyesuaikan tampilan card jika varian 'status' digunakan bersama withCard
    let cardStyle = 'bg-white p-5 rounded-lg border border-gray-200 shadow-sm';
    if (variant === 'status') {
      cardStyle = 'p-3 rounded-2xl bg-slate-50 border border-slate-200/80';
    }

    const wrapperStyles = withCard
      ? `w-full ${cardStyle} flex flex-col gap-1`
      : 'w-full flex flex-col gap-1.5';

    return (
      <div className={`${wrapperStyles} ${containerClassName}`}>
        {/* HEADER QUESTION: LABEL + REQUIRED(*) */}
        {label && (
          <label className={labelFade}>
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

        {/* SELECT: DROPDOWN */}
        <div className={withCard && variant !== 'status' ? 'mt-1' : ''}>
          <select
            ref={ref}
            defaultValue=""
            className={`${normalSelectStyles} ${variantStyles[variant]} ${className}`}
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
