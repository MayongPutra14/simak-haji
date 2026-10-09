import React, { useState, useEffect } from 'react';
import {
  IconPdf,
  IconWord,
  IconPpt,
  IconExcel,
  IconAlt,
  IconUpload,
  IconEye,
} from '../../../utils/helpers/decorations';

const InputFile = React.forwardRef(
  (
    {
      label,
      isLabelGreen = false,
      isLabelFade = false,
      description,
      required = false,
      error,
      onChange,
      onBlur,
      name,
      value,
      variant = 'outlined',
      withCard = false,
      containerClassName = '',
      className = '',
      accept = '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx',
      ...props
    },
    ref,
  ) => {
    // STATES
    const [previewUrl, setPreviewUrl] = useState(null);
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');

    // ERROR MESSAGE CHECKING
    const errorMessage = typeof error === 'string' ? error : error?.message;

    // HELPER FOR SELECT REACT ICON BASED ON FILE TYPE
    const getFileIcon = (typeOrName) => {
      if (!typeOrName) return <IconAlt className="w-6 h-6 text-slate-500" />;

      const lower = typeOrName.toLowerCase();

      // extract file extension if string contains a dot
      const extension = lower.includes('.') ? lower.split('.').pop() : lower;

      // check for excel / spreadsheet formats
      if (
        ['xls', 'xlsx', 'csv', 'sheet', 'spreadsheet'].includes(extension) ||
        lower.includes('excel') ||
        lower.includes('spreadsheet')
      ) {
        return <IconExcel className="w-6 h-6 text-green-500" />;
      }

      // check for word / document formats
      if (
        ['doc', 'docx'].includes(extension) ||
        lower.includes('word') ||
        lower.includes('msword')
      ) {
        return <IconWord className="w-6 h-6 text-blue-500" />;
      }

      // check for presentation formats
      if (
        ['ppt', 'pptx'].includes(extension) ||
        lower.includes('presentation') ||
        lower.includes('powerpoint')
      ) {
        return <IconPpt className="w-6 h-6 text-orange-500" />;
      }

      // check for pdf formats
      if (extension === 'pdf' || lower.includes('pdf')) {
        return <IconPdf className="w-6 h-6 text-red-500" />;
      }

      return <IconAlt className="w-6 h-6 text-slate-500" />;
    };

    // SYNC FILE ATAU URL WHEN VALUE CHANGE
    useEffect(() => {
      let objectUrl = null;

      const file =
        value instanceof FileList
          ? value[0]
          : Array.isArray(value) && value[0] instanceof File
            ? value[0]
            : value instanceof File
              ? value
              : null;

      if (file) {
        setFileName(file.name);
        setFileType(file.type || file.name.split('.').pop());

        // Buat preview URL jika tipe file mendukung (misal: PDF atau Gambar)
        if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
          objectUrl = URL.createObjectURL(file);
          setPreviewUrl(objectUrl);
        } else {
          setPreviewUrl(null);
        }

        return () => {
          if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
      }

      // HANDLE STRING URL (FILE DARI DATABASE / LOCALSTORAGE)
      if (typeof value === 'string' && value.trim() !== '') {
        setPreviewUrl(value);
        setFileName('File yang disimpan');
        setFileType(value);
        return;
      }

      // RESET STATES JIKA KOSONG
      setPreviewUrl(null);
      setFileName('');
      setFileType('');
    }, [value]);

    // HANDLE PERUBAHAN FILE
    const handleFileChange = (event) => {
      const files = event.target.files;
      const file = files?.[0];

      if (file) {
        setFileName(file.name);
        setFileType(file.type || file.name.split('.').pop());

        if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
          const localUrl = URL.createObjectURL(file);
          setPreviewUrl(localUrl);
        } else {
          setPreviewUrl(null);
        }
      } else {
        setPreviewUrl(null);
        setFileName('');
        setFileType('');
      }

      if (onChange) {
        onChange(event);
      }
    };

    // STYLING TOMBOL BERDASARKAN VARIAN & ERROR
    const buttonVariantStyles = {
      outlined: errorMessage
        ? 'border-red-500 text-red-600 bg-red-50 hover:bg-red-100 rounded-md'
        : 'border-gray-300 text-slate-700 bg-white hover:bg-gray-50 border rounded-md',
      underlined: errorMessage
        ? 'border-b-2 border-red-500 text-red-600 bg-red-50 hover:bg-red-100 rounded-t-md'
        : 'border-b-2 border-gray-300 text-slate-700 bg-gray-50 hover:bg-gray-100 rounded-t-md',
    };

    const wrapperStyles = withCard
      ? 'w-full bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-2'
      : 'w-full flex flex-col gap-1.5';

    // Variant label green, default adn fade
    const labelSytle = isLabelGreen
      ? 'text-xs text-teal-200 font-medium'
      : isLabelFade
        ? 'text-xs font-semibold text-slate-400 flex items-center gap-1'
        : 'text-sm font-semibold md:text-normal text-slate-700';

    const descriptionStyle = isLabelFade
      ? 'text-xs font-normal text-slate-400 flex items-center gap-1'
      : '-mt-1 text-xs md:text-sm text-slate-500';
    return (
      <div className={`${wrapperStyles} ${containerClassName}`}>
        {/* LABEL */}
        {label && (
          <label className={`${labelSytle}`}>
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        {/* DESCRIPTION */}
        {description && <p className={`${descriptionStyle}`}>{description}</p>}

        {/* INPUT CONTAINER */}
        <div
          className={
            withCard ? 'mt-1 flex flex-col gap-3' : 'flex flex-col gap-3'
          }
        >
          <div className="flex flex-wrap items-center gap-4">
            <label
              className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200 shadow-sm ${buttonVariantStyles[variant]} ${className}`}
            >
              <IconUpload className="w-4 h-4" />
              <span>Pilih File</span>
              <input
                ref={ref}
                type="file"
                name={name}
                accept={accept}
                className="sr-only"
                onChange={handleFileChange}
                onBlur={onBlur}
                {...props}
              />
            </label>

            <span className="max-w-xs text-sm truncate text-slate-600">
              {fileName || 'Belum ada file yang dipilih'}
            </span>
          </div>

          {/* FILE INFO / PREVIEW CARD JIKA FILE TERPILIH */}
          {fileName && (
            <div className="flex items-center justify-between max-w-md p-3 border rounded-lg border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 bg-white border rounded-md shadow-xs border-slate-100 shrink-0">
                  {getFileIcon(fileType || fileName)}
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-sm font-medium truncate text-slate-700">
                    {fileName}
                  </span>
                  <span className="text-xs text-slate-400">
                    {previewUrl
                      ? 'Siap diunggah / Dapat dilihat'
                      : 'Dokumen terpilih'}
                  </span>
                </div>
              </div>

              {/* TOMBOL PREVIEW JIKA DIDUKUNG */}
              {previewUrl && (
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 transition-colors rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-200"
                  title="Pratinjau File"
                >
                  <IconEye className="w-4 h-4" />
                </a>
              )}
            </div>
          )}

          {/* ERROR MESSAGE */}
          {errorMessage && (
            <p className="mt-0.5 text-xs text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
    );
  },
);

InputFile.displayName = 'InputFile';

export default InputFile;
