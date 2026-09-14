import React, { useState, useRef, useEffect } from 'react';

import { IoTimeOutline as IconClock } from 'react-icons/io5';

const InputTime = React.forwardRef(
  (
    {
      label,
      isLabelFade = false,
      description,
      required = false,
      error,
      variant = 'outlined',
      withCard = false,
      containerClassName = '',
      className = '',
      value, // Nilai berformat "HH:MM" (contoh: "14:30")
      onChange, // Callback fungsi untuk mengirim nilai balik ke parent
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Memecah value menjadi jam dan menit default
    const [selectedHour, selectedMinute] = value ? value.split(':') : ['', ''];

    // ERROR MESSAGE CHECKING
    const errorMessage = typeof error === 'string' ? error : error?.message;

    // Menutup dropdown jika pengguna mengklik di luar komponen
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Generate pilihan Jam (00 - 23) dan Menit (00 - 59)
    const hours = Array.from({ length: 24 }, (_, i) =>
      String(i).padStart(2, '0'),
    );
    const minutes = Array.from({ length: 60 }, (_, i) =>
      String(i).padStart(2, '0'),
    );

    const handleSelect = (type, val) => {
      let newHour = selectedHour || '00';
      let newMinute = selectedMinute || '00';

      if (type === 'hour') newHour = val;
      if (type === 'minute') newMinute = val;

      if (onChange) {
        // Mengirimkan hasil waktu berformat 24 jam ke parent state
        onChange(`${newHour}:${newMinute}`);
      }
    };

    // STYLES FOR INPUT (Tailwind v4 friendly)
    const normalInputStyles =
      'w-full text-sm md:text-normal text-slate-700 cursor-pointer focus:outline-none transition-colors duration-200 text-left flex justify-between items-center';

    const variantStyles = {
      outlined: `px-3 py-2.5 border rounded-md bg-white ${
        errorMessage
          ? 'border-red-500 focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-500'
          : 'border-gray-300 focus-within:border-sea-green-600 focus-within:ring-1 focus-within:ring-sea-green-600'
      }`,
      underlined: `px-3 py-3 border-b-2 bg-transparent focus-within:bg-white rounded-t-md ${
        errorMessage
          ? 'border-red-500 focus-within:border-red-600'
          : 'border-gray-300 focus-within:border-sea-green-600'
      }`,
      editProfile: `w-full px-3 py-2 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-500 focus-within:bg-white transition-all ${
        errorMessage
          ? 'border-red-500 focus-within:border-red-600'
          : 'border-gray-300 focus-within:border-sea-green-600'
      }`,
    };

    const labelFade = isLabelFade
      ? 'text-xs font-semibold text-slate-400 flex items-center gap-1'
      : 'text-sm md:text-normal font-semibold text-slate-700';

    const wrapperStyles = withCard
      ? 'w-full bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-2'
      : 'w-full flex flex-col gap-1.5';

    return (
      <div
        ref={dropdownRef}
        className={`${wrapperStyles} ${containerClassName} relative`}
      >
        {/* LABEL + REQUIRED */}
        {label && (
          <label className={labelFade}>
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        {/* DESCRIPTION */}
        {description && (
          <p className="-mt-1 text-xs md:text-sm text-slate-500">
            {description}
          </p>
        )}

        {/* INPUT FIELD TRIGGER */}
        <div className={withCard ? 'mt-1 relative' : 'relative'}>
          <button
            type="button"
            ref={ref}
            onClick={() => setIsOpen(!isOpen)}
            className={`${normalInputStyles} ${variantStyles[variant]} ${className}`}
            {...props}
          >
            {/* Teks Jam yang tampil ramah lansia (contoh: "14 : 30 WIB" atau "Belum memilih jam") */}
            <span
              className={
                value ? 'text-slate-800 font-medium' : 'text-slate-400'
              }
            >
              {value ? `${selectedHour}:${selectedMinute} WIB` : '-- : --'}
            </span>

            <IconClock />
          </button>

          {/* DROPDOWN KUSTOM 24 JAM */}
          {isOpen && (
            <div className="absolute z-50 mt-2 left-0 w-64 bg-white rounded-lg shadow-xl border border-slate-200 p-3 flex gap-4 h-60">
              {/* Kolom Pilihan Jam */}
              <div className="flex-1 flex flex-col">
                <span className="text-center text-xs font-bold text-slate-400 mb-1">
                  Jam
                </span>
                <div className="overflow-y-auto flex-1 scrollbar-thin pr-1 flex flex-col gap-0.5">
                  {hours.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => handleSelect('hour', h)}
                      className={`py-1 text-sm rounded transition-colors ${
                        selectedHour === h
                          ? 'bg-sea-green-600 text-white font-bold'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              {/* Garis Pembatas Tengah */}
              <div className="w-px bg-slate-200 h-full"></div>

              {/* Kolom Pilihan Menit */}
              <div className="flex-1 flex flex-col">
                <span className="text-center text-xs font-bold text-slate-400 mb-1">
                  Menit
                </span>
                <div className="overflow-y-auto flex-1 scrollbar-thin pr-1 flex flex-col gap-0.5">
                  {minutes.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => handleSelect('minute', m)}
                      className={`py-1 text-sm rounded transition-colors ${
                        selectedMinute === m
                          ? 'bg-sea-green-600 text-white font-bold'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ERROR MESSAGE */}
          {errorMessage && (
            <p className="mt-1.5 text-xs text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
    );
  },
);

InputTime.displayName = 'InputTime';

export default InputTime;
