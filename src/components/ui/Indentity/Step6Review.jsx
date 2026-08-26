import { Button } from '../global/Button';

const Step6Review = ({
  onBack,
  onNext,
  initialData = {},
  isLoading = false,
}) => {
  const renderValue = (value) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return (
        <span className="italic text-gray-400">Tidak diisi / Tidak ada</span>
      );
    }

    // PERBAIKAN 1: Cek apakah nilai berupa string Base64 Gambar atau URL Gambar
    if (
      typeof value === 'string' &&
      (value.startsWith('data:image/') || value.startsWith('http'))
    ) {
      return (
        <div className="mt-1">
          <img
            src={value}
            alt="Preview Foto Profile"
            className="object-cover w-24 h-24 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <ul className="list-disc list-inside space-y-0.5">
          {value.map((item, index) => (
            <li key={index} className="text-sm text-gray-800 md:text-base">
              {item}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <span className="text-sm font-medium text-gray-800 md:text-base">
        {value}
      </span>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(initialData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div>
          <h2 className="pb-2 text-lg font-bold text-gray-800 border-b md:text-xl">
            Rangkuman Data Pendaftaran
          </h2>
          <p className="mt-1 text-xs text-red-500 md:text-sm">
            Mohon periksa kembali data Anda sebelum melakukan pengiriman akhir.
          </p>
        </div>

        {/* SECTION 1: DATA PERSONAL */}
        <div className="flex flex-col gap-3">
          <h3 className="p-2 font-semibold rounded text-md text-sea-green-700 bg-sea-green-50">
            1. Data Personal
          </h3>
          <div className="grid grid-cols-1 gap-4 px-2 md:grid-cols-2">
            <div className="col-span-1 md:col-span-2">
              <p className="text-xs font-semibold text-gray-500">
                Foto Profile
              </p>
              {renderValue(initialData.profileImage)}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Nama Ayah Kandung
              </p>
              {renderValue(initialData.fatherName)}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Tanggal Lahir
              </p>
              {renderValue(initialData.birthDate)}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Jenis Kelamin
              </p>
              {renderValue(initialData.gender)}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Tempat / Kota Kelahiran
              </p>
              {renderValue(initialData.birthPlace)}
            </div>
            <div className="md:col-span-2">
              <p className="text-xs font-semibold text-gray-500">
                Alamat (Sesuai SPPH)
              </p>
              {renderValue(initialData.address)}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Desa / Kelurahan
              </p>
              {renderValue(initialData.village)}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">Kecamatan</p>
              {renderValue(initialData.subDistrict)}
            </div>
          </div>
        </div>

        {/* SECTION 2: BACKGROUND */}
        <div className="flex flex-col gap-3">
          <h3 className="p-2 font-semibold rounded text-md text-sea-green-700 bg-sea-green-50">
            2. Latar Belakang & Program
          </h3>
          <div className="grid grid-cols-1 gap-4 px-2 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-gray-500">Pekerjaan</p>
              {renderValue(initialData.job)}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Pendidikan Terakhir
              </p>
              {renderValue(initialData.education)}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Program Keberangkatan
              </p>
              {renderValue(initialData.program)}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Pengalaman Haji / Umroh
              </p>
              {renderValue(initialData.experience)}
            </div>
            <div className="md:col-span-2">
              <p className="text-xs font-semibold text-gray-500">
                Berangkat Bersama
              </p>
              {renderValue(initialData.companion)}
            </div>
          </div>
        </div>

        {/* SECTION 3: HEALTH & SKILLS */}
        <div className="flex flex-col gap-3">
          <h3 className="p-2 font-semibold rounded text-md text-sea-green-700 bg-sea-green-50">
            3. Keterampilan & Kesehatan
          </h3>
          <div className="grid grid-cols-1 gap-4 px-2">
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Kemampuan yang Dikuasai
              </p>
              {renderValue(initialData.skill)}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Hal Positif Yang Dapat Dikontribusikan
              </p>
              {renderValue(initialData.positiveTrait)}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Kesehatan dan Kebutuhan Khusus
              </p>
              {renderValue(initialData.healthCondition)}
            </div>
          </div>
        </div>

        {/* SECTION 4: REFERENCE (DITAMBAHKAN DI SINI) */}
        <div className="flex flex-col gap-3">
          <h3 className="p-2 font-semibold rounded text-md text-sea-green-700 bg-sea-green-50">
            4. Informasi Referensi
          </h3>
          <div className="grid grid-cols-1 gap-4 px-2 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Nama Lengkap Referensi
              </p>
              {renderValue(initialData.referenceName)}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Nomor Whatsapp Referensi
              </p>
              {renderValue(initialData.referenceWhatsapp)}
            </div>
            <div className="md:col-span-2">
              <p className="text-xs font-semibold text-gray-500">
                Asal Referensi
              </p>
              {renderValue(initialData.referenceOrigin)}
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION BUTTONS */}
      <div className="flex items-center justify-between gap-4 w-80">
        <Button
          type="button"
          variant="primary"
          onClick={() => onBack()}
          disabled={isLoading}
        >
          Kembali
        </Button>
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? 'Mengirim Data...' : 'Kirim Data'}
        </Button>
      </div>
    </form>
  );
};

export default Step6Review;
