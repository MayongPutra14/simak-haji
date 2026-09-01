import { z } from 'zod';

// STEP 1 CREDENTIAL ACCOUNT
export const registrationSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  porsiNumber: z
    .string()
    .length(10, 'Nomor porsi harus persis 10 digit')
    .regex(/^[0-9]+$/, 'Nomor porsi hanya boleh berisi angka'),
  whatsappNumber: z
    .string()
    .min(1, 'Nomor WhatsApp tidak boleh kosong')
    .min(10, 'Nomor WhatsApp minimal 10 digit')
    .regex(/^[0-9]+$/, 'Nomor WhatsApp hanya boleh berisi angka'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
});

// STEP 2 PERSONAL
export const Step2PersonalSchema = z.object({
  fatherName: z
    .string()
    .min(1, 'Nama ayah kandung wajib diisi')
    .min(3, 'Nama ayah kandung minimal 3 karakter'),
  birthDate: z.string().min(1, 'Tanggal lahir wajib diisi'),
  gender: z.preprocess(
    (val) => (val === null || val === undefined ? '' : val),
    z.string().min(1, 'Jenis kelamin wajib diisi'),
  ),
  birthPlace: z.string().min(1, 'Pilih tempat/kota kelahiran'),
  address: z
    .string()
    .min(1, 'Alamat wajib diisi')
    .min(5, 'Alamat lengkap minimal 5 karakter'),
  village: z.string().min(1, 'Desa/Kelurahan wajib diisi'),
  subDistrict: z.string().min(1, 'Kecamatan wajib diisi'),
});

export const gender = [
  { label: 'laki-laki', value: 'laki-laki' },
  { label: 'perempuan', value: 'perempuan' },
];

