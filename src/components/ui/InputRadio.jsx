import React, { useState } from 'react';

export const InputRadio = React.forwardRef(
  (
    {
      label,
      description,
      required = false,
      options = [],
      hasOtherOption,
      error,
      name,
      onChange,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [isOtherSelected, setIsOtherSelected] = useState(false);
    const [otherText, setOthertext] = useState('');

    const errorMessage = typeof error === 'string' ? error : error?.message;

    // handler when user choose regular option
    const handleOptionChange = (event) => {
      setIsOtherSelected(false);
      if (onChange) onChange(event);
    };

    // function to handle person choose "yang lain" opstion
    const handleOtherRadioChange = (event) => {
      setIsOtherSelected(true);
      const customEvent = {
        ...event,
        target: {
          ...event.target,
          name: name,
          value: otherText,
        },
      };
      if (onChange) onChange(customEvent);
    };

    // hadnler when user is typing on "Yang lain"
    const handleOtherTextChange = (event) => {
      const textValue = event.target.value;
      setOthertext(textValue);

      const customEvent = {
        target: {
          name: name,
          value: textValue,
        },
      };
      if (onChange) onChange(customEvent);
    };

    return (
      <div className="w-full bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-3">
        {/* HEADER QUESTION: LABEL + REQUIRED(*) */}
        {label && (
          <label className="text-sm md:text-base font-semibold text-gray-800">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* QUESTION DESCTIPTION */}
        {/* 2. Deskripsi Pertanyaan */}
        {description && (
          <p className="text-xs md:text-sm text-gray-500 -mt-1">
            {description}
          </p>
        )}

        {/* RADIO LIST  */}
        <div className="flex flex-col gap-2 mt-1">
          {options.map((option, index) => (
            <label
              key={index}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <input
                ref={ref}
                name={name}
                type="radio"
                value={option.value || option.label}
                onBlur={onBlur}
                onChange={handleOptionChange}
                className="w-4 h-4 md:w-5 text-sea-green-600 accent-sea-green-600 border-gray-300 focus:ring-sea-green-600 cursor-pointer"
                {...props}
              />
              <span className="text-sm md:text-base text-gray-700">
                {option.label}
              </span>
            </label>
          ))}

          {/* OTHER OPTION */}
          {hasOtherOption && (
            <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ">
              <input
                ref={ref}
                type="radio"
                name={name}
                value={otherText}
                checked={isOtherSelected}
                onBlur={onBlur}
                onChange={handleOtherRadioChange}
                className="w-4 h-4 md:w-5 md:h-5 text-sea-green-600 accent-sea-green-600 border-gray-300 focus:ring-sea-green-600 cursor-pointer"
                {...props}
              />
              <span className="text-sm md:text-base text-gray-700 shrink-0">
                Yang lain:
              </span>
              <input
                type="text"
                value={otherText}
                onChange={handleOtherTextChange}
                onFocus={() => setIsOtherSelected(true)}
                placeholder="Jawaban Anda"
                className="w-full border-b border-gray-300 focus:border-sea-green-600 focus:outline-none text-sm md:text-base py-0.5 transition-colors bg-transparent"
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
