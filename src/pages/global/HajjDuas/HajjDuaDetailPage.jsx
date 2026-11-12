import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { normalizePrayerData } from '../../../utils/helpers/helpers';
import {
  CATEGORY_CONFIG,
  CATEGORY_ORDER,
} from '../../../utils/helpers/constant';
import {
  IconArrowLeft,
  IconChevronNext,
  IconChevronBack,
  IconClose,
  IconLoading,
  IconAdjust,
} from '../../../utils/helpers/decorations';

// 1. HEADER COMPONENT
const PrayerReadingHeader = ({ onNavigateBack, onOpenNavigation }) => (
  <header className="sticky top-0 z-40 flex items-center justify-between p-4 md:px-8 bg-emerald-950/90 backdrop-blur-md border-b border-emerald-400/20 shadow-md shadow-emerald-950/40">
    <div className="flex items-center gap-4">
      <button
        onClick={onNavigateBack}
        className="p-2 rounded-full bg-emerald-900/50 hover:bg-emerald-800/70 border border-emerald-500/30 text-emerald-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer"
        aria-label="Kembali ke daftar doa"
      >
        <IconArrowLeft size={24} />
      </button>
      <h1 className="text-xl md:text-2xl font-semibold text-slate-100">
        Detail Doa
      </h1>
    </div>
    <button
      onClick={onOpenNavigation}
      className="p-2.5 rounded-xl bg-teal-900/40 hover:bg-teal-800/60 border border-teal-500/30 text-teal-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer"
      aria-label="Buka navigasi cepat"
    >
      <IconAdjust size={22} />
    </button>
  </header>
);

// 2. CATEGORY INFO COMPONENT
const CategoryInformation = ({ title, description }) => (
  <section className="px-4 py-6 md:px-8 text-center max-w-2xl mx-auto">
    <h2 className="text-teal-400 font-semibold tracking-wide text-xl md:text-xl  mb-2">
      {title}
    </h2>
    <p className="text-emerald-200/80 text-sm md:text-base leading-relaxed">
      {description}
    </p>
  </section>
);

// 3. READING CARD COMPONENTS
const ArabicText = ({ text }) => (
  <div dir="rtl" className="text-right mb-8">
    <p className="font-arabic text-3xl md:text-4xl leading-[2.2] md:leading-[2.5] text-slate-100 antialiased font-medium wrap-break-words">
      {text}
    </p>
  </div>
);

const TransliterationText = ({ text }) => (
  <div className="mb-6">
    <p className="text-teal-300/90 text-base md:text-lg leading-relaxed font-medium italic">
      {text}
    </p>
  </div>
);

const TranslationText = ({ text }) => (
  <div className="pt-4 border-t border-emerald-800/50">
    <p className="text-emerald-100/80 text-sm md:text-base leading-relaxed">
      {text}
    </p>
  </div>
);

const PrayerReadingCard = React.forwardRef(
  ({ prayer, index, isActive, onSelect }, ref) => {
    const displayId = String(index + 1).padStart(2, '0');

    return (
      <article
        ref={ref}
        onClick={onSelect}
        className={`scroll-mt-24 p-6 md:p-8 rounded-2xl backdrop-blur-md border transition-all duration-300 cursor-pointer ${
          isActive
            ? 'bg-emerald-900/80 border-teal-400/60 shadow-2xl shadow-teal-950/50 ring-2 ring-teal-400/40'
            : 'bg-emerald-950/80 border-emerald-400/20 shadow-xl shadow-emerald-950/60 hover:border-emerald-400/40'
        }`}
      >
        <div className="flex items-start gap-4 mb-8 pb-4 border-b border-emerald-800/50">
          <div
            className={`shrink-0 mt-0.5 font-mono font-bold text-sm w-6 ${
              isActive
                ? 'text-teal-300 scale-110 transition-transform'
                : 'text-teal-400/80'
            }`}
          >
            {displayId}
          </div>
          <div className="grow">
            <h3 className="text-lg md:text-xl font-semibold text-slate-100 mb-1.5">
              {prayer.name}
            </h3>
            {prayer.description && (
              <p className="text-emerald-300/70 text-sm">
                {prayer.description}
              </p>
            )}
          </div>
        </div>

        <ArabicText text={prayer.arab} />
        <TransliterationText text={prayer.transliteration} />
        <TranslationText text={prayer.translation} />
      </article>
    );
  },
);

