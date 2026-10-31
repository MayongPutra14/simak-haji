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
    <div className="min-h-screen bg-linear-to-br from-emerald-950 via-teal-900 to-emerald-900 text-slate-100 font-sans selection:bg-teal-400 selection:text-emerald-950 pb-16">
      {/* NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 bg-emerald-950/80 backdrop-blur-md border-b border-emerald-800/50 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* navigate back button */}
          <button
            onClick={() => handleBack()}
            className="inline-flex items-center gap-2 text-emerald-100 hover:text-white hover:bg-emerald-800/50 active:bg-emerald-800/80 p-2 sm:px-3.5 sm:py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            aria-label="Kembali ke Daftar Surah"
          >
            <IconArrowLeft className="w-5 h-5 shrink-0" />
            <span className="hidden sm:inline">Kembali</span>
          </button>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        {/* HEADER SECTION */}
        <header className="text-center max-w-2xl mx-auto space-y-6">
          {/* DECORATIVE WIDGET */}
          <div className="relative text-center">
            {/* textual header elements */}
            <div className="relative z-10 space-y-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider bg-emerald-900/60 border border-emerald-700/50 text-teal-300 uppercase">
                Mushaf Digital
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-linear-to-r from-teal-200 via-emerald-300 to-teal-100 bg-clip-text text-transparent">
                Daftar Surah
              </h1>
              <p className="text-base text-emerald-100/80 max-w-lg mx-auto leading-relaxed">
                Jelajahi 114 surah Al-Qur'anul Karim lengkap dengan terjemahan
                resmi, identifikasi tempat wahyu, dan rincian ayat.
              </p>
              <p className="text-xs text-teal-300/60 font-medium pt-1">
                Powered by EQuran.id
              </p>
            </div>

            {/* bismillah decorative device */}
            <div className="flex items-center justify-center gap-4 mt-6 opacity-90 relative z-10">
              <div className="w-16 h-px bg-linear-to-r from-transparent via-teal-400/50 to-transparent"></div>
              <span
                className="text-2xl sm:text-3xl text-teal-200 leading-none select-none font-serif drop-shadow-[0_0_10px_rgba(45,212,191,0.3)]"
                dir="rtl"
                lang="ar"
                style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </span>
              <div className="w-16 h-px bg-linear-to-r from-transparent via-teal-400/50 to-transparent"></div>
            </div>
          </div>

          {/* SEARCH INPUT */}
          <div className="relative group text-left max-w-xl mx-auto pt-2">
            <div className="relative flex items-center bg-emerald-900/60 border border-emerald-700/60 rounded-2xl shadow-lg focus-within:shadow-teal-500/20 focus-within:border-teal-400 focus-within:ring-4 focus-within:ring-teal-400/20 transition-all p-1.5 backdrop-blur-sm">
              {/* search icon container */}
              <div className="pl-2 pr-1 flex items-center justify-center">
                <div className="p-2.5 rounded-xl bg-teal-400/20 text-teal-300 shadow-[0_0_15px_rgba(45,212,191,0.35)] border border-teal-400/30">
                  <IconSearch className="h-5 w-5" />
                </div>
              </div>
              {/* search text input field */}
              <input
                type="text"
                className="w-full py-3 pl-3 pr-4 text-emerald-50 placeholder-emerald-300/50 bg-transparent focus:outline-none text-sm sm:text-base"
                placeholder="Cari nama surah..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* LOCATION FILTERS */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            {['Semua Surat', 'Mekah', 'Madinah'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer border ${
                  activeFilter === filter
                    ? 'bg-teal-400 text-emerald-950 border-teal-300 shadow-lg shadow-teal-500/20 font-bold'
                    : 'bg-emerald-950/60 text-emerald-200 border-emerald-800/80 hover:border-teal-500/50 hover:bg-emerald-900/60'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </header>

        {/* SURAH LIST AREA */}
        {error ? (
          // ERROR STATE
          <div className="text-center py-16 text-rose-200 bg-rose-950/60 rounded-2xl border border-rose-800 max-w-xl mx-auto backdrop-blur-md">
            <p className="font-medium">Gagal memuat data: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-teal-100 border border-emerald-700 rounded-xl transition-colors font-medium text-sm cursor-pointer"
            >
              Coba Lagi
            </button>
          </div>
        ) : filteredSurahs.length === 0 ? (
          // EMPTY SEARCH RESULTS
          <div className="text-center py-16 bg-emerald-900/30 rounded-2xl border border-emerald-800/50 max-w-xl mx-auto backdrop-blur-md">
            <p className="text-emerald-300/80 text-base font-medium">
              Surah tidak ditemukan.
            </p>
          </div>
        ) : (
          // SURAH GRID
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {filteredSurahs.map((surah) => (
              // SURAH CARD
              <button
                key={surah.nomor}
                onClick={() => handleOpenSurah(surah.nomor)}
                className="group w-full flex items-center justify-between p-4 sm:p-5 bg-emerald-900/40 hover:bg-emerald-900/80 rounded-2xl border border-emerald-800/60 hover:border-teal-400/80 shadow-sm hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 text-left backdrop-blur-sm cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  {/* SURAH NUMBER INDICATOR */}
                  <div className="shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-emerald-950 border border-emerald-800 text-teal-300 group-hover:bg-teal-400 group-hover:text-emerald-950 group-hover:border-teal-300 transition-colors font-bold shadow-inner">
                    <span className="text-sm">{surah.nomor}</span>
                  </div>

                  {/* SURAH LATIN NAME AND LOCATION */}
                  <div>
                    <h2 className="text-base font-bold text-emerald-100 group-hover:text-teal-200 transition-colors">
                      {surah.nama_latin}
                    </h2>
                    <p className="text-xs text-emerald-300/70 mt-1 font-medium">
                      {`${titleCase(surah.tempat_turun)} • ${surah.jumlah_ayat} Ayat`}
                    </p>
                  </div>
                </div>

                {/* SURAH ARABIC NAME */}
                <div className="ml-4 shrink-0 text-right">
                  <span
                    className="text-2xl font-serif text-teal-200 group-hover:text-teal-100 transition-colors drop-shadow-sm"
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
