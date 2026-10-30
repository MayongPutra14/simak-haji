import {
  IconHome as IconHomeOutline,
  IconHomeFill,
  IconCalendar as IconCalendarOutline,
  IconCalendarFill,
  IconPerson as IconPersonOutline,
  IconPersonFill,
  IconQr as IconQrOutline,
  IconQrFill,
  IconWallet as IconWalletOutline,
  IconWalletFill,
  IconPeopleOutline,
  IconPeopleFill,
} from './decorations';

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
      label: 'Event',
      path: role === 'admin' ? '/admin/events' : '/user/schedules',
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
      path: role === 'admin' ? '/admin/profile' : '/user/profile',
      IconOutline: IconPersonOutline,
      IconFill: IconPersonFill,
    },
  };

  // MENU SCAN QR (only for jamaah / user)
  const qrItem = {
    id: 'scan-qr',
    label: 'Scan QR',
    path: '/user/scan',
    IconOutline: IconQrOutline,
    IconFill: IconQrFill,
    isPrimary: true, // Floating button for mobile
  };

  // MENU JAMAAH (only for admin)
  const jamaahItem = {
    id: 'jamaah',
    label: 'Jamaah',
    path: '/admin/users',
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
