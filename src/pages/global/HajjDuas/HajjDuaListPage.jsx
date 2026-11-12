import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { CATEGORY_CONFIG } from '../../../utils/helpers/constant';
import { normalizePrayerData } from '../../../utils/helpers/helpers';
import {
  IconArrowLeft,
  IconBookClose,
  IconChevronNext,
  IconLoading,
} from '../../../utils/helpers/decorations';

// HEADER COMPONENT
const PrayerListHeader = ({ title, onNavigateBack }) => (
  <header className="flex items-center gap-4 mb-6">
    <button
      onClick={onNavigateBack}
      className="p-2 rounded-full bg-emerald-900/30 hover:bg-emerald-800/50 border border-emerald-400/20 text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
      aria-label="Kembali ke halaman utama"
    >
      <IconArrowLeft size={24} />
    </button>
    <h1 className="text-xl md:text-2xl font-semibold text-slate-100 truncate">
      {title}
    </h1>
  </header>
);

// CATEGORY INFO COMPONENT
const CategoryInformation = ({ title, description, count }) => (
  <section className="mb-8">
    <h2 className="text-xl font-medium text-slate-100 mb-2">{title}</h2>
    <p className="text-emerald-200/80 text-base md:text-lg mb-2">
      {description}
    </p>
    <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-900/40 border border-emerald-500/20 text-teal-400 text-sm font-medium">
      {count} Kumpulan Doa
    </div>
  </section>
);

// PRAYER LIST ITEM COMPONENT
const PrayerListItem = ({ prayer, index, onClick }) => {
  // Format index to always be two digits (e.g., 01, 02)
  const displayId = String(index + 1).padStart(2, '0');

  return (
    <button
      onClick={() => onClick(prayer.id)}
      className="group w-full flex items-center gap-4 p-4 rounded-xl bg-emerald-950/40 backdrop-blur-md border border-emerald-400/20 hover:bg-emerald-800/50 hover:border-teal-400/50 hover:shadow-md hover:shadow-teal-900/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 text-left"
    >
      {/* NUMBER INDICATOR */}
      <div className="shrink-0 text-emerald-500/50 font-mono font-medium text-sm w-6">
        {displayId}
      </div>
      {/* ICON CONTAINER */}
      <div className="shrink-0 p-2.5 rounded-lg bg-emerald-900/40 text-emerald-400 group-hover:bg-teal-900/60 group-hover:text-teal-300 transition-colors duration-300">
        <IconBookClose size={18} strokeWidth={2} />
      </div>
      {/* TITLE */}
      <div className="grow min-w-0">
        <h3 className="text-base font-medium text-slate-200 group-hover:text-slate-100 truncate">
          {prayer.name}
        </h3>
      </div>
      {/* NAVIGATION ARROW */}
      <div className="shrink-0 text-emerald-600/40 group-hover:text-teal-400 transition-colors duration-300">
        <IconChevronNext size={20} />
      </div>
    </button>
  );
};

// MAIN COMPONENT
export default function HajjDuaListPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [prayers, setPrayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve configuration based on the prop
  const category = CATEGORY_CONFIG[categoryId];

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (!category) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Fetch and normalize data
        const rawJson = await category.fetchData();
        const normalizedData = normalizePrayerData(rawJson);

        if (isMounted) {
          setPrayers(normalizedData);
        }
      } catch (err) {
        console.error('Failed to load prayer data:', err);
        if (isMounted) {
          // If you are missing the JSON files initially during build,
          // this catches the dynamic import failure gracefully.
          setError('Gagal memuat data doa. Pastikan file JSON tersedia.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [category]);

  function handlePrayerSelect(prayerId) {
    // navigate to detail page passing necessary parameters
    navigate(`/hajj/categories/${categoryId}/${prayerId}`);
  }

  function handleBack() {
    navigate(-1);
  }

  // ERROR STATE: Invalid Category
  if (!category) {
    return (
      <div className="min-h-screen bg-linear-to-br from-emerald-950 via-teal-950 to-emerald-900 p-4 md:p-8 flex flex-col items-center justify-center">
        <p className="text-slate-200 mb-6 text-center">
          Kategori tidak ditemukan.
        </p>
        <button
          onClick={handleBack}
          className="px-6 py-2 rounded-full bg-emerald-800 hover:bg-emerald-700 text-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
        >
          Kembali ke Menu Utama
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-950 via-teal-950 to-emerald-900 p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <PrayerListHeader title={category.title} onNavigateBack={handleBack} />
        <CategoryInformation
          title={category.title}
          description={category.description}
          count={isLoading ? '...' : prayers.length}
        />
        {/* LIST CONTAINER */}
        <main className="flex flex-col gap-3 pb-12">
          {isLoading && (
            <div className="flex justify-center p-8">
              <IconLoading className="w-8 h-8 text-teal-500 animate-spin" />
            </div>
          )}

          {!isLoading && error && (
            <div className="p-6 rounded-xl bg-red-950/40 border border-red-500/20 text-center">
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {!isLoading && !error && prayers.length === 0 && (
            <div className="p-8 text-center text-emerald-300/60 bg-emerald-900/20 rounded-xl border border-emerald-800/30">
              Belum ada doa tersedia dalam kategori ini.
            </div>
          )}

          {!isLoading &&
            !error &&
            prayers.map((prayer, index) => (
              <PrayerListItem
                key={prayer.id}
                prayer={prayer}
                index={index}
                onClick={handlePrayerSelect}
              />
            ))}
        </main>
      </div>
    </div>
  );
}
