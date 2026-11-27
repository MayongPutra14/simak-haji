import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Controller, useFieldArray } from 'react-hook-form';
import Button from './Button';
import BrickIlustration from '../../../assets/images/decorations/brick.webp';
import ConstructionIlustration from '../../../assets/images/decorations/construction.webp';
import SimakLogo from '../../../assets/images/simak-logo.webp';
import { getHomeRoute } from '../../../utils/helpers/helpers';
import { InputNumber, InputText, TextArea } from '../inputs/index';
import {
  IconBack,
  IconHome,
  IconTrash,
  IconCheckCircle,
  IconCalendar,
} from '../../../utils/helpers/decorations';
import { CARD_TONES } from '../../../utils/helpers/constant';

export const UnderDevelopment = ({ userRole }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen p-6 overflow-hidden text-center bg-white border rounded-2xl border-slate-100 sm:p-12">
      {/* BRICK DECORATION (1 TOP RIGHT, 1 MIDDLE LEFT, 1 BOTTOM RIGHT) */}
      <img
        src={BrickIlustration}
        alt=""
        aria-hidden="true"
        className="absolute w-32 h-auto opacity-25 pointer-events-none select-none top-3 right-3 sm:top-6 sm:right-6 sm:w-40 rotate-12"
      />

      <img
        src={BrickIlustration}
        alt=""
        aria-hidden="true"
        className="absolute w-32 h-auto -translate-y-1/2 opacity-25 pointer-events-none select-none top-1/3 -left-16 sm:left-6 sm:w-50 -rotate-12"
      />

      <img
        src={BrickIlustration}
        alt=""
        aria-hidden="true"
        className="absolute w-32 h-auto -rotate-45 opacity-25 pointer-events-none select-none bottom-2 right-3 sm:bottom-6 sm:right-6 sm:w-50"
      />

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 flex flex-col items-center max-w-lg mx-auto">
        {/* MAIN ILUSTRATION */}
        <div className="mb-6">
          <img
            src={ConstructionIlustration}
            alt="Fitur Dalam Pengembangan"
            className="object-contain h-auto mx-auto w-60 sm:w-70 max-h-80"
          />
        </div>

        {/* TITLE AND DESCRIPTION */}
        <h1 className="mb-3 text-2xl font-extrabold tracking-tight sm:text-3xl text-slate-800">
          Fitur Dalam Pengembangan
        </h1>
        <p className="text-sm leading-relaxed sm:text-base text-slate-600">
          Fitur ini sedang dalam tahap pengerjaan untuk memberikan layanan
          terbaik bagi Anda. Silakan kembali lagi secara berkala!
        </p>

        {/* BUTTON NAVIGATION */}
        <div className="flex flex-col items-center justify-center w-full gap-3 mt-8 sm:flex-row">
          <Button
            to={getHomeRoute(userRole)}
            icon={<IconHome className="w-4 h-4" />}
            className="bg-amber-500! hover:bg-amber-600! text-white! sm:w-auto"
          >
            Ke Beranda
          </Button>

          <Button
            variant="outline"
            onClick={handleGoBack}
            icon={<IconBack className="w-4 h-4" />}
            className="border-amber-500! text-amber-600! hover:bg-amber-50! sm:w-auto"
          >
            Kembali
          </Button>
        </div>
      </div>
    </div>
  );
};

export const WatermarkOverlay = ({ watermarkText }) => (
  <div className="absolute inset-0 z-10 grid items-center grid-cols-3 grid-rows-4 gap-6 p-4 overflow-hidden pointer-events-none select-none justify-items-center">
    {Array.from({ length: 12 }).map((_, index) => (
      <div
        key={index}
        className="flex items-center gap-2 -rotate-24 text-slate-400/30"
      >
        {/* Logo */}
        <img
          src={SimakLogo}
          alt="Logo"
          className="object-contain w-5 h-5 sm:h-10 sm:w-10 opacity-30"
        />

        {/* Teks */}
        <div className="text-[8px] font-bold leading-tight sm:text-sm">
          <span>Dilihat oleh </span>
          <span>{watermarkText}</span>
        </div>
      </div>
    ))}
  </div>
);