export const cityOptions = [
  { label: 'Ambon', value: 'ambon' },
  { label: 'Balikpapan', value: 'balikpapan' },
  { label: 'Banda Aceh', value: 'banda aceh' },
  { label: 'Bandar Lampung', value: 'bandar lampung' },
  { label: 'Bandung', value: 'bandung' },
  { label: 'Banjar', value: 'banjar' },
  { label: 'Banjarbaru', value: 'banjarbaru' },
  { label: 'Banjarmasin', value: 'banjarmasin' },
  { label: 'Batam', value: 'batam' },
  { label: 'Batu', value: 'batu' },
  { label: 'Bau-Bau', value: 'bau-bau' },
  { label: 'Bekasi', value: 'bekasi' },
  { label: 'Bengkulu', value: 'bengkulu' },
  { label: 'Bima', value: 'bima' },
  { label: 'Binjai', value: 'binjai' },
  { label: 'Bitung', value: 'bitung' },
  { label: 'Blitar', value: 'blitar' },
  { label: 'Bogor', value: 'bogor' },
  { label: 'Bontang', value: 'bontang' },
  { label: 'Bukittinggi', value: 'bukittinggi' },
  { label: 'Cilegon', value: 'cilegon' },
  { label: 'Cimahi', value: 'cimahi' },
  { label: 'Cirebon', value: 'cirebon' },
  { label: 'Denpasar', value: 'denpasar' },
  { label: 'Depok', value: 'depok' },
  { label: 'Dumai', value: 'dumai' },
  { label: 'Gorontalo', value: 'gorontalo' },
  { label: 'Gunungsitoli', value: 'gunungsitoli' },
  { label: 'Jakarta Barat', value: 'jakarta barat' },
  { label: 'Jakarta Pusat', value: 'jakarta pusat' },
  { label: 'Jakarta Selatan', value: 'jakarta selatan' },
  { label: 'Jakarta Timur', value: 'jakarta timur' },
  { label: 'Jakarta Utara', value: 'jakarta utara' },
  { label: 'Jambi', value: 'jambi' },
  { label: 'Jayapura', value: 'jayapura' },
  { label: 'Karawang', value: 'karawang' },
  { label: 'Kediri', value: 'kediri' },
  { label: 'Kendari', value: 'kendari' },
  { label: 'Kotamobagu', value: 'kotamobagu' },
  { label: 'Kupang', value: 'kupang' },
  { label: 'Langsa', value: 'langsa' },
  { label: 'Lhokseumawe', value: 'lhokseumawe' },
  { label: 'Lubuklinggau', value: 'lubuklinggau' },
  { label: 'Madiun', value: 'madiun' },
  { label: 'Magelang', value: 'magelang' },
  { label: 'Makassar', value: 'makassar' },
  { label: 'Malang', value: 'malang' },
  { label: 'Manado', value: 'manado' },
  { label: 'Mataram', value: 'mataram' },
  { label: 'Medan', value: 'medan' },
  { label: 'Metro', value: 'metro' },
  { label: 'Mojokerto', value: 'mojokerto' },
  { label: 'Padang', value: 'padang' },
  { label: 'Padang Panjang', value: 'padang panjang' },
  { label: 'Padangsidimpuan', value: 'padangsidimpuan' },
  { label: 'Pagar Alam', value: 'pagar alam' },
  { label: 'Palangka Raya', value: 'palangka raya' },
  { label: 'Palembang', value: 'palembang' },
  { label: 'Palopo', value: 'palopo' },
  { label: 'Palu', value: 'palu' },
  { label: 'Pangkalpinang', value: 'pangkalpinang' },
  { label: 'Parepare', value: 'parepare' },
  { label: 'Pariaman', value: 'pariaman' },
  { label: 'Pasuruan', value: 'pasuruan' },
  { label: 'Payakumbuh', value: 'payakumbuh' },
  { label: 'Pekalongan', value: 'pekalongan' },
  { label: 'Pekanbaru', value: 'pekanbaru' },
  { label: 'Pematangsiantar', value: 'pematangsiantar' },
  { label: 'Pontianak', value: 'pontianak' },
  { label: 'Prabumulih', value: 'prabumulih' },
  { label: 'Probolinggo', value: 'probolinggo' },
  { label: 'Sabang', value: 'sabang' },
  { label: 'Salatiga', value: 'salatiga' },
  { label: 'Samarinda', value: 'samarinda' },
  { label: 'Sawahlunto', value: 'sawahlunto' },
  { label: 'Semarang', value: 'semarang' },
  { label: 'Serang', value: 'serang' },
  { label: 'Sibolga', value: 'sibolga' },
  { label: 'Singkawang', value: 'singkawang' },
  { label: 'Solok', value: 'solok' },
  { label: 'Sorong', value: 'sorong' },
  { label: 'Subulussalam', value: 'subulussalam' },
  { label: 'Sukabumi', value: 'sukabumi' },
  { label: 'Sungaipenuh', value: 'sungaipenuh' },
  { label: 'Surabaya', value: 'surabaya' },
  { label: 'Surakarta', value: 'surakarta' },
  { label: 'Tangerang', value: 'tangerang' },
  { label: 'Tangerang Selatan', value: 'tangerang selatan' },
  { label: 'Tanjungbalai', value: 'tanjungbalai' },
  { label: 'Tanjungpinang', value: 'tanjungpinang' },
  { label: 'Tarakan', value: 'tarakan' },
  { label: 'Tasikmalaya', value: 'tasikmalaya' },
  { label: 'Tebing Tinggi', value: 'tebing tinggi' },
  { label: 'Tegal', value: 'tegal' },
  { label: 'Ternate', value: 'ternate' },
  { label: 'Tidore Kepulauan', value: 'tidore kepulauan' },
  { label: 'Tomohon', value: 'tomohon' },
  { label: 'Tual', value: 'tual' },
  { label: 'Yogyakarta', value: 'yogyakarta' },
];

