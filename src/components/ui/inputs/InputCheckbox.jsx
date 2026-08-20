import React, { useState, useEffect } from 'react';

export const InputCheckbox = React.forwardRef(
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
      value: formValues = [],
      ...props
    },
    ref,
  ) => {
    // STATE OTHER OPTION("yang lain")
    const [isOtherChecked, setIsOtherChecked] = useState(false);
    const [otherText, setOtherText] = useState('');

    // ERROR MESSAGE
    const errorMessage = typeof error === 'string' ? error : error?.message;

    // MAKE SURE formValue ALWAYS AN ARRAY
    const currentArray = Array.isArray(formValues) ? formValues : [];

    useEffect(() => {
      if (!hasOtherOption) {
        setIsOtherChecked(false);
        setOtherText('');
        return;
      }

      const values = Array.isArray(formValues) ? formValues : [];

      const standardValues = options.map((option) =>
        typeof option === 'string' ? option : option.value || option.label,
      );

      const customValue = values.find(
        (value) => !standardValues.includes(value),
      );

      if (customValue) {
        setIsOtherChecked(true);
        setOtherText(customValue);
      } else {
        setIsOtherChecked(false);
        setOtherText('');
      }
    }, [formValues, options, hasOtherOption]);

    // HANDLER CHECKBOX STANDAR
    const handleOptionChange = (event) => {
      const { value: optVal, checked } = event.target;
      let newValues = [...currentArray];

      if (checked) {
        if (!newValues.includes(optVal)) {
          newValues.push(optVal);
        }
      } else {
        newValues = newValues.filter((v) => v !== optVal);
      }

      if (onChange) {
        onChange({ target: { name, value: newValues } });
      }
    };

    // HANDLER WHEN OPTION is (yang lain) CHANGED
    const handleOtherToggle = (event) => {
      const checked = event.target.checked;
      setIsOtherChecked(checked);

      const newValues = currentArray.filter((v) =>
        options.some((opt) => {
          const optValue =
            typeof opt === 'string' ? opt : opt.value || opt.label;

          return optValue === v;
        }),
      );

      if (checked && otherText) {
        newValues.push(otherText);
      }

      if (onChange) {
        onChange({ target: { name, value: newValues } });
      }
    };

    // HANDLER WHEN USER IS TYPING ON OPTION "yang lain"
    const handleOtherTextChange = (event) => {
      const textValue = event.target.value;
      setOtherText(textValue);

      if (isOtherChecked) {
        // Hapus nilai custom lama, ganti dengan teks baru
        const standardValues = options.map((opt) => opt.value || opt.label);
        const filteredStandard = currentArray.filter((v) =>
          standardValues.includes(v),
        );

        const newValues = textValue
          ? [...filteredStandard, textValue]
          : filteredStandard;

        if (onChange) {
          onChange({ target: { name, value: newValues } });
        }
      }
    };

    return (
      <div className="w-full bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-3">
        {/* HEADER QUERTION: LABEL + REQUIRED(*) */}
        {label && (
          <label className="text-sm md:text-base font-semibold text-slate-800">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* DESCRIPTION OPTIONAL */}
        {description && (
          <p className="text-xs md:text-sm text-slate-500 -mt-1">
            {description}
          </p>
        )}

        {/* LIST OPTION CHECKBOX */}
        <div className="flex flex-col gap-2 mt-1">
          {options.map((option, index) => {
            const optValue = option.value || option.label;
            const isChecked = currentArray.includes(optValue);

            return (
              <label
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <input
                  ref={ref}
                  type="checkbox"
                  name={name}
                  value={optValue}
                  checked={isChecked}
                  onBlur={onBlur}
                  onChange={handleOptionChange}
                  className="w-4 h-4 md:w-5 md:h-5 text-sea-green-600 accent-sea-green-600 rounded border-slate-300 focus:ring-sea-green-500 cursor-pointer"
                  {...props}
                />
                <span className="text-sm md:text-base text-slate-700">
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>

        {/* OTHER OPTION(yang lain) */}
        {hasOtherOption && (
          <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              ref={ref}
              type="checkbox"
              name={name}
              checked={isOtherChecked}
              onBlur={onBlur}
              onChange={handleOtherToggle}
              className="w-4 h-4 md:w-5 md:h-5 text-sea-green-600 accent-sea-green-600 rounded border-slate-300 focus:ring-sea-green-600 cursor-pointer"
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
                if (!isOtherChecked) {
                  setIsOtherChecked(true);
                }
              }}
              placeholder="Jawaban Anda"
              className="w-full border-b border-slate-300 focus:border-sea-green-600 focus:outline-none text-sm md:text-base py-0.5 transition-colors"
            />
          </label>
        )}
        {/* ERROR MESSAGE */}
        {errorMessage && (
          <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  },
);

InputCheckbox.displayName = 'InputCheckbox';
