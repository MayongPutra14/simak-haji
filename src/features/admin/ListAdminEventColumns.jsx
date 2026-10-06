import {
  MdOutlineDeleteOutline as IconDelete,
  MdOutlineRemoveRedEye as IconView,
} from 'react-icons/md';
import { FaRegEdit as IconEdit } from 'react-icons/fa';
import ButtonsActionTable from '../../components/ui/global/ButtonsActionTable';
import { formatDateIndonesia } from '../../utils/helpers/dateConversion';
import { titleCase } from '../../utils/helpers/titleCase';
import { StatusBadge } from '../../components/ui/global/StatusBedge';

export const ListAdminEventColumns = ({ onDelete, onViewDetail, onEdit }) => [
  {
    key: 'eventName',
    header: 'Nama Event',
    isSticky: true,
    render: (event) => (
      <div className="flex items-center gap-3 max-w-28 md:max-w-60">
        <span className="whitespace-normal text-sm/7 text-slate-900 wrap-break-word">
          {titleCase(event.eventName)}
        </span>
      </div>
    ),
  },
  {
    key: 'location',
    header: 'Lokasi / Tempat',
    className: 'text-slate-600 whitespace-nowrap',
    align: 'center',
    render: (event) => event.location || '-',
  },
  {
    key: 'speaker',
    header: 'Pembicara',
    className: 'text-slate-600 whitespace-nowrap',
    align: 'center',
    render: (event) => event.speaker || '-',
  },
  {
    key: 'date',
    header: 'Tanggal',
    className: 'text-slate-600 whitespace-nowrap',
    align: 'center',
    render: (event) => formatDateIndonesia(event.date) || '-',
  },
  {
    key: 'zone',
    header: 'Zona',
    className: 'text-slate-600 whitespace-nowrap',
    align: 'center',
    render: (event) => event.zone || '-',
  },
  {
    key: 'status',
    header: 'Status',
    className: 'text-slate-600 whitespace-nowrap',
    align: 'center',
    render: (event) => StatusBadge({ status: event.status || '-' }),
  },
  {
    key: 'type',
    header: 'Kategori Event',
    className: 'whitespace-nowrap',
    align: 'center',
    render: (event) =>
      event.type === 'jamaah' ? (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Jamaah
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Leader
        </span>
      ),
  },
  {
    key: 'actions',
    header: 'Aksi',
    align: 'center',
    className: 'whitespace-nowrap',
    render: (event) => (
      <div className="flex items-center justify-center gap-1">
        <ButtonsActionTable
          variant="default"
          title="Lihat detail"
          onClick={() => onViewDetail(event)}
          icon={<IconView className="w-5 h-5" />}
        />

        <ButtonsActionTable
          variant="teal"
          title="Edit data"
          onClick={() => onEdit(event)}
          icon={<IconEdit className="w-4 h-4" />}
        />

        <ButtonsActionTable
          variant="rose"
          title="Delete data"
          onClick={() => onDelete(event)}
          icon={<IconDelete className="w-5 h-5" />}
        />
      </div>
    ),
  },
];
