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
