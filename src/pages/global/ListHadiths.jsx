import { useState } from 'react';
import { titleCase } from '../../utils/helpers/helpers';
import { useParams, useNavigate } from 'react-router';
import { useHadithByKitab } from '../../hooks/global/useHadith';
import { BOOKS_NAME, KITAB_METADATA } from '../../utils/helpers/constant';
import { ReadHadithSkeleton } from '../../components/ui/global/skeletons/SkeletonLoading';
import {
  IconArrowLeft,
  IconChevronNext,
  IconChevronBack,
  IconAlertCircle,
  IconRefresh,
  IconBookClose,
} from '../../utils/helpers/decorations';

// HEADER COMPONENT
function Header({ onBack }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-emerald-950/80 backdrop-blur-md border-b border-emerald-800/50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button
          onClick={() => onBack()}
          className="inline-flex items-center gap-2 text-emerald-100 hover:text-white hover:bg-emerald-800/50 active:bg-emerald-800/80 p-2 sm:px-3.5 sm:py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          aria-label="Kembali ke Daftar Buku Hadist"
        >
          <IconArrowLeft className="w-5 h-5 shrink-0" />
          <span className="hidden sm:inline">Kembali</span>
        </button>
      </div>
    </header>
  );
}

// HADITH CARD SUB-COMPONENT WITH DARK EMERALD THEME
function HadithCard({ hadith, index, titleCase }) {
  // SEPARATE STATES FOR ARABIC AND TRANSLATION EXPANSION
  const [isArabicExpanded, setIsArabicExpanded] = useState(false);
  const [isTranslationExpanded, setIsTranslationExpanded] = useState(false);

  // HANDLERS TO TOGGLE EXPAND STATES
  const handleToggleArabic = (e) => {
    e.stopPropagation();
    setIsArabicExpanded(!isArabicExpanded);
  };

  const handleToggleTranslation = (e) => {
    e.stopPropagation();
    setIsTranslationExpanded(!isTranslationExpanded);
  };

  return (
    <div
      key={`${hadith.kitab}-${hadith.nomor}-${index}`}
      className="bg-emerald-900/40 p-6 rounded-2xl border border-emerald-800/60 shadow-sm hover:border-teal-400/80 hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-all group relative backdrop-blur-sm space-y-4"
    >
      {/* HEADER CARD: KITAB & NOMOR */}
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-emerald-800/50">
        <span className="px-3.5 py-1.5 bg-emerald-950 text-teal-300 text-xs font-semibold rounded-full border border-emerald-800">
          {titleCase(hadith.kitab)} • No. {hadith.nomor}
        </span>
      </div>

      {/* ARABIC TEXT SECTION */}
      <div className="mb-6 relative">
        <p
          className={`text-right font-serif text-2xl sm:text-3xl leading-[2.2] text-teal-100 ${
            !isArabicExpanded ? 'line-clamp-3' : ''
          }`}
          dir="rtl"
          style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}
        >
          {hadith.arab}
        </p>

        {/* TOGGLE BUTTON FOR ARABIC TEXT */}
        <div className="mt-2 text-right">
          <button
            onClick={handleToggleArabic}
            className="text-xs text-teal-300/80 font-semibold hover:underline hover:text-teal-200 focus:outline-none cursor-pointer"
          >
            {isArabicExpanded
              ? 'Sembunyikan Arab'
              : 'Baca selengkapnya (Arab)...'}
          </button>
        </div>
      </div>

      {/* TRANSLATION TEXT SECTION */}
      <div className="text-emerald-100/90 text-sm sm:text-base leading-relaxed text-justify space-y-3 relative pt-2">
        <span className="text-teal-200 font-bold text-sm sm:text-base block">
          Artinya:
        </span>

        <div className="relative">
          <div
            dangerouslySetInnerHTML={{ __html: hadith.terjemah }}
            className={`prose prose-invert max-w-none text-emerald-100/90 [&>p]:mb-3 [&>h1]:text-base [&>h1]:font-bold [&>h1]:mb-2 ${
              !isTranslationExpanded ? 'line-clamp-3' : ''
            }`}
          />

          {!isTranslationExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-emerald-950/90 to-transparent pointer-events-none" />
          )}
        </div>

        {/* TOGGLE BUTTON FOR TRANSLATION TEXT */}
        <div className="mt-2 text-left">
          <button
            onClick={handleToggleTranslation}
            className="text-xs text-teal-300/80 font-semibold hover:underline hover:text-teal-200 focus:outline-none cursor-pointer"
          >
            {isTranslationExpanded
              ? 'Sembunyikan Terjemahan'
              : 'Baca selengkapnya (Terjemahan)...'}
          </button>
        </div>
      </div>
    </div>
  );
}

