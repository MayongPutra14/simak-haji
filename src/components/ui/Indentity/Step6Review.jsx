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
        <span className="text-gray-400 italic">Tidak diisi / Tidak ada</span>
      );
    }

    if (Array.isArray(value)) {
      return (
        <ul className="list-disc list-inside space-y-0.5">
          {value.map((item, index) => (
            <li key={index} className="text-gray-800 text-sm md:text-base">
              {item}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <span className="text-gray-800 text-sm md:text-base font-medium">
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
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-6">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-800 border-b pb-2">
            Rangkuman Data Pendaftaran
          </h2>
          <p className="text-xs md:text-sm text-red-500 mt-1">
            Mohon periksa kembali data Anda sebelum melakukan pengiriman akhir.
          </p>
        </div>

        {/* SECTION 1: DATA PERSONAL */}
        <div className="flex flex-col gap-3">
          <h3 className="text-md font-semibold text-sea-green-700 bg-sea-green-50 p-2 rounded">
            1. Data Personal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
            <div>
              <p className="text-xs text-gray-500 font-semibold">
                Nama Ayah Kandung
              </p>
              {renderValue(initialData.fatherName)}
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold">
                Tanggal Lahir
              </p>
              {renderValue(initialData.birthDate)}
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold">
                Jenis Kelamin
              </p>
              {renderValue(initialData.gender)}
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold">
                Tempat / Kota Kelahiran
              </p>
              {renderValue(initialData.birthPlace)}
            </div>
            <div className="md:col-span-2">
              <p className="text-xs text-gray-500 font-semibold">
                Alamat (Sesuai SPPH)
              </p>
              {renderValue(initialData.address)}
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold">
                Desa / Kelurahan
              </p>
              {renderValue(initialData.village)}
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold">Kecamatan</p>
              {renderValue(initialData.subDistrict)}
            </div>
          </div>
        </div>

        {/* SECTION 2: BACKGROUND */}
        <div className="flex flex-col gap-3">
          <h3 className="text-md font-semibold text-sea-green-700 bg-sea-green-50 p-2 rounded">
            2. Latar Belakang & Program
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
            <div>
              <p className="text-xs text-gray-500 font-semibold">Pekerjaan</p>
              {renderValue(initialData.job)}
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold">
                Pendidikan Terakhir
              </p>
              {renderValue(initialData.education)}
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold">
                Program Keberangkatan
              </p>
              {renderValue(initialData.program)}
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold">
                Pengalaman Haji / Umroh
              </p>
              {renderValue(initialData.experience)}
            </div>
            <div className="md:col-span-2">
              <p className="text-xs text-gray-500 font-semibold">
                Berangkat Bersama
              </p>
              {renderValue(initialData.companion)}
            </div>
          </div>
        </div>

        {/* SECTION 3: HEALTH & SKILLS */}
        <div className="flex flex-col gap-3">
          <h3 className="text-md font-semibold text-sea-green-700 bg-sea-green-50 p-2 rounded">
            3. Keterampilan & Kesehatan
          </h3>
          <div className="grid grid-cols-1 gap-4 px-2">
            <div>
              <p className="text-xs text-gray-500 font-semibold">
                Kemampuan yang Dikuasai
              </p>
              {renderValue(initialData.skill)}
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold">
                Hal Positif Yang Dapat Dikontribusikan
              </p>
              {renderValue(initialData.positiveTrait)}
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold">
                Kesehatan dan Kebutuhan Khusus
              </p>
              {renderValue(initialData.healthCondition)}
            </div>
          </div>
        </div>

        {/* SECTION 4: REFERENCE (DITAMBAHKAN DI SINI) */}
        <div className="flex flex-col gap-3">
          <h3 className="text-md font-semibold text-sea-green-700 bg-sea-green-50 p-2 rounded">
            4. Informasi Referensi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
            <div>
              <p className="text-xs text-gray-500 font-semibold">
                Nama Lengkap Referensi
              </p>
              {renderValue(initialData.referenceName)}
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold">
                Nomor Whatsapp Referensi
              </p>
              {renderValue(initialData.referenceWhatsapp)}
            </div>
            <div className="md:col-span-2">
              <p className="text-xs text-gray-500 font-semibold">
                Asal Referensi
              </p>
              {renderValue(initialData.referenceOrigin)}
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION BUTTONS */}
      <div className="flex justify-between items-center gap-4 w-80">
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
