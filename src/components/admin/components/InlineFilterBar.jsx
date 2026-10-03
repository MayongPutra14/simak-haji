import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MdOutlineArrowDropDown as IconFilter } from 'react-icons/md';

function CustomSelect({ filter }) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const isActive = filter.value && !String(filter.value).startsWith('Semua');

  // Cari label aktif saat ini
  const currentOption = filter.options.find((opt) => {
    const val = typeof opt === 'object' ? opt.value : opt;
    return String(val) === String(filter.value);
  });
  const currentLabel =
    typeof currentOption === 'object'
      ? currentOption.label
      : currentOption || filter.value;

  //count button position if screen clicked
  const updateCoords = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 6,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      updateCoords();
    }
    setIsOpen((prev) => !prev);
  };

  // Close dropdown if filter meu clicked
  const handleSelectOption = (val) => {
    filter.onChange(val);
    setIsOpen(false);
  };

  // Menutup dropdown if user click outside button menu
  useEffect(() => {
    function handleClickOutside(event) {
      const clickedOnButton =
        buttonRef.current && buttonRef.current.contains(event.target);
      const clickedOnMenu =
        menuRef.current && menuRef.current.contains(event.target);

      // if click is not in button and portal menu
      if (!clickedOnButton && !clickedOnMenu) {
        setIsOpen(false);
      }
    }

    function handleScroll(e) {
      // Abaikan jika scroll terjadi DI DALAM menu dropdown itu sendiri
      if (menuRef.current && menuRef.current.contains(e.target)) return;
      if (isOpen) setIsOpen(false);
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen]);

  return (
    <div className="min-w-36 shrink-0">
      {/* main button filter */}
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        className={`w-full py-2 pl-3 pr-8 text-xs font-semibold border rounded-xl cursor-pointer text-left transition-all duration-200 flex items-center justify-between relative shadow-sm ${
          isOpen
            ? 'bg-white border-emerald-500 ring-2 ring-emerald-500/20'
            : isActive
              ? 'bg-emerald-50 border-emerald-400 text-emerald-800 ring-1 ring-emerald-400'
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
        }`}
      >
        <span className="truncate">{currentLabel}</span>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400">
          <IconFilter
            className={`w-5 h-5 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-emerald-600' : ''
            }`}
          />
        </div>
      </button>

      {/* Ffloat dropdon menu */}
      {isOpen &&
        createPortal(
          <ul
            ref={menuRef}
            style={{
              position: 'absolute',
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              minWidth: `${Math.max(coords.width, 160)}px`,
            }}
            className="z-9999 bg-white border border-slate-200/80 rounded-xl shadow-xl max-h-60 overflow-y-auto py-1 text-xs transition-all duration-200 animate-in fade-in zoom-in-95"
          >
            {filter.options.map((opt) => {
              const val = typeof opt === 'object' ? opt.value : opt;
              const lbl = typeof opt === 'object' ? opt.label : opt;
              const isSelected = String(val) === String(filter.value);

              return (
                <li key={val}>
                  <button
                    type="button"
                    onClick={() => handleSelectOption(val)}
                    className={`w-full text-left px-3.5 py-2 transition-colors cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50 text-emerald-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate">{lbl}</span>
                  </button>
                </li>
              );
            })}
          </ul>,
          document.body,
        )}
    </div>
  );
}

export default function InlineFilterBar({
  filters = [],
  isFilterActive = false,
  onClear,
}) {
  return (
    <div className="w-full p-3 border bg-slate-50/80 rounded-xl border-slate-100">
      <div className="flex items-center w-full gap-2 py-1.5 px-1 -mx-1 overflow-x-auto flex-nowrap scrollbar-none custom-scrollbar-hide">
        {filters.map((filter) => (
          <CustomSelect key={filter.key} filter={filter} />
        ))}

        {/* RESET BUTTON */}
        {isFilterActive && (
          <button
            type="button"
            onClick={onClear}
            className="px-3.5 py-2 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 shrink-0 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            Reset Filter
          </button>
        )}
      </div>
    </div>
  );
}