// Component to manage dynamic nested cards (Only for Block #3, strictly max 4 cards) in EditAboutSection.jsx
export const DynamicCardsList = ({ nestIndex, control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `content.story_blocks.${nestIndex}.cards`,
  });

  const MAX_CARDS = 4;

  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-sea-green-700">
          Kartu Tujuan / Goals ({fields.length}/{MAX_CARDS})
        </h4>
        <button
          type="button"
          onClick={() =>
            append({
              id: `goal-${Date.now()}`,
              number: fields.length + 1,
              title: '',
              description: '',
              badge: '',
            })
          }
          disabled={fields.length >= MAX_CARDS}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
            fields.length >= MAX_CARDS
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-sea-green-600 text-white hover:bg-sea-green-700'
          }`}
        >
          + Tambahkan Kartu
        </button>
      </div>

      {fields.length === 0 ? (
        <p className="text-xs text-gray-500 italic">
          Belum ada kartu tujuan pada blok ini. Klik tombol di atas untuk
          menambahkan.
        </p>
      ) : (
        <div className="space-y-4">
          {fields.map((card, cardIndex) => {
            const cardErrors =
              errors?.story_blocks?.[nestIndex]?.cards?.[cardIndex];

            return (
              <div
                key={card.id}
                className="p-4 border border-gray-200 rounded-lg space-y-4 relative bg-white"
              >
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="font-medium text-gray-700 text-sm">
                    Kartu #{cardIndex + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(cardIndex)}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
                    title="Hapus Kartu"
                  >
                    <IconTrash />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputNumber
                    label="Nomor Urut"
                    placeholder="1"
                    error={cardErrors?.number?.message}
                    {...register(
                      `content.story_blocks.${nestIndex}.cards.${cardIndex}.number`,
                      { valueAsNumber: true },
                    )}
                  />
                  <InputText
                    label="Judul Kartu"
                    placeholder="Kecepatan Akses"
                    error={cardErrors?.title?.message}
                    {...register(
                      `content.story_blocks.${nestIndex}.cards.${cardIndex}.title`,
                    )}
                  />
                  <InputText
                    label="Teks Badge"
                    placeholder="Prioritas Utama"
                    error={cardErrors?.badge?.message}
                    {...register(
                      `content.story_blocks.${nestIndex}.cards.${cardIndex}.badge`,
                    )}
                  />
                </div>

                <TextArea
                  label="Deskripsi Kartu"
                  placeholder="Menyajikan solusi digital berkinerja tinggi..."
                  rows={2}
                  error={cardErrors?.description?.message}
                  {...register(
                    `content.story_blocks.${nestIndex}.cards.${cardIndex}.description`,
                  )}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// HELPER: CARD FOR LANDING PAGE
export const CardValue = ({
  title,
  description,
  badge,
  number,
  icon: Icon,
}) => {
  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-5">
          <span className="text-xl font-extrabold text-galliano-500">
            {number}
          </span>
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sea-green-50 text-sea-green-700">
            <Icon className="w-6 h-6 text-[22px]" data-icon="diversity_3" />
          </div>
        </div>
        <h3 className="text-slate-800 font-semibold mb-2.5">{title}</h3>
        <p className="leading-relaxed text-slate-700/60">{description}</p>
      </div>
      <div className="mt-6 pt-4 border-t border-sea-green-50 text-[13px] font-medium text-sea-green-700 flex items-center gap-1">
        <IconCheckCircle
          className="material-symbols-outlined text-[15px]"
          data-icon="check_circle"
        />
        {badge}
      </div>
    </>
  );
};

// HELPER FOR USER EVENT: empty state
// Universal empty state for all tabs (Semua, Menunggu, Berlangsung, Selesai)
export const EmptyStateFallback = ({
  searchQuery,
  activeTabLabel,
  isFilterActive,
  handleReset,
}) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12 px-4 text-center bg-slate-50/70 border border-dashed border-slate-200 rounded-2xl">
      <div className="p-3 mb-3 rounded-full bg-slate-100 text-slate-400">
        <IconCalendar className="w-6 h-6" />
      </div>

      <h3 className="text-sm font-bold text-slate-700">
        Tidak ada acara ditemukan
      </h3>

      <p className="mt-1 text-xs text-slate-500 max-w-sm">
        {searchQuery.trim()
          ? `Tidak ada acara di kategori "${activeTabLabel}" yang cocok dengan kata kunci "${searchQuery}".`
          : `Belum ada acara yang tersedia pada kategori "${activeTabLabel}".`}
      </p>

      {isFilterActive && (
        <button
          type="button"
          onClick={handleReset}
          className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors cursor-pointer"
        >
          Tampilkan Semua Acara
        </button>
      )}
    </div>
  );
};

export const AttendanceStatCard = ({
  label,
  value,
  unit,
  hint,
  tone,
  icon: Icon,
  hintIcon: HintIcon,
}) => {
  const style = CARD_TONES[tone] ?? CARD_TONES.present;

  return (
    <article
      aria-label={label}
      className={`flex flex-col justify-between rounded-2xl border p-4 shadow-sm transition-shadow hover:shadow-md ${style.card}`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className={`text-xs font-semibold uppercase ${style.label}`}>
          {label}
        </p>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${style.iconWrap}`}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>

      <div className="flex items-baseline gap-1.5">
        <data value={value} className={`text-2xl font-bold ${style.value}`}>
          {value}
        </data>
        {unit && (
          <span className="text-xs md:text-lg text-white font-semibold">
            {unit}
          </span>
        )}
      </div>

      <div className="mt-1 flex items-center gap-1.5">
        <HintIcon
          className={`h-3.5 w-3.5 shrink-0 ${style.hintIcon}`}
          aria-hidden="true"
        />
        <span className={`text-[10px] font-medium ${style.hint}`}>{hint}</span>
      </div>
    </article>
  );
};
