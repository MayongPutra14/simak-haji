import React, { useState, useEffect } from 'react';

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
      variant = 'outlined',
      withCard = false,
      containerClassName = '',
      className = '',
      ...props
    },
    ref,
  ) => {
    // PREVIEW AND FILE NAME STATES
    const [previewUrl, setPreviewUrl] = useState(null);
    const [fileName, setFileName] = useState('');

    // ERROR MESSAGE CHECKING
    const errorMessage = typeof error === 'string' ? error : error?.message;

    // SYNC FILE OR URL PREVIEW WHEN VALUE CHANGES
    useEffect(() => {
      let objectUrl = null;

      // HANDLE FILELIST, ARRAY OF FILES, OR SINGLE FILE OBJECT
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
        objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        return () => {
          if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
      }

      // HANDLE STRING URL OR BASE64 STRING (E.G. EXISTING IMAGE FROM DATABASE OR LOCALSTORAGE)
      if (typeof value === 'string' && value.trim() !== '') {
        setPreviewUrl(value);
        // CHECK IF IT IS BASE64 DATA URL OR REGULAR URL TO SET DISPLAY NAME ACCORDINGLY
        if (value.startsWith('data:image/')) {
          setFileName('Gambar terunggah (Saved)');
        } else {
          setFileName('Gambar yang disimpan');
        }
        return;
      }

      // RESET STATES IF VALUE IS EMPTY
      setPreviewUrl(null);
      setFileName('');
    }, [value]);

    // HANDLE FILE CHANGE AND MAX SIZE VALIDATION LOGIC
    const handleFileChange = (event) => {
      const files = event.target.files;
      const file = files?.[0];

      if (file) {
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        if (file.size > maxSizeBytes) {
          if (onSizeError) {
            onSizeError(`Ukuran file melebihi batas maksimum ${maxSizeMB}MB`);
          }
          event.target.value = ''; // RESET INPUT VALUE
          setPreviewUrl(null);
          setFileName('');
          return;
        }

        // DIRECTLY SET PREVIEW STATE TO GUARANTEE IMMEDIATE UI RENDER
        const localUrl = URL.createObjectURL(file);
        setPreviewUrl(localUrl);
        setFileName(file.name);
      } else {
        setPreviewUrl(null);
        setFileName('');
      }

      // PASS EVENT TO FORM HANDLER (E.G. REACT HOOK FORM / PARENT STATE)
      if (onChange) {
        onChange(event);
      }
    };

    // BUTTON STYLES ACCORDING TO VARIANT AND ERROR STATE
    const buttonVariantStyles = {
      outlined: errorMessage
        ? 'border-red-500 text-red-600 bg-red-50 hover:bg-red-100 rounded-md'
        : 'border-gray-300 text-slate-700 bg-white hover:bg-gray-50 border rounded-md',
      underlined: errorMessage
        ? 'border-b-2 border-red-500 text-red-600 bg-red-50 hover:bg-red-100 rounded-t-md'
        : 'border-b-2 border-gray-300 text-slate-700 bg-gray-50 hover:bg-gray-100 rounded-t-md',
    };

    // CONTAINER WRAPPER STYLES (WITH OR WITHOUT CARD)
    const wrapperStyles = withCard
      ? 'w-full bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-2'
      : 'w-full flex flex-col gap-1.5';

    return (
      <div className={`${wrapperStyles} ${containerClassName}`}>
        {/* HEADER QUESTION: LABEL + REQUIRED(*) */}
        {label && (
          <label className="text-sm font-semibold md:text-base text-slate-700">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        {/* QUESTION DESCRIPTION */}
        {description && (
          <p className="-mt-1 text-xs md:text-sm text-slate-500">
            {description}
          </p>
        )}

        {/* INPUT TYPE FILE CONTAINER */}
        <div
          className={
            withCard ? 'mt-1 flex flex-col gap-3' : 'flex flex-col gap-3'
          }
        >
          <div className="flex items-center gap-4">
            <label
              className={`cursor-pointer inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors duration-200 ${buttonVariantStyles[variant]} ${className}`}
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

            <span className="text-sm text-slate-600">
              {fileName || 'Belum ada gambar yang dipilih'}
            </span>
          </div>

          {/* PREVIEW CONTAINER */}
          {previewUrl && (
            <div className="relative w-32 h-32 overflow-hidden border rounded-lg border-slate-200 bg-slate-50">
              <img
                src={previewUrl}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            </div>
          )}

          {/* ERROR MESSAGE VALIDATION */}
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
