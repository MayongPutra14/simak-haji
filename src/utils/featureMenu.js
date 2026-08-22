import {
  QuranIcon,
  HadithIcon,
  TasbihIcon,
  DuaIcon,
  SavingIcon,
} from '../components/ui/global/MenuIcon';

import {
  IoQrCodeOutline as IconQr,
  IoWalletOutline as IconWallet,
  IoTrophyOutline as _IconLeaderboard,
  IoPeopleOutline as _IconPeople,
  IoGridOutline as IconMore,
} from 'react-icons/io5';

/**
 * Get menu list features based on role  (Role-Based)
 * @param {'user' | 'admin'} role - active role user
 * @returns {Array} Object list menu for FeatureHubContainer
 */
export default function getFeatureItems(role = 'user') {
  // General menu (User & Admin)
  const commonIslamicItems = [
    {
      id: 'quran',
      label: "Al-Qur'an",
      path: role === 'admin' ? '/maintenance' : '/maintenance',
      Icon: QuranIcon,
      bgColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 'hadits',
      label: 'Hadits',
      path: role === 'admin' ? '/maintenance' : '/maintenance',
      Icon: HadithIcon,
      bgColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      id: 'dzikir',
      label: 'Dzikir',
      path: role === 'admin' ? '/maintenance' : '/maintenance',
      Icon: TasbihIcon,
      bgColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
    },
    {
      id: 'doa',
      label: "Do'a",
      path: role === 'admin' ? '/maintenance' : '/maintenance',
      Icon: DuaIcon,
      bgColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
    },
  ];

  //  Subject menu & Operasional base on role
  const roleSpecificItems =
    role === 'admin'
      ? [
        {
          id: 'materi',
          label: 'Kelola Materi',
          path: '/maintenance',
          Icon: SavingIcon,
          bgColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
        },
        {
          id: 'absen',
          label: 'Rekap Absen',
          path: '/maintenance',
          Icon: IconQr,
          bgColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
        },
        {
          id: 'keuangan',
          label: 'Kas Kloter',
          path: '/maintenance',
          Icon: IconWallet,
          bgColor: 'bg-green-500/10 text-green-600 dark:text-green-400',
        },
      ]
      : [
        {
          id: 'materi',
          label: 'Materi',
          path: '/user/materi',
          Icon: SavingIcon,
          bgColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
        },
        {
          id: 'absen',
          label: 'Absen',
          path: '/maintenance',
          Icon: IconQr,
          bgColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
        },
        {
          id: 'keuangan',
          label: 'Keuangan',
          path: '/maintenance',
          Icon: IconWallet,
          bgColor: 'bg-green-500/10 text-green-600 dark:text-green-400',
        },
      ];

  //  Menu "Lainnya"
  const moreItem = {
    id: 'more',
    label: 'Lainnya',
    isAction: true,
    Icon: IconMore,
    bgColor: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
  };

  return [...commonIslamicItems, ...roleSpecificItems, moreItem];
}
