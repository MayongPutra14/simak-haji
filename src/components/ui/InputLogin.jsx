import React from 'react';

export const InputLogin = React.forwardRef(
  ({ label, placeholder, error, type = 'text', leftIcon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="font-medium text-slate-900 cursor-pointer">
            {label}
          </label>
        )}
        <div className="relative w-full">
          {/* ICON LEFT */}
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              {leftIcon}
            </div>
          )}

          {/* INPUT BOX */}
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={`w-full  py-2 border rounded-lg outline-none transition-colors duration-200 placeholder:text-slate-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${leftIcon ? 'pl-8' : 'pl-3'} ${error ? 'border-red-500 focus:border-red-600' : 'border-gray-500 focus:ring-2 focus:ring-sea-green-700'}`}
            {...props}
          />
        </div>
        {/* ERROR MESSAGE */}
        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
      </div>
    );
  },
);

InputLogin.displayName = 'InputLogin';
