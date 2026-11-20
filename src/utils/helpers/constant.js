import {
  IconWhatsappFill,
  IconInstagram,
  IconFacebook,
  IconYoutube,
  IconLinkedin,
} from './decorations';

// HELPER FOR useUserFilter.js
export const ADMIN_DOC_FIELDS = [
  { key: 'statusGoogleForm', label: 'G-Form' },
  { key: 'statusPhoto', label: 'Photo' },
  { key: 'statusSpph', label: 'SPPH' },
  { key: 'statusMutasi', label: 'Mutasi' },
  { key: 'statusBiometrik', label: 'Biometrik' },
  { key: 'statusPuskesmas', label: 'Puskesmas' },
  { key: 'statusMCU', label: 'MCU' },
  { key: 'statusPelunasan', label: 'Pelunasan' },
  { key: 'statusPassport', label: 'Passport' },
  { key: 'statusVisa', label: 'Visa' },
];

// GALLERY LANDING PAGE
export const DESKTOP_SPANS = [
  'col-span-2 row-span-2', // item 0
  'col-span-1 row-span-1', // item 1
  'col-span-1 row-span-2', // item 2
  'col-span-1 row-span-1', // item 3
  'col-span-2 row-span-1', // item 4
  'col-span-1 row-span-1', // item 5
];

// EDIT MENU LANDING PAGE: ADMIN
export const SECTIONS_LANDING_PAGE = [
  { key: 'hero', label: 'Hero Section' },
  { key: 'about', label: 'About Us' },
  { key: 'statistics', label: 'Statistics' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'documentation', label: 'Documentation' },
  { key: 'faq', label: 'FAQ' },
  { key: 'footer', label: 'Footer' },
];

// MAP SOCIAL MEDIA ICONS AND BRAND COLORS
export const SOCIAL_MEDIA_CONFIG = {
  instagram: {
    icon: IconInstagram,
    // Menggunakan trik background gradient dengan masking agar ikon tetap terlihat ber-gradient
    hoverColor: 'hover:text-[#E4405F]',
    borderColor: 'group-hover:border-[#E4405F]',
  },
  facebook: {
    icon: IconFacebook,
    hoverColor: 'hover:text-[#1877F2]',
    borderColor: 'group-hover:border-[#1877F2]',
  },
  youtube: {
    icon: IconYoutube,
    hoverColor: 'hover:text-[#FF0000]',
    borderColor: 'group-hover:border-[#FF0000]',
  },
  whatsapp: {
    icon: IconWhatsappFill,
    hoverColor: 'hover:text-[#25D366]',
    borderColor: 'group-hover:border-[#25D366]',
  },
  linkedin: {
    icon: IconLinkedin,
    hoverColor: 'hover:text-[#0A66C2]',
    borderColor: 'group-hover:border-[#0A66C2]',
  },
};

// MAPPING FOR READ HADITH BOOK DISPLAY NAMES (FALLBACK IF API DOES NOT PROVIDE IT AT ROOT)
export const BOOKS_NAME = {
  shahih_bukhari: 'Sahih al-Bukhari',
  shahih_muslim: 'Sahih Muslim',
  sunan_abu_daud: 'Sunan Abu Daud',
  sunan_tirmidzi: 'Sunan Tirmidzi',
  sunan_nasai: 'Sunan Nasai',
  sunan_ibnu_majah: 'Sunan Ibnu Majah',
  musnad_ahmad: 'Musnad Ahmad',
  musnad_syafii: 'Musnad Syafii',
  riyadhus_shalihin: 'Riyadhus Shalihin',
};