export const districtOptions = [
  { label: 'Banyusari', value: 'BANYUSARI' },
  { label: 'Batujaya', value: 'BATUJAYA' },
  { label: 'Ciampel', value: 'CIAMPEL' },
  { label: 'Cibuaya', value: 'CIBUAYA' },
  { label: 'Cikampek', value: 'CIKAMPEK' },
  { label: 'Cilamaya Kulon', value: 'CILAMAYA KULON' },
  { label: 'Cilamaya Wetan', value: 'CILAMAYA WETAN' },
  { label: 'Cilebar', value: 'CILEBAR' },
  { label: 'Jatisari', value: 'JATISARI' },
  { label: 'Jayakerta', value: 'JAYAKERTA' },
  { label: 'Karawang Barat', value: 'KARAWANG BARAT' },
  { label: 'Karawang Timur', value: 'KARAWANG TIMUR' },
  { label: 'Klari', value: 'KLARI' },
  { label: 'Kotabaru', value: 'KOTABARU' },
  { label: 'Kutawaluya', value: 'KUTAWALUYA' },
  { label: 'Lemahabang', value: 'LEMAHABANG' },
  { label: 'Majalaya', value: 'MAJALAYA' },
  { label: 'Pakisjaya', value: 'PAKISJAYA' },
  { label: 'Pangkalan', value: 'PANGKALAN' },
  { label: 'Pedes', value: 'PEDES' },
  { label: 'Purwasari', value: 'PURWASARI' },
  { label: 'Rawamerta', value: 'RAWAMERTA' },
  { label: 'Rengasdengklok', value: 'RENGASDENGKLOK' },
  { label: 'Tegalwaru', value: 'TEGALWARU' },
  { label: 'Telagasari', value: 'TELAGASARI' },
  { label: 'Telukjambe Barat', value: 'TELUKJAMBE BARAT' },
  { label: 'Telukjambe Timur', value: 'TELUKJAMBE TIMUR' },
  { label: 'Tempuran', value: 'TEMPURAN' },
  { label: 'Tirtajaya', value: 'TIRTAJAYA' },
  { label: 'Tirtamulya', value: 'TIRTAMULYA' },
];

// STEP 3 BACKGROUND
export const Step3BackgroundSchema = z.object({
  job: z.preprocess(
    (val) => (val === null || val === undefined ? '' : val),
    z.string().min(1, 'Pekerjaan wajib dipilih'),
  ),
  education: z.string().nullable().optional(),
  program: z.preprocess(
    (val) => (val === null || val === undefined ? '' : val),
    z.string().min(1, 'Program keberangkatan wajib dipilih'),
  ),
  experience: z.preprocess(
    (val) => (val === null || val === undefined ? '' : val),
    z.string().min(1, 'Pengalaman Haji/Umrah wajib dipilih'),
  ),
  companion: z.preprocess(
    (val) => (val === null || val === undefined ? '' : val),
    z.string().min(1, 'Pilih bersama siapa Anda berangkat'),
  ),
  nama_mahram: z.string().min(1, 'Nama pendamping atau mahram wajib diisi'),
});

export const jobOptions = [
  { label: 'Petani', value: 'Petani' },
  { label: 'Peternak', value: 'Peternak' },
  { label: 'Nelayan', value: 'Nelayan' },
  { label: 'Guru', value: 'Guru' },
  { label: 'Buruh Pabrik', value: 'Buruh Pabrik' },
  { label: 'Pedagang', value: 'Pedagang' },
  { label: 'Belum bekerja', value: 'Belum Bekerja' },
];

export const educationOptions = [
  // --- PENDIDIKAN DASAR & MENENGAH ---
  { label: 'SD', value: 'SD' },

  {
    label: 'SLTP / SMP',
    value: 'Sekolah Menengah Pertama',
  },
  { label: 'SLTA / SMA / SMK / MA', value: 'Sekolah Menengah Atas' },

  // --- PENDIDIKAN TINGGI ---
  { label: 'Diploma (D1/D2/D3/D4)', value: 'Diploma' },
  { label: 'Strata 1 (S1)', value: 'S1' },
  { label: 'Strata 2 (S2)', value: 'S2' },
  { label: 'Strata 3 (S3)', value: 'S3' },
];

