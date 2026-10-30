import { useNavigate } from 'react-router';
import {
  HadithHubSkeleton,
  HadithSkeletonCard,
} from '../../components/ui/global/skeletons/SkeletonLoading';
import {
  useSearchHadith,
  useGetHadithBooks,
} from '../../hooks/global/useHadith';
import {
  IconRefresh,
  IconChevronNext,
  IconAlertCircle,
  IconSearch,
  IconBookOpen,
  IconArrowLeft,
  IconLoading,
} from '../../utils/helpers/decorations';
import { titleCase } from '../../utils/helpers/helpers';
import { useState } from 'react';

// --- Sub-components ---

function Header({ onBack }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button
          onClick={() => onBack()}
          className="flex items-center space-x-2 cursor-pointer text-emerald-600 hover:text-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md p-1 -ml-1"
          aria-label="Kembali ke Daftar Buku Hadist"
        >
          <IconArrowLeft className="w-5 h-5" />
          <span className="font-medium hidden sm:inline">Kembali</span>
        </button>
      </div>
    </header>
  );
}

function SearchInterface({ onSearch, isLoading }) {
  // Controlled input or form submission state handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query');
    if (onSearch) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto group">
      {/* Outer Glow Effect on Focus/Hover */}
      <div className="absolute -inset-1 bg-linear-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-15 blur group-hover:opacity-30 transition duration-300" />

      {/* Input Box Container */}
      <div className="relative flex items-center bg-white rounded-2xl border border-emerald-900/10 shadow-lg shadow-emerald-950/5 p-2 transition-all focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
        <div className="pl-3 pr-2 text-emerald-600/70">
          <IconSearch className="w-5 h-5" />
        </div>

        <input
          type="text"
          name="query"
          placeholder="Cari hadis berdasarkan kata kunci atau nomor..."
          className="w-full py-2.5 px-2 text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none text-sm sm:text-base"
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center px-5 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium text-sm rounded-xl transition-colors shadow-md shadow-emerald-600/20 shrink-0"
        >
          {isLoading ? (
            <span className="flex items-center gap-1">
              <span className="inline-block animate-spin">
                <IconLoading />
              </span>
              <span>Mencari...</span>
            </span>
          ) : (
            'Cari Hadis'
          )}
        </button>
      </div>
    </form>
  );
}

function Hero({ onSearch, isLoading }) {
  // Main Hero section with ambient background glow and modern typography layout
  return (
    <section className="relative overflow-hidden pt-16 pb-12 md:pt-28 md:pb-24 px-4 text-center">
      {/* Ambient Background Glow (Emerald & Teal Soft Gradients) */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full max-w-7xl h-105 pointer-events-none"
      >
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-75 sm:w-125 h-62 bg-linear-to-tr from-emerald-400/20 via-teal-300/20 to-emerald-200/10 blur-3xl rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
          Jelajahi Hadis,{' '}
          <span className="bg-linear-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Perdalam Pemahaman
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-teal-700 mb-8 max-w-2xl mx-auto">
          Temukan dan pelajari kemuliaan hadis dari berbagai perawi terpercaya
          melalui pencarian cerdas dan pengalaman membaca yang nyaman.
        </p>

        {/* Search Component Container */}
        <div className="w-full">
          <SearchInterface onSearch={onSearch} isLoading={isLoading} />
        </div>
      </div>
    </section>
  );
}

// COLLECTION CARD COMPONENT
function CollectionCard({ book }) {
  const navigate = useNavigate();

  // EXTRACT BOOK PROPERTIES WITH FALLBACK DEFAULTS
  const name = book?.nama;
  const total = book?.jumlah;
  const slug = book?.slug;

  function handleCardClick() {
    navigate(`/hadiths/list/${slug}`);
  }
  return (
    <button
      className="group w-full flex flex-col  justify-between p-4 cursor-pointer sm:p-5 bg-white rounded-2xl border border-teal-100 shadow-sm hover:shadow-md hover:border-teal-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-left"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick}
    >
      {/* TOP SECTION: ICON & TITLE / COUNT */}
      <div className="relative z-10">
        {/* BOOK TITLE */}
        <h3 className="text-xl font-bold text-slate-700 tracking-tight group-hover:text-emerald-700 transition-colors mb-1.5">
          {name}
        </h3>

        {/* HADITH COUNT PLACED RIGHT UNDER THE BOOK NAME */}
        {total != null && (
          <p className="text-sm font-medium text-teal-700 group-hover:text-teal-900">
            {total.toLocaleString('id-ID')} Hadis
          </p>
        )}
      </div>

      {/* BOTTOM ACTION SECTION */}
      <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-slate-700 transition-colors">
        <span>Lihat Hadis</span>
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-50 group-hover:bg-slate-600 group-hover:text-white transition-all duration-300">
          <IconChevronNext className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </button>
  );
}

