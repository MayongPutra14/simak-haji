import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSurahById } from '../../hooks/global/useQuran';
import { titleCase } from '../../utils/helpers/helpers';
import { ReadSurahSkeleton } from '../../components/ui/global/skeletons/SkeletonLoading';
import {
  IconArrowLeft,
  IconChevronNext,
  IconChevronBack,
  IconLocationFill,
  IconHash,
  IconAlertCircle,
  IconChevronDown,
} from '../../utils/helpers/decorations';

export default function SurahReadingPage() {
  const { surahId } = useParams();
  const navigate = useNavigate();
  const { surahData, isLoading, error } = useSurahById(surahId);
  const [currentSurahId, setCurrentSurahId] = useState(surahId);
  const [activeVerse, setActiveVerse] = useState(null);

  if (isLoading || !surahData || !surahId) return <ReadSurahSkeleton />;

  // Handle Go-to-Verse Navigation
  function handleGoToVerse(e) {
    const verseNum = parseInt(e.target.value, 10);
    if (!verseNum) return;

    setActiveVerse(verseNum);
    const verseElement = document.getElementById(`verse-${verseNum}`);

    if (verseElement) {
      // Calculate offset to ensure it's not hidden behind sticky headers if any were added later
      const yOffset = -20;
      const y =
        verseElement.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  function handleBack() {
    navigate(-1);
  }

  const handleNavigateSurah = (targetSurahId) => {
    navigate(`/quran/read/${targetSurahId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveVerse(null);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#FDFDFB] flex flex-col items-center justify-center p-6 text-center">
        <IconAlertCircle className="w-16 h-16 text-rose-500 mb-4" />
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Terjadi Kesalahan
        </h2>
        <p className="text-slate-600 mb-6 max-w-md">{error}</p>
        <button
          onClick={() => setCurrentSurahId(currentSurahId)}
          className="px-6 py-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-800 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-teal-50 text-teal-900 font-sans selection:bg-teal-200 selection:text-teal-900 pb-8">
      {/* 1. Top Navigation */}
      <nav className="sticky top-0 z-10 bg-[#FDFDFB]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => handleBack()}
            className="flex items-center space-x-2 text-slate-600 hover:text-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md p-1 -ml-1"
            aria-label="Kembali ke Daftar Surah"
          >
            <IconArrowLeft className="w-5 h-5" />
            <span className="font-medium hidden sm:inline">Kembali</span>
          </button>

          <div className="flex items-center space-x-3">
            <label
              htmlFor="go-to-verse"
              className="text-sm font-medium text-slate-500 hidden sm:block"
            >
              Menuju Ayat:
            </label>
            <div className="relative">
              <select
                id="go-to-verse"
                className="appearance-none bg-teal-600 border border-stone-200 text-white py-1.5 pl-3 pr-8 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer"
                onChange={handleGoToVerse}
                value={activeVerse || ''}
                aria-label="Pilih ayat untuk dituju"
              >
                <option value="" disabled className="text-white">
                  Pilih...
                </option>
                {surahData.ayat.map((verse) => (
                  <option key={verse.id} value={verse.nomor}>
                    Ayat {verse.nomor}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <IconChevronDown />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* 2. Surah Information Header */}
        <header className="mb-12 flex flex-col items-center text-center">
          <h1
            className="text-5xl md:text-6xl font-normal text-emerald-800 mb-4"
            dir="rtl"
            style={{ fontFamily: "'Scheherazade New', 'Amiri', serif" }}
          >
            {surahData.nama}
          </h1>
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight text-teal-900">
              {surahData.nama_latin}
            </h2>
            <p className="text-teal-500 font-medium">"{surahData.arti}"</p>
          </div>
          <div className="flex items-center justify-center space-x-4 mt-6 text-sm text-white bg-teal-600 px-6 py-2.5 rounded-full border-transparent shadow-sm">
            <div className="flex items-center">
              <IconHash className="w-4 h-4 mr-1.5 text-white" />
              <span>{surahData.jumlah_ayat} Ayat</span>
            </div>
            <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
            <div className="flex items-center">
              <IconLocationFill className="w-4 h-4 mr-1.5 text-white" />
              <span>{titleCase(surahData.tempat_turun)}</span>
            </div>
          </div>
        </header>

        {/* 3 & 4. Verse Reading Area & Active Highlight */}
        <div className="space-y-6 md:space-y-8">
          {surahData.ayat.map((verse) => {
            const isActive = activeVerse === verse.nomor;
            return (
              <article
                key={verse.id}
                id={`verse-${verse.nomor}`}
                onClick={() => setActiveVerse(verse.nomor)}
                className={`
                  relative flex flex-col sm:flex-row gap-6 p-4 md:p-6 rounded-2xl transition-all duration-300
                  border focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2
                  ${
              isActive
                ? 'bg-emerald-50/60 border-emerald-200/80 shadow-sm'
                : 'bg-white border-transparent hover:bg-stone-50'
              }
                `}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveVerse(verse.nomor);
                  }
                }}
              >
                {/* Verse Number Indicator */}
                <div className="shrink-0 flex items-start sm:pt-2">
                  <div
                    className={`
                    w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold border-2
                    transition-colors duration-300
                    ${isActive ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-stone-100 text-slate-500 border-stone-200'}
                  `}
                  >
                    {verse.nomor}
                  </div>
                </div>

                {/* Verse Content */}
                <div className="flex-1 flex flex-col w-full min-w-0">
                  {/* Arabic Text */}
                  <p
                    className="text-right text-3xl sm:text-4xl leading-[2.5] sm:leading-[2.5] text-slate-900 mb-6 wrap-break-words"
                    dir="rtl"
                    lang="ar"
                    style={{
                      fontFamily:
                        "'Scheherazade New', 'Amiri', 'Traditional Arabic', serif",
                    }}
                  >
                    {verse.ar}
                  </p>

                  {/* Transliteration */}
                  <p className="text-emerald-500/90 font-medium text-base sm:text-lg mb-3 leading-relaxed">
                    {`${verse.nomor}. ${verse.tr}`}
                  </p>

                  {/* Translation */}
                  <p className="text-slate-600 leading-relaxed text-[15px] sm:text-base">
                    {verse.idn}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* 5. Previous and Next Surah Navigation */}
        <nav className="mt-16 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          {surahData.surat_sebelumnya !== false &&
          surahData.surat_sebelumnya ? (
              <button
                onClick={() =>
                  handleNavigateSurah(surahData.surat_sebelumnya.nomor)
                }
                className="w-full sm:w-auto flex items-center justify-center sm:justify-start px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white transition-colors group focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer"
              >
                <IconChevronBack className="w-5 h-5 mr-2 text-slate-200 group-hover:text-emerald-600 transition-colors" />
                <div className="flex flex-col items-start">
                  <span className="text-xs font-medium text-slate-200">
                  Surah Sebelumnya
                  </span>
                  <span className="font-semibold text-sm">
                    {`${surahData.surat_sebelumnya.nama_latin}(Surah ${surahData.surat_sebelumnya.nomor})`}
                  </span>
                  <span className="text-xs font-medium text-slate-200">
                    {`${surahData.surat_sebelumnya.jumlah_ayat} Ayat • ${titleCase(surahData.surat_sebelumnya.tempat_turun)}`}
                  </span>
                </div>
              </button>
            ) : (
              <div className="w-full sm:w-auto px-5 py-3 invisible"></div>
            )}
          {surahData.surat_selanjutnya !== false &&
          surahData.surat_selanjutnya ? (
              <button
                onClick={() =>
                  handleNavigateSurah(surahData.surat_selanjutnya.nomor)
                }
                className="w-full sm:w-auto flex items-center justify-center sm:justify-end px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white transition-colors group focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 text-right cursor-pointer"
              >
                <div className="flex flex-col items-end">
                  <span className="text-xs font-medium text-slate-200">
                  Surah Selanjutnya
                  </span>
                  <span className="font-semibold text-sm">
                    {`${surahData.surat_selanjutnya.nama_latin} (Surah ${surahData.surat_selanjutnya.nomor})`}
                  </span>
                  <span className="text-xs font-medium text-slate-200">
                    {`${surahData.surat_selanjutnya.jumlah_ayat} Ayat • ${titleCase(surahData.surat_selanjutnya.tempat_turun)}`}
                  </span>
                </div>
                <IconChevronNext className="w-5 h-5 ml-2 text-slate-200 group-hover:text-emerald-600 transition-colors" />
              </button>
            ) : (
              <div className="w-full sm:w-auto px-5 py-3 invisible"></div>
            )}
        </nav>
      </main>
    </div>
  );
}
