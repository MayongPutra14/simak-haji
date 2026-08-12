const Step5Review = ({ formData, onBack, onSubmitAll, isSubmitting }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border flex flex-col gap-6">
      <div>
        <h3 className="font-bold text-lg text-slate-800 border-b pb-2">
          Review Data Pendaftaran
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Periksa kembali data Anda dengan teliti sebelum melakukan konfirmasi
          akhir. Pastikan tidak ada kesalahan pengetikan.
        </p>
      </div>

      {/* KELOMPOK 1: INFORMASI AKUN */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded-md">
          1. Informasi Akun
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm bg-slate-50 p-4 rounded-xl border">
          <div>
            <span className="text-slate-400 block text-xs">Nama Lengkap</span>
            <span className="font-medium text-slate-800">
              {formData.name || '-'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-xs">Nomor Porsi</span>
            <span className="font-medium text-slate-800">
              {formData.porsiNumber || '-'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-xs">Nomor WhatsApp</span>
            <span className="font-medium text-slate-800">
              {formData.whatsappNumber || '-'}
            </span>
          </div>
        </div>
      </div>

      {/* KELOMPOK 2: DATA PRIBADI & DOMISILI (Step 2) */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded-md">
          2. Data Diri & Domisili
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm bg-slate-50 p-4 rounded-xl border">
          <div>
            <span className="text-slate-400 block text-xs">
              Nama Ayah Kandung
            </span>
            <span className="font-medium text-slate-800">
              {formData.fatherName || '-'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-xs">Tanggal Lahir</span>
            <span className="font-medium text-slate-800">
              {formData.birthDate || '-'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-xs">Jenis Kelamin</span>
            <span className="font-medium text-slate-800">
              {formData.gender || '-'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-xs">Tempat Lahir</span>
            <span className="font-medium text-slate-800">
              {formData.birthPlace || '-'}
            </span>
          </div>
          <div className="md:col-span-2">
            <span className="text-slate-400 block text-xs">Alamat Lengkap</span>
            <span className="font-medium text-slate-800">
              {formData.address}, Kel. {formData.village}, Kec.{' '}
              {formData.subDistrict}
            </span>
          </div>
        </div>
      </div>

      {/* KELOMPOK 3: BACKGROUND (Step 3) */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded-md">
          3. Latar Belakang
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm bg-slate-50 p-4 rounded-xl border">
          <div>
            <span className="text-slate-400 block text-xs">
              Pendidikan Terakhir
            </span>
            <span className="font-medium text-slate-800">
              {formData.education || '-'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-xs">Pekerjaan</span>
            <span className="font-medium text-slate-800">
              {formData.occupation || '-'}
            </span>
          </div>
        </div>
      </div>

      {/* KELOMPOK 4: KESEHATAN & KEAHLIAN (Step 4) */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded-md">
          4. Kesehatan & Keahlian
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm bg-slate-50 p-4 rounded-xl border">
          <div>
            <span className="text-slate-400 block text-xs">
              Kondisi Kesehatan / Riwayat Penyakit
            </span>
            <span className="font-medium text-slate-800">
              {Array.isArray(formData.healthConditions) &&
              formData.healthConditions.length > 0
                ? formData.healthConditions.join(', ')
                : 'Tidak ada catatan khusus'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-xs">
              Keahlian Khusus
            </span>
            <span className="font-medium text-slate-800">
              {formData.skills || '-'}
            </span>
          </div>
        </div>
      </div>

      {/* TOMBOL AKSI */}
      <div className="flex justify-between items-center pt-4 border-t mt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
        >
          Kembali Edit
        </button>
        <button
          type="button"
          onClick={onSubmitAll}
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/20 disabled:opacity-50"
        >
          {isSubmitting ? 'Mengirim Data...' : 'Kirim Data'}
        </button>
      </div>
    </div>
  );
};

export default Step5Review;
