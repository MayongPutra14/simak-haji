import React, { useEffect, useState } from 'react';

const InputImage = React.forwardRef(
  (
    {
      label,
      description,
      required = false,
      error,
      onChange,
      onBlur,
      name,
      value,
      maxSizeMB = 1,
      onSizeError,
      ...props
    },
    ref,
  ) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [fileName, setFileName] = useState('');

    const errorMessage = typeof error === 'string' ? error : error?.message;

    useEffect(() => {
      const file =
        value instanceof FileList
          ? value[0]
          : value instanceof File
            ? value
            : null;

      if (file) {
        setFileName(file.name);
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
      }

      if (typeof value === 'string' && value.trim() !== '') {
        setPreviewUrl(value);
        setFileName('Gambar yang disimpan');
        return;
      }

      setPreviewUrl(null);
      setFileName('');
    }, [value]);

    const handleFileChange = (event) => {
      const file = event.target.file?.[0];
      if (file) {
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        if (file.size > maxSizeBytes) {
          if (onSizeError) {
            onSizeError(`Ukuran file melebihi batas maksimum ${maxSizeMB}MB`);
          }
          event.target.value = '';
          return;
        }
      }
      if (onChange) {
        onChange(event);
      }
    };

    return (
      <div className="w-full bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-2">
        {/* HEADER QUESTION: LABEL + REQUIRED(*) */}
        {label && (
          <label className="text-sm md:text-base font-semibold text-slate-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {/* DESCRIPTION */}
        {description && (
          <p className="text-xs md:text-sm text-slate-500 -mt-1">
            {' '}
            {description}
          </p>
        )}

        {/* INPUT TYPE FILE */}
        <div className="mt-1 flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <label
              className={`cursor-pointer inline-flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium transition-colors duration-200 ${
                errorMessage
                  ? 'border-red-500 text-red-600 bg-red-50 hover:bg-red-100'
                  : 'border-gray-300 text-slate-700 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <span>Pilih Gambar</span>
              <input
                ref={ref}
                type="file"
                name={name}
                accept="image/png, image/jpeg, image/jpg, image/webp"
                className="hidden"
                onChange={handleFileChange}
                onBlur={onBlur}
                {...props}
              />
            </label>

            <span>{fileName || 'Belum ada gambar yang dipilih'}</span>
          </div>

          {/* PREVIEW CONTAINER */}
          {previewUrl && (
            <div className="relative w-32 h-32 rounded-lg border border-slate-200 overflow-hidden bg-slate-50">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover "
              />
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

InputImage.displayName = 'InputImage';

export default InputImage;