// KITAB METADATA MAPPING FOR HERO SECTION
export const KITAB_METADATA = {
  shahih_bukhari: {
    arabicName: 'صحيح البخاري',
    subTitle: "Al-Jami' al-Musnad as-Sahih",
    author: 'Abu Abdullah Muhammad bin Ismail al-Bukhari',
  },
  shahih_muslim: {
    arabicName: 'صحيح مسلم',
    subTitle: 'Al-Musnad as-Sahih Al-Mukhtasar',
    author: 'Abu al-Husain Muslim bin al-Hajjaj',
  },
  sunan_abu_daud: {
    arabicName: 'سنن أبي داود',
    subTitle: 'Sunan Abi Dawud',
    author: "Sulaiman bin al-Asy'ats Abu Daud",
  },
  sunan_tirmidzi: {
    arabicName: 'سنن الترمذي',
    subTitle: "Al-Jami' at-Tirmidzi",
    author: 'Muhammad bin Isa at-Tirmidzi',
  },
  sunan_nasai: {
    arabicName: 'سنن النسائي',
    subTitle: 'Al-Mujtaba min as-Sunan',
    author: "Ahmad bin Syu'aib an-Nasa'i",
  },
  sunan_ibnu_majah: {
    arabicName: 'سنن ابن ماجه',
    subTitle: 'Sunan Ibnu Majah',
    author: 'Abu Abdullah Muhammad bin Yazid Ibnu Majah',
  },
  musnad_ahmad: {
    arabicName: 'مسند أحمد',
    subTitle: 'Musnad Al-Imam Ahmad bin Hanbal',
    author: 'Ahmad bin Hanbal al-Syaibani',
  },
  musnad_syafii: {
    arabicName: 'مسند الشافعي',
    subTitle: "Musnad Al-Imam ash-Syafi'i",
    author: "Muhammad bin Idris ash-Syafi'i",
  },
  riyadhus_shalihin: {
    arabicName: 'رياض الصالحين',
    subTitle: 'Riyadhus Shalihin min Kalami Sayyidil Mursalin',
    author: 'Yahya bin Syaraf an-Nawawi',
  },
  riyadhus_shalihin_arab: {
    arabicName: 'رياض الصالحين (عربي)',
    subTitle: 'Riyadhus Shalihin (Matan Arab)',
    author: 'Yahya bin Syaraf an-Nawawi',
  },
};

// CENTRALIZED CATEGORY CONFIGURATION
export const CATEGORY_CONFIG = {
  'doa-praktis': {
    id: 'doa-praktis',
    title: 'Kumpulan Doa Praktis',
    description:
      'Berbagai doa praktis untuk menemani aktivitas dan kebutuhan selama ibadah.',
    fetchData: () =>
      import('../jsons/practiceDuas.json').then((module) => module.default),
  },
  'doa-haji': {
    id: 'doa-haji',
    title: 'Doa dan Dzikir Haji / Umroh',
    description:
      'Panduan lengkap doa dan dzikir selama menjalankan rukun ibadah.',
    fetchData: () =>
      import('../jsons/hajjUmrahDuas.json').then((module) => module.default),
  },
  'masjidil-haram': {
    id: 'masjidil-haram',
    title: 'Masjidil Haram',
    description:
      'Kumpulan doa khusus ketika berada di dalam kawasan Masjidil Haram.',
    fetchData: () =>
      import('../jsons/masjidHaramDuas.json').then((module) => module.default),
  },
  perjalanan: {
    id: 'perjalanan',
    title: 'Perjalanan',
    description:
      'Doa dan dzikir yang dibaca selama dalam perjalanan ibadah Anda.',
    fetchData: () =>
      import('../jsons/travelDuas.json').then((module) => module.default),
  },
};

// CENTRALIZED CATEGORY CONFIGURATION FOR DETAIL PAGE DUA
export const CATEGORY_ORDER = [
  'doa-praktis',
  'doa-haji',
  'masjidil-haram',
  'perjalanan',
];

