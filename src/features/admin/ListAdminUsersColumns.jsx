import {
  MdOutlineDeleteOutline as IconDelete,
  MdOutlineRemoveRedEye as IconView,
} from 'react-icons/md';
import { FaRegEdit as IconEdit } from 'react-icons/fa';
import ButtonsActionTable from '../../components/ui/global/ButtonsActionTable';

export const ListAdminUsersColumns = ({ onDelete }) => [
  {
    key: 'name',
    header: 'Nama User',
    isSticky: true,
    render: (user) => {
      const encodedName = encodeURIComponent(user.name);
      const avatarFallback = `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&bold=false`;
      const avatarSrc = user.avatar || avatarFallback;

      return (
        <div className="flex items-center gap-3 min-w-32">
          <img
            src={avatarSrc}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200"
          />
          <span className="font-base text-slate-900">{user.name}</span>
        </div>
      );
    },
  },
  {
    key: 'portionNumber',
    header: 'Nomor Porsi',
    className: 'text-slate-600 whitespace-nowrap',
  },
  {
    key: 'phone',
    header: 'Nomor Telepon',
    className: 'text-slate-600 whitespace-nowrap',
  },
  {
    key: 'status',
    header: 'Status',
    className: 'whitespace-nowrap',
    render: (user) =>
      user.status === 'Aktif' ? (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Aktif
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          Alumni
        </span>
      ),
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
          icon={<IconView className="w-5 h-5" />}
        />

        <ButtonsActionTable
          variant="teal"
          title="Edit data"
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
