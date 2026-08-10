import { useEffect } from 'react';

/**
 * Reusable Modal Component
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Status visibilitas modal
 * @param {Function} props.onClose - Callback saat modal ditutup (klik backdrop atau button)
 * @param {React.ReactNode} props.icon - Komponen icon (misal: Lucide Icon, SVG, dll)
 * @param {string} [props.iconBgColor="bg-blue-100"] - Warna background wrapper icon (Tailwind class)
 * @param {string} [props.iconColor="text-blue-600"] - Warna icon (Tailwind class)
 * @param {string} props.title - Judul modal
 * @param {string} props.description - Deskripsi singkat
 * @param {string} [props.buttonText="OK"] - Teks tombol aksi
 * @param {string} [props.buttonColor="bg-blue-600 hover:bg-blue-700 text-white"] - Styling warna tombol (Tailwind class)
 * @param {Function} [props.onConfirm] - Callback opsional khusus untuk tombol aksi
 */

export const Modal = ({
  isOpen,
  onClose,
  icon,
  iconBgColor = 'bg-blue-100',
  iconColor = 'text-blue-600',
  title,
  description,
  buttonText = 'Lanjutkan',
  buttonColor = 'bg-blue-600 hover:bg-blue-700 text-white',
  onConfirm,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleButtonClick = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl transition-all transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center">
          {icon && (
            <div
              className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${iconBgColor} ${iconColor}`}
            >
              {icon}
            </div>
          )}
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

          <p className="mt-2 text-sm text-slate-600">{description}</p>

          <button
            type="button"
            onClick={handleButtonClick}
            className={`text-white mt-6 inline-flex justify-center rounded-xl px-6 py-2.5 text-sm font-medium shadow-xs focus:outline-hidden focus:ring-2 focus:ring-offset-2 transition-colors cursor-pointer ${buttonColor}`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