// CENTRALIZED FILTERS FOR ENVENT
export const MONTH_OPTIONS = [
  { value: 'Semua Bulan', label: 'Semua Bulan' },
  { value: '01', label: 'Januari' },
  { value: '02', label: 'Februari' },
  { value: '03', label: 'Maret' },
  { value: '04', label: 'April' },
  { value: '05', label: 'Mei' },
  { value: '06', label: 'Juni' },
  { value: '07', label: 'Juli' },
  { value: '08', label: 'Agustus' },
  { value: '09', label: 'September' },
  { value: '10', label: 'Oktober' },
  { value: '11', label: 'November' },
  { value: '12', label: 'Desember' },
];

export const TYPE_OPTIONS = [
  { value: 'Semua Tipe', label: 'Semua Kategori' },
  { value: 'jamaah', label: 'Jamaah' },
  { value: 'leader', label: 'Leader' },
];

export const STATUS_OPTIONS = [
  { value: 'Semua Status', label: 'Semua Status' },
  { value: 'mendatang', label: 'Mendatang' },
  { value: 'live', label: 'Live' },
  { value: 'selesai', label: 'Selesai' },
];

// ZONE TO SUB-DISTRICT MAPPING
export const DISTRICT_BY_ZONE = {
  A: [
    { label: 'Cikampek', value: 'CIKAMPEK' },
    { label: 'Jatisari', value: 'JATISARI' },
    { label: 'Kotabaru', value: 'KOTABARU' },
    { label: 'Purwasari', value: 'PURWASARI' },
    { label: 'Tirtamulya', value: 'TIRTAMULYA' },
  ],
  B: [
    { label: 'Banyusari', value: 'BANYUSARI' },
    { label: 'Cilamaya Kulon', value: 'CILAMAYA KULON' },
    { label: 'Cilamaya Wetan', value: 'CILAMAYA WETAN' },
    { label: 'Lemahabang', value: 'LEMAHABANG' },
    { label: 'Majalaya', value: 'MAJALAYA' },
    { label: 'Rawamerta', value: 'RAWAMERTA' },
    { label: 'Telagasari', value: 'TELAGASARI' },
    { label: 'Tempuran', value: 'TEMPURAN' },
  ],
  C: [
    { label: 'Ciampel', value: 'CIAMPEL' },
    { label: 'Karawang Timur', value: 'KARAWANG TIMUR' },
    { label: 'Klari', value: 'KLARI' },
  ],
  D: [
    { label: 'Karawang Barat', value: 'KARAWANG BARAT' },
    { label: 'Telukjambe Barat', value: 'TELUKJAMBE BARAT' },
    { label: 'Telukjambe Timur', value: 'TELUKJAMBE TIMUR' },
  ],
  E: [
    { label: 'Pangkalan', value: 'PANGKALAN' },
    { label: 'Tegalwaru', value: 'TEGALWARU' },
  ],
  F: [
    { label: 'Batujaya', value: 'BATUJAYA' },
    { label: 'Cibuaya', value: 'CIBUAYA' },
    { label: 'Cilebar', value: 'CILEBAR' },
    { label: 'Jayakerta', value: 'JAYAKERTA' },
    { label: 'Kutawaluya', value: 'KUTAWALUYA' },
    { label: 'Pakisjaya', value: 'PAKISJAYA' },
    { label: 'Pedes', value: 'PEDES' },
    { label: 'Rengasdengklok', value: 'RENGASDENGKLOK' },
    { label: 'Tirtajaya', value: 'TIRTAJAYA' },
  ],
};

// HELPR IMAGE RULE
export const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB in Bytes

export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

// ENDPOINT MAPPING BY USER ROLE
export const ENDPOINT_BY_ROLE = {
  user: 'user.php',
  leader: 'leader.php',
  admin: 'admin.php',
};

// FILTER LABEL FOR USER EVENT MENU
export const EVENT_FILTER_TABS = [
  { key: 'all', label: 'Semua' },
  { key: 'mendatang', label: 'Menunggu' },
  { key: 'live', label: 'Berlangsung' },
  { key: 'selesai', label: 'Selesai' },
];
