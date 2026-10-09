import {
  MdOutlineDeleteOutline as IconDelete,
  MdOutlineRemoveRedEye as IconView,
} from 'react-icons/md';
import { FaRegEdit as IconEdit } from 'react-icons/fa';
import ButtonsActionTable from '../../components/ui/global/ButtonsActionTable';
import { StatusBadge } from '../../components/ui/global/StatusComponents';
import { titleCase } from '../../utils/helpers/helpers';

export const ListAdminUsersColumns = ({ onDelete, onViewDetail, onEdit }) => [
  {
    key: 'fullName',
    header: 'Nama Jamaah',
    isSticky: true,
    render: (user) => {
      const encodedName = encodeURIComponent(user.fullName);
      const avatarFallback = `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&bold=false`;
      const avatarSrc = user.photoUrl || avatarFallback;

      return (
        <div className="max-w-28 md:max-w-md flex items-center gap-3">
          <img
            src={avatarSrc}
            alt={user.fullName}
            className="object-cover w-10 h-10 border rounded-full shrink-0 border-slate-200"
          />
          <span className="text-sm/7 text-slate-900 wrap-break-word  whitespace-normal">
            {titleCase(user.fullName)}
          </span>
        </div>
      );
    },
  },
  {
    key: 'portionNumber',
    header: 'Nomor Porsi',
    className: 'text-slate-600 whitespace-nowrap',
    align: 'center',
  },
  {
    key: 'zone',
    header: 'Zona',
    className: 'text-slate-600 whitespace-nowrap',
    align: 'center',
  },
  {
    key: 'statusPortion',
    header: 'Status Porsi',
    className: 'text-slate-600 whitespace-nowrap',
    align: 'center',
  },
  {
    key: 'statusGoogleForm',
    header: 'G-Form',
    className: 'text-slate-600 whitespace-nowrap',
    align: 'center',
    render: (user) => StatusBadge({ status: user.statusGoogleForm }),
  },
  {
    key: 'statusPhoto',
    header: 'Photo',
    className: 'text-slate-600 whitespace-nowrap',
    align: 'center',
    render: (user) => StatusBadge({ status: user.statusPhoto }),
  },
  {
    key: 'statusSpph',
    header: 'SPPH',
    className: 'text-slate-600 whitespace-nowrap',
    align: 'center',
    render: (user) => StatusBadge({ status: user.statusSpph }),
  },
  {
    key: 'statusMutasi',
    header: 'Mutasi',
    className: 'text-slate-600 whitespace-nowrap',
    align: 'center',
    render: (user) => StatusBadge({ status: user.statusMutasi }),
  },
  {
    key: 'statusBiometrik',
    header: 'Biometrik',
    className: 'text-slate-600 whitespace-nowrap',
    align: 'center',
    render: (user) => StatusBadge({ status: user.statusBiometrik }),
  },
  {
    key: 'statusPuskesmas',
    header: 'Puskesmas',
    className: 'text-slate-600 whitespace-nowrap',
    align: 'center',
    render: (user) => StatusBadge({ status: user.statusPuskesmas }),
  },
  {
    key: 'statusMCU',
    header: 'MCU',
    className: 'text-slate-600 whitespace-nowrap',
    align: 'center',
    render: (user) => StatusBadge({ status: user.statusMCU }),
  },
  {
    key: 'statusPelunasan',
    header: 'Pelunasan',
    className: 'text-slate-600 whitespace-nowrap',
    align: 'center',
    render: (user) => StatusBadge({ status: user.statusPelunasan }),
  },
  {
    key: 'statusPassport',
    header: 'Passport',
    className: 'text-slate-600 whitespace-nowrap',
    align: 'center',
    render: (user) => StatusBadge({ status: user.statusPassport }),
  },
  {
    key: 'statusVisa',
    header: 'Visa',
    className: 'text-slate-600 whitespace-nowrap',
    align: 'center',
    render: (user) => StatusBadge({ status: user.statusVisa }),
  },
  {
    key: 'actions',
    header: 'Aksi',
    align: 'center',
    className: 'whitespace-nowrap',
    render: (user) => (
      <div className="flex items-center justify-center gap-1">
        <ButtonsActionTable
          variant="default"
          title="Lihat detail"
          onClick={() => onViewDetail(user)}
          icon={<IconView className="w-5 h-5" />}
        />

        <ButtonsActionTable
          variant="teal"
          title="Edit data"
          onClick={() => onEdit(user)}
          icon={<IconEdit className="w-4 h-4" />}
        />

        <ButtonsActionTable
          variant="rose"
          title="Delete data"
          onClick={() => onDelete(user)}
          icon={<IconDelete className="w-5 h-5" />}
        />
      </div>
    ),
  },
];