export const programOptions = [
  // --- UTAMA ---
  { label: 'Reguler', value: 'Reguler' },
  { label: 'Pelimpahan', value: 'Pelimpahan' },
  { label: 'Tarik Mahrom', value: 'Tarik Mahrom' },

  // --- PENDAMPINGAN & KHUSUS ---
  { label: 'Pendamping Lansia', value: 'Pendamping Lansia' },
  { label: 'Mutasi', value: 'Mutasi' },
];

export const experienceOptions = [
  // --- SUDAH PERNAH ---
  { label: 'Pernah Haji', value: 'pernah haji' },
  { label: 'Pernah Umrah', value: 'pernah umrah' },

  // --- BELUM PERNAH ---
  { label: 'Belum Pernah', value: 'belum pernah' },
];

export const companionOptions = [
  // --- KELUARGA INTI ---
  { label: 'Suami', value: 'Suami' },
  { label: 'Istri', value: 'Istri' },
  { label: 'Orang Tua', value: 'Orang Tua' },
  { label: 'Anak', value: 'Anak' },

  // --- KELUARGA BESAR ---
  { label: 'Saudara Kandung', value: 'Saudara Kandung' },
  { label: 'Paman', value: 'Paman' },
  { label: 'Bibi', value: 'Bibi' },
  { label: 'Keponakan', value: 'Keponakan' },
];

// STEP 4 HEALTH & SKILLS

export const Step4SkillsSchema = z.object({
  skill: z.preprocess(
    (val) => (Array.isArray(val) ? val : []),
    z.array(z.string()).min(1, 'Pilih minimal satu kemampuan yang dikuasai'),
  ),

  positiveTrait: z.preprocess(
    (val) => (Array.isArray(val) ? val : []),
    z
      .array(z.string())
      .min(1, 'Pilih minimal satu hal positif yang dapat dikontribusikan'),
  ),

  healthCondition: z.preprocess(
    (val) => (Array.isArray(val) ? val : []),
    z
      .array(z.string())
      .min(1, 'Pilih minimal satu kondisi kesehatan atau kebutuhan khusus'),
  ),
});

export const skillOptions = [
  // --- KEMAMPUAN BAHASA ---
  { label: 'Bahasa Arab', value: 'Bahasa Arab' },
  { label: 'Bahasa Inggris', value: 'Bahasa Inggris' },

  // --- KEMAMPUAN TEKNIS & NAVIGASI ---
  { label: 'Membaca Google Map', value: 'Membaca Google Map' },
  { label: 'Basic MS Office', value: 'Basic MS Office' },

  // --- LAINNYA ---
  { label: 'Tidak Ada', value: 'Tidak Ada' },
];

export const positiveTraitOptions = [
  // --- KEPEMIMPINAN & ORGANISASI ---
  { label: 'Suka Berorganisasi', value: 'Suka Berorganisasi' },
  { label: 'Suka Memimpin', value: 'Suka Memimpin' },
  { label: 'Suka Presentasi', value: 'Suka Presentasi' },

  // --- KEAGAMAAN ---
  { label: 'Dzikir', value: 'Dzikir' },
  { label: 'Mampu Khutbah', value: 'Mampu Khutbah' },
  { label: 'Mampu Menjadi Imam', value: 'Mampu Menjadi Imam' },

  // --- MANAJEMEN & OPERASIONAL ---
  { label: 'Human Resource', value: 'Human Resource' },
  { label: 'Pengelolaan Keuangan', value: 'Pengelolaan Keuangan' },
  { label: 'Suka Traveling', value: 'Suka Traveling' },

  // --- LAINNYA ---
  { label: 'Tidak Ada', value: 'Tidak Ada' },
];

