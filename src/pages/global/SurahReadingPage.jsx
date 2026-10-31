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
    // MAIN CONTAINER
    <div className="min-h-screen bg-linear-to-br from-emerald-950 via-teal-900 to-emerald-900 text-slate-100 font-sans selection:bg-teal-400 selection:text-emerald-950 pb-12">
      {/* 1. TOP NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-emerald-950/80 backdrop-blur-md border-b border-emerald-800/50 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => handleBack()}
            className="inline-flex items-center gap-2 text-emerald-100 hover:text-white hover:bg-emerald-800/50 active:bg-emerald-800/80 p-2 sm:px-3.5 sm:py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            aria-label="Kembali ke Daftar Surah"
          >
            <IconArrowLeft className="w-5 h-5 shrink-0" />
            <span className="hidden sm:inline">Kembali</span>
          </button>

          <div className="flex items-center space-x-3">
            <label
              htmlFor="go-to-verse"
              className="text-sm font-medium text-emerald-200/80 hidden sm:block"
            >
              Menuju Ayat:
            </label>
            <div className="relative">
              <select
                id="go-to-verse"
                className="appearance-none bg-emerald-900/80 border border-emerald-700/60 text-teal-200 py-1.5 pl-3.5 pr-9 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 cursor-pointer shadow-sm hover:bg-emerald-800/80 transition-colors"
                onChange={handleGoToVerse}
                value={activeVerse || ''}
                aria-label="Pilih ayat untuk dituju"
              >
                <option
                  value=""
                  disabled
                  className="bg-emerald-950 text-slate-400"
                >
                  Pilih...
                </option>
                {surahData.ayat.map((verse) => (
                  <option
                    key={verse.id}
                    value={verse.nomor}
                    className="bg-emerald-950 text-teal-100"
                  >
                    Ayat {verse.nomor}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-teal-300">
                <IconChevronDown />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* 2. SURAH INFORMATION HEADER */}
        <header className="mb-12 flex flex-col items-center text-center space-y-4">
          <h1
            className="text-5xl md:text-7xl font-normal text-teal-100 mb-2 drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]"
            dir="rtl"
            style={{ fontFamily: "'Scheherazade New', 'Amiri', serif" }}
          >
            {surahData.nama}
          </h1>
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-linear-to-r from-teal-200 via-emerald-300 to-teal-100 bg-clip-text text-transparent">
              {surahData.nama_latin}
            </h2>
            <p className="text-teal-300/80 font-medium text-base">
              "{surahData.arti}"
            </p>
          </div>

          {/* BADGE DETAILS */}
          <div className="flex items-center justify-center space-x-4 mt-4 text-xs sm:text-sm font-semibold text-teal-200 bg-emerald-900/60 border border-emerald-700/50 px-6 py-2.5 rounded-full shadow-lg backdrop-blur-md">
            <div className="flex items-center">
              <IconHash className="w-4 h-4 mr-1.5 text-teal-300" />
              <span>{surahData.jumlah_ayat} Ayat</span>
            </div>
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            <div className="flex items-center">
              <IconLocationFill className="w-4 h-4 mr-1.5 text-teal-300" />
              <span>{titleCase(surahData.tempat_turun)}</span>
            </div>
          </div>
        </header>

        {/* 3 & 4. VERSE READING AREA & ACTIVE HIGHLIGHT */}
        <div className="space-y-6 md:space-y-8">
          {surahData.ayat.map((verse) => {
            const isActive = activeVerse === verse.nomor;
            return (
              <article
                key={verse.id}
                id={`verse-${verse.nomor}`}
                onClick={() => setActiveVerse(verse.nomor)}
                className={`
                  relative flex flex-col sm:flex-row gap-6 p-5 md:p-7 rounded-2xl transition-all duration-300
                  border outline-none backdrop-blur-sm cursor-pointer
                  ${
              isActive
                ? 'bg-emerald-900/90 border-teal-400 ring-2 ring-teal-400/50 shadow-[0_0_20px_rgba(45,212,191,0.25)]'
                : 'bg-emerald-900/40 border-emerald-800/60 hover:border-emerald-600 hover:bg-emerald-900/60 shadow-sm'
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
                      w-11 h-11 flex items-center justify-center rounded-xl text-sm font-bold border
                      transition-colors duration-300 shadow-inner
                      ${
              isActive
                ? 'bg-teal-400 text-emerald-950 border-teal-300'
                : 'bg-emerald-950 text-teal-300 border-emerald-800'
              }
                    `}
                  >
                    {verse.nomor}
                  </div>
                </div>

                {/* Verse Content */}
                <div className="flex-1 flex flex-col w-full min-w-0">
                  {/* Arabic Text */}
                  <p
                    className="text-right text-3xl sm:text-4xl leading-[2.5] sm:leading-[2.5] text-teal-100 mb-6 wrap-break-words drop-shadow-sm"
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
                  <p className="text-teal-300 font-medium text-base sm:text-lg mb-3 leading-relaxed">
                    {`${verse.nomor}. ${verse.tr}`}
                  </p>

                  {/* Translation */}
                  <p className="text-emerald-100/80 leading-relaxed text-[15px] sm:text-base">
                    {verse.idn}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* 5. PREVIOUS AND NEXT SURAH NAVIGATION */}
        <nav className="mt-16 pt-8 border-t border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          {surahData.surat_sebelumnya !== false &&
          surahData.surat_sebelumnya ? (
              <button
                onClick={() =>
                  handleNavigateSurah(surahData.surat_sebelumnya.nomor)
                }
                className="w-full sm:w-auto flex items-center justify-center sm:justify-start px-5 py-3.5 rounded-2xl bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-700/60 text-emerald-100 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer backdrop-blur-sm"
              >
                <IconChevronBack className="w-5 h-5 mr-3 text-teal-300 group-hover:-translate-x-1 transition-transform" />
                <div className="flex flex-col items-start text-left">
                  <span className="text-xs font-semibold text-teal-300/80 uppercase tracking-wider">
                  Surah Sebelumnya
                  </span>
                  <span className="font-bold text-sm text-teal-100 group-hover:text-teal-200">
                    {`${surahData.surat_sebelumnya.nama_latin} (Surah ${surahData.surat_sebelumnya.nomor})`}
                  </span>
                  <span className="text-xs font-medium text-emerald-300/70">
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
                className="w-full sm:w-auto flex items-center justify-center sm:justify-end px-5 py-3.5 rounded-2xl bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-700/60 text-emerald-100 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-teal-400 text-right cursor-pointer backdrop-blur-sm"
              >
                <div className="flex flex-col items-end text-right">
                  <span className="text-xs font-semibold text-teal-300/80 uppercase tracking-wider">
                  Surah Selanjutnya
                  </span>
                  <span className="font-bold text-sm text-teal-100 group-hover:text-teal-200">
                    {`${surahData.surat_selanjutnya.nama_latin} (Surah ${surahData.surat_selanjutnya.nomor})`}
                  </span>
                  <span className="text-xs font-medium text-emerald-300/70">
                    {`${surahData.surat_selanjutnya.jumlah_ayat} Ayat • ${titleCase(surahData.surat_selanjutnya.tempat_turun)}`}
                  </span>
                </div>
                <IconChevronNext className="w-5 h-5 ml-3 text-teal-300 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <div className="w-full sm:w-auto px-5 py-3 invisible"></div>
            )}
        </nav>
      </main>
    </div>
  );
}
