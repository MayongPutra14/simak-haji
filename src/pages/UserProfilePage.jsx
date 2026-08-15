import { IoShield } from 'react-icons/io5';

// DUMMY PROFILE
const dummyProfileData = {
  program: 'Haji Plus 2026',
  companion: 'Suami (Bapak Hendra)',
  experience: 'Pernah Umroh (2022)',
  gender: 'Laki-Laki',
  fatherName: 'H. Abdullah Suprapto',
  birthPlace: 'Jakarta',
  birthDate: '15 Mei 1988',
  address: 'Jl. Mawar Indah No. 12, RT 03/RW 05',
  village: 'Sukamaju',
  subDistrict: 'Cilodong',
  education: 'S1 Teknik Informatika',
  job: 'Karyawan Swasta',
  skill: 'Bahasa Arab Dasar, First Aid / P3K',
  positiveTrait: 'Disiplin waktu, ramah, dan siap membantu jemaah lansia',
  healthCondition:
    'Tidak ada riwayat penyakit berat. Memerlukan makanan rendah gula.',
};

export default function UserProfilePage() {
  const profile = dummyProfileData;

  return (
    <section className="pb-6 space-y-4 bg-white">
      {/* MAIN CONTAINER */}
      <div className="">
        {/* SHORT HEADER */}
        <div className="flex items-center justify-between py-4 px-4 mb-5 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold leading-tight text-sea-green-900 md:text-4xl">
              Profil Jamaah
            </h2>
            <p className="text-xs  text-sea-green-700/80 mt-0.5 md:text-xl">
              Data terverifikasi sesuai dokumen resmi SPPH
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-sea-green-100 text-sea-green-800 text-xs font-semibold border border-sea-green-200">
            Terverifikasi
          </span>
        </div>

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
      <div className="flex items-start max-w-md gap-3 p-4 mt-10 mx-4 border shadow-sm bg-amber-50 rounded-xl border-amber-200/80 text-amber-900 md:mx-auto">
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
    </section>
  );
}

/**
 * WRAPER CATEGORY
 */
function SectionBlock({ title, children, isLast = false }) {
  return (
    <div className={`${!isLast ? ' pb-2 ' : ''}`}>
      <h3 className="text-xl font-bold bg-sea-green-50 py-3 pl-4 text-sea-green-900 mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

function InfoRow({ label, value, highlight = false, isAlert = false }) {
  return (
    <div>
      <span className="font-bold text-slate-700 block mb-2">
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
