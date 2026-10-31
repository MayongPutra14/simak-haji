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

// SEARCH INTERFACE COMPONENT
function SearchInterface({ onSearch, isLoading }) {
  // handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query');
    if (onSearch) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto group">
      {/* OUTER GLOW EFFECT */}
      <div className="absolute -inset-1 bg-linear-to-r from-teal-400 to-emerald-400 rounded-2xl opacity-20 blur group-hover:opacity-40 transition duration-300" />

      {/* INPUT BOX CONTAINER */}
      <div className="relative flex items-center bg-emerald-900/80 rounded-2xl border border-emerald-700/60 shadow-lg p-1.5 transition-all focus-within:border-teal-400 focus-within:ring-4 focus-within:ring-teal-400/20 backdrop-blur-sm">
        <div className="pl-3 pr-2 text-teal-300">
          <IconSearch className="w-5 h-5" />
        </div>

        <input
          type="text"
          name="query"
          placeholder="Cari hadis berdasarkan kata kunci atau nomor..."
          className="w-full py-2.5 px-2 text-emerald-50 placeholder:text-emerald-300/50 bg-transparent focus:outline-none text-sm sm:text-base"
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center px-5 py-3 bg-teal-400 hover:bg-teal-300 active:bg-teal-500 text-emerald-950 font-bold text-sm rounded-xl transition-colors shadow-md shadow-teal-500/20 shrink-0 cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
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

// HERO COMPONENT
function Hero({ onSearch, isLoading }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-10 md:pt-20 md:pb-16 px-4 text-center">
      {/* AMBIENT BACKGROUND GLOW */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full max-w-7xl h-105 pointer-events-none"
      >
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-75 sm:w-125 h-62 bg-linear-to-tr from-teal-400/20 via-emerald-500/10 to-teal-300/20 blur-3xl rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10 space-y-4">
        {/* HEADING */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-teal-100 tracking-tight leading-[1.15]">
          Jelajahi Hadis,{' '}
          <span className="bg-linear-to-r from-teal-200 via-emerald-300 to-teal-100 bg-clip-text text-transparent">
            Perdalam Pemahaman
          </span>
        </h1>

        {/* SUBTITLE */}
        <p className="text-base sm:text-lg text-emerald-100/80 max-w-2xl mx-auto leading-relaxed pb-2">
          Temukan dan pelajari kemuliaan hadis dari berbagai perawi terpercaya
          melalui pencarian cerdas dan pengalaman membaca yang nyaman.
        </p>

        {/* SEARCH COMPONENT CONTAINER */}
        <div className="w-full pt-2">
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
      className="group w-full flex flex-col justify-between p-5 cursor-pointer sm:p-6 bg-emerald-900/40 hover:bg-emerald-900/80 rounded-2xl border border-emerald-800/60 hover:border-teal-400/80 shadow-sm hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 text-left backdrop-blur-sm"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      {/* TOP SECTION: TITLE & COUNT */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-emerald-100 tracking-tight group-hover:text-teal-200 transition-colors mb-1.5">
          {name}
        </h3>

        {total != null && (
          <p className="text-sm font-medium text-teal-300 group-hover:text-teal-200">
            {total.toLocaleString('id-ID')} Hadis
          </p>
        )}
      </div>

      {/* BOTTOM ACTION SECTION */}
      <div className="relative z-10 mt-6 pt-4 border-t border-emerald-800/50 flex items-center justify-between text-xs font-semibold text-emerald-300/70 group-hover:text-teal-200 transition-colors">
        <span>Lihat Hadis</span>
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-950 group-hover:bg-teal-400 group-hover:text-emerald-950 transition-all duration-300">
          <IconChevronNext className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </button>
  );
}

// FOOTER COMPONENT
function Footer() {
  return (
    <footer className="border-t border-emerald-800/60 py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 text-xs text-emerald-300/60">
          <p>
            Powered by{' '}
            <a
              href="https://api.ahmadsanusi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-teal-300 hover:text-teal-200 underline underline-offset-2 transition-colors"
            >
              api.ahmadsanusi.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// HADITH CARD SUB-COMPONENT
function HadithCard({ hadith, index, titleCase }) {
  const [isArabicExpanded, setIsArabicExpanded] = useState(false);
  const [isTranslationExpanded, setIsTranslationExpanded] = useState(false);

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
      <div className="flex justify-between items-center pb-4 border-b border-emerald-800/50">
        <span className="px-3.5 py-1.5 bg-emerald-950 text-teal-300 text-xs font-semibold rounded-full border border-emerald-800">
          {titleCase(hadith.kitab)} • No. {hadith.nomor}
        </span>
      </div>

      {/* ARABIC TEXT SECTION */}
      <div className="relative">
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
    <div className="min-h-screen bg-linear-to-br from-emerald-950 via-teal-900 to-emerald-900 text-slate-100 font-sans selection:bg-teal-400 selection:text-emerald-950 flex flex-col">
      <Header onBack={handleBack} />

      <main className="grow">
        {/* HERO & SEARCH BAR SECTION */}
        <Hero onSearch={searchHadith} isLoading={isSearchLoading} />

        {/* SEARCH ERROR WARNING BANNER */}
        {!isSearchLoading && searchError && (
          <div className="max-w-xl mx-auto px-4 my-6">
            <div className="bg-amber-950/80 border border-amber-700/60 text-amber-200 p-4 rounded-2xl text-sm flex items-center justify-between shadow-xs backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <IconAlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="font-medium">{searchError}</span>
              </div>
            </div>
          </div>
        )}

        {/* SEARCH RESULTS SECTION */}
        {!isSearchLoading && !searchError && hadithData && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            {/* HEADER WITH SUMMARY & CLEAR BUTTON */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-emerald-800/60">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-teal-200">
                  Menampilkan {hadithData.results?.length || 0} dari{' '}
                  {hadithData.total || 0} Hadis
                </h2>

                {isNaN(Number(hadithData.q)) ? (
                  <p className="text-xs sm:text-sm text-emerald-300/70">
                    Ditemukan{' '}
                    <span className="font-semibold text-emerald-100">
                      {hadithData.total} hadis
                    </span>{' '}
                    yang mengandung kata{' '}
                    <span className="font-semibold text-teal-300">
                      "{hadithData.q}"
                    </span>
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm text-emerald-300/70">
                    Ditemukan{' '}
                    <span className="font-semibold text-emerald-100">
                      {hadithData.total} hadis
                    </span>{' '}
                    dengan nomor{' '}
                    <span className="font-semibold text-teal-300">
                      {hadithData.q}
                    </span>
                  </p>
                )}
              </div>

              {/* CLEAR SEARCH BUTTON */}
              <button
                onClick={clearSearch}
                className="self-start sm:self-center shrink-0 text-xs sm:text-sm font-bold text-emerald-950 hover:bg-teal-300 bg-teal-400 px-4 py-2 rounded-xl transition-colors shadow-sm cursor-pointer"
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
              <div className="bg-emerald-900/30 border border-emerald-800/50 p-8 rounded-2xl text-center text-emerald-300/80 shadow-2xs backdrop-blur-sm">
                <p className="mb-4">Hadis yang Anda cari tidak ditemukan.</p>
                <button
                  onClick={clearSearch}
                  className="inline-flex items-center text-xs font-bold text-teal-300 hover:underline cursor-pointer"
                >
                  Kembali ke daftar kitab
                </button>
              </div>
            )}
          </section>
        )}

        {/* HADITH BOOKS COLLECTION SECTION */}
        {!hadithData && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-24">
            {/* BOOKS FETCH ERROR STATE */}
            {error && (
              <div className="bg-rose-950/80 backdrop-blur-md text-rose-200 p-8 rounded-2xl flex flex-col items-center justify-center text-center border border-rose-800/80 max-w-xl mx-auto shadow-sm">
                <div className="p-3 bg-rose-900/80 rounded-full text-rose-300 mb-4 ring-8 ring-rose-950/50">
                  <IconAlertCircle className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-rose-100 mb-1">
                  Gagal Memuat Data
                </h3>
                <p className="mb-6 text-sm text-rose-200/80 leading-relaxed max-w-sm">
                  {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-900 text-teal-100 font-medium text-sm rounded-xl border border-emerald-700 hover:bg-emerald-800 transition-all shadow-sm active:scale-95 cursor-pointer"
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
              <div className="bg-emerald-900/30 border border-emerald-800/50 p-12 rounded-2xl flex flex-col items-center justify-center text-center shadow-xs max-w-md mx-auto backdrop-blur-sm">
                <div className="p-4 bg-emerald-950/80 rounded-2xl text-teal-300 mb-4">
                  <IconBookOpen className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-bold text-teal-100 mb-1">
                  Belum Ada Kitab Tersedia
                </h3>
                <p className="text-emerald-300/70 text-sm leading-relaxed">
                  Daftar kitab hadis belum dapat ditampilkan saat ini. Silakan
                  coba beberapa saat lagi.
                </p>
              </div>
            )}

            {/* BOOKS FETCH SUCCESS STATE */}
            {!isLoading && !error && books?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-teal-200 mb-6">
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
