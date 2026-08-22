import {
  IoHomeOutline as IconHomeOutline,
  IoHome as IconHomeFill,
  IoCalendarClearOutline as IconCalendarOutline,
  IoCalendarClear as IconCalendarFill,
  IoPersonOutline as IconPersonOutline,
  IoPerson as IconPersonFill,
  IoQrCodeOutline as IconQrOutline,
  IoQrCode as IconQrFill,
  IoWalletOutline as IconWalletOutline,
  IoWallet as IconWalletFill,
  IoPeopleOutline as IconPeopleOutline,
  IoPeople as IconPeopleFill,
} from 'react-icons/io5';

export default function getNavItems(role) {
  const commonItems = {
    home: {
      id: 'home',
      label: 'Beranda',
      path: role === 'admin' ? '/admin/home' : '/user/home',
      IconOutline: IconHomeOutline,
      IconFill: IconHomeFill,
    },
    schedule: {
      id: 'schedule',
      label: 'Jadwal',
      path: role === 'admin' ? '/maintenance' : '/user/jadwal',
      IconOutline: IconCalendarOutline,
      IconFill: IconCalendarFill,
    },
    finance: {
      id: 'finance',
      label: 'Keuangan',
      path: role === 'admin' ? '/maintenance' : '/user/keuangan',
      IconOutline: IconWalletOutline,
      IconFill: IconWalletFill,
    },
    profile: {
      id: 'profile',
      label: 'Profil',
      path: role === 'admin' ? '/maintenance' : '/user/profile',
      IconOutline: IconPersonOutline,
      IconFill: IconPersonFill,
    },
  };

  // MENU SCAN QR (only for jamaah / user)
  const qrItem = {
    id: 'scan-qr',
    label: 'Scan QR',
    path: '/maintenance',
    IconOutline: IconQrOutline,
    IconFill: IconQrFill,
    isPrimary: true, // Floating button for mobile
  };

  // MENU JAMAAH (only for admin)
  const jamaahItem = {
    id: 'jamaah',
    label: 'Jamaah',
    path: '/maintenance',
    IconOutline: IconPeopleOutline,
    IconFill: IconPeopleFill,
  };

  if (role === 'admin') {
    return [
      commonItems.home,
      jamaahItem,
      commonItems.schedule,
      commonItems.finance,
      commonItems.profile,
    ];
  }

  // DEFAULT ROLE = USER / JAMAAH
  return [
    commonItems.home,
    commonItems.schedule,
    qrItem,
    commonItems.finance,
    commonItems.profile,
  ];
}


