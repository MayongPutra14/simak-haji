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
  gender: z.enum(['laki-laki', 'perempuan'], {
    errorMap: (issue, ctx) => {
      return { message: 'Pilih jenis kelamin Anda' };
    },
  }),
  birthPlace: z.string().min(1, 'Pilih tempat/kota kelahiran'),
  address: z
    .string()
    .min(1, 'Alamat wajib diisi')
    .min(5, 'Alamat lengkap minimal 5 karakter'),
  village: z.string().min(1, 'Desa/Kelurahan wajib diisi'),
  subDistrict: z.string().min(1, 'Pilih kecamatan Anda'),
  subDistrictOther: z.string().optional(),
});

export const gender = [
  { label: 'laki-laki', value: 'laki-laki' },
  { label: 'perempuan', value: 'perempuan' },
];

export const cityOptions = [
  // --- ACEH ---
  { label: 'Banda Aceh', value: 'Banda Aceh' },
  { label: 'Langsa', value: 'Langsa' },
  { label: 'Lhokseumawe', value: 'Lhokseumawe' },
  { label: 'Sabang', value: 'Sabang' },
  { label: 'Subulussalam', value: 'Subulussalam' },
  // --- SUMATERA UTARA ---
  { label: 'Binjai', value: 'Binjai' },
  { label: 'Gunungsitoli', value: 'Gunungsitoli' },
  { label: 'Medan', value: 'Medan' },
  { label: 'Padangsidimpuan', value: 'Padangsidimpuan' },
  { label: 'Pematangsiantar', value: 'Pematangsiantar' },
  { label: 'Sibolga', value: 'Sibolga' },
  { label: 'Tanjungbalai', value: 'Tanjungbalai' },
  { label: 'Tebing Tinggi', value: 'Tebing Tinggi' },
  // --- SUMATERA BARAT ---
  { label: 'Bukittinggi', value: 'Bukittinggi' },
  { label: 'Padang', value: 'Padang' },
  { label: 'Padang Panjang', value: 'Padang Panjang' },
  { label: 'Pariaman', value: 'Pariaman' },
  { label: 'Payakumbuh', value: 'Payakumbuh' },
  { label: 'Sawahlunto', value: 'Sawahlunto' },
  { label: 'Solok', value: 'Solok' },
  // --- RIAU ---
  { label: 'Dumai', value: 'Dumai' },
  { label: 'Pekanbaru', value: 'Pekanbaru' },
  // --- KEPULAUAN RIAU ---
  { label: 'Batam', value: 'Batam' },
  { label: 'Tanjungpinang', value: 'Tanjungpinang' },
  // --- JAMBI ---
  { label: 'Jambi', value: 'Jambi' },
  { label: 'Sungaipenuh', value: 'Sungaipenuh' },
  // --- SUMATERA SELATAN ---
  { label: 'Lubuklinggau', value: 'Lubuklinggau' },
  { label: 'Pagar Alam', value: 'Pagar Alam' },
  { label: 'Palembang', value: 'Palembang' },
  { label: 'Prabumulih', value: 'Prabumulih' },
  // --- BANGKA BELITUNG & BENGKULU ---
  { label: 'Pangkalpinang', value: 'Pangkalpinang' },
  { label: 'Bengkulu', value: 'Bengkulu' },
  // --- LAMPUNG ---
  { label: 'Bandar Lampung', value: 'Bandar Lampung' },
  { label: 'Metro', value: 'Metro' },
  // --- DKI JAKARTA ---
  { label: 'Jakarta Barat', value: 'Jakarta Barat' },
  { label: 'Jakarta Pusat', value: 'Jakarta Pusat' },
  { label: 'Jakarta Selatan', value: 'Jakarta Selatan' },
  { label: 'Jakarta Timur', value: 'Jakarta Timur' },
  { label: 'Jakarta Utara', value: 'Jakarta Utara' },
  // --- JAWA BARAT ---
  { label: 'Bandung', value: 'Bandung' },
  { label: 'Banjar', value: 'Banjar' },
  { label: 'Bekasi', value: 'Bekasi' },
  { label: 'Bogor', value: 'Bogor' },
  { label: 'Cimahi', value: 'Cimahi' },
  { label: 'Cirebon', value: 'Cirebon' },
  { label: 'Depok', value: 'Depok' },
  { label: 'Sukabumi', value: 'Sukabumi' },
  { label: 'Tasikmalaya', value: 'Tasikmalaya' },
  // --- BANTEN ---
  { label: 'Cilegon', value: 'Cilegon' },
  { label: 'Serang', value: 'Serang' },
  { label: 'Tangerang', value: 'Tangerang' },
  { label: 'Tangerang Selatan', value: 'Tangerang Selatan' },
  // --- JAWA TENGAH & DIY ---
  { label: 'Magelang', value: 'Magelang' },
  { label: 'Pekalongan', value: 'Pekalongan' },
  { label: 'Salatiga', value: 'Salatiga' },
  { label: 'Semarang', value: 'Semarang' },
  { label: 'Surakarta', value: 'Surakarta' },
  { label: 'Tegal', value: 'Tegal' },
  { label: 'Yogyakarta', value: 'Yogyakarta' },
  // --- JAWA TIMUR ---
  { label: 'Batu', value: 'Batu' },
  { label: 'Blitar', value: 'Blitar' },
  { label: 'Kediri', value: 'Kediri' },
  { label: 'Madiun', value: 'Madiun' },
  { label: 'Malang', value: 'Malang' },
  { label: 'Mojokerto', value: 'Mojokerto' },
  { label: 'Pasuruan', value: 'Pasuruan' },
  { label: 'Probolinggo', value: 'Probolinggo' },
  { label: 'Surabaya', value: 'Surabaya' },
  // --- BALI & NUSA TENGGARA ---
  { label: 'Denpasar', value: 'Denpasar' },
  { label: 'Bima', value: 'Bima' },
  { label: 'Mataram', value: 'Mataram' },
  { label: 'Kupang', value: 'Kupang' },
  // --- KALIMANTAN ---
  { label: 'Pontianak', value: 'Pontianak' },
  { label: 'Singkawang', value: 'Singkawang' },
  { label: 'Palangka Raya', value: 'Palangka Raya' },
  { label: 'Banjarbaru', value: 'Banjarbaru' },
  { label: 'Banjarmasin', value: 'Banjarmasin' },
  { label: 'Balikpapan', value: 'Balikpapan' },
  { label: 'Bontang', value: 'Bontang' },
  { label: 'Samarinda', value: 'Samarinda' },
  { label: 'Tarakan', value: 'Tarakan' },
  // --- SULAWESI ---
  { label: 'Bitung', value: 'Bitung' },
  { label: 'Kotamobagu', value: 'Kotamobagu' },
  { label: 'Manado', value: 'Manado' },
  { label: 'Tomohon', value: 'Tomohon' },
  { label: 'Palu', value: 'Palu' },
  { label: 'Makassar', value: 'Makassar' },
  { label: 'Palopo', value: 'Palopo' },
  { label: 'Parepare', value: 'Parepare' },
  { label: 'Bau-Bau', value: 'Bau-Bau' },
  { label: 'Kendari', value: 'Kendari' },
  { label: 'Gorontalo', value: 'Gorontalo' },
  // --- MALUKU & PAPUA ---
  { label: 'Ambon', value: 'Ambon' },
  { label: 'Tual', value: 'Tual' },
  { label: 'Ternate', value: 'Ternate' },
  { label: 'Tidore Kepulauan', value: 'Tidore Kepulauan' },
  { label: 'Jayapura', value: 'Jayapura' },
  { label: 'Sorong', value: 'Sorong' },
];

