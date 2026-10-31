import { useState, useEffect, useMemo } from 'react';

// CATEGORY METADATA CONFIGURATION
const CATEGORY_CONFIG = {
  'dzikir-pagi-petang': {
    title: 'Dzikir Pagi Petang',
    description: 'Amalan dzikir harian di waktu pagi dan petang.',
    slugs: ['dzikir-pagi', 'dzikir-petang'],
  },
  'doa-harian': {
    title: 'Doa Harian',
    description: 'Kumpulan doa untuk aktivitas sehari-hari.',
    slugs: ['doa-harian'],
  },
  'doa-pilihan': {
    title: 'Doa Pilihan',
    description: 'Doa-doa pilihan yang sering dipanjatkan.',
    slugs: ['doa-pilihan'],
  },
  'dzikir-setelah-shalat': {
    title: 'Dzikir Setelah Shalat',
    description: 'Dzikir yang dibaca setelah shalat fardhu.',
    slugs: ['dzikir-setelah-shalat'],
  },
};

export default function ListDoaPage({
  categoryKey = 'dzikir-pagi-petang',
  onBack,
}) {
  // STATE MANAGEMENT
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchInput, setSearchInput] = useState('');
  const [activeSearchQuery, setActiveSearchQuery] = useState('');
  const [searchValidationMsg, setSearchValidationMsg] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const config = CATEGORY_CONFIG[categoryKey];

  // API REQUEST HANDLERS

  // fetch complete category data to support frontend pagination and safe search intersection
  const fetchCategoryData = async () => {
    setLoading(true);
    setError(null);
    try {
      // fetch all slugs associated with the selected category config
      const fetchPromises = config.slugs.map((slug) =>
        fetch(`/v1/doa/kategori/${slug}?page=1&limit=1000`).then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch ${slug}`);
          return res.json();
        }),
      );

      const responses = await Promise.all(fetchPromises);

      // merge datasets and deduplicate by id
      const mergedData = [];
      const seenIds = new Set();

      responses.forEach((res) => {
        const items = res.data || res; // handle potential API wrappers
        items.forEach((item) => {
          if (!seenIds.has(item.id)) {
            seenIds.add(item.id);
            mergedData.push(item);
          }
        });
      });

      // preserve deterministic order using urutan
      mergedData.sort((a, b) => (a.urutan || 0) - (b.urutan || 0));

      setCategoryData(mergedData);
    } catch (err) {
      setError('Terjadi kesalahan saat memuat data. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  // initial category data load
  useEffect(() => {
    fetchCategoryData();
    // reset states when category changes
    setSearchInput('');
    setActiveSearchQuery('');
    setPage(1);
  }, [categoryKey]);

  // execute search against API and intersect with local category data
  const executeSearch = async (keyword) => {
    setIsSearching(true);
    setError(null);
    try {
      const res = await fetch(
        `/v1/doa/search?q=${encodeURIComponent(keyword)}`,
      );
      if (!res.ok) throw new Error('Search request failed');
      const data = await res.json();
      const globalResults = data.data || data;

      // enforce current-category-only search safely on the frontend
      const categoryIds = new Set(categoryData.map((item) => item.id));
      const scopedResults = globalResults.filter((item) =>
        categoryIds.has(item.id),
      );

      setSearchResults(scopedResults);
      setActiveSearchQuery(keyword);
      setPage(1);
    } catch (err) {
      setError('Pencarian gagal. Silakan coba lagi.');
    } finally {
      setIsSearching(false);
    }
  };

  // EVENT HANDLERS

  // handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = searchInput.trim();

    if (trimmedInput.length > 0 && trimmedInput.length < 3) {
      setSearchValidationMsg('Minimal 3 karakter untuk pencarian.');
      return;
    }

    setSearchValidationMsg('');

    if (trimmedInput.length >= 3) {
      executeSearch(trimmedInput);
    } else if (trimmedInput.length === 0) {
      clearSearch();
    }
  };

  // clear search state and restore category list
  const clearSearch = () => {
    setSearchInput('');
    setActiveSearchQuery('');
    setSearchValidationMsg('');
    setSearchResults([]);
    setPage(1);
  };

  // reset pagination when limit changes
  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  // DERIVED STATE & PAGINATION MATH

  const currentDataset = activeSearchQuery ? searchResults : categoryData;
  const totalItems = currentDataset.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalItems);
  const paginatedData = currentDataset.slice(startIndex, endIndex);

  // MAIN RENDER
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      {/* HEADER SECTION */}
      <header className="bg-white border-b border-emerald-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-emerald-50 text-emerald-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Kembali ke halaman utama"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* CATEGORY INTRODUCTION */}
        <section className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-900 mb-2">
            {config.title}
          </h1>
          <p className="text-stone-600">{config.description}</p>
          {!loading && !activeSearchQuery && (
            <p className="text-sm font-medium text-emerald-700 mt-2">
              Total: {categoryData.length} item
            </p>
          )}
        </section>

        {/* SEARCH AREA */}
        <section className="mb-8">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative flex items-center">
              <span className="absolute left-4 text-emerald-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  if (searchValidationMsg) setSearchValidationMsg('');
                }}
                placeholder="Cari doa atau dzikir..."
                className="w-full pl-12 pr-12 py-4 bg-white border border-emerald-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-stone-700"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput('')}
                  className="absolute right-4 text-stone-400 hover:text-stone-600 p-1"
                  aria-label="Hapus teks pencarian"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
            {searchValidationMsg && (
              <p className="text-red-500 text-sm mt-2 ml-2">
                {searchValidationMsg}
              </p>
            )}
          </form>

          {/* active search indicator & reset */}
          {activeSearchQuery && (
            <div className="flex items-center justify-between mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <p className="text-sm text-emerald-800">
                Menampilkan hasil untuk:{' '}
                <span className="font-semibold">"{activeSearchQuery}"</span>
              </p>
              <button
                onClick={clearSearch}
                className="text-sm font-medium text-emerald-700 hover:text-emerald-900 bg-white px-3 py-1 rounded-md shadow-sm border border-emerald-200"
              >
                Bersihkan Pencarian
              </button>
            </div>
          )}
        </section>

        {/* FEEDBACK STATES */}
        {loading || isSearching ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm border border-emerald-50 p-6 animate-pulse"
              >
                <div className="h-6 bg-emerald-100 rounded w-1/3 mb-6 ml-auto"></div>
                <div className="h-20 bg-emerald-50 rounded w-full mb-6"></div>
                <div className="h-4 bg-stone-100 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-stone-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-800 p-6 rounded-2xl text-center border border-red-100">
            <p className="mb-4">{error}</p>
            <button
              onClick={
                activeSearchQuery
                  ? () => executeSearch(activeSearchQuery)
                  : fetchCategoryData
              }
              className="bg-red-100 hover:bg-red-200 text-red-800 font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        ) : currentDataset.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-emerald-100 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-emerald-200 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <p className="text-stone-500 font-medium">
              {activeSearchQuery
                ? 'Doa atau dzikir tidak ditemukan.'
                : 'Belum ada doa atau dzikir dalam kategori ini.'}
            </p>
            {activeSearchQuery && (
              <button
                onClick={clearSearch}
                className="mt-4 text-emerald-600 font-medium hover:text-emerald-700"
              >
                Bersihkan Pencarian
              </button>
            )}
          </div>
        ) : (
          <>
            {/* PAGINATION INFO HEADER */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 text-sm text-stone-600 gap-4">
              <p>
                Menampilkan {startIndex + 1}&ndash;{endIndex} dari {totalItems}{' '}
                doa
              </p>
              <div className="flex items-center gap-2">
                <label htmlFor="limit-select" className="font-medium">
                  Tampilkan:
                </label>
                <select
                  id="limit-select"
                  value={limit}
                  onChange={handleLimitChange}
                  className="bg-white border border-emerald-200 text-stone-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value={5}>5 per halaman</option>
                  <option value={10}>10 per halaman</option>
                </select>
              </div>
            </div>

            {/* CARDS LISTING AREA */}
            <div className="space-y-6 mb-8">
              {paginatedData.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-3xl shadow-sm border border-emerald-100 p-5 md:p-8"
                >
                  {/* card header */}
                  <div className="flex justify-between items-start mb-6 border-b border-emerald-50 pb-4">
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full shrink-0">
                      {item.urutan}
                    </span>
                    <h2 className="text-lg md:text-xl font-bold text-emerald-950 text-right ml-4 leading-snug">
                      {item.judul}
                    </h2>
                  </div>

                  {/* arabic text */}
                  <div className="mb-8 text-right overflow-x-auto" dir="rtl">
                    <p className="text-2xl md:text-3xl font-arabic text-stone-800 leading-loose md:leading-loose">
                      {item.arab}
                    </p>
                  </div>

                  {/* latin & translation */}
                  <div className="space-y-5 mb-6">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1.5">
                        Latin
                      </h3>
                      <p className="text-stone-600 italic leading-relaxed">
                        {item.latin}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1.5">
                        Terjemahan
                      </h3>
                      <p className="text-stone-800 leading-relaxed">
                        {item.terjemah}
                      </p>
                    </div>
                  </div>

                  {/* fawaid & catatan conditionals */}
                  {(item.fawaid || item.catatan) && (
                    <div className="grid gap-4 mb-6">
                      {item.fawaid && (
                        <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1.5">
                            Fawaid
                          </h3>
                          <p className="text-emerald-950 text-sm leading-relaxed">
                            {item.fawaid}
                          </p>
                        </div>
                      )}
                      {item.catatan && (
                        <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1.5">
                            Catatan
                          </h3>
                          <p className="text-amber-950 text-sm leading-relaxed">
                            {item.catatan}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* source reference */}
                  <div className="pt-4 border-t border-stone-100">
                    <h3 className="text-xs font-bold text-stone-400 mb-1">
                      Sumber
                    </h3>
                    <p className="text-stone-500 text-sm">{item.sumber}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-emerald-100 pt-6">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm font-medium rounded-lg text-emerald-700 bg-white border border-emerald-200 hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  &larr; Sebelumnya
                </button>
                <span className="text-sm font-medium text-stone-600">
                  Halaman {page} dari {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 text-sm font-medium rounded-lg text-emerald-700 bg-white border border-emerald-200 hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Selanjutnya &rarr;
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
