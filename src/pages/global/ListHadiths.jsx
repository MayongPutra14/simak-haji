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
      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-500/40 hover:shadow-md transition-all group relative"
    >
      {/* HEADER CARD: KITAB & NOMOR */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
        <span className="px-3.5 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">
          {titleCase(hadith.kitab)} • No. {hadith.nomor}
        </span>
      </div>

      {/* ARABIC TEXT SECTION */}
      <div className="mb-6 relative">
        <p
          className={`text-right font-arabic text-2xl sm:text-3xl leading-[2.2] text-slate-900 ${
            !isArabicExpanded ? 'line-clamp-3' : ''
          }`}
        >
          {hadith.arab}
        </p>

        {/* TOGGLE BUTTON FOR ARABIC TEXT */}
        <div className="mt-2 text-right">
          <button
            onClick={handleToggleArabic}
            className="text-xs text-slate-400 font-medium hover:underline hover:text-slate-600 focus:outline-none cursor-pointer"
          >
            {isArabicExpanded
              ? 'Sembunyikan Arab'
              : 'Baca selengkapnya (Arab)...'}
          </button>
        </div>
      </div>

      {/* TRANSLATION TEXT SECTION */}
      <div className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify space-y-3 relative">
        <span className="text-slate-900 font-bold text-sm sm:text-base pb-2 block">
          Artinya:
        </span>

        <div className="relative">
          <div
            dangerouslySetInnerHTML={{ __html: hadith.terjemah }}
            className={`prose prose-emerald max-w-none text-slate-700 [&>p]:mb-3 [&>h1]:text-base [&>h1]:font-bold [&>h1]:mb-2 ${
              !isTranslationExpanded ? 'line-clamp-3' : ''
            }`}
          />

          {!isTranslationExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>

        {/* TOGGLE BUTTON FOR TRANSLATION TEXT */}
        <div className="mt-2 text-left">
          <button
            onClick={handleToggleTranslation}
            className="text-xs text-slate-400 font-medium hover:underline hover:text-slate-600 focus:outline-none cursor-pointer"
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

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800 font-sans selection:bg-emerald-200">
      <div className="max-w-3xl mx-auto px-4 py-6 md:py-10 border-b-2">
        {/* HEADER SECTION */}
        <header className="flex justify-between items-center gap-4 mb-8 ">
          <button
            onClick={() => navigate(-1)}
            aria-label="Kembali"
            className="flex justify-center items-center gap-2 p-2 font-medium text-emerald-400 hover:bg-emerald-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <IconArrowLeft className="w-5 h-5" />
            Kembali
          </button>
        </header>

        {/* HERO SECTION (DYNAMIC BENTO CARD) */}
        <section className="bg-white rounded-2xl border border-stone-200/80 p-6 md:p-8 shadow-sm mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* MAIN DETAILS */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              {/* TITLE AND DESCRIPTION */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                  {displayName}
                </h1>
                <p className="text-sm md:text-base text-slate-700 mt-2 max-w-3xl leading-relaxed">
                  Himpunan hadis yang disusun oleh {bookMeta.author}. Telah
                  diverifikasi melalui kaidah takhrij dan metodologi sanad
                  muttashil bersambung hingga Rasulullah ﷺ.
                </p>
              </div>

              {/* METADATA FOOTER */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500">
                <div className="flex items-center gap-2 text-emerald-800 font-medium">
                  <IconBookClose className="w-5 h-5" />
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
              <div className="w-full max-w-xs p-6 bg-stone-50/80 rounded-xl border border-stone-200/60 flex flex-col items-center text-center">
                <span
                  className="text-2xl lg:text-3xl font-arabic text-emerald-900 leading-tight select-none"
                  dir="rtl"
                >
                  {bookMeta.arabicName}
                </span>
                <div className="w-12 h-0.5 bg-emerald-200 my-3"></div>
                <span className="text-xs font-medium text-slate-500">
                  {bookMeta.subTitle}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* HADITH LIST SECTION */}
        <main className="space-y-6">
          {hadiths.length === 0 ? (
            <div className="text-center py-10 bg-white border border-stone-200 rounded-xl">
              <p className="text-slate-500">
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
          className="flex items-center justify-between md:justify-center gap-4 mt-10"
          aria-label="Pagination"
        >
          <button
            onClick={goToPrevPage}
            disabled={!hasPrevPage}
            className="flex items-center gap-1 px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm font-medium text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <IconChevronBack className="w-4 h-4" />
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>

          <div className="text-sm font-medium text-slate-600">
            Halaman {currentPage} dari {totalPages}
          </div>

          <button
            onClick={goToNextPage}
            disabled={!hasNextPage}
            className="flex items-center gap-1 px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm font-medium text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <span className="hidden sm:inline">Selanjutnya</span>
            <IconChevronNext className="w-4 h-4" />
          </button>
        </nav>
      </div>
    </div>
  );
}
