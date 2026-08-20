import InputCreate from '../ui/inputs/InputCreateUser';

const CreateUser = () => {
  return (
    <div className="w-[95%] max-w-4xl p-6 mx-auto mt-5 bg-white border shadow-sm md:p-8 rounded-xl border-slate-200">
      <h1 className="mb-6 text-2xl font-bold text-slate-800">
        Registrasi Akun Baru
      </h1>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        {/* SEKSI 1: DATA DIRI */}
        <section className="space-y-4">
          <div className="bg-sea-green-50 text-sea-green-700 px-4 py-2.5 rounded-lg font-semibold text-sm sm:text-base">
            Data Diri
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputCreate
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap"
            />
            <InputCreate
              label="Nomor NIK / KTP"
              placeholder="Masukkan 16 digit NIK"
            />
            <InputCreate
              label="Tanggal Lahir"
              type="date"
              placeholder="Pilih tanggal lahir"
            />
            <InputCreate
              label="Nomor Telepon"
              placeholder="Contoh: 081234567890"
            />
          </div>
        </section>

        {/* SEKSI 2: BACKGROUND DAN PEKERJAAN */}
        <section className="space-y-4">
          <div className="bg-sea-green-50 text-sea-green-700 px-4 py-2.5 rounded-lg font-semibold text-sm sm:text-base">
            Background dan Pekerjaan
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputCreate
              label="Pendidikan Terakhir"
              placeholder="Contoh: S1 Teknik Informatika"
            />
            <InputCreate
              label="Pekerjaan / Jabatan"
              placeholder="Masukkan posisi pekerjaan"
            />
            <InputCreate
              label="Instansi / Perusahaan"
              placeholder="Masukkan nama perusahaan"
            />
            <InputCreate
              label="Pengalaman Kerja (Tahun)"
              type="number"
              placeholder="Contoh: 3"
            />
          </div>
        </section>

        {/* SEKSI 3: KESEHATAN */}
        <section className="space-y-4">
          <div className="bg-sea-green-50 text-sea-green-700 px-4 py-2.5 rounded-lg font-semibold text-sm sm:text-base">
            Kesehatan
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputCreate
              label="Golongan Darah"
              placeholder="Contoh: O / A / B / AB"
            />
            <InputCreate
              label="Riwayat Penyakit"
              placeholder="Tuliskan jika ada (opsional)"
            />
            <InputCreate
              label="Tinggi Badan (cm)"
              type="number"
              placeholder="Contoh: 170"
            />
            <InputCreate
              label="Berat Badan (kg)"
              type="number"
              placeholder="Contoh: 65"
            />
          </div>
        </section>

        {/* SEKSI 4: AKUN */}
        <section className="space-y-4">
          <div className="bg-red-50 text-red-700 px-4 py-2.5 rounded-lg font-semibold text-sm sm:text-base">
            Seksi Akun
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputCreate
              label="Username"
              placeholder="Masukkan username unik"
            />
            <InputCreate
              label="Email"
              type="email"
              placeholder="contoh@domain.com"
            />
            <InputCreate
              label="Kata Sandi"
              type="password"
              placeholder="Minimal 8 karakter"
            />
            <InputCreate
              label="Konfirmasi Kata Sandi"
              type="password"
              placeholder="Ulangi kata sandi"
            />
          </div>
        </section>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2.5 bg-sea-green-700 hover:bg-sea-green-800 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Daftarkan Akun
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