export const healthConditionOptions = [
  // --- RIWAYAT PENYAKIT & MEDIS ---
  { label: 'Diabetes', value: 'Diabetes' },
  { label: 'Gangguan Pernapasan', value: 'Gangguan Pernapasan' },
  { label: 'Darah Tinggi', value: 'Darah Tinggi' },
  { label: 'Jantung', value: 'Jantung' },

  // --- FISIK & USIA LANJUT ---
  { label: 'Lansia', value: 'Lansia' },
  { label: 'Demensia (Pikun)', value: 'Demensia' },

  // --- KEBUTUHAN KHUSUS & PERAWATAN ---
  { label: 'Membutuhkan Kursi Roda', value: 'Membutuhkan Kursi Roda' },
  { label: 'Rutin Konsumsi Obat', value: 'Rutin Konsumsi Obat' },

  // --- KONDISI KESEHATAN UMUM ---
  { label: 'Tidak Ada', value: 'Tidak Ada' },
];

// STEP 5 REFERENCE
export const Step5Reference = z.object({
  referenceName: z
    .string()
    .min(1, 'Nama ayah kandung wajib diisi')
    .min(3, 'Nama ayah kandung minimal 3 karakter'),
  referenceWhatsapp: z
    .string()
    .min(1, 'Nomor whatsapp referensi harus di isi')
    .regex(/^[0-9]+$/, 'Nomor whatsapp harus berupa angka saja')
    .min(9, 'Nomor whatsapp minimal 9 karakter'),
  referenceOrigin: z.string().min(1, 'Pekerjaan wajib dipilih'),
  profileImage: z
    .any()
    .refine((value) => {
      // 1. Check Data Existence
      if (!value) return false;
      if (typeof value === 'string') return value.trim().length > 0;
      if (value instanceof FileList) return value.length > 0;
      if (value instanceof File) return true;
      return false;
    }, 'Foto profil wajib diunggah')

    .refine((value) => {
      // 2. Check File Size (Maximum 1 MB = 1,048,576 Bytes)
      if (typeof value === 'string') return true; // Pass if it's a URL string from the DB

      const file = value instanceof FileList ? value[0] : value;

      // Fail if it's not a valid File instance
      if (!(file instanceof File)) return false;

      // Return true if size is <= 1MB
      return file.size <= 1024 * 1024;
    }, 'Ukuran gambar maksimal adalah 1 MB, silakan pilih gambar yang lebih kecil')

    .refine((value) => {
      // 3. Check File Format
      if (typeof value === 'string') return true;
      const file = value instanceof FileList ? value[0] : value;
      if (!(file instanceof File)) return false;

      const ACCEPTED_TYPES = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/webp',
      ];
      return ACCEPTED_TYPES.includes(file.type);
    }, 'Format gambar tidak didukung. Gunakan PNG, JPEG, JPG, atau WEBP'),
});

export const referenceOriginOptions = [
  // --- TAHUN SIMAK ---
  { label: 'SIMAK 2022', value: 'SIMAK 2022' },
  { label: 'SIMAK 2023', value: 'SIMAK 2023' },
  { label: 'SIMAK 2024', value: 'SIMAK 2024' },
  { label: 'SIMAK 2025', value: 'SIMAK 2025' },
  { label: 'SIMAK 2026', value: 'SIMAK 2026' },

  // --- KARYAWAN & INSTITUSI ---
  { label: 'KARYAWAN KEMENHAJ', value: 'KARYAWAN KEMENHAJ' },
  { label: 'KARYAWAN KEMENAG', value: 'KARYAWAN KEMENAG' },

  // --- LAINNYA ---
  { label: 'NON SIMAK', value: 'NON SIMAK' },
  { label: 'MEDIA SOSIAL', value: 'MEDIA SOSIAL' },
];
