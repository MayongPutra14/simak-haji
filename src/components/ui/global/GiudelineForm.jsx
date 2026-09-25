export const GuidelineForm = () => {
  const guidelines = [
    'Persiapkan Surat Pendaftaran Haji (SPPH) untuk mempermudah pengisian data.',
    'SEMUA DATA DIISI DENGAN HURUF BESAR (KAPITAL)',
    'Data di isi dengan benar sebab diperlukan untuk management dan kontrol keberangkatan jamaah',
    'Jika kemudian ada kesalahan data yang di input, silahkan hubungi admin yang bersangkutan',
  ];

  return (
    <div>
      {/* MAIN CONTAINER WITH GOOGLE FORM STYLE */}
      <div className="overflow-hidden bg-white rounded-lg shadow-sm">
        {/* ACCENT LINE ON TOP OF FORM */}
        <div className="h-2.5 bg-sea-green-700 w-full"></div>

        {/* MAIN CONTENT */}
        <div className="p-5 md:p-8">
          {/* GUIDELINE TITLE */}
          <h2 className="pb-3 mb-4 text-xl font-semibold text-gray-900 border-b border-gray-100 md:text-2xl md:mb-6">
            Panduan Pengisian Formulir
          </h2>

          {/* LIST GUIDE */}
          <ul className="space-y-3.5 md:space-y-4">
            {guidelines.map((text, index) => (
              <li key={index} className="flex items-start gap-3 md:gap-4">
                {/* NUMBER / INDICATOR */}
                <span className="flex items-center justify-center w-6 h-6 text-sm font-medium rounded-full shrink-0 bg-sea-green-100 text-sea-green-700">
                  {index + 1}
                </span>

                {/* GUIDE TEXT */}
                <p
                  className={`text-sm md:text-base leading-relaxed ${index === 1 ? 'font-bold text-red-600' : 'text-gray-600'}`}
                >
                  {text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export  function WarningAlert() {
  return (
    <div
      className="w-full rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
      role="alert"
    >
      <div className="flex items-start gap-3">
        {/* Ikon Peringatan / Warning Icon */}
        <svg
          className="h-5 w-5 shrink-0 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>

        {/* Teks Peringatan yang Sudah Diperbaiki */}
        <p className="text-sm leading-relaxed font-medium">
          Jika tidak ada data yang ingin dimasukkan, silakan isi dengan{' '}
          <span className="font-bold underline">"tidak ada"</span> agar data
          jemaah tidak kosong.
        </p>
      </div>
    </div>
  );
}
