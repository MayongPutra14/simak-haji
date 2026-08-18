import { IoShield } from 'react-icons/io5';

export default function UserProfile({ profileData, isLoading = false }) {
  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  const profile = profileData || {};
  return (
    <>
      <div>
        {/* LIST DATA USER */}
        <div className="space-y-6">
          {/* CATEGOTY 1 */}
          <SectionBlock title="INFORMASI KEBERANGKATAN">
            <div className="grid grid-cols-1 gap-3 pl-4 sm:grid-cols-2">
              <InfoRow label="Program Keberangkatan" value={profile.program} />
              <InfoRow label="Berangkat Bersama" value={profile.companion} />
              <InfoRow
                label="Pengalaman Haji / Umroh"
                value={profile.experience}
                className="sm:col-span-2"
              />
            </div>
          </SectionBlock>

          {/* KATEGORI 2 */}
          <SectionBlock title="DATA DIRI UTAMA">
            <div className="grid grid-cols-1 gap-3 pl-4 sm:grid-cols-2">
              <InfoRow label="Jenis Kelamin" value={profile.gender} />
              <InfoRow label="Nama Ayah Kandung" value={profile.fatherName} />
              <InfoRow
                label="Tempat / Kota Kelahiran"
                value={profile.birthPlace}
              />
              <InfoRow label="Tanggal Lahir" value={profile.birthDate} />
            </div>
          </SectionBlock>

          {/* KATEGORI 3 */}
          <SectionBlock title="ALAMAT LENGKAP (SPPH)">
            <div className="grid grid-cols-1 gap-3 pl-4 sm:grid-cols-2">
              <InfoRow
                label="Alamat (Sesuai SPPH)"
                value={profile.address}
                className="sm:col-span-2"
              />
              <InfoRow label="Desa / Kelurahan" value={profile.village} />
              <InfoRow label="Kecamatan" value={profile.subDistrict} />
            </div>
          </SectionBlock>

          {/* KATEGORI 4 */}
          <SectionBlock title="LATAR BELAKANG & PENDIDIKAN">
            <div className="grid grid-cols-1 gap-3 pl-4 sm:grid-cols-2">
              <InfoRow label="Pendidikan Terakhir" value={profile.education} />
              <InfoRow label="Pekerjaan" value={profile.job} />
            </div>
          </SectionBlock>

          {/* KATEGORI 5 */}
          <SectionBlock title="KEAHLIAN & KONTRIBUSI">
            <div className="grid grid-cols-1 gap-3 pl-4">
              <InfoRow label="Kemampuan yang Dikuasai" value={profile.skill} />
              <InfoRow
                label="Hal Positif Yang Dapat Dikontribusikan"
                value={profile.positiveTrait}
              />
            </div>
          </SectionBlock>

          {/* KATEGORI 6 */}
          <SectionBlock title="KESEHATAN & KEBUTUHAN KHUSUS" isLast>
            <div className="grid grid-cols-1 gap-3 pl-4">
              <InfoRow
                label="Kesehatan dan Kebutuhan Khusus"
                value={profile.healthCondition}
              />
            </div>
          </SectionBlock>
        </div>
      </div>
      {/* WARNING BOX DI BAGIAN PALING BAWAH */}
      <div className="flex items-start max-w-md gap-3 p-4 mx-4 mt-10 border shadow-sm bg-amber-50 rounded-xl border-amber-200/80 text-amber-900 md:mx-auto">
        <IoShield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <span className="font-bold block mb-0.5 text-amber-800">
            Pemberitahuan Perubahan Data
          </span>
          Jika terdapat kesalahan atau Anda ingin mengganti data di atas,
          silakan hubungi
          <span className="ml-1 font-semibold underline cursor-pointer text-amber-900">
            Admin yang bersangkutan
          </span>
          .
        </div>
      </div>
    </>
  );
}

/**
 * SKELETON LOADING
 */

function UserProfileSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {[1, 2, 3].map((block) => (
        <div key={block} className="space-y-3">
          {/* Header Section Skeleton */}
          <div className="w-full h-10 rounded-md bg-slate-200" />

          {/* Rows Skeleton */}
          <div className="grid grid-cols-1 gap-4 pl-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="w-1/3 h-4 rounded bg-slate-200" />
              <div className="w-2/3 h-5 rounded bg-slate-100" />
            </div>
            <div className="space-y-2">
              <div className="w-1/3 h-4 rounded bg-slate-200" />
              <div className="w-2/3 h-5 rounded bg-slate-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * WRAPER CATEGORY
 */
function SectionBlock({ title, children, isLast = false }) {
  return (
    <div className={`${!isLast ? ' pb-2 ' : ''}`}>
      <h3 className="py-3 pl-4 mb-4 text-xl font-bold bg-sea-green-50 text-sea-green-900">
        {title}
      </h3>
      {children}
    </div>
  );
}

function InfoRow({ label, value, highlight = false, isAlert = false }) {
  return (
    <div>
      <span className="block mb-2 font-bold text-slate-700">
        {label}
        {' : '}
      </span>
      <span
        className={`  ${
          highlight
            ? 'text-sea-green-800 font-bold'
            : isAlert
              ? 'text-amber-900 font-medium'
              : 'text-slate-800'
        }`}
      >
        {value || '-'}
      </span>
    </div>
  );
}
