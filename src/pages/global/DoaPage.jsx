import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  useSearchDoa,
  useGetDoaCategories,
  useDoaByCategory,
} from '../../hooks/global/useDoa';
import {
  IconSearch,
  IconClose,
  IconArrowLeft,
} from '../../utils/helpers/decorations';

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

export default function DoaPage() {
  const navigate = useNavigate();

  // STATE FOR SEARCH INPUT QUERY
  const [searchQuery, setSearchQuery] = useState('');

  // STATE FOR ACTIVE CATEGORY SLUG
  const [selectedCategory, setSelectedCategory] = useState('doa-harian');

  // STATE FOR HIGHLIGHTED / SELECTED DOA CARD
  const [selectedDoaId, setSelectedDoaId] = useState(null);

  const isSearchActive = searchQuery.trim().length >= 2;

  // HOOK FOR CATEGORIES
  const {
    categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useGetDoaCategories();

  // HOOK FOR SEARCH
  const {
    searchResults,
    isLoading: isSearchLoading,
    error: searchError,
    searchDoa,
    clearSearch,
  } = useSearchDoa();

  // HOOK FOR CATEGORY DOA LIST
  const {
    doas,
    category: categoryInfo,
    currentPage,
    totalPages,
    totalDoa,
    isLoading: isDoaLoading,
    error: doaError,
    hasNextPage,
    hasPrevPage,
    goToNextPage,
    goToPrevPage,
  } = useDoaByCategory(selectedCategory, 1, 5);

  // set initial category once loaded
  useEffect(() => {
    if (categories && categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].slug);
    }
  }, [categories, selectedCategory]);

  // handle search input change
  function handleSearchChange(e) {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length >= 2) {
      searchDoa(value);
    } else {
      clearSearch();
    }
  }

  // handle clear search input
  function handleClearSearchInput() {
    setSearchQuery('');
    clearSearch();
  }

  // handle category selection
  function handleSelectCategory(slug) {
    handleClearSearchInput();
    setSelectedCategory(slug);
    setSelectedDoaId(null);
  }

  // toggle selected card highlight
  function handleToggleSelectCard(id) {
    setSelectedDoaId((prev) => (prev === id ? null : id));
  }

  // Handle Back
  function handleBack() {
    navigate(-1);
  }

  return (
    // MAIN CONTAINER WITH TEAL/EMERALD BACKGROUND
    <div className="min-h-screen bg-linear-to-br from-emerald-950 via-teal-900 to-emerald-900 text-slate-100 pb-16">
      {/* STICKY HEADER */}
      <header className="sticky top-0 z-50 bg-emerald-950/80 backdrop-blur-md border-b border-emerald-800/50 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-emerald-100 hover:text-white hover:bg-emerald-800/50 active:bg-emerald-800/80 p-2 sm:px-3.5 sm:py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label="Kembali"
          >
            <IconArrowLeft className="w-5 h-5 shrink-0" />
            <span className="hidden sm:inline">Kembali</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-8">
        {/* HERO SECTION */}
        <section className="pt-8 pb-6 px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-linear-to-r from-teal-200 via-emerald-300 to-teal-100 bg-clip-text text-transparent pb-1">
              Doa & Dzikir Sehari-hari
            </h1>

            <p className="text-emerald-100/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Kumpulan doa dan dzikir lengkap sesuai tuntunan sunnah, dilengkapi
              dengan teks Arab, latin, terjemahan, serta sumber perawi yang
              shahih.
            </p>

            {/* SEARCH BAR CONTAINER */}
            <div className="pt-4 max-w-xl mx-auto">
              <div className="relative flex items-center bg-emerald-900/60 border border-emerald-700/60 rounded-2xl shadow-lg focus-within:shadow-emerald-500/20 focus-within:border-teal-400 focus-within:ring-4 focus-within:ring-teal-400/20 transition-all p-1.5 backdrop-blur-sm">
                {/* GLOWING SEARCH ICON */}
                <div className="pl-2 pr-1 flex items-center justify-center">
                  <div className="p-2.5 rounded-xl bg-teal-400/20 text-teal-300 shadow-[0_0_15px_rgba(45,212,191,0.4)] border border-teal-400/30">
                    <IconSearch />
                  </div>
                </div>

                {/* SEARCH INPUT */}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Cari doa (min. 2 karakter)... e.g., 'tidur', 'makan'"
                  className="w-full py-3 pl-3 pr-10 text-emerald-50 placeholder-emerald-300/60 bg-transparent focus:outline-none text-sm sm:text-base"
                />

                {/* CLEAR BUTTON */}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearchInput}
                    className="absolute right-4 p-1.5 rounded-full text-emerald-300 hover:text-white hover:bg-emerald-800/60 transition-colors"
                    aria-label="Clear search"
                  >
                    <IconClose />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORY FILTER SECTION */}
        {!isSearchActive && (
          <section className="bg-emerald-900/40 p-5 rounded-2xl border border-emerald-800/60 backdrop-blur-md shadow-sm">
            <h2 className="text-base font-semibold text-emerald-100 mb-3">
              Pilih Kategori Doa
            </h2>

            {/* CATEGORIES LOADING STATE */}
            {isCategoriesLoading && (
              <div className="flex gap-2 overflow-x-auto pb-2 animate-pulse">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-28 bg-emerald-800/50 rounded-xl shrink-0"
                  />
                ))}
              </div>
            )}

            {/* CATEGORIES ERROR STATE */}
            {categoriesError && (
              <p className="text-sm text-rose-300">{categoriesError}</p>
            )}

            {/* CATEGORY BUTTON PILLS */}
            {!isCategoriesLoading && categories && (
              <div className="flex flex-wrap gap-2.5">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.slug;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleSelectCategory(cat.slug)}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-teal-500 text-emerald-950 border-teal-400 shadow-md font-bold'
                          : 'bg-emerald-950/60 text-emerald-200 border-emerald-800/80 hover:border-teal-500/50 hover:bg-emerald-800/40'
                      }`}
                    >
                      <span>{cat.nama}</span>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full font-semibold ${
                          isSelected
                            ? 'bg-emerald-950 text-teal-300'
                            : 'bg-emerald-900 text-emerald-300/80'
                        }`}
                      >
                        {cat.total}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* SECTION HEADER & TITLE */}
        <div className="flex items-center justify-between border-b border-emerald-800/60 pb-3">
          <h2 className="text-xl font-bold text-teal-200">
            {isSearchActive ? (
              <span>Hasil Pencarian "{searchQuery}"</span>
            ) : (
              <span>{categoryInfo?.nama || 'Daftar Doa'}</span>
            )}
          </h2>
          {!isSearchActive && totalDoa > 0 && (
            <span className="text-xs sm:text-sm font-medium text-emerald-300/70">
              Menampilkan {doas.length} dari {totalDoa} doa
            </span>
          )}
        </div>

        {/* DOA LIST SECTION */}
        <section className="space-y-4">
          {/* LOADING STATE */}
          {(isSearchLoading || (!isSearchActive && isDoaLoading)) && (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-emerald-900/30 p-6 rounded-2xl border border-emerald-800/50 space-y-3"
                >
                  <div className="h-5 bg-emerald-800/40 rounded w-1/3"></div>
                  <div className="h-10 bg-emerald-800/40 rounded w-full"></div>
                  <div className="h-4 bg-emerald-800/40 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          )}

          {/* CATEGORY ERROR STATE */}
          {!isSearchActive && doaError && (
            <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-200 text-sm">
              {doaError}
            </div>
          )}

          {/* SEARCH ERROR STATE (ONLY DISPLAY IF NO RESULTS) */}
          {isSearchActive &&
            searchError &&
            (!searchResults) && (
            <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-200 text-sm">
              {searchError}
            </div>
          )}

          {/* DISPLAY SEARCH RESULTS */}
          {isSearchActive &&
            !isSearchLoading &&
            searchResults &&
            (searchResults.length > 0
              ? searchResults.map((item) => (
                <DoaCard
                  key={item.id}
                  doa={item}
                  isSelected={selectedDoaId === item.id}
                  onSelect={() => handleToggleSelectCard(item.id)}
                />
              ))
              : !searchError && (
                <div className="text-center py-12 bg-emerald-900/30 rounded-2xl border border-emerald-800/50 text-emerald-300/70">
                    Tidak ada doa yang cocok dengan kata kunci "{searchQuery}".
                </div>
              ))}

          {/* DISPLAY CATEGORY DOA LIST */}
          {!isSearchActive &&
            !isDoaLoading &&
            doas &&
            (doas.length > 0 ? (
              doas.map((item) => (
                <DoaCard
                  key={item.id}
                  doa={item}
                  isSelected={selectedDoaId === item.id}
                  onSelect={() => handleToggleSelectCard(item.id)}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-emerald-900/30 rounded-2xl border border-emerald-800/50 text-emerald-300/70">
                Tidak ada data doa pada kategori ini.
              </div>
            ))}
        </section>

        {/* PAGINATION CONTROLS */}
        {!isSearchActive && totalPages > 1 && (
          <div className="flex items-center justify-between  mt-6">
            <button
              type="button"
              onClick={goToPrevPage}
              disabled={!hasPrevPage || isDoaLoading}
              className="px-4 py-2 text-sm font-medium rounded-xl border border-emerald-700/60 text-emerald-100 bg-emerald-950/60 hover:bg-emerald-800/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              &larr; Sebelumnya
            </button>

            <span className="text-xs sm:text-sm font-medium text-emerald-200/80">
              Halaman{' '}
              <span className="font-semibold text-teal-300">{currentPage}</span>{' '}
              dari{' '}
              <span className="font-semibold text-teal-300">{totalPages}</span>
            </span>

            <button
              type="button"
              onClick={goToNextPage}
              disabled={!hasNextPage || isDoaLoading}
              className="px-4 py-2 text-sm font-medium rounded-xl border border-emerald-700/60 text-emerald-100 bg-emerald-950/60 hover:bg-emerald-800/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Selanjutnya &rarr;
            </button>
          </div>
        )}
        <>
          <Footer />
        </>
      </main>
    </div>
  );
}

// DOA CARD COMPONENT WITH HIGHLIGHT SUPPORT
function DoaCard({ doa, isSelected, onSelect }) {
  return (
    <article
      onClick={onSelect}
      className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer space-y-4 border ${
        isSelected
          ? 'bg-emerald-900/90 border-teal-400 ring-2 ring-teal-400/50 shadow-[0_0_20px_rgba(45,212,191,0.25)]'
          : 'bg-emerald-900/40 border-emerald-800/60 hover:border-emerald-600 hover:bg-emerald-900/60 shadow-sm'
      }`}
    >
      {/* TITLE AND NUMBER */}
      <div className="flex items-start justify-between gap-4">
        <h3
          className={`text-lg font-bold leading-snug transition-colors ${
            isSelected ? 'text-teal-200' : 'text-emerald-100'
          }`}
        >
          {doa.judul}
        </h3>
        {doa.urutan && (
          <span
            className={`shrink-0 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              isSelected
                ? 'bg-teal-400 text-emerald-950 font-bold'
                : 'bg-emerald-950 text-teal-300 border border-emerald-800'
            }`}
          >
            #{doa.urutan}
          </span>
        )}
      </div>

      {/* ARABIC TEXT */}
      <div className="py-2 text-right">
        <p
          className="text-2xl sm:text-3xl font-serif text-teal-100 leading-loose"
          dir="rtl"
          style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}
        >
          {doa.arab}
        </p>
      </div>

      {/* LATIN READOUT */}
      {doa.latin && (
        <p className="text-sm italic text-teal-200/90 bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/80">
          "{doa.latin}"
        </p>
      )}

      {/* TRANSLATION */}
      {doa.terjemah && (
        <p className="text-sm text-emerald-100/80 leading-relaxed">
          <span className="font-semibold text-teal-200">Artinya: </span>
          {doa.terjemah}
        </p>
      )}

      {/* FOOTER & SOURCE */}
      {doa.sumber && (
        <div className="pt-3 border-t border-emerald-800/50 flex items-center justify-between text-xs text-emerald-300/60">
          <span>
            Sumber: <strong className="text-emerald-200">{doa.sumber}</strong>
          </span>
          {isSelected && (
            <span className="text-teal-300 font-medium text-[11px] bg-teal-950/80 px-2 py-0.5 rounded-md border border-teal-500/30">
              Dipilih
            </span>
          )}
        </div>
      )}
    </article>
  );
}
