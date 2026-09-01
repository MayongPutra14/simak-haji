import { IoShield } from 'react-icons/io5';

export default function UserProfile({ profileData, isLoading = false }) {
  // SHOW SKELETON LOADER WHILE FETCHING DATA
  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  // FALLBACK FOR EMPTY PROFILE DATA
  const profile = profileData || {};

  // RESOLVE IMAGE SOURCE OR PROVIDER FALLBACK AVATAR
  const avatarUrl =
    profile.gambar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile.nama_lengkap || 'User',
    )}&background=0D9488&color=fff`;

  // MAP FIELD VALUES WITH FALLBACK FOR REFERRAL DATA
  const referenceName = profile.referensi_nama || profile.referenceName;
  const referenceWhatsapp = profile.referensi_wa || profile.referenceWhatsapp;
  const referenceOrigin = profile.referensi_asal || profile.referenceOrigin;
  const role = profile.role === 'user' ? 'Jamaah' : 'Admin';

  return (
    <>
      <div className="space-y-6">
        {/* HEADER SECTION: AVATAR AND MAIN IDENTIFIER */}
        <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-2xl md:gap-6">
          <img
            src={avatarUrl}
            alt={profile.nama_lengkap || 'Foto Profil'}
            className="w-24 h-24  md:w-32 md:h-32 rounded-full object-cover border-4 border-sea-green-100 shadow-md shrink-0"
          />
          <div className="mt-4 text-center md:mt-0 space-y-1">
            <h2 className="text-xl font-bold text-gray-800">
              {profile.nama_lengkap || '-'}
            </h2>
            <p className="text-xl font-medium text-sea-green-600">
              {profile.nomor_porsi || '-'}
            </p>
            <div className="flex flex-wrap justify-center  gap-2 pt-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-semibold bg-sea-green-100 text-sea-green-700 border border-sea-green-200">
                {role}
              </span>
            </div>
          </div>
        </div>

        {/* LIST DATA USER */}
        <div className="space-y-6">
          {/* CATEGORY 1: DEPARTURE */}
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

          {/* CATEGORY 2: PERSONAL DATA */}
          <SectionBlock title="DATA DIRI UTAMA">
            <div className="grid grid-cols-1 gap-3 pl-4 sm:grid-cols-2">
              <InfoRow label="Nama Lengkap" value={profile.nama_lengkap} />
              <InfoRow label="Nomor WhatsApp" value={profile.whatsapp} />
              <InfoRow label="Jenis Kelamin" value={profile.gender} />
              <InfoRow label="Nama Ayah Kandung" value={profile.fatherName} />
              <InfoRow label="Nama Mahram" value={profile.nama_mahram} />
              <InfoRow
                label="Tempat / Kota Kelahiran"
                value={profile.birthPlace}
              />
              <InfoRow label="Tanggal Lahir" value={profile.birthDate} />
            </div>
          </SectionBlock>

          {/* CATEGORY 3: ADDRESS */}
          <SectionBlock title="ALAMAT LENGKAP (SPPH)">
            <div className="grid grid-cols-1 gap-3 pl-4 sm:grid-cols-2">
              <InfoRow
                label="Alamat (Sesuai SPPH)"
                value={profile.address}
                className="sm:col-span-2"
              />
              <InfoRow label="Desa / Kelurahan" value={profile.village} />
              <InfoRow label="Kecamatan" value={profile.subDistrict} />
              <InfoRow label="Zona Wilayah" value={profile.zona} />
            </div>
          </SectionBlock>

          {/* CATEGORY 4: BACKGROUND */}
          <SectionBlock title="LATAR BELAKANG & PENDIDIKAN">
            <div className="grid grid-cols-1 gap-3 pl-4 sm:grid-cols-2">
              <InfoRow label="Pendidikan Terakhir" value={profile.education} />
              <InfoRow label="Pekerjaan" value={profile.job} />
            </div>
          </SectionBlock>

          {/* CATEGORY 5: SKILL */}
          <SectionBlock title="KEAHLIAN & KONTRIBUSI">
            <div className="grid grid-cols-1 gap-3 pl-4">
              <InfoRow label="Kemampuan yang Dikuasai" value={profile.skill} />
              <InfoRow
                label="Hal Positif Yang Dapat Dikontribusikan"
                value={profile.positiveTrait}
              />
            </div>
          </SectionBlock>

          {/* CATEGORY 6: HEALTH */}
          <SectionBlock title="KESEHATAN & KEBUTUHAN KHUSUS">
            <div className="grid grid-cols-1 gap-3 pl-4">
              <InfoRow
                label="Kesehatan dan Kebutuhan Khusus"
                value={profile.healthCondition}
              />
            </div>
          </SectionBlock>

          {/* CATEGORY 7: REFERENCE */}
          <SectionBlock title="INFORMASI REFERENSI" isLast>
            <div className="grid grid-cols-1 gap-3 pl-4 sm:grid-cols-2">
              <InfoRow label="Nama Lengkap Referensi" value={referenceName} />
              <InfoRow
                label="Nomor Whatsapp Referensi"
                value={referenceWhatsapp}
              />
              <InfoRow
                label="Asal Referensi"
                value={referenceOrigin}
                className="sm:col-span-2"
              />
            </div>
          </SectionBlock>
        </div>
      </div>

      {/* WARNING BOX */}
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
          <div className="w-full h-10 rounded-md bg-slate-200" />
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
 * WRAPPER CATEGORY
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

/**
 * INFO ROW DENGAN PENANGANAN ARRAY & FALLBACK DITINGKATKAN
 */
function InfoRow({
  label,
  value,
  highlight = false,
  isAlert = false,
  className = '',
}) {
  const renderContent = () => {
    // Jika value kosong / null / undefined / array kosong
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return <span className="text-slate-400 italic font-normal">-</span>;
    }

    // Jika value berbentuk Array (seperti skill, positiveTrait, healthCondition)
    if (Array.isArray(value)) {
      return (
        <ul className="list-disc list-inside space-y-0.5 mt-1">
          {value.map((item, index) => (
            <li
              key={index}
              className={`${
                highlight
                  ? 'text-sea-green-800 font-bold'
                  : isAlert
                    ? 'text-amber-900 font-medium'
                    : 'text-slate-800 font-medium'
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      );
    }

    // Jika value berupa String biasa
    return (
      <span
        className={`${
          highlight
            ? 'text-sea-green-800 font-bold'
            : isAlert
              ? 'text-amber-900 font-medium'
              : 'text-slate-800 font-medium'
        }`}
      >
        {value}
      </span>
    );
  };

  return (
    <div className={className}>
      <span className="block mb-1 font-bold text-slate-700">{label} :</span>
      {renderContent()}
    </div>
  );
}
