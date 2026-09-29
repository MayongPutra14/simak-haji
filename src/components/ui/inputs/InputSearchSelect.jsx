import Select from 'react-select';

const InputSearchSelect = ({
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
  value,
  onChange,
  selectRef,
  ...props
}) => {
  const errorMessage = typeof error === 'string' ? error : error?.message;

  const labelFade =
    isLabelFade || variant === 'status'
      ? 'text-xs font-semibold text-slate-400 flex items-center gap-1'
      : 'text-sm md:text-normal font-semibold text-slate-700';

  let cardStyle = 'bg-white p-5 rounded-lg border border-gray-200 shadow-sm';
  if (variant === 'status') {
    cardStyle = 'p-3 rounded-2xl bg-slate-50 border border-slate-200/80';
  }

  const wrapperStyles = withCard
    ? `w-full ${cardStyle} flex flex-col gap-1`
    : 'w-full flex flex-col gap-1.5';

  const getControlStyles = (isFocused) => {
    const base =
      'w-full flex items-center justify-between cursor-pointer transition-colors duration-200';
    let style = '';

    switch (variant) {
    case 'outlined':
      style = `px-3 py-1.5 min-h-[42px] border rounded-md bg-white ${
        errorMessage
          ? 'border-red-500'
          : isFocused
            ? 'border-sea-green-600 ring-1 ring-sea-green-600'
            : 'border-gray-300'
      }`;
      break;
    case 'underlined':
      style = `px-3 py-1.5 min-h-[42px] border-b-2 rounded-t-md ${isFocused ? 'bg-white' : 'bg-gray-50'} ${
        errorMessage
          ? 'border-red-500'
          : isFocused
            ? 'border-sea-green-600'
            : 'border-gray-300'
      }`;
      break;
    case 'editProfile':
      style = `px-3 py-1.5 text-xs text-slate-700 rounded-xl border ${
        errorMessage
          ? 'border-red-500'
          : isFocused
            ? 'bg-white ring-2 ring-sea-green-500'
            : 'bg-slate-50 border-slate-200'
      }`;
      break;
    case 'status':
      style = `px-2.5 py-1 min-h-[34px] text-xs font-semibold text-slate-700 bg-white border rounded-lg ${
        errorMessage
          ? 'border-red-500'
          : isFocused
            ? 'ring-2 ring-teal-500'
            : 'border-slate-300'
      }`;
      break;
    default:
      break;
    }
    return `${base} ${style}`;
  };

  const selectedOption = options.find((opt) => opt.value === value) || null;

  return (
    <div className={`${wrapperStyles} ${containerClassName}`}>
      {label && (
        <label className={labelFade}>
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      {description && (
        <p className="-mt-1 text-xs md:text-sm text-slate-500">{description}</p>
      )}

      <div className={withCard && variant !== 'status' ? 'mt-1' : ''}>
        <Select
          ref={selectRef}
          unstyled={true}
          placeholder={placeholder}
          options={options}
          value={selectedOption}
          onChange={(selected) => {
            onChange(selected ? selected.value : '');
          }}
          isClearable={true}
          classNames={{
            control: (state) => getControlStyles(state.isFocused),
            placeholder: () => 'text-slate-400 font-normal',
            singleValue: () => 'text-slate-700',
            input: () => 'text-slate-700 m-0',
            menu: () =>
              'mt-1.5 bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden z-50',
            menuList: () => 'p-1.5 max-h-60 overflow-y-auto custom-scrollbar',
            option: (state) => `
              px-3 py-2 text-sm md:text-normal rounded-lg cursor-pointer transition-colors
              ${
    state.isSelected
      ? 'bg-sea-green-600 text-white font-medium'
      : state.isFocused
        ? 'bg-sea-green-50 text-slate-700'
        : 'text-slate-700 hover:bg-slate-50'
    }
            `,
            noOptionsMessage: () => 'text-slate-500 p-3 text-sm text-center',
            indicatorSeparator: () => null,
            dropdownIndicator: () =>
              ' text-sm cursor-pointer p-1',
            clearIndicator: () =>
              'text-gray-400 hover:text-red-500 cursor-pointer p-1',
          }}
          {...props}
        />
        {errorMessage && (
          <p className="mt-1.5 text-xs text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default InputSearchSelect;
