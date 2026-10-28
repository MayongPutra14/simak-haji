import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSurahs } from '../../hooks/global/useQuran';
import { titleCase } from '../../utils/helpers/helpers';
import { ListQuranSkeleton } from '../../components/ui/global/skeletons/SkeletonLoading';
import { IconSearch, IconArrowLeft } from '../../utils/helpers/decorations';

export default function QuranPage() {
  // STATE DEFINITIONS
  const navigate = useNavigate();
  const { surahs, isLoading, error } = useSurahs();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua Surat');

  if (isLoading || !surahs) {
    return <ListQuranSkeleton />;
  }

  // FILTER LOGIC
  // filter surahs based on latin name search query and revelation location
  const filteredSurahs = surahs.filter((surah) => {
    const matchesSearch = surah.nama_latin
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === 'Semua Surat' ||
      surah.tempat_turun.toLowerCase() === activeFilter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  function handleOpenSurah(surahId) {
    navigate(`/quran/read/${surahId}`);
  }

  function handleBack() {
    navigate(-1);
  }

  return (
    // MAIN CONTAINER
    <div className="min-h-screen bg-teal-50 text-teal-900 font-sans selection:bg-teal-200 selection:text-teal-900">
      {/* NAVIGATION BAR */}
      <nav className="sticky top-0 z-10 bg-teal-50/90 backdrop-blur-md border-b border-teal-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center">
          {/* navigate back button */}
          <button
            onClick={() => handleBack()}
            className="flex items-center space-x-2 text-slate-600 hover:text-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md p-1 -ml-1"
            aria-label="Kembali ke Daftar Surah"
          >
            <IconArrowLeft className="w-5 h-5" />
            <span className="font-medium hidden sm:inline">Kembali</span>
          </button>
        </div>
      </nav>
      {/* PAGE CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* HEADER SECTION */}
        <header className="mb-10 md:mb-12 text-center max-w-2xl mx-auto">
          {/* DECORATIVE WIDGET */}
          <div className="relative mb-8 text-center">
            {/* textual header elements */}
            <div className="relative z-10">
              <span className="inline-block text-sm text-teal-600 uppercase tracking-widest mb-2 font-medium">
                Mushaf Digital Indonesia
              </span>
              <h1 className="text-3xl md:text-4xl font-semibold text-teal-900 tracking-tight mb-3">
                Daftar Surah
              </h1>
              <p className="text-base text-teal-700 max-w-lg mx-auto">
                Jelajahi 114 surah Al-Qur'anul Karim lengkap dengan terjemahan
                resmi, identifikasi tempat wahyu, dan rincian ayat.
              </p>
              <p className="text-xs text-teal-500 mt-2 font-medium">
                Powered by EQuran.id
              </p>
            </div>
            {/* bismillah decorative device */}
            <div className="flex items-center justify-center gap-4 mt-6 opacity-75 relative z-10">
              <div className="w-12 h-px bg-teal-300"></div>
              <span
                className="text-2xl text-teal-800 leading-none select-none font-serif"
                dir="rtl"
                lang="ar"
                style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </span>
              <div className="w-12 h-px bg-teal-300"></div>
            </div>
          </div>
          {/* SEARCH INPUT */}
          <div className="relative group text-left mb-6">
            {/* search icon container */}
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <IconSearch className="h-5 w-5 text-teal-400 group-focus-within:text-teal-600 transition-colors" />
            </div>
            {/* search text input field */}
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3.5  border border-teal-200 rounded-xl leading-5 bg-transparent placeholder-teal-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 sm:text-sm transition-all duration-200 shadow-sm hover:border-teal-300 outline-none"
              placeholder="Cari nama surah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* LOCATION FILTERS render filter buttons for all, mecca, and medina */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['Semua Surat', 'Mekah', 'Madinah'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${
                  activeFilter === filter
                    ? 'bg-teal-600 text-white border-transparent shadow-sm'
                    : 'bg-white text-teal-700 border border-teal-200 hover:bg-teal-50 hover:border-teal-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </header>
        {/* SURAH LIST AREA conditionally render loading, error, empty, or the */}
        {/* surah grid */}
        {error ? (
          // ERROR STATE
          <div className="text-center py-20 text-red-600 bg-red-50 rounded-xl border border-red-100">
            <p>Gagal memuat data: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-white border border-red-200 rounded-md hover:bg-red-50 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        ) : filteredSurahs.length === 0 ? (
          //  EMPTY SEARCH RESULTS
          <div className="text-center py-20">
            <p className="text-teal-600 text-lg">Surah tidak ditemukan.</p>
          </div>
        ) : (
          // SURAH GRID
          // display the matched surahs in a responsive grid layout
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {filteredSurahs.map((surah) => (
              // SURAH CARD
              <button
                key={surah.nomor}
                onClick={() => handleOpenSurah(surah.nomor)}
                className="group w-full flex items-center justify-between p-4 cursor-pointer sm:p-5 bg-white rounded-2xl border border-teal-100 shadow-sm hover:shadow-md hover:border-teal-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-left"
              >
                <div className="flex items-center space-x-4">
                  {/* SURAH NUMBER INDICATOR */}
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-teal-50 group-hover:bg-teal-100 transition-colors">
                    <span className="text-sm font-medium text-teal-700 group-hover:text-teal-900">
                      {surah.nomor}
                    </span>
                  </div>
                  {/* SURAH LATIN NAME AND LOCATION */}
                  <div>
                    <h2 className="text-base font-semibold text-teal-900 group-hover:text-teal-700 transition-colors">
                      {surah.nama_latin}
                    </h2>
                    <p className="text-sm text-teal-500 mt-0.5">
                      {`${titleCase(surah.tempat_turun)} • ${surah.jumlah_ayat} Ayat`}
                    </p>
                  </div>
                </div>
                {/* SURAH ARABIC NAME */}
                <div className="ml-4 shrink-0 text-right">
                  <span
                    className="text-2xl font-serif text-teal-800 group-hover:text-teal-900 transition-colors"
                    dir="rtl"
                    lang="ar"
                    style={{
                      fontFamily: "'Amiri', 'Traditional Arabic', serif",
                    }}
                  >
                    {surah.nama}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
