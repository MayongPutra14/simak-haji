import {
  SkeletonProfileImage,
  SkeletonCardProfileDetail,
} from '../global/skeletons/index';
// Helper Component: Display Key and Value with Fallback Handling
const DetailField = ({ label, value }) => {
  const isEmpty =
    value === null ||
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && value.length === 0);

  return (
    <div className="flex flex-col gap-1 my-1">
      {/* Key: Slate 300 */}
      <span className="text-xs font-medium tracking-wide text-slate-400/70">
        {label}:
      </span>
      {/* Value: Slate 600 or Fallback Italic */}
      {isEmpty ? (
        <span className="text-sm italic font-light text-slate-400">
          Belum ada data / Belum diisi
        </span>
      ) : Array.isArray(value) ? (
        <div className="flex flex-wrap gap-1.5 mt-0.5">
          {value.map((item, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-teal-100 text-teal-800 border border-teal-200"
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <span className="text-sm font-semibold text-slate-600 wrap-break-words">
          {value}
        </span>
      )}
    </div>
  );
};

// Helper Component: Status Badge
const StatusBadge = ({ label, status }) => {
  // 1. Pemetaan warna sesuai nilai status
  const statusStyles = {
    // Hijau
    lengkap: 'bg-emerald-100 text-emerald-800 border-emerald-200',

    // Biru (Proses)
    menunggu: 'bg-blue-100 text-blue-800 border-blue-300',

    // Merah (Gagal/Batal)
    gagal: 'bg-rose-100 text-rose-800 border-rose-200',
  };

  // 2. Fallback jika status tidak ditemukan di daftar (Default: Amber/Kuning)
  const defaultStyle = 'bg-amber-100 text-amber-800 border-amber-200';

  const currentStyle = statusStyles[status] || defaultStyle;

  return (
    <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
      <span className="text-xs font-medium text-slate-400">{label}</span>
      <div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${currentStyle}`}
        >
          {status === true
            ? 'Aktif'
            : status === false
              ? 'Tidak Aktif'
              : status || 'Belum diisi'}
        </span>
      </div>
    </div>
  );
};

// Main Component: UserProfileDetail
export default function ProfileDetail({ data, isLoading = false }) {
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

  // Fallback default empty object if data is null/undefined
  const user = data || {};

  return (
    <div className="w-[95%] md:w-[98%] mx-auto py-6 space-y-5 font-sans">
      {/* Main Profile (Hero Bento Card) */}
      <div className="relative flex flex-col items-center gap-6 p-6 overflow-hidden text-white border shadow-xl bg-linear-to-r from-sea-green-900 via-sea-green-800 to-emerald-900 rounded-3xl lg:p-8 border-sea-green-700 md:flex-row md:items-start">
        {/* Decorative Background Accent */}
        <div className="absolute w-48 h-48 rounded-full pointer-events-none -right-10 -bottom-10 bg-sea-green-600/20 blur-2xl"></div>

        {/* User Avatar */}
        <div className="relative group">
          <img
            src={
              user.profileImage ||
              'https://i.pinimg.com/736x/11/46/dc/1146dc1a7b950533b67192e623c339ce.jpg'
            }
            alt={user.fullName || 'User Avatar'}
            className="object-cover border-4 shadow-md w-28 h-28 lg:w-32 lg:h-32 rounded-2xl border-sea-green-400/30"
          />
          <span className="absolute w-4 h-4 border-2 rounded-full bottom-2 right-2 bg-sea-green-400 border-sea-green-900"></span>
        </div>

        {/* Highlighted Main Info */}
        <div className="flex-1 space-y-2 text-center md:text-left">
          <div className="inline-block px-3 py-1 mb-1 text-xs font-medium border rounded-full bg-sea-green-700/50 text-sea-green-200 border-sea-green-500/30">
            Profil Jamaah
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white lg:text-3xl">
            {user.fullName || (
              <span className="italic font-normal text-slate-300">
                Nama belum diisi
              </span>
            )}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-1 md:justify-start">
            <div className="px-4 py-2 border bg-sea-green-950/60 rounded-xl border-sea-green-600/40">
              <p className="text-xs font-medium text-slate-300">
                Nomor Porsi Utama
              </p>
              <p className="text-lg font-bold text-sea-green-300">
                {user.porsiNumber || (
                  <span className="text-sm italic font-light text-slate-400">
                    Belum ada
                  </span>
                )}
              </p>
            </div>
            <div className="px-4 py-2 border bg-sea-green-950/60 rounded-xl border-sea-green-600/40">
              <p className="text-xs font-medium text-slate-300">Status Porsi</p>
              <p className="text-sm font-semibold text-emerald-300">
                {user.currPorstionStatus || (
                  <span className="italic font-light text-slate-400">
                    Belum ada
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Layout Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {/* 2. Personal Information Card */}
        <div className="flex flex-col justify-between p-6 transition-shadow bg-white border shadow-sm rounded-3xl border-sea-green-100 hover:shadow-md lg:col-span-2">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-teal-900">
                Informasi Pribadi
              </h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              <DetailField label="Nama Ayah Kandung" value={user.fatherName} />
              <DetailField label="Jenis Kelamin" value={user.gender} />
              <DetailField label="Tempat Lahir" value={user.birthPlace} />
              <DetailField label="Tanggal Lahir" value={user.birthDate} />
              <DetailField label="Perkejaan" value={user.job} />
              <DetailField label="Pedidikan" value={user.education} />
              <DetailField label="Kecamatan" value={user.subDistrict} />
              <DetailField label="Desa" value={user.village} />
              <div className="sm:col-span-2">
                <DetailField label="Alamat" value={user.address} />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Portion & Grouping Info Card */}
        <div className="flex flex-col justify-between p-6 transition-shadow bg-white border border-teal-100 shadow-sm rounded-3xl hover:shadow-md lg:col-span-2">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-teal-900">
                Info Porsi & Kelompok
              </h2>
              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-3">
              <DetailField
                label="Posisi Porsi Saat Ini"
                value={user.currPorsionPosition}
              />
              <DetailField
                label="Status Porsi Saat Ini:"
                value={user.currPorsionStatus || user.currPorstionStatus}
              />
              <DetailField label="Zona" value={user.zone} />
              <DetailField
                label="Posisi Porsi Cadangan"
                value={user.currPorsionPositionBackup}
              />
              <DetailField
                label="Status Posisi Porsi Cadangan"
                value={
                  user.currPorsionStatusBackup || user.currPorstionStatusBackup
                }
              />
              <DetailField label="Kloter" value={user.batch} />
              <DetailField label="Nomor Plot" value={user.plotNumber} />
              <DetailField label="Rombongan" value={user.group} />
              <DetailField label="Regu" value={user.team} />
            </div>
          </div>
        </div>

        {/* 4. Document & Verification Status Card */}
        <div className="p-6 transition-shadow bg-white border border-teal-100 shadow-sm rounded-3xl hover:shadow-md lg:col-span-2">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-teal-900">
              Dokumen & Status Verifikasi
            </h2>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <StatusBadge
              label="Status Google Form"
              status={user.googleFormStatus}
            />
            <StatusBadge label="Status Foto" status={user.photoStatus} />
            <StatusBadge label="Status SPPH" status={user.spphStatus} />
            <StatusBadge label="Status Mutasi" status={user.mutationStatus} />
            <StatusBadge
              label="Status Biometrik"
              status={user.biometricStatus}
            />
            <StatusBadge
              label="Status Puskesmas"
              status={user.puskesmasStatus}
            />
            <StatusBadge label="Status MCU" status={user.mcuStatus} />
            <StatusBadge label="Status Pelunasan" status={user.paymentStatus} />
            <StatusBadge label="passport" status={user.passport} />
            <StatusBadge label="visa" status={user.visa} />
          </div>
        </div>

        {/* 5. Companion & Relations Card */}
        <div className="p-6 transition-shadow bg-white border border-teal-100 shadow-sm rounded-3xl hover:shadow-md lg:col-span-1">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-teal-900">
              Pendamping & Status Hubungan
            </h2>
            <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
          </div>
          <div className="space-y-3">
            <DetailField label="Pendaping" value={user.companion} />
            <DetailField label="Nama Mahram" value={user.mahramName} />
            <DetailField label="Nama Referensi" value={user.referenceName} />
            <DetailField
              label="Nomor Whatsapp Referensi"
              value={user.referencePhone}
            />
            <DetailField label="Asal Referensi" value={user.referenceOrigin} />
          </div>
        </div>

        {/* 6. Experience & Health Record Card */}
        <div className="p-6 transition-shadow bg-white border border-teal-100 shadow-sm rounded-3xl hover:shadow-md lg:col-span-1">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-teal-900">
              Pengalaman & Kesehatan
            </h2>
            <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
          </div>
          <div className="space-y-3">
            <DetailField label="Program Keberangkatan" value={user.departure} />
            <DetailField label="Pengalaman Haji" value={user.experience} />
            <DetailField label="Kesehatan" value={user.health} />
            <DetailField label="Keahlian" value={user.expertise} />
            <DetailField
              label="Kemampuan Kontribusi"
              value={user.contribution}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