// STEP 3 BACKGROUND
export const Step3BackgroundSchema = z.object({
  job: z.string().min(1, 'Pekerjaan wajib dipilih'),
  education: z.string().optional(),
  program: z.string().min(1, 'Program keberangkatan wajib dipilih'),
  experience: z.string().min(1, 'Pengalaman Haji / Umroh wajib dipilih'),
  companion: z.string().min(1, 'Pilih dengan siapa Anda akan berangkat'),
});

export const jobOptions = [
  { label: 'Petani', value: 'Petani' },
  { label: 'Peternak', value: 'Peternak' },
  { label: 'Nelayan', value: 'Nelayan' },
  { label: 'Guru', value: 'Guru' },
  { label: 'Buruh Pabrik', value: 'Buruh Pabrik' },
  { label: 'Pedagang', value: 'Pedagang' },
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
  { label: 'Pernah Haji', value: 'Pernah Haji' },
  { label: 'Pernah Umrah', value: 'Pernah Umrah' },

  // --- BELUM PERNAH ---
  { label: 'Belum Pernah', value: 'Belum' },
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
export const Step4SkillsSchema = z
  .object({
    // array minimal 1 elemen untuk memastikan setidaknya ada 1 checkbox yang dicentang
    skill: z
      .array(z.string())
      .min(1, 'Pilih minimal satu kemampuan yang dikuasai'),
    skillOther: z.string().optional(),

    positiveTrait: z
      .array(z.string())
      .min(1, 'Pilih minimal satu hal positif yang dapat dikontribusikan'),
    positiveTraitOther: z.string().optional(),

    healthCondition: z
      .array(z.string())
      .min(1, 'Pilih minimal satu kondisi kesehatan atau kebutuhan khusus'),
    healthConditionOther: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Validasi kondisional jika opsi "Lainnya" dicentang
    if (
      data.skill.includes('Lainnya') &&
      (!data.skillOther || data.skillOther.trim() === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Sebutkan kemampuan lainnya',
        path: ['skillOther'],
      });
    }

    if (
      data.positiveTrait.includes('Lainnya') &&
      (!data.positiveTraitOther || data.positiveTraitOther.trim() === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Sebutkan kontribusi positif lainnya',
        path: ['positiveTraitOther'],
      });
    }

    if (
      data.healthCondition.includes('Lainnya') &&
      (!data.healthConditionOther || data.healthConditionOther.trim() === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Sebutkan kondisi kesehatan lainnya',
        path: ['healthConditionOther'],
      });
    }
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
  // --- KONDISI KESEHATAN UMUM ---
  { label: 'Tidak Ada', value: 'Tidak Ada' },

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
];
