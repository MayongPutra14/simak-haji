import {
  IoHomeOutline as IconHomeOutline,
  IoHome as IconHomeFill,
  IoCalendarClearOutline as IconCalendarOutline,
  IoCalendarClear as IconCalendarFill,
  IoPersonOutline as IconPersonOutline,
  IoPerson as IconPersonFill,
  IoGridOutline as IconMenuOutline,
  IoGrid as IconMenuFill,
  IoScanOutline as IconScanOutline,
  IoScanSharp as IconScanFill,
} from 'react-icons/io5';

export default function getNavItems(role) {
  const commonItems = {
    home: {
      id: 'home',
      label: 'Beranda',
      path: '/user/home',
      IconOutline: IconHomeOutline,
      IconFill: IconHomeFill,
    },
    schedule: {
      id: 'schedule',
      label: 'Jadwal',
      path: '/user/jadwal',
      IconOutline: IconCalendarOutline,
      IconFill: IconCalendarFill,
    },
    profile: {
      id: 'profile',
      label: 'Profile',
      path: '/user/profile',
      IconOutline: IconPersonOutline,
      IconFill: IconPersonFill,
    },
    more: {
      id: 'more',
      label: 'Lainnya',
      path: '/user/others',
      IconOutline: IconMenuOutline,
      IconFill: IconMenuFill,
    },
  };

  const qrItem = {
    id: 'scan-qr',
    label: 'Scan QR',
    path: '/admin/scanQR',
    IconOutline: IconScanOutline,
    IconFill: IconScanFill,
    isPrimary: true, // CONDITIONAL RENDERING
  };

  if (role === 'admin') {
    return [
      commonItems.home,
      commonItems.schedule,
      qrItem,
      commonItems.profile,
      commonItems.more,
    ];
  }

  // DEFAULT ROLE = USER
  return [
    commonItems.home,
    commonItems.schedule,
    commonItems.profile,
    commonItems.more,
  ];
};
