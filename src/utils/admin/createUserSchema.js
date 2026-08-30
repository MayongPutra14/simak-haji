import z from 'zod';

// helper function
const convertStringToArray = (val) => {
  if (typeof val === 'string') {
    return val
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return Array.isArray(val) ? val : [];
};

// helper image rules
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB in Bytes
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

//  user account schema
export const UserAccount = z.object({
  porsionNumber: z
    .string()
    .min(1, 'Nomor porsi wajib diisi')
    .regex(
      /^[0-9]+$/,
      'Input wajib berupa angka dan tidak boleh berisi karakter apapun',
    ),
  password: z
    .string()
    .min(1, 'Password wajib diisi')
    .min(6, 'Password minimal 6 karakter'),
  confirmPassword: z.string().min(1, 'Konfirmasi password wajib diisi'),
});

// persona data
export const PersonalData = z.object({
  userName: z
    .string()
    .min(1, 'Nama jamaah wajib diisi')
    .min(3, 'Nama jamaah minimal 3 karakter'),
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
  subDistrict: z.string().min(1, 'Kecamatan wajib diisi'),
  village: z.string().min(1, 'Desa/Kelurahan wajib diisi'),
  profileImage: z
    .any()
    .refine(
      (file) => file !== null && file !== undefined,
      'Foto profile wajib diunggah',
    )
    .refine((file) => {
      if (file instanceof File) return file.size <= MAX_FILE_SIZE;
      return true; // Jika berupa string URL (mode edit)
    }, 'Ukuran file maksimal 1 MB')
    .refine((file) => {
      if (file instanceof File) return ACCEPTED_IMAGE_TYPES.includes(file.type);
      return true;
    }, 'Format file harus JPG, PNG, atau WEBP'),
});

// background
export const Background = z.object({
  job: z.string().min(1, 'Pekerjaan wajib diisi'),
  education: z.string().nullable().optional(),
  depature: z.string().min(1, 'Program keberangkatan wajib diisi'),
  experience: z.string().min(1, 'Pengalaman wajib diisi'),
  companion: z.string().min(1, 'Pendamping wajib diisi'),
  mahramName: z.string().min(1, 'Nama mahram wajib diisi'),
});

// Health and SKill Schema
export const HealthSkills = z.object({
  expertise: z.preprocess(
    convertStringToArray,
    z.array(z.string()).min(1, 'Masukkan minimal satu kemampuan yang dikuasai'),
  ),

  contribution: z.preprocess(
    convertStringToArray,
    z
      .array(z.string())
      .min(1, 'Masukkan minimal satu hal positif yang dikontribusikan'),
  ),

  health: z.preprocess(
    convertStringToArray,
    z
      .array(z.string())
      .min(1, 'Masukkan minimal satu kondisi kesehatan atau kebutuhan khusus'),
  ),
});

// reference
export const Reference = z.object({
  referenceName: z.string().nullable().optional(),
  referencePhone: z.string().nullable().optional(),
  referenceOrigin: z.string().nullable().optional(),
});

// Hajj Data
export const HajjData = z.object({
  currPorsionPosition: z.string().nullable().optional(),
  currPorstionStatus: z.string().nullable().optional(),
  currPorsionPositionBackup: z.string().nullable().optional(),
  currPorstionStatusBackup: z.string().nullable().optional(),
  zone: z.string().min(1, 'Zona wajib diisi'),
});

// Status control process
export const StatusControlProcess = z.object({
  googleFormStatus: z.string().nullable().optional(),
  photoStatus: z.string().nullable().optional(),
  spphStatus: z.string().nullable().optional(),
  mutationStatus: z.string().nullable().optional(),
  biometricStatus: z.string().nullable().optional(),
  puskesmasStatus: z.string().nullable().optional(),
  mcuStatus: z.string().nullable().optional(),
  paymentStatus: z.string().nullable().optional(),
  passport: z.string().nullable().optional(),
  visa: z.string().nullable().optional(),
});

// Placement
export const Placement = z.object({
  plotNumber: z.string().nullable().optional(),
  batch: z.string().nullable().optional(),
  group: z.string().nullable().optional(),
  team: z.string().nullable().optional(),
});

// DATA SUPPORT
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

export const gender = [
  { label: 'Laki-laki', value: 'laki-laki' },
  { label: 'Perempuan', value: 'perempuan' },
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
  { label: 'Kotabaru', value: 'KOTABARU' },
];

export const educationOptions = [
  // --- PENDIDIKAN DASAR & MENENGAH ---
  { label: 'SD', value: 'SD' },
  { label: 'SLTP / SMP', value: 'SLTP' },
  { label: 'SLTA / SMA / SMK', value: 'SLTA' },

  // --- PENDIDIKAN TINGGI ---
  { label: 'Diploma (D1/D2/D3/D4)', value: 'Diploma' },
  { label: 'Strata 1 (S1)', value: 'S1' },
  { label: 'Strata 2 (S2)', value: 'S2' },
  { label: 'Strata 3 (S3)', value: 'S3' },
];

export const statusPortionOptions = [
  { label: 'Cadangan 1', value: 'cadangan 1' },
  { label: 'Cadangan 2', value: 'cadangan 2' },
  { label: 'Cadangan 3', value: 'cadangan 3' },
];

export const statusControlProcessOptions = [
  { label: 'Lengkap', value: 'lengkap' },
  { label: 'Menunggu', value: 'menunggu' },
  { label: 'Gagal', value: 'gagal' },
];

export const statusHajiUmrahOptions = [
  { label: 'Pernah Haji', value: 'pernah haji' },
  { label: 'Pernah Umrah', value: 'pernah umrah' },
  { label: 'Belum Pernah', value: 'belum pernah' },
];

export const zonaOptions = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
  { label: 'E', value: 'E' },
  { label: 'F', value: 'F' },
];

export const CreateUserSchema = z
  .object({})
  .merge(UserAccount)
  .merge(PersonalData)
  .merge(Background)
  .merge(HealthSkills)
  .merge(Reference)
  .merge(HajjData)
  .merge(StatusControlProcess)
  .merge(Placement)
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password dan Konfirmasi Password tidak cocok',
    path: ['confirmPassword'],
  });