// MAIN COMPONENT
export default function HadithListingPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const displayName = BOOKS_NAME[slug];
  // FETCH METADATA BASED ON CURRENT BOOK SLUG WITH FALLBACK
  const bookMeta = KITAB_METADATA[slug] || {
    arabicName: displayName,
    subTitle: 'Koleksi Hadis Nabawi',
    author: 'Perawi Hadis',
  };

  const {
    hadiths,
    currentPage,
    totalPages,
    totalHadiths,
    isLoading,
    error,
    hasNextPage,
    hasPrevPage,
    goToNextPage,
    goToPrevPage,
    refetch,
  } = useHadithByKitab(slug, 1, 5);

  // RENDER LOADING STATE
  if (isLoading && hadiths.length === 0) {
    return <ReadHadithSkeleton bookName={displayName} />;
  }

  // RENDER ERROR STATE
  if (error) {
    return (
      <div className="min-h-screen bg-stone-50 text-slate-800 p-4 flex flex-col items-center justify-center">
        <IconAlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-lg font-semibold mb-2">Terjadi Kesalahan</h2>
        <p className="text-slate-600 mb-6">{error}</p>
        <button
          onClick={refetch}
          className="flex items-center gap-2 bg-emerald-700 text-white px-4 py-2 rounded-md hover:bg-emerald-800 transition-colors"
        >
          <IconRefresh className="w-4 h-4" /> Coba Lagi
        </button>
      </div>
    );
  }

  function handleBack() {
    navigate(-1);
  }
  // MAIN PAGE RETURN
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-950 via-teal-900 to-emerald-900 text-slate-100 font-sans selection:bg-teal-400 selection:text-emerald-950 pb-12">
      <Header onBack={handleBack} />
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
        {/* HEADER SECTION */}

        {/* HERO SECTION (DYNAMIC BENTO CARD) */}
        <section className="bg-emerald-900/40 rounded-2xl border border-emerald-800/60 p-6 md:p-8 shadow-sm mb-8 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* MAIN DETAILS */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              {/* TITLE AND DESCRIPTION */}
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-linear-to-r from-teal-200 via-emerald-300 to-teal-100 bg-clip-text text-transparent">
                  {displayName}
                </h1>
                <p className="text-sm md:text-base text-emerald-100/80 mt-2 max-w-3xl leading-relaxed">
                  Himpunan hadis yang disusun oleh {bookMeta.author}. Telah
                  diverifikasi melalui kaidah takhrij dan metodologi sanad
                  muttashil bersambung hingga Rasulullah ﷺ.
                </p>
              </div>

              {/* METADATA FOOTER */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-emerald-300/70">
                <div className="flex items-center gap-2 text-teal-300 font-semibold">
                  <IconBookClose className="w-5 h-5 shrink-0" />
                  <span>
                    Menampilkan Hadis No. {(currentPage - 1) * 5 + 1} -{' '}
                    {Math.min(currentPage * 5, totalHadiths)} dari{' '}
                    {totalHadiths.toLocaleString('id-ID')} (Halaman{' '}
                    {currentPage} dari {totalPages})
                  </span>
                </div>
              </div>
            </div>

            {/* DYNAMIC ARABIC BADGE */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <div className="w-full max-w-xs p-6 bg-emerald-950/80 rounded-2xl border border-emerald-800/80 flex flex-col items-center text-center shadow-inner">
                <span
                  className="text-2xl lg:text-3xl font-serif text-teal-100 leading-tight select-none drop-shadow-[0_0_10px_rgba(45,212,191,0.3)]"
                  dir="rtl"
                  style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}
                >
                  {bookMeta.arabicName}
                </span>
                <div className="w-12 h-0.5 bg-linear-to-r from-transparent via-teal-400/50 to-transparent my-3"></div>
                <span className="text-xs font-semibold text-teal-300/80 uppercase tracking-wider">
                  {bookMeta.subTitle}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* HADITH LIST SECTION */}
        <main className="space-y-6">
          {hadiths.length === 0 ? (
            <div className="text-center py-12 bg-emerald-900/30 border border-emerald-800/50 rounded-2xl text-emerald-300/70 backdrop-blur-sm">
              <p className="text-sm font-medium">
                Tidak ada hadis yang ditemukan di halaman ini.
              </p>
            </div>
          ) : (
            hadiths.map((hadith, index) => (
              <HadithCard
                key={`${hadith.kitab}-${hadith.nomor}-${index}`}
                hadith={hadith}
                index={index}
                titleCase={titleCase}
              />
            ))
          )}
        </main>

        {/* PAGINATION CONTROLS */}
        <nav
          className="flex items-center justify-between md:justify-center gap-4 mt-10 bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800/60 backdrop-blur-md"
          aria-label="Pagination"
        >
          <button
            onClick={goToPrevPage}
            disabled={!hasPrevPage}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-950/80 border border-emerald-800/80 text-emerald-100 rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
          >
            <IconChevronBack className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>

          <div className="text-xs sm:text-sm font-semibold text-emerald-200">
            Halaman <span className="text-teal-300">{currentPage}</span> dari{' '}
            <span className="text-teal-300">{totalPages}</span>
          </div>

          <button
            onClick={goToNextPage}
            disabled={!hasNextPage}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-950/80 border border-emerald-800/80 text-emerald-100 rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
          >
            <span className="hidden sm:inline">Selanjutnya</span>
            <IconChevronNext className="w-4 h-4 shrink-0" />
          </button>
        </nav>
      </div>
    </div>
  );
}
