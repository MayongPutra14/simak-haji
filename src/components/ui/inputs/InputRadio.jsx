import React, { useState, useEffect } from 'react';

const InputRadio = React.forwardRef(
  (
    {
      label,
      description,
      required = false,
      options = [],
      hasOtherOption = false,
      error,
      name,
      onChange,
      onBlur,
      value: formValue = '',
      variant = 'outlined',
      withCard = false,
      direction = 'vertical',
      containerClassName = '',
      className = '',
      ...props
    },
    ref,
  ) => {
    const [isOtherSelected, setIsOtherSelected] = useState(false);
    const [otherText, setOthertext] = useState('');

    const errorMessage = typeof error === 'string' ? error : error?.message;

    // Handle synchronization state value from "yang lain" option.
    useEffect(() => {
      if (formValue !== undefined && formValue !== null && formValue !== '') {
        const standardValues = options.map((option) =>
          typeof option === 'string' ? option : option.value || option.label,
        );

        const isCustomValue = !standardValues.includes(formValue);

        if (isCustomValue && hasOtherOption) {
          setIsOtherSelected(true);
          setOthertext(formValue);
        } else {
          setIsOtherSelected(false);
          setOthertext('');
        }
      } else {
        setIsOtherSelected(false);
        setOthertext('');
      }
    }, [formValue, options, hasOtherOption]);

    // Handler when user choise standar option
    const handleOptionChange = (event) => {
      setIsOtherSelected(false);
      setOthertext('');
      if (onChange) onChange(event);
    };

    // Handler when user choise radio "Yang lain"
    const handleOtherRadioChange = () => {
      setIsOtherSelected(true);
      if (onChange) onChange({ target: { name: name, value: otherText } });
    };

    // Handler when user mengetik di input text "Yang lain"
    const handleOtherTextChange = (event) => {
      const textValue = event.target.value;
      setOthertext(textValue);
      setIsOtherSelected(true);

      if (onChange) onChange({ target: { name: name, value: textValue } });
    };

    // Handler untuk membersihkan pilihan
    const handleClearAnswer = () => {
      setIsOtherSelected(false);
      setOthertext('');
      if (onChange) {
        // Mengirimkan string kosong agar aman di React Hook Form & Zod
        onChange({ target: { name: name, value: '' } });
      }
    };

    // Container Wrapper Styles
    const wrapperStyles = withCard
      ? 'w-full bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-3'
      : 'w-full flex flex-col gap-1.5';

    // Layout Opsi (Vertikal / Horizontal)
    const listLayoutStyles =
      direction === 'horizontal'
        ? 'flex flex-wrap gap-4 items-center mt-1'
        : 'flex flex-col gap-2 mt-1';

    // Gaya untuk input teks "Yang Lain" menyesuaikan varian
    const otherInputVariantStyles = {
      outlined:
        'px-2 py-1 border rounded border-gray-300 focus:border-sea-green-600 focus:outline-none text-sm md:text-base',
      underlined:
        'border-b border-gray-300 focus:border-sea-green-600 focus:outline-none text-sm md:text-base py-0.5 bg-transparent',
    };

    // Pengecekan apakah radio memiliki nilai/pilihan terisi
    const hasValue =
      formValue !== undefined && formValue !== null && formValue !== '';

    return (
      <div className={`${wrapperStyles} ${containerClassName}`}>
        {/* HEADER QUESTION: LABEL + REQUIRED(*) */}
        {label && (
          <div className="flex items-center justify-between gap-2">
            <label className="text-sm font-semibold md:text-base text-slate-700">
              {label}
              {required && <span className="ml-1 text-red-500">*</span>}
            </label>

            {/* Fitur Clear Answer: Hanya muncul jika ada pilihan yang terpilih */}
            {hasValue && (
              <button
                type="button"
                onClick={handleClearAnswer}
                className="text-xs transition-colors text-slate-400 hover:text-red-500 hover:underline focus:outline-none"
              >
                Bersihkan pilihan
              </button>
            )}
          </div>
        )}

        {/* QUESTION DESCRIPTION */}
        {description && (
          <p className="-mt-1 text-xs md:text-sm text-slate-500">
            {description}
          </p>
        )}

        {/* RADIO LIST */}
        <div className={listLayoutStyles}>
          {options.map((option, index) => {
            const optLabel = typeof option === 'string' ? option : option.label;
            const optValue =
              typeof option === 'string'
                ? option
                : option.value || option.label;
            const isChecked = !isOtherSelected && formValue === optValue;

            return (
              <label
                key={index}
                className="flex items-center gap-2.5 p-1.5 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  ref={ref}
                  name={name}
                  type="radio"
                  value={optValue}
                  checked={isChecked}
                  onBlur={onBlur}
                  onChange={handleOptionChange}
                  className={`w-4 h-4 md:w-5 md:h-5 text-sea-green-600 accent-sea-green-600 border-gray-300 focus:ring-sea-green-600 cursor-pointer ${className}`}
                  {...props}
                />
                <span className="text-sm md:text-base text-slate-700">
                  {optLabel}
                </span>
              </label>
            );
          })}

          {/* OTHER OPTION */}
          {hasOtherOption && (
            <label className="flex items-center gap-2.5 p-1.5 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                ref={ref}
                name={name}
                type="radio"
                value={otherText}
                checked={isOtherSelected}
                onBlur={onBlur}
                onChange={handleOtherRadioChange}
                className={`w-4 h-4 md:w-5 md:h-5 text-sea-green-600 accent-sea-green-600 border-gray-300 focus:ring-sea-green-600 cursor-pointer ${className}`}
                {...props}
              />
              <span className="text-sm md:text-base text-slate-700 shrink-0">
                Yang lain:
              </span>
              <input
                type="text"
                value={otherText}
                onChange={handleOtherTextChange}
                onFocus={() => {
                  setIsOtherSelected(true);
                  if (onChange) {
                    onChange({ target: { name: name, value: otherText } });
                  }
                }}
                placeholder="Jawaban Anda"
                className={`w-full ${otherInputVariantStyles[variant]}`}
              />
            </label>
          )}
        </div>

        {/* ERROR MESSAGE */}
        {errorMessage && (
          <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  },
);

InputRadio.displayName = 'InputRadio';

export default InputRadio;