function Footer() {
  return (
    <footer className="border-t border-emerald-100  py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        {/* Divider & Copyright / Credit */}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 text-xs text-emerald-700/60">
          <p>
            Powered by{' '}
            <a
              href="https://api.ahmadsanusi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
            >
              api.ahmadsanusi.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// HADITH CARD SUB-COMPONENT WITH SEPARATE EXPAND STATES
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
            className="text-xs text-slate-400 font-semibold hover:underline hover:text-slate-600 focus:outline-none cursor-pointer"
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
            className="text-xs text-slate-400 font-semibold hover:underline hover:text-slate-600 focus:outline-none cursor-pointer"
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

// --- Main Application Component ---

export default function HadithPage() {
  const navigate = useNavigate();
  // INITIALIZE CUSTOM HOOK FOR SEARCH
  const {
    hadithData,
    isLoading: isSearchLoading,
    error: searchError,
    searchHadith,
    clearSearch,
  } = useSearchHadith();

  const { hadithBooks, isLoading, error } = useGetHadithBooks();

  if (isLoading || !hadithBooks) {
    return <HadithHubSkeleton />;
  }

  // SAFELY EXTRACT BOOKS ARRAY FROM HOOK DATA
  const books = hadithBooks.kitab;

  function handleBack() {
    navigate(-1);
  }

  return (
    <div className="min-h-screen bg-teal-50 text-teal-900 font-sans selection:bg-teal-200 selection:text-teal-900">
      <Header onBack={handleBack} />

      <main className="grow">
        {/* HERO & SEARCH BAR SECTION */}
        <Hero onSearch={searchHadith} isLoading={isSearchLoading} />

        {/* SEARCH ERROR WARNING BANNER */}
        {!isSearchLoading && searchError && (
          <div className="max-w-xl mx-auto px-4 my-6">
            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-2xl text-sm flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <IconAlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="font-medium">{searchError}</span>
              </div>
            </div>
          </div>
        )}

        {!isSearchLoading && !searchError && hadithData && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            {/* HEADER WITH TITLE, SUMMARY, AND CLEAR BUTTON */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/60">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-slate-900">
                  Menampilkan {hadithData.results?.length || 0} dari{' '}
                  {hadithData.total || 0} Hadis
                </h2>

                {isNaN(Number(hadithData.q)) ? (
                  <p className="text-xs sm:text-sm text-slate-500">
                    Ditemukan{' '}
                    <span className="font-semibold text-slate-700">
                      {hadithData.total} hadis
                    </span>{' '}
                    yang mengandung kata{' '}
                    <span className="font-semibold text-emerald-600">
                      "{hadithData.q}"
                    </span>
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm text-slate-500">
                    Ditemukan{' '}
                    <span className="font-semibold text-slate-700">
                      {hadithData.total} hadis
                    </span>{' '}
                    dengan nomor{' '}
                    <span className="font-semibold text-emerald-600">
                      {hadithData.q}
                    </span>
                  </p>
                )}
              </div>

              {/* CLEAR SEARCH BUTTON TO RESTORE BOOKS LIST */}
              <button
                onClick={clearSearch}
                className="self-start sm:self-center shrink-0 text-xs sm:text-sm font-medium text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl transition-colors border border-emerald-200/80 shadow-2xs cursor-pointer"
              >
                Tampilkan Semua Kitab
              </button>
            </div>

            {/* HADITH CARDS LIST */}
            {hadithData.results && hadithData.results.length > 0 ? (
              <div className="space-y-4">
                {hadithData.results.map((hadith, index) => (
                  <HadithCard
                    key={`${hadith.kitab}-${hadith.nomor}-${index}`}
                    hadith={hadith}
                    index={index}
                    titleCase={titleCase}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 p-8 rounded-2xl text-center text-slate-500 shadow-2xs">
                <p className="mb-4">Hadis yang Anda cari tidak ditemukan.</p>
                {/* CLEAR SEARCH BUTTON ON EMPTY SEARCH RESULT */}
                <button
                  onClick={clearSearch}
                  className="inline-flex items-center text-xs font-semibold text-emerald-700 hover:underline"
                >
                  Kembali ke daftar kitab
                </button>
              </div>
            )}
          </section>
        )}

        {/* HADITH BOOKS COLLECTION SECTION (HIDE WHEN USER HAS ACTIVE SEARCH RESULTS) */}
        {!hadithData && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-24">
            {/* BOOKS FETCH ERROR STATE */}
            {error && (
              <div className="bg-red-50/80 backdrop-blur-sm text-red-800 p-8 rounded-2xl flex flex-col items-center justify-center text-center border border-red-200/60 max-w-xl mx-auto shadow-sm">
                <div className="p-3 bg-red-100 rounded-full text-red-600 mb-4 ring-8 ring-red-50">
                  <IconAlertCircle className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-red-900 mb-1">
                  Gagal Memuat Data
                </h3>
                <p className="mb-6 text-sm text-red-700/90 leading-relaxed max-w-sm">
                  {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-red-700 font-medium text-sm rounded-xl border border-red-200 hover:bg-red-50 hover:border-red-300 transition-all shadow-sm active:scale-95"
                >
                  <IconRefresh className="w-4 h-4" />
                  Coba Lagi
                </button>
              </div>
            )}

            {/* BOOKS FETCH LOADING STATE */}
            {isLoading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <HadithSkeletonCard key={`skeleton-${index}`} />
                ))}
              </div>
            )}

            {/* BOOKS FETCH EMPTY STATE */}
            {!isLoading && !error && books?.length === 0 && (
              <div className="bg-white border border-slate-200/80 p-12 rounded-2xl flex flex-col items-center justify-center text-center shadow-xs max-w-md mx-auto">
                <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 mb-4">
                  <IconBookOpen className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Belum Ada Kitab Tersedia
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Daftar kitab hadis belum dapat ditampilkan saat ini. Silakan
                  coba beberapa saat lagi.
                </p>
              </div>
            )}

            {/* BOOKS FETCH SUCCESS STATE */}
            {!isLoading && !error && books?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6">
                  Koleksi Kitab Hadis
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {books.map((book, index) => (
                    <CollectionCard key={`${book.slug}-${index}`} book={book} />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
