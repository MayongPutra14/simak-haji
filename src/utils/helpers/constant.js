import {
  IconWhatsappFill,
  IconInstagram,
  IconFacebook,
  IconYoutube,
  IconLinkedin,
} from './decorations';

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