// 4. QUICK NAVIGATION PANEL
const QuickPrayerNavigation = ({
  isOpen,
  onClose,
  prayers,
  activePrayerId,
  onSelectPrayer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity">
      <div className="w-full md:w-96 bg-emerald-950 border-l border-emerald-800/50 h-full flex flex-col shadow-2xl animate-in slide-in-from-right-full duration-300">
        <div className="flex items-center justify-between p-4 border-b border-emerald-800/50">
          <div>
            <h3 className="text-slate-100 font-medium">Daftar Doa</h3>
            <p className="text-emerald-400/60 text-xs mt-1">
              {prayers.length} Doa tersedia
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-emerald-400 hover:bg-emerald-900/50 rounded-lg transition-colors focus:outline-none cursor-pointer"
          >
            <IconClose size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {prayers.map((prayer, index) => {
            const isActive = String(prayer.id) === String(activePrayerId);
            const displayId = String(index + 1).padStart(2, '0');

            return (
              <button
                key={prayer.id}
                onClick={() => {
                  onSelectPrayer(prayer.id);
                  onClose();
                }}
                className={`w-full flex items-start gap-3 p-3 mb-1 text-left rounded-xl transition-all focus:outline-none cursor-pointer ${
                  isActive
                    ? 'bg-teal-900/60 border border-teal-500/50 shadow-inner'
                    : 'hover:bg-emerald-900/40 border border-transparent'
                }`}
              >
                <span
                  className={`font-mono text-xs mt-0.5 ${
                    isActive ? 'text-teal-400 font-bold' : 'text-emerald-500/60'
                  }`}
                >
                  {displayId}
                </span>
                <span
                  className={`text-sm ${
                    isActive ? 'text-teal-100 font-medium' : 'text-slate-300'
                  }`}
                >
                  {prayer.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// 5. BOTTOM CATEGORY SWITCHER CONTROLS
const PrayerNavigationControls = ({
  currentCategoryIndex,
  onNavigateCategory,
}) => {
  const isFirstCategory = currentCategoryIndex === 0;
  const isLastCategory = currentCategoryIndex === CATEGORY_ORDER.length - 1;

  const prevCategory = !isFirstCategory
    ? CATEGORY_CONFIG[CATEGORY_ORDER[currentCategoryIndex - 1]]
    : null;
  const nextCategory = !isLastCategory
    ? CATEGORY_CONFIG[CATEGORY_ORDER[currentCategoryIndex + 1]]
    : null;

  return (
    <div className="flex items-center justify-between gap-4 mt-12 pt-6 border-t border-emerald-800/40">
      <button
        onClick={() => onNavigateCategory('prev')}
        disabled={isFirstCategory}
        className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
          isFirstCategory
            ? 'opacity-30 cursor-not-allowed text-emerald-600 border border-transparent'
            : 'bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-200 hover:text-teal-200 border border-emerald-700/40'
        }`}
      >
        <IconChevronBack size={18} />
        <span className="hidden sm:inline">
          {prevCategory
            ? `Kategori: ${prevCategory.title}`
            : 'Kategori Sebelumnya'}
        </span>
        <span className="sm:hidden">Sebelumnya</span>
      </button>

      <button
        onClick={() => onNavigateCategory('next')}
        disabled={isLastCategory}
        className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
          isLastCategory
            ? 'opacity-30 cursor-not-allowed text-emerald-600 border border-transparent'
            : 'bg-teal-900/40 hover:bg-teal-800/60 text-teal-200 hover:text-teal-100 border border-teal-700/40'
        }`}
      >
        <span className="hidden sm:inline">
          {nextCategory
            ? `Kategori: ${nextCategory.title}`
            : 'Kategori Selanjutnya'}
        </span>
        <span className="sm:hidden">Selanjutnya</span>
        <IconChevronNext size={18} />
      </button>
    </div>
  );
};

// MAIN COMPONENT
export default function HajjDuaDetailPage() {
  const { categoryId, prayerId } = useParams();
  const navigate = useNavigate();

  const [prayers, setPrayers] = useState([]);
  const [activePrayerId, setActivePrayerId] = useState(prayerId);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const prayerRefs = useRef({});
  const category = CATEGORY_CONFIG[categoryId];
  const currentCategoryIndex = CATEGORY_ORDER.indexOf(categoryId);

  // Fetch prayer data whenever categoryId route parameter changes
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
        const rawJson = await category.fetchData();
        const normalizedData = normalizePrayerData(rawJson);
        if (isMounted) {
          setPrayers(normalizedData);

          if (normalizedData.length > 0) {
            const isValidPrayerId = normalizedData.some(
              (p) => String(p.id) === String(prayerId),
            );
            if (prayerId && isValidPrayerId) {
              setActivePrayerId(prayerId);
            } else {
              setActivePrayerId(normalizedData[0].id);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load prayer data:', err);
        if (isMounted)
          setError('Gagal memuat data doa. Pastikan file JSON tersedia.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, [categoryId, category, prayerId]);

  // Smooth scroll to selected prayer item when activePrayerId updates
  useEffect(() => {
    if (!isLoading && activePrayerId && prayerRefs.current[activePrayerId]) {
      prayerRefs.current[activePrayerId].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [activePrayerId, isLoading]);

  // Handle selecting prayer item and sync URL route
  const handleSelectPrayer = (selectedPrayerId) => {
    setActivePrayerId(selectedPrayerId);
    navigate(`/hajj/categories/${categoryId}/${selectedPrayerId}`, {
      replace: true,
    });
  };

  // Switch category and remain on detail page by appending target category prayer ID
  const handleNavigateCategory = async (direction) => {
    const targetIndex =
      direction === 'next'
        ? currentCategoryIndex + 1
        : currentCategoryIndex - 1;

    if (targetIndex >= 0 && targetIndex < CATEGORY_ORDER.length) {
      const targetCategoryId = CATEGORY_ORDER[targetIndex];
      const targetCategory = CATEGORY_CONFIG[targetCategoryId];

      if (targetCategory) {
        try {
          setIsLoading(true);
          const rawJson = await targetCategory.fetchData();
          const normalizedData = normalizePrayerData(rawJson);

          if (normalizedData.length > 0) {
            const targetPrayerId = normalizedData[0].id;

            navigate(`/hajj/categories/${targetCategoryId}/${targetPrayerId}`);
          }
        } catch (err) {
          console.error('Failed to load target category data:', err);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  function handleBack() {
    navigate(-1);
  }

  // Render error view if categoryId is invalid
  if (!category) {
    return (
      <div className="min-h-screen bg-linear-to-br from-emerald-950 via-teal-950 to-emerald-900 p-8 flex flex-col items-center justify-center font-sans text-slate-100">
        <p className="text-slate-200 mb-6">Kategori tidak ditemukan.</p>
        <button
          onClick={handleBack}
          className="px-6 py-2.5 rounded-full bg-emerald-800 hover:bg-emerald-700 text-slate-100 font-medium transition-colors cursor-pointer"
        >
          Kembali ke Daftar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-950 via-teal-950 to-emerald-900 font-sans pb-24 text-slate-100">
      <PrayerReadingHeader
        onNavigateBack={handleBack}
        onOpenNavigation={() => setIsNavOpen(true)}
      />

      <main className="max-w-3xl mx-auto pt-4">
        <CategoryInformation
          title={category.title}
          description={category.description}
        />

        <div className="px-4 md:px-8">
          {isLoading && (
            <div className="flex justify-center p-12">
              <IconLoading className="w-8 h-8 text-teal-400 animate-spin" />
            </div>
          )}

          {!isLoading && error && (
            <div className="p-6 rounded-xl bg-red-950/60 border border-red-500/30 text-center text-red-200">
              {error}
            </div>
          )}

          {!isLoading && !error && prayers.length === 0 && (
            <div className="p-8 text-center text-emerald-200/70 bg-emerald-950/60 rounded-xl border border-emerald-800/40">
              Belum ada doa tersedia dalam kategori ini.
            </div>
          )}

          {!isLoading && !error && (
            <div className="flex flex-col gap-6">
              {prayers.map((prayer, index) => (
                <PrayerReadingCard
                  key={prayer.id}
                  prayer={prayer}
                  index={index}
                  isActive={String(prayer.id) === String(activePrayerId)}
                  onSelect={() => handleSelectPrayer(prayer.id)}
                  ref={(el) => (prayerRefs.current[prayer.id] = el)}
                />
              ))}

              {prayers.length > 0 && (
                <PrayerNavigationControls
                  currentCategoryIndex={currentCategoryIndex}
                  onNavigateCategory={handleNavigateCategory}
                />
              )}
            </div>
          )}
        </div>
      </main>

      <QuickPrayerNavigation
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        prayers={prayers}
        activePrayerId={activePrayerId}
        onSelectPrayer={handleSelectPrayer}
      />
    </div>
  );
}
