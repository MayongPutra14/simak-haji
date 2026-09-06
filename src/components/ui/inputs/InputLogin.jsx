import React from 'react';

const InputLogin = React.forwardRef(
  ({ label, placeholder, error, type = 'text', leftIcon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="font-medium cursor-pointer text-slate-900">
            {label}
          </label>
        )}
        <div className="relative w-full">
          {/* ICON LEFT */}
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              {leftIcon}
            </div>
          )}

          {/* INPUT BOX */}
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            autoComplete="off"
            className={`w-full  py-2 border rounded-lg outline-none transition-colors duration-200 placeholder:text-slate-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${leftIcon ? 'pl-8' : 'pl-3'} ${error ? 'border-red-500 focus:border-red-600' : 'border-gray-500 focus:ring-2 focus:ring-sea-green-700'}`}
            {...props}
          />
        </div>
        {/* ERROR MESSAGE */}
        {error && <p className="text-xs font-medium text-red-500">{error}</p>}
      </div>
    );
  },
);

InputLogin.displayName = 'InputLogin';

export default InputLogin;
