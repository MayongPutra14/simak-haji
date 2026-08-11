export const GuidelineForm = () => {
  const guidelines = [
    'Persiapkan Surat Pendaftaran Haji (SPPH) untuk mempermudah pengisian data.',
    'SEMUA DATA DIISI DENGAN HURUF BESAR (KAPITAL)',
    'Data di isi dengan benar sebab diperlukan untuk management dan kontrol keberangkatan jamaah',
    'Jika kemudian ada kesalahan data yang di input, bisa mengisi ulang atau hubungi admin',
  ];

  return (
    <div>
      {/* Container Utama bergaya Google Form */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* Garis Aksen Ungu di Bagian Atas */}
        <div className="h-2.5 bg-sea-green-700 w-full"></div>

        {/* Konten Utama */}
        <div className="p-5 md:p-8">
          {/* Judul Panduan */}
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6 border-b border-gray-100 pb-3">
            Panduan Pengisian Formulir
          </h2>

          {/* Daftar Panduan */}
          <ul className="space-y-3.5 md:space-y-4">
            {guidelines.map((text, index) => (
              <li key={index} className="flex items-start gap-3 md:gap-4">
                {/* Nomor / Indikator */}
                <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-sea-green-100 text-sea-green-700 text-sm font-medium">
                  {index + 1}
                </span>

                {/* Teks Panduan */}
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
