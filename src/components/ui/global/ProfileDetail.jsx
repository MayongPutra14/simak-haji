import { useEffect, useMemo, useState } from 'react';
import { move } from '@dnd-kit/helpers';
import { DragDropProvider } from '@dnd-kit/react';
import { SortableCard } from './SortableCard';
import UpdatePasswordCard from '../inputs/UpdatePasswordCard';
import { titleCase } from '../../../utils/helpers/TitleCase';
import { useAuth } from '../../../features/auth/useAuth';
import { getDocumentStatus } from '../../../utils/helpers/status';
import { StatusBadge } from './StatusBedge';
import { DetailField } from './StatusBedge';
import {
  formatTanggalIndonesia,
  hitungUmur,
} from '../../../utils/helpers/dateConversion';
import {
  SkeletonProfileImage,
  SkeletonCardProfileDetail,
} from '../global/skeletons/index';
import Button from './Button';

// Main Component: UserProfileDetail
export default function ProfileDetail({ data, isLoading = false }) {
  const { user: userData, logout } = useAuth();
  const role = userData.role === 'user';

  // Fallback default empty object if data is null/undefined
  const user = useMemo(() => data || {}, [data]);

  // DEFAULT CARD CONTENT
  const DEFAULT_CARDS = useMemo(
    () => [
      // Personal Info
      {
        id: 'personal-info',
        spanClass: 'lg:col-span-2',
        content: (
          <div className="flex flex-col justify-between p-6 transition-shadow bg-white border shadow-sm rounded-3xl border-sea-green-100 hover:shadow-md lg:col-span-2">
            {/* 2. Personal Information Card */}
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <h2 className="text-lg font-bold text-teal-900">
                  Informasi Pribadi
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                <DetailField
                  label="Nama Ayah Kandung"
                  value={titleCase(user.fatherName)}
                />
                <DetailField
                  label="Jenis Kelamin"
                  value={titleCase(user.gender)}
                />
                <DetailField
                  label="Tempat Lahir"
                  value={titleCase(user.birthPlace)}
                />
                <DetailField
                  label="Tanggal Lahir"
                  value={formatTanggalIndonesia(user.birthDate)}
                />
                <DetailField
                  label="Usia"
                  value={`${hitungUmur(user.birthDate)} Tahun`}
                />
                <DetailField label="Perkejaan" value={titleCase(user.job)} />
                <DetailField
                  label="Pedidikan"
                  value={titleCase(user.education)}
                />
                <DetailField
                  label="Kecamatan"
                  value={titleCase(user.subDistrict)}
                />
                <DetailField
                  label="Desa / Kelurahan"
                  value={titleCase(user.village)}
                />
                <DetailField label="Nomor Whatsapp" value={user.whatsapp} />
                <div className="sm:col-span-2">
                  <DetailField label="Alamat" value={user.address} />
                </div>
              </div>
            </div>
          </div>
        ),
      },
      // Portion & Grouping Info Card
      {
        id: 'portion-grouping',
        spanClass: 'lg:col-span-2',
        content: (
          <div className="flex flex-col justify-between p-6 transition-shadow bg-white border border-teal-100 shadow-sm rounded-3xl hover:shadow-md lg:col-span-2">
            {/* 3. Portion & Grouping Info Card */}
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <h2 className="text-lg font-bold text-teal-900">
                  Info Porsi & Kelompok
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-3">
                <DetailField
                  label="Posisi Porsi Saat Ini"
                  value={user.currPortionPosition}
                />
                <DetailField
                  label="Status Porsi"
                  value={user.currPortionStatus}
                />
                <DetailField label="Zona" value={user.zone} />
                <DetailField label="Kloter" value={user.batch} />
                <DetailField label="Nomor Plot" value={user.plotNumber} />
                <DetailField label="Rombongan" value={user.group} />
                <DetailField label="Regu" value={user.team} />
              </div>
            </div>
          </div>
        ),
      },
      // Document & Verification Status Card
      {
        id: 'document-status',
        spanClass: 'lg:col-span-2',
        content: (
          <div className="p-6 transition-shadow bg-white border border-teal-100 shadow-sm rounded-3xl hover:shadow-md lg:col-span-2">
            {/* 4. Document & Verification Status Card */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-teal-900">
                Dokumen & Status Verifikasi
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <StatusBadge
                label="Status Google Form"
                status={getDocumentStatus(user.googleFormStatus)}
              />
              <StatusBadge
                label="Status Foto"
                status={getDocumentStatus(user.photoStatus)}
              />
              <StatusBadge
                label="Status SPPH"
                status={getDocumentStatus(user.spphStatus)}
              />
              <StatusBadge
                label="Status Mutasi"
                status={getDocumentStatus(user.mutationStatus)}
              />
              <StatusBadge
                label="Status Biometrik"
                status={getDocumentStatus(user.biometricStatus)}
              />
              <StatusBadge
                label="Status Puskesmas"
                status={getDocumentStatus(user.puskesmasStatus)}
              />
              <StatusBadge
                label="Status MCU"
                status={getDocumentStatus(user.mcuStatus)}
              />
              <StatusBadge
                label="Status Pelunasan"
                status={getDocumentStatus(user.paymentStatus)}
              />
              <StatusBadge
                label="passport"
                status={getDocumentStatus(user.passport)}
              />
              <StatusBadge label="visa" status={getDocumentStatus(user.visa)} />
            </div>
          </div>
        ),
      },
      // Companion & Relations Card
      {
        id: 'companion-relations',
        spanClass: 'lg:col-span-1',
        content: (
          <div className="p-6 transition-shadow bg-white border border-teal-100 shadow-sm rounded-3xl hover:shadow-md lg:col-span-1">
            {/* 5. Companion & Relations Card */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-teal-900">
                Pendamping & Status Hubungan
              </h2>
            </div>
            <div className="space-y-3">
              <DetailField
                label="Pendaping"
                value={titleCase(user.companion)}
              />
              <DetailField
                label="Nama Mahram"
                value={titleCase(user.mahramName)}
              />
              <DetailField
                label="Nama Referensi"
                value={titleCase(user.referenceName)}
              />
              <DetailField
                label="Nomor Whatsapp Referensi"
                value={user.referencePhone}
              />
              <DetailField
                label="Asal Referensi"
                value={titleCase(user.referenceOrigin)}
              />
            </div>
          </div>
        ),
      },
      // Experience & Health Record Card
      {
        id: 'experience-health',
        spanClass: 'lg:col-span-1',
        content: (
          <div className="p-6 transition-shadow bg-white border border-teal-100 shadow-sm rounded-3xl hover:shadow-md lg:col-span-1">
            {/* 6. Experience & Health Record Card */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-teal-900">
                Pengalaman & Kesehatan
              </h2>
            </div>
            <div className="space-y-3">
              <DetailField
                label="Program Keberangkatan"
                value={titleCase(user.departure)}
              />
              <DetailField
                label="Pengalaman Haji"
                value={titleCase(user.experience)}
              />
              <DetailField label="Kesehatan" value={titleCase(user.health)} />
              <DetailField label="Keahlian" value={titleCase(user.expertise)} />
              <DetailField
                label="Kemampuan Kontribusi"
                value={titleCase(user.contribution)}
              />
            </div>
          </div>
        ),
      },
    ],
    [user],
  );

  const [cards, setCards] = useState(() => {
    const savedOrder = localStorage.getItem('profile_cards_order');
    if (savedOrder) {
      try {
        const parsedIds = JSON.parse(savedOrder);
        // reorder default cards based on saved id list
        return parsedIds
          .map((id) => DEFAULT_CARDS.find((card) => card.id === id))
          .filter(Boolean);
      } catch (e) {
        console.error('failed to parse saved order:', e);
      }
    }
    return DEFAULT_CARDS;
  });

  useEffect(() => {
    setCards((_prevCards) => {
      const savedOrder = localStorage.getItem('profile_cards_order');
      const orderIds = savedOrder
        ? JSON.parse(savedOrder)
        : DEFAULT_CARDS.map((c) => c.id);

      return orderIds
        .map((id) => DEFAULT_CARDS.find((card) => card.id === id))
        .filter(Boolean);
    });
  }, [data, DEFAULT_CARDS]);

  // SKELETON LAODING
  if (isLoading) {
    return (
      <div className="w-[95%] lg:w-[98%] mx-auto py-6 space-y-5">
        {/* Main Hero Skeleton */}
        <SkeletonProfileImage />

        {/* Bento Grid Skeleton */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <SkeletonCardProfileDetail
            title="Personal Information"
            rows={6}
            className="lg:col-span-2"
          />
          <SkeletonCardProfileDetail
            title="Portion & Grouping Info"
            rows={6}
            className="lg:col-span-2"
          />
          <SkeletonCardProfileDetail
            title="Document & Verification Status"
            rows={8}
            className="lg:col-span-2"
          />
          <SkeletonCardProfileDetail
            title="Companion & Relations"
            rows={4}
            className="lg:col-span-1"
          />
          <SkeletonCardProfileDetail
            title="Experience & Health Record"
            rows={4}
            className="lg:col-span-1"
          />
        </div>
      </div>
    );
  }

  const handleDragEnd = (event) => {
    if (event.canceled) return;

    setCards((currentCards) => {
      const updatedCards = move(currentCards, event);
      const orderIds = updatedCards.map((card) => card.id);
      localStorage.setItem('profile_cards_order', JSON.stringify(orderIds));

      return updatedCards;
    });
  };

  const openWa = () => {
    const text =
      "Assalamu'alaikum, Admin SIMAK. Mohon maaf mengganggu waktunya. Saya ingin mengajukan permohonan perbaikan data pada akun SIMAK saya, karena terdapat informasi yang perlu disesuaikan. Mohon bantuannya terkait langkah selanjutnya. Terima kasih.";

    const message = encodeURIComponent(text);
    window.open(
      `https://wa.me/6281809847017?text=${message}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <div className=" w-[95%] md:w-[98%] mx-auto py-6 space-y-5 font-sans">
      {/* Main Profile (Hero Bento Card) */}
      <div className="relative flex flex-col items-center gap-6 p-6 overflow-hidden text-white border shadow-xl bg-linear-to-r from-sea-green-900 via-sea-green-800 to-emerald-900 rounded-3xl lg:p-8 border-sea-green-700 md:flex-row md:items-center">
        {/* Perubahan: md:items-start diubah ke md:items-center agar teks di kanan sejajar di tengah secara vertikal dengan foto 3x4 yang tinggi */}

        {/* Decorative Background Accent */}
        <div className="absolute w-48 h-48 rounded-full pointer-events-none -right-10 -bottom-10 bg-sea-green-600/20 blur-2xl"></div>

        {/* User Avatar */}
        <div className="relative group shrink-0">
          {/* Perubahan: Ditambahkan `shrink-0` agar bingkai avatar tidak tertekan/gepeng oleh teks di sebelahnya */}
          <img
            src={
              user.photoUrl ||
              'https://i.pinimg.com/736x/11/46/dc/1146dc1a7b950533b67192e623c339ce.jpg'
            }
            alt={user.fullName || 'User Avatar'}
            className="object-cover border-4 shadow-md w-24 aspect-3/4 lg:w-36 rounded-2xl border-sea-green-400/30"
          />

          <span className="absolute w-4 h-4 border-2 rounded-full bottom-2 right-2 bg-sea-green-400 border-sea-green-900"></span>
        </div>

        {/* Highlighted Main Info */}
        <div className="flex-1 space-y-3 -left z-10">
          <div className="inline-block px-3 py-1 text-xs font-medium border rounded-full bg-sea-green-700/50 text-sea-green-200 border-sea-green-500/30">
            Profil Jamaah
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white lg:text-3xl">
            {titleCase(user.fullName) || (
              <span className="italic font-normal text-slate-300">
                Nama belum diisi
              </span>
            )}
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {/* Nomor Porsi Utama */}
            <div className="px-4 py-2.5 border bg-sea-green-950/60 rounded-xl border-sea-green-600/40 text-left transition-all hover:border-sea-green-500/60">
              <p className="text-xs font-medium text-slate-300 truncate">
                Nomor Porsi Utama
              </p>
              <p className="text-base sm:text-lg font-bold text-sea-green-300 truncate mt-0.5">
                {user.portionNumber || (
                  <span className="text-xs sm:text-sm italic font-light text-slate-400">
                    Belum ada
                  </span>
                )}
              </p>
            </div>

            {/* Status Porsi */}
            <div className="px-4 py-2.5 border bg-sea-green-950/60 rounded-xl border-sea-green-600/40 text-left transition-all hover:border-sea-green-500/60">
              <p className="text-xs font-medium text-slate-300 truncate">
                Status Porsi
              </p>
              <p className="text-base sm:text-lg font-bold text-sea-green-300 truncate mt-0.5">
                {user.currPortionStatus || (
                  <span className="text-xs sm:text-sm italic font-light text-slate-400">
                    Belum ada
                  </span>
                )}
              </p>
            </div>

            {/* Passport */}
            <div className="px-4 py-2.5 border bg-sea-green-950/60 rounded-xl border-sea-green-600/40 text-left transition-all hover:border-sea-green-500/60">
              <p className="text-xs font-medium text-slate-300 truncate">
                Passport
              </p>
              <p className="text-base sm:text-lg font-bold text-sea-green-300 truncate mt-0.5">
                {user.passport || (
                  <span className="text-xs sm:text-sm italic font-light text-slate-400">
                    Belum ada
                  </span>
                )}
              </p>
            </div>

            {/* Visa */}
            <div className="px-4 py-2.5 border bg-sea-green-950/60 rounded-xl border-sea-green-600/40 text-left transition-all hover:border-sea-green-500/60">
              <p className="text-xs font-medium text-slate-300 truncate">
                Visa
              </p>
              <p className="text-base sm:text-lg font-bold text-sea-green-300 truncate mt-0.5">
                {user.visa || (
                  <span className="text-xs sm:text-sm italic font-light text-slate-400">
                    Belum ada
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Layout Grid */}
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <SortableCard
              key={card.id}
              id={card.id}
              index={index}
              className={card.spanClass}
            >
              {card.content}
            </SortableCard>
          ))}
        </div>
      </DragDropProvider>

      {/* CHANGE PASSWORD SECTION */}
      {role && (
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Card 1: Change Password */}
          {/* Class 'border' dihapus, hanya menggunakan 'shadow-md' sebagai pemisah visual */}
          <div className="flex-1">
            <UpdatePasswordCard userId={userData.id} logout={logout} />
          </div>

          {/* Card 2: Ajukan Perubahan */}
          <div className="flex-1 p-6 bg-white rounded-xl shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 ">
                Pengajuan Perubahan Data
              </h3>

              {/* Pesan Instruksi */}
              <p className="text-sm text-gray-600 mb-5 ">
                Apakah ada informasi yang tidak sesuai? Anda dapat mengirimkan
                permohonan untuk memperbarui data akun Anda.
              </p>

              {/* Kotak Peringatan */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-r-lg">
                <div className="flex items-start">
                  <div>
                    <h4 className="text-sm font-semibold text-amber-800">
                      Gunakan Dengan Bijak
                    </h4>
                    <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                      Tindakan ini akan menghubunkan anda dengan pihak admin via
                      Whatsapp. Jangan gunakan fitur ini untuk uji coba.
                      Pastikan Anda memiliki alasan dan data yang valid sebelum
                      mengajukan perubahan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Komponen Button (Di-Tengah) */}
            <div className="flex justify-center mt-auto pt-2">
              <Button
                onClick={() => openWa()}
                className="w-full md:w-auto px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200"
              >
                Ajukan Perubahan
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
